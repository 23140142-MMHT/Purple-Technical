/* ════════════════════════════════════════════════════════════════════════
   main.js — arma la página a partir de js/data.js. No necesitas editarlo.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  const B = window.BINDER;
  const T = B.team;

  /* ---- 1) Inyecta los colores de marca desde data.js ---- */
  const root = document.documentElement.style;
  root.setProperty("--primary", T.primary);
  root.setProperty("--accent", T.accent);

  /* ---- 2) Rellena textos fijos (navbar, hero, footer) ---- */
  const $ = (id) => document.getElementById(id);
  $("brand-num").textContent = String(T.number).slice(0, 2);
  $("brand-team").textContent = "Team " + T.number;
  $("brand-name").textContent = T.name;
  $("season-badge").textContent = T.season + " · " + T.game;
  $("hero-eyebrow").textContent = "Temporada " + T.season + " · " + T.game;
  $("hero-robot").textContent = T.robotName;
  $("hero-tagline").textContent = T.tagline;
  $("hero-yt").href = "https://www.youtube.com/watch?v=" + T.youtubeId;
  document.title = "Team " + T.number + " " + T.name + " — Technical Binder";

  $("footer-team").textContent = "Team " + T.number + " " + T.name;
  $("footer-desc").textContent =
    "Technical Binder de " + T.robotName + " — temporada " + T.season +
    " (" + T.game + "). " + T.location + ".";
  $("chat-title").textContent = "Asistente " + T.robotName;

  // Redes del footer
  const socialMap = { website: "🌐", youtube: "▶", instagram: "📷", github: "‹›" };
  $("footer-socials").innerHTML = Object.entries(T.socials)
    .map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${k}">${socialMap[k] || "↗"}</a>`)
    .join("");
  $("footer-bottom").textContent =
    "© " + T.season + " Team " + T.number + " " + T.name + ". Hecho con FIRST ♥.";

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

  function featuresHtml(features) {
    if (!features || !features.length) return "";
    const items = features.map((f) => {
      const sub = f.sub && f.sub.length
        ? `<ul class="sub">${f.sub.map((s) => `<li>${s}</li>`).join("")}</ul>` : "";
      return `<div class="feature"><span class="dot"></span><div><div>${f.text}</div>${sub}</div></div>`;
    }).join("");
    return `<div class="features"><div class="features-title">Features</div>${items}</div>`;
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

  /* ---- 5) Índice "Contents" ---- */
  const cat = (label, rows) => `<div class="contents-cat">
    <h3>${label}</h3>
    ${rows.map((r) => `<a class="contents-row" href="#${r.id}">
        <span class="num">${r.number}</span><span class="title">${r.title}</span>
      </a>`).join("")}
  </div>`;

  $("contents-list").innerHTML =
    cat("Mecánico", mech) +
    cat("Software", [soft]) +
    cat("Prototipos", proto);

  /* ---- 6) Secciones ---- */
  const out = [];

  mech.forEach((s) => {
    out.push(section({
      id: s.id, eyebrow: "Mecánico · " + s.number, title: s.title, summary: s.summary,
      mediaHtml: media(s.image, s.title + " con bumper"),
      features: s.features, specs: s.specs, detail: null,
    }));
  });

  out.push(section({
    id: soft.id, eyebrow: "Software · " + soft.number, title: soft.title, summary: soft.summary,
    mediaHtml: media(soft.image, "Software del robot"),
    features: soft.features, specs: null, detail: null,
  }));

  proto.forEach((p) => {
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
      id: p.id, eyebrow: "Prototipos · " + p.number, title: p.title, summary: p.summary,
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
})();
