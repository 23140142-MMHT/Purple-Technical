/* ════════════════════════════════════════════════════════════════════════
   chat.js — widget de chat. Llama a BINDER.chatEndpoint (la función serverless).
   La API key NUNCA está aquí: vive en el servidor (api/chat.js).
   Sin backend (al abrir en local), responde un mensaje de "no configurado".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  const B = window.BINDER;
  const endpoint = B.chatEndpoint || "/api/chat";

  const fab = document.getElementById("chat-fab");
  const drawer = document.getElementById("chat-drawer");
  const close = document.getElementById("chat-close");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-text");
  const messagesEl = document.getElementById("chat-messages");

  const history = []; // [{role, content}]
  let busy = false;

  const SUGGESTIONS = [
    "¿Qué tipo de drivetrain usan?",
    "¿Cómo funciona el turret?",
    "¿Cuál es su estrategia autónoma?",
  ];

  function renderSuggestions() {
    if (history.length) return;
    const wrap = document.createElement("div");
    wrap.className = "chat-suggestions";
    wrap.innerHTML =
      `<p style="color:var(--muted);font-size:14px">Pregúntame sobre ${B.team.robotName}:</p>` +
      SUGGESTIONS.map((q) => `<button type="button">${q}</button>`).join("");
    wrap.querySelectorAll("button").forEach((btn) =>
      btn.addEventListener("click", () => send(btn.textContent))
    );
    messagesEl.appendChild(wrap);
  }

  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = "msg " + (role === "user" ? "user" : "bot");
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    if (!history.length && !messagesEl.querySelector(".chat-suggestions")) renderSuggestions();
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }

  async function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;
    busy = true;

    const sug = messagesEl.querySelector(".chat-suggestions");
    if (sug) sug.remove();

    addMessage("user", text);
    history.push({ role: "user", content: text });
    input.value = "";

    const botEl = addMessage("bot", "…");
    let acc = "";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.body) throw new Error("sin cuerpo");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      botEl.textContent = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        botEl.textContent = acc;
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
      if (acc) history.push({ role: "assistant", content: acc });
    } catch (err) {
      botEl.textContent =
        "El asistente AI no está conectado. Despliega la función serverless " +
        "(api/chat.js) con tu ANTHROPIC_API_KEY para activarlo.";
    } finally {
      busy = false;
    }
  }

  fab.addEventListener("click", openDrawer);
  close.addEventListener("click", closeDrawer);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    send(input.value);
  });
})();
