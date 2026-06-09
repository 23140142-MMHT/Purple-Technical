/* ════════════════════════════════════════════════════════════════════════
   translate.js — menú de idiomas ES / EN / FR.
   Usa el Google Website Translator por debajo para traducir TODA la página
   (incluido el contenido que genera main.js). El idioma base es español.
   ════════════════════════════════════════════════════════════════════════ */

// Google llama a esta función global cuando carga su script.
window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    { pageLanguage: "es", includedLanguages: "es,en,fr", autoDisplay: false },
    "google_translate_element"
  );
};

(function () {
  // Idioma actual según la cookie de Google (formato "/es/en").
  function currentLang() {
    var m = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/);
    return m ? decodeURIComponent(m[1]) : "es";
  }

  function markActive(lang) {
    var btns = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("active", btns[i].dataset.lang === lang);
    }
  }

  // Cambia el idioma manipulando el <select> oculto de Google (carga async → reintenta).
  function setLang(lang) {
    (function trySet(n) {
      var combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
        markActive(lang);
      } else if (n < 30) {
        setTimeout(function () { trySet(n + 1); }, 200);
      }
    })(0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btns = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < btns.length; i++) {
      (function (b) {
        b.addEventListener("click", function () { setLang(b.dataset.lang); });
      })(btns[i]);
    }
    markActive(currentLang());
  });
})();
