/* ════════════════════════════════════════════════════════════════════════
   main.js — arma la página a partir de js/data.js. No necesitas editarlo.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  // i18n: tr() traduce textos literales; tData() traduce todo el contenido de data.js.
  const tr = window.t || function (s) { return s; };
  const B = (window.tData || function (x) { return x; })(window.BINDER);
  const T = B.team;

  /* ---- 1) Inyecta los colores de marca desde data.js ---- */
  const root = document.documentElement.style;
  root.setProperty("--primary", T.primary);
  root.setProperty("--accent", T.accent);

  /* ---- 2) Rellena textos fijos (navbar, hero, footer) ---- */
  const $ = (id) => document.getElementById(id);
  // Setter seguro: no falla si el elemento no existe (ej. logo en imagen).
  const setText = (id, txt) => { const el = $(id); if (el) el.textContent = txt; };
  // Texto de respaldo del logo (solo se ve si falta wordmark.png): el nombre del equipo.
  setText("brand-team", T.name);
  setText("brand-name", "");
  $("season-badge").textContent = T.season + " · " + T.game;
  $("hero-robot").textContent = T.robotName;
  $("hero-tagline").textContent = T.tagline;
  $("hero-yt").href = "https://www.youtube.com/watch?v=" + T.youtubeId;
  document.title = T.name + " — Technical Binder";

  // Sitio web del equipo (footer). La URL viene de team.website en data.js.
  const webEl = $("footer-website");
  if (webEl) {
    if (T.website) {
      webEl.href = T.website;
      webEl.textContent = "🌐 " + tr("Nuestro sitio web") + " →";
    } else {
      // Aún sin link: muestra un placeholder y queda no-clickeable.
      webEl.textContent = "(" + tr("sitio web próximamente") + ")";
      webEl.classList.add("disabled");
      webEl.removeAttribute("href");
    }
  }

  // Botón "Conócenos" de la navbar → sitio web (o Instagram si aún no hay sitio).
  const navWeb = $("nav-website");
  if (navWeb) {
    const url = T.website || (T.socials && T.socials.instagram);
    if (url) navWeb.href = url;
    else navWeb.style.display = "none";
  }

  /* ---- 3) Helpers de render ---- */
  // Imagen con fallback a placeholder si el archivo no existe.
  function media(src, alt) {
    return `<div class="media">
      <a href="${src}" class="glightbox">
        <img src="${src}" alt="${alt}" loading="lazy"
          onerror="this.style.display='none'; this.closest('.media').querySelector('.placeholder').style.display='grid';">
      </a>
      <div class="placeholder" style="display:none">${alt}<br><small>(sube esta imagen a /assets)</small></div>
    </div>`;
  }

  // Imagen plana: sin marco, sin fondo, sin sombra (para renders con fondo negro).
  function plainMedia(src, alt) {
    return `<div class="plain-media"><img src="${src}" alt="${alt}" loading="lazy" onerror="this.style.display='none'"></div>`;
  }

  // Botón de pantalla completa (esquina del visor 3D).
  function fsButton() {
    return `<button class="cad-fs" title="${tr("Pantalla completa")}" aria-label="${tr("Pantalla completa")}" onclick="toggleCadFullscreen(this)">⛶</button>`;
  }
  // Alterna pantalla completa del visor (con prefijo webkit para Safari).
  window.toggleCadFullscreen = function (btn) {
    const m = btn.closest(".cad-mount");
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else (m.requestFullscreen || m.webkitRequestFullscreen).call(m);
  };

  // Contenedor del visor 3D (cad.js monta el canvas aquí). Interactivo: rotar/zoom.
  // La rotación de corrección (grados) viene de s.model3dRotation.
  function cadMount(s) {
    const r = s.model3dRotation || { x: 0, y: 0, z: 0 };
    return `<div class="media cad-mount" id="cad-${s.id}" data-model="${s.model3d}"
      data-rotx="${r.x || 0}" data-roty="${r.y || 0}" data-rotz="${r.z || 0}">
      ${fsButton()}
      <span class="cad-hint">${tr("Arrastra para rotar · scroll para zoom")}</span>
    </div>`;
  }

  // Elige 3D si el subsistema tiene model3d; si no, la imagen.
  function mediaFor(s) {
    return s.model3d ? cadMount(s) : media(s.image, s.title + " con bumper");
  }

  function featuresHtml(features) {
    if (!features || !features.length) return "";
    const items = features.map((f) => {
      const sub = f.sub && f.sub.length
        ? `<ul class="sub">${f.sub.map((s) => `<li>${s}</li>`).join("")}</ul>` : "";
      return `<div class="feature"><span class="dot"></span><div><div>${f.text}</div>${sub}</div></div>`;
    }).join("");
    return `<div class="features"><div class="features-title">${tr("Features")}</div>${items}</div>`;
  }

  function specsHtml(specs) {
    if (!specs || !specs.length) return "";
    return `<div class="specs">${specs.map((s) => `<span class="spec">${s.label}: <b>${s.value}</b></span>`).join("")}</div>`;
  }

  // Una sección de dos columnas (imagen / info).
  function section({ id, eyebrow, title, summary, mediaHtml, features, specs, detail }) {
    return `<section class="section" id="${id}">
      <div>${mediaHtml}</div>
      <div>
        <span class="eyebrow">${eyebrow}</span>
        <h2>${title}.</h2>
        <p class="summary">${summary}</p>
        ${featuresHtml(features)}
        ${specsHtml(specs)}
        ${detail ? `<a class="detail-link" href="${detail.href}">${detail.label} →</a>` : ""}
      </div>
    </section>`;
  }

  /* ---- 4) Numeración continua + categorías ---- */
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  const mech = B.subsystems.map((s) => ({ ...s, number: num() }));
  const soft = { ...B.software, number: num() };
  const proto = B.prototyping.map((p) => ({ ...p, number: num() }));

  /* ---- 6) Secciones ---- */
  const out = [];

  mech.forEach((s) => {
    out.push(section({
      id: s.id, eyebrow: tr("Mecánico") + " · " + s.number, title: s.title, summary: s.summary,
      mediaHtml: mediaFor(s),
      features: s.features, specs: s.specs, detail: null,
    }));
  });

  // Software: mismo formato 2 columnas de los mecanismos, pero la info son
  // "cuadritos" (cards) en cuadrícula que siguen al lado y debajo de la imagen.
  const swCards = (soft.components || [])
    .map((c) => `<div class="sw-card"><h4>${c.title}</h4><p>${c.desc}</p></div>`)
    .join("");
  out.push(`<section class="section" id="${soft.id}">
    <div>${plainMedia(soft.image, tr("Diagrama de control de PURPLE SPIKE"))}</div>
    <div>
      <span class="eyebrow">${tr("Software")} · ${soft.number}</span>
      <h2>${soft.title}.</h2>
      <p class="summary">${soft.summary}</p>
      <div class="sw-grid">${swCards}</div>
    </div>
  </section>`);

  // Un visor 3D suelto (por clase, sin id) para la comparativa.
  function cadMountRaw(modelPath, rot) {
    const r = rot || { x: 0, y: 0, z: 0 };
    return `<div class="media cad-mount" data-model="${modelPath}"
      data-rotx="${r.x || 0}" data-roty="${r.y || 0}" data-rotz="${r.z || 0}">
      ${fsButton()}
      <span class="cad-hint">${tr("Arrastra para rotar")}</span>
    </div>`;
  }

  // Lista de strengths/weaknesses con su marca (✓ / ✕).
  function swList(title, items, cls, mark) {
    const lis = (items || []).map((t) => `<li><span class="sw-mark">${mark}</span>${t}</li>`).join("");
    return `<div class="sw sw--${cls}"><h4>${title}</h4><ul>${lis}</ul></div>`;
  }

  // Galería plegable de fotos de prototipos intermedios (entre versiones grandes).
  // Se muestra como un botón "+" centrado; al abrirlo despliega las fotos en cards.
  // Cada foto: { label, image }. Si falta la imagen, media() deja el recuadro placeholder.
  function protoGap(photos) {
    if (!photos || !photos.length) return "";
    const cards = photos.map((ph) => `
        <figure class="proto-photo">
          ${media(ph.image, ph.label || tr("Prototipo"))}
          ${ph.label ? `<figcaption>${ph.label}</figcaption>` : ""}
        </figure>`).join("");
    return `<details class="proto-gap">
        <summary>
          <span class="proto-gap-plus" aria-hidden="true"></span>
          <span>${tr("Prototipos intermedios")}</span>
          <span class="proto-gap-count">${photos.length}</span>
        </summary>
        <div class="proto-gap-grid">${cards}</div>
      </details>`;
  }

  proto.forEach((p) => {
    // Mismo formato que los mecanismos: CAD a la izquierda, info a la derecha.
    // "Our Robots" + su texto como cabecera que ocupa toda una fila arriba.
    if (p.versions && p.versions.length) {
      const versionSections = p.versions.map((v) => {
        const media = v.model3d
          ? cadMountRaw(v.model3d, p.model3dRotation)
          : `<div class="media pv-empty"><span class="proto3d-add-plus">＋</span><span>${tr("CAD próximamente")}</span></div>`;
        // Separa "V1 | Cuautitlan Regional" en eyebrow ("V1") + título ("Cuautitlan Regional").
        const parts = v.label.split("|");
        const vnum = parts.length > 1 ? parts[0].trim() : "";
        const vname = parts.length > 1 ? parts.slice(1).join("|").trim() : v.label;
        return `<section class="section version-row">
          <div>${media}</div>
          <div>
            <span class="eyebrow">${vnum || tr("Versión")}</span>
            <h2>${vname}.</h2>
            <div class="pv-info-stack">
              ${swList(tr("Fortalezas"), v.strengths, "good", "✓")}
              ${swList(tr("Debilidades"), v.weaknesses, "bad", "✕")}
            </div>
          </div>
        </section>${protoGap(v.progressPhotos)}`;
      }).join("");
      out.push(`<div class="section--proto" id="${p.id}">
        <div class="proto-head-row">
          <span class="eyebrow">${tr("Prototipos")} · ${p.number}</span>
          <h2>${p.title}.</h2>
          <p class="summary">${p.summary}</p>
        </div>
        ${versionSections}
      </div>`);
      return;
    }

    // Si no, el slider de imágenes antes/después.
    const cmp = `<div class="media">
      <span class="cmp-tag left">${p.beforeLabel}</span>
      <span class="cmp-tag right">${p.afterLabel}</span>
      <img-comparison-slider>
        <img slot="first" src="${p.beforeImage}" alt="${p.beforeLabel}"
          onerror="this.style.visibility='hidden'">
        <img slot="second" src="${p.afterImage}" alt="${p.afterLabel}"
          onerror="this.style.visibility='hidden'">
      </img-comparison-slider>
    </div>`;
    out.push(section({
      id: p.id, eyebrow: tr("Prototipos") + " · " + p.number, title: p.title, summary: p.summary,
      mediaHtml: cmp, features: p.features, specs: null, detail: null,
    }));
  });

  $("sections").innerHTML = out.join("");

  /* ---- 7) Inicializa librerías ---- */
  if (window.lucide) window.lucide.createIcons();
  if (window.GLightbox) window.GLightbox({ selector: ".glightbox" });
  if (window.mermaid) window.mermaid.initialize({ startOnLoad: true, theme: "dark" });

  /* ---- 8) Interacciones de navbar ---- */
  const navbar = $("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const hamburger = $("hamburger");
  const navLinks = $("nav-links");
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });

  // Dropdown "Our Pillars" (clic para abrir; hover ya en CSS en escritorio).
  const navDd = $("nav-dd");
  const navDdBtn = $("nav-dd-btn");
  if (navDd && navDdBtn) {
    navDdBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = navDd.classList.toggle("open");
      navDdBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", () => {
      navDd.classList.remove("open");
      navDdBtn.setAttribute("aria-expanded", "false");
    });
  }
})();
