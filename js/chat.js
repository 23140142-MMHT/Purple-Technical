/* ════════════════════════════════════════════════════════════════════════
   chat.js — Preguntas frecuentes en formato ACORDEÓN (no es un chat).
   Las preguntas de js/faq.js se listan por sección; al hacer click en una,
   se despliega su respuesta justo debajo (toggle). Trilingüe (ES/EN/FR).
   Para editar las preguntas/respuestas: edita js/faq.js.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  var lang = (window.I18N && window.I18N.lang) || "es";
  var FAQ = window.FAQ || [];
  function pick(o) { return (o && (o[lang] || o.es)) || ""; }

  var fab = document.getElementById("chat-fab");
  var drawer = document.getElementById("chat-drawer");
  var closeBtn = document.getElementById("chat-close");
  var messagesEl = document.getElementById("chat-messages");

  var INTRO = { es: "Elige una pregunta:", en: "Pick a question:", fr: "Choisis une question :" };
  // Mensaje de cierre que invita a acercarse al pit.
  var OUTRO = {
    es: "¿Más preguntas? Acércate a nuestro pit — <strong>Aztech II 17626</strong>. ¡Te esperamos! 💜",
    en: "More questions? Come by our pit — <strong>Aztech II 17626</strong>. We'd love to chat! 💜",
    fr: "D'autres questions ? Passe à notre pit — <strong>Aztech II 17626</strong>. On t'attend ! 💜",
  };

  // Acordeón: cada pregunta despliega su respuesta debajo (toggle).
  function buildAccordion() {
    var wrap = document.createElement("div");
    wrap.className = "faq-acc";
    var html = '<p class="faq-intro">' + pick(INTRO) + "</p>";
    FAQ.forEach(function (sec) {
      html += '<div class="faq-section"><h5>' + pick(sec.section) + "</h5>";
      sec.items.forEach(function (it) {
        html +=
          '<div class="faq-item">' +
          '<button type="button" class="faq-q">' +
          "<span>" + pick(it.q) + "</span>" +
          '<span class="faq-caret">▾</span>' +
          "</button>" +
          '<div class="faq-a">' + pick(it.a) + "</div>" +
          "</div>";
      });
      html += "</div>";
    });
    html += '<div class="faq-outro">' + pick(OUTRO) + "</div>";
    wrap.innerHTML = html;
    wrap.querySelectorAll(".faq-q").forEach(function (b) {
      b.addEventListener("click", function () {
        b.parentElement.classList.toggle("open");
      });
    });
    messagesEl.appendChild(wrap);
  }

  function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    if (!messagesEl.querySelector(".faq-acc")) buildAccordion();
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }

  if (fab) fab.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
})();
