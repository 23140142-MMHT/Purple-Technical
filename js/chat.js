/* ════════════════════════════════════════════════════════════════════════
   chat.js — "Aztlo", el chatbot de Aztech II (preguntas ABIERTAS).
   El usuario escribe lo que quiera; la respuesta llega en streaming desde
   la función serverless api/chat.js (la API key vive en el servidor).
   ⚠️ Para que responda de verdad, despliega en Vercel con ANTHROPIC_API_KEY.
   Las sugerencias iniciales salen de js/faq.js. Trilingüe (ES/EN/FR).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  var lang = (window.I18N && window.I18N.lang) || "es";
  var tr = window.t || function (s) { return s; };
  var B = window.BINDER;
  var endpoint = (B && B.chatEndpoint) || "/api/chat";
  function pick(o) { return (o && (o[lang] || o.es)) || ""; }

  var fab = document.getElementById("chat-fab");
  var drawer = document.getElementById("chat-drawer");
  var closeBtn = document.getElementById("chat-close");
  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-text");
  var messagesEl = document.getElementById("chat-messages");

  if (form) form.style.display = ""; // entrada de texto libre activada

  var history = []; // [{role, content}]
  var busy = false;

  // Saludo inicial de Aztlo.
  var GREET = {
    es: "¡Hola! Soy Aztlo, el asistente de Aztech II 17626. Pregúntame lo que quieras sobre PURPLE SPIKE — robot, software, estrategia o equipo.",
    en: "Hi! I'm Aztlo, Aztech II 17626's assistant. Ask me anything about PURPLE SPIKE — robot, software, strategy or team.",
    fr: "Salut ! Je suis Aztlo, l'assistant d'Aztech II 17626. Pose-moi tes questions sur PURPLE SPIKE — robot, logiciel, stratégie ou équipe.",
  };

  // Sugerencias iniciales = primeras preguntas de algunas secciones del FAQ.
  var FAQ = window.FAQ || [];
  var SUGGESTIONS = FAQ.slice(0, 4).map(function (s) { return pick(s.items[0].q); });

  function addMessage(role, text) {
    var el = document.createElement("div");
    el.className = "msg " + (role === "user" ? "user" : "bot");
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function renderIntro() {
    var wrap = document.createElement("div");
    wrap.className = "chat-suggestions";
    wrap.innerHTML =
      '<p style="color:var(--muted);font-size:14px;line-height:1.5">' + pick(GREET) + "</p>" +
      SUGGESTIONS.map(function (q) { return '<button type="button">' + q + "</button>"; }).join("");
    wrap.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { send(b.textContent); });
    });
    messagesEl.appendChild(wrap);
  }

  async function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;
    busy = true;

    var sug = messagesEl.querySelector(".chat-suggestions");
    if (sug) sug.remove();

    addMessage("user", text);
    history.push({ role: "user", content: text });
    input.value = "";

    var botEl = addMessage("bot", "…");
    var acc = "";
    try {
      var res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.body) throw new Error("no body");
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      botEl.textContent = "";
      for (;;) {
        var r = await reader.read();
        if (r.done) break;
        acc += decoder.decode(r.value, { stream: true });
        botEl.textContent = acc;
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
      if (acc) history.push({ role: "assistant", content: acc });
    } catch (e) {
      botEl.textContent = tr("Aztlo no está disponible ahora mismo. Intenta de nuevo en un momento.");
    } finally {
      busy = false;
    }
  }

  function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    if (!messagesEl.querySelector(".msg") && !messagesEl.querySelector(".chat-suggestions")) renderIntro();
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }

  if (fab) fab.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (form) form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });
})();
