/* ════════════════════════════════════════════════════════════════════════
   chat.js — Chatbot de PREGUNTAS PRE-HECHAS (no usa IA / API key).
   Muestra las preguntas de js/faq.js por sección; al elegir una, responde
   con su respuesta. Formato pregunta → respuesta. Trilingüe (ES/EN/FR).
   Para editar las preguntas/respuestas: edita js/faq.js.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  var lang = (window.I18N && window.I18N.lang) || "es";
  var FAQ = window.FAQ || [];
  function pick(o) { return (o && (o[lang] || o.es)) || ""; }

  var fab = document.getElementById("chat-fab");
  var drawer = document.getElementById("chat-drawer");
  var closeBtn = document.getElementById("chat-close");
  var form = document.getElementById("chat-form");
  var messagesEl = document.getElementById("chat-messages");

  // Sin entrada de texto libre: solo preguntas pre-hechas.
  if (form) form.style.display = "none";

  var INTRO = { es: "Elige una pregunta:", en: "Pick a question:", fr: "Choisis une question :" };

  function addMessage(role, text) {
    var el = document.createElement("div");
    el.className = "msg " + (role === "user" ? "user" : "bot");
    el.textContent = text;
    messagesEl.appendChild(el);
    return el;
  }

  // Dibuja el menú de preguntas (secciones + botones). Se reusa tras cada respuesta.
  function renderMenu() {
    var menu = document.createElement("div");
    menu.className = "faq-menu";
    var html = '<p class="faq-intro">' + pick(INTRO) + "</p>";
    FAQ.forEach(function (sec, si) {
      html += '<div class="faq-section"><h5>' + pick(sec.section) + "</h5>";
      sec.items.forEach(function (it, ii) {
        html +=
          '<button type="button" class="faq-q" data-s="' + si + '" data-i="' + ii + '">' +
          pick(it.q) +
          "</button>";
      });
      html += "</div>";
    });
    menu.innerHTML = html;
    menu.querySelectorAll(".faq-q").forEach(function (b) {
      b.addEventListener("click", function () {
        var it = FAQ[b.getAttribute("data-s")].items[b.getAttribute("data-i")];
        menu.remove(); // quita este menú…
        addMessage("user", pick(it.q));
        addMessage("bot", pick(it.a));
        renderMenu(); // …y vuelve a ponerlo abajo para seguir preguntando
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
    });
    messagesEl.appendChild(menu);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    if (!messagesEl.querySelector(".faq-menu") && !messagesEl.querySelector(".msg")) renderMenu();
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }

  if (fab) fab.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
})();
