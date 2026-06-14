/* ════════════════════════════════════════════════════════════════════════
   translate.js — i18n MANUAL (ES base · EN · FR). Sin servicios externos.
   ------------------------------------------------------------------------
   Cómo funciona:
   - El contenido en data.js y la UI están en ESPAÑOL (idioma base).
   - DICT mapea cada texto español → inglés/francés.
   - t("texto español") devuelve la traducción del idioma activo (o el español
     si no hay traducción). main.js/chat.js envuelven los textos con t().
   - El menú ES/EN/FR guarda el idioma y RECARGA la página (así los visores 3D
     se reinicializan limpios).

   Para AGREGAR/EDITAR traducciones: edita los objetos DICT.en y DICT.fr abajo.
   La clave es el texto en español EXACTO; el valor es la traducción.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  var lang = localStorage.getItem("lang") || "en";

  var DICT = {
    en: {
      // —— UI ——
      "Hecho con": "Made with",
      "por Aztech II · FIRST Tech Challenge 17626": "by Aztech II · FIRST Tech Challenge 17626",
      "Conoce a": "Meet",
      "Explorar subsistemas": "Explore subsystems",
      "Explorar": "Explore",
      "Conéctate": "Connect",
      "Preguntas frecuentes": "FAQ",
      "Volver arriba ↑": "Back to top ↑",
      "Nuestro sitio web": "Our website",
      "sitio web próximamente": "website coming soon",
      "Conócenos": "Meet us",
      "Ver reveal ▶": "Watch reveal ▶",
      "Subsistemas": "Subsystems",
      "Prototipos": "Prototypes",
      "Software": "Software",
      "Mecánico": "Mechanical",
      "Versión": "Version",
      "Contents": "Contents",
      "Features": "Features",
      "Fortalezas": "Strengths",
      "Debilidades": "Weaknesses",
      "Arrastra para rotar · scroll para zoom": "Drag to rotate · scroll to zoom",
      "Arrastra para rotar": "Drag to rotate",
      "CAD próximamente": "CAD coming soon",
      "Pantalla completa": "Fullscreen",
      "Diagrama de control de PURPLE SPIKE": "PURPLE SPIKE control diagram",
      "Temporada": "Season",
      "temporada": "season",
      "Technical Binder de": "Technical Binder of",
      "Hecho con FIRST ♥.": "Made with FIRST ♥.",
      "Asistente": "Assistant",
      "Pregunta sobre el robot…": "Ask about the robot…",
      "Pregúntame sobre": "Ask me about",
      "¿Qué tipo de drivetrain usan?": "What kind of drivetrain do you use?",
      "¿Cómo funciona el turret?": "How does the turret work?",
      "¿Cuál es su estrategia autónoma?": "What's your autonomous strategy?",
      "Aztlo no está disponible ahora mismo. Intenta de nuevo en un momento.":
        "Aztlo isn't available right now. Please try again in a moment.",

      // —— Drivetrain ——
      "Chasis mecanum con transmision de movimiento por poleas y motores Yellow Jacket":
        "Mecanum chassis with pulley motion transmission and Yellow Jacket motors",
      "Tipo": "Type",
      "Motores": "Motors",
      "Odometría": "Odometry",
      "Drivetrain mecanum con transferencia de movimiento por poleas":
        "Mecanum drivetrain with pulley motion transfer",
      "Centro de gravedad bajo para mayor estabilidad": "Low center of gravity for greater stability",
      "Odometría con 2 dead wheels para localización en el mapa para la torreta":
        "Odometry with 2 dead wheels for field localization for the turret",
      "Chasis con transmision por poleas para mayor presicion":
        "Chassis with pulley transmission for greater precision",

      // —— Intake ——
      "Pivot intake de 3 fases con llantas mini mecanum, gecko y compliant.":
        "3-stage pivot intake with mini mecanum, gecko and compliant wheels.",
      "Indexing Asimetrico": "Asymmetric Indexing",
      "Motor": "Motor",
      "Captura": "Pickup",
      "Llantas mini mecanum que redireccionan el artifact sin embudos":
        "Mini mecanum wheels that redirect the artifact without funnels",
      "Espacio suficiente para solo manipular 3 artifacts": "Enough room to handle exactly 3 artifacts",
      "Solo permite el ingreso, no se escapan los artifacts": "One-way intake: artifacts can't escape",

      // —— Shooter ——
      "Shooter de doble motor y con un volante de inercia incorporado":
        "Dual-motor shooter with a built-in inertial flywheel",
      "Flywheel de doble motor": "Dual-motor flywheel",
      "Control": "Control",
      "Rango": "Range",
      "Flywheel con control de velocidad para tiros desde las dos zonas":
        "Velocity-controlled flywheel for shots from both zones",
      "Mantiene RPM objetivo antes de que el transfer alimente": "Holds target RPM before the transfer feeds",
      "Doble motor para alcanzar las rpm que necesitamos sin saturar un solo motor":
        "Dual motor to reach the RPM we need without overloading a single motor",
      "Montado sobre la torreta para el aimbot": "Mounted on the turret for the aimbot",

      // —— Transfer ——
      "Indexa las piezas del intake al shooter de forma continua y controlada":
        "Indexes pieces from the intake to the shooter continuously and in a controlled way",
      "Canal 3D + gate servo": "3D channel + servo gate",
      "Cola": "Queue",
      "3 piezas": "3 pieces",
      "Compresión": "Compression",
      "3 mm constante": "3 mm constant",
      "Efectua la recolección gracias a una compresión adecuada":
        "Performs collection thanks to proper compression",
      "Mantiene una fila de 3 artifacts listos": "Keeps a queue of 3 ready artifacts",
      "Gate con forma de cuchara para controlar el flujo de artifacts":
        "Spoon-shaped gate to control the flow of artifacts",

      // —— Turret ——
      "Turret de seguimiento con auto-aim que apunta siempre al goal":
        "Tracking turret with auto-aim that always points at the goal",
      "Feedback": "Feedback",
      "Encoder de motor": "Motor encoder",
      "Apuntado": "Aiming",
      "Auto-aim por odometría": "Auto-aim by odometry",
      "Mantiene el shooter apuntado aunque el robot se mueva":
        "Keeps the shooter aimed even while the robot moves",
      "El driver solo conduce el drivetrain, la torreta apunta sola":
        "The driver only drives the drivetrain; the turret aims itself",
      "Auto-aim por odometría (Pinpoint + atan2 desde la pose)":
        "Auto-aim by odometry (Pinpoint + atan2 from the pose)",
      "Engranes helicoidales de doble hélice para evitar backlash":
        "Double-helix herringbone gears to avoid backlash",

      // —— Software ——
      "El cerebro de PURPLE SPIKE: odometría, auto-aim del turret, control de flywheel y máquinas de estado, todo programado con un LLM local como par-programador.":
        "The brain of PURPLE SPIKE: odometry, turret auto-aim, flywheel control and state machines, all programmed with a local LLM as a pair-programmer.",
      "Odometría Pinpoint": "Pinpoint odometry",
      "Pose (x, y, θ) y velocidad cada loop con 2 dead-wheels + IMU.":
        "Pose (x, y, θ) and velocity every loop with 2 dead-wheels + IMU.",
      "Auto-aim del turret": "Turret auto-aim",
      "Apunta solo al goal (atan2 + dual-PD + kS), sin input del piloto.":
        "Aims at the goal by itself (atan2 + dual-PD + kS), no driver input.",
      "Flywheel PIDF ×2": "Flywheel PIDF ×2",
      "Velocidad de salida repetible; valida con el encoder más lento.":
        "Repeatable exit velocity; validated by the slower encoder.",
      "FSM de ciclo + ráfaga": "Cycle + burst FSM",
      "Coordina intake/transfer/shooter y solo dispara a velocidad.":
        "Coordinates intake/transfer/shooter and only fires at speed.",
      "Par-programador con IA": "AI pair-programmer",
      "LLM 100% local: la IA ejecuta, nosotros ingenieamos.":
        "100% local LLM: the AI executes, we engineer.",
      "Mejoras planeadas": "Planned improvements",
      "LUT rango→TPS, gate de zona (G416) y Shoot On The Move.":
        "LUT range→TPS, zone gate (G416) and Shoot On The Move.",

      // —— Prototipos ——
      "Nuestros robots": "Our robots",
      "Las 3 versiones mas importantes de Purple Spike. Gira cada modelo 3D para compararlos.":
        "The 3 most important versions of Purple Spike. Rotate each 3D model to compare them.",
      "Versión actual | Niagara Premier Event": "Current version | Niagara Premier Event",
      "Rutina consistente de 6 artifacts en teleop": "Consistent 6-artifact teleop routine",
      "Chasis rápido y confiable": "Fast and reliable chassis",
      "El intake absorbía los artifacts de forma suave y rápida":
        "The intake absorbed artifacts smoothly and quickly",
      "Diseño de outtake ineficiente con tiros inconsistentes":
        "Inefficient outtake design with inconsistent shots",
      "Sin autónomo": "No autonomous",
      "Fallas del PLA en componentes de transmisión impresos en 3D: el calor por fricción de los motores comprometía la integridad estructural":
        "PLA failures in 3D-printed transmission components: frictional heat from the motors compromised structural integrity",
      "Drivetrain robusto de placas paralelas movido por bandas, con placas maquinadas en CNC por nosotros":
        "Robust parallel-plate drivetrain driven by belts, with in-house CNC-machined plates",
      "Primera rutina autónoma, anotando 9 piezas": "First autonomous routine, scoring 9 pieces",
      "Mayor consistencia e implementación de un controlador PID para regular con precisión la velocidad del shooter":
        "Improved consistency and a PID controller to precisely regulate shooter speed",
      "Ciclos lentos": "Slow cycles",
      "Problemas con las compresiones del intake y el shooter":
        "Problems with intake and shooter compressions",
      "Nuevo intake que toma 3 artifacts a la vez": "New intake that takes 3 artifacts at a time",
      "Nuevo chasis por bandas con una reducción para hacerlo más rápido":
        "New belt chassis with a reduction to make it faster",
      "Turret para optimizar los ciclos": "Turret to optimize the cycles",
      "2 motores en el shooter para mayor consistencia": "2 motors in the shooter for greater consistency",
      "Optimización del intake para el ciclo del gate": "Intake optimization for gate cycling",
      "Tolerancias flojas en las placas para los press-fits de baleros":
        "Loose plate tolerances for bearing press-fits",
      "Fricción extra entre las ruedas del outtake y las placas":
        "Extra friction between the outtake wheels and the plates",
    },

    fr: {
      // —— UI ——
      "Hecho con": "Fait avec",
      "por Aztech II · FIRST Tech Challenge 17626": "par Aztech II · FIRST Tech Challenge 17626",
      "Conoce a": "Voici",
      "Explorar subsistemas": "Explorer les sous-systèmes",
      "Explorar": "Explorer",
      "Conéctate": "Contact",
      "Preguntas frecuentes": "Questions fréquentes",
      "Volver arriba ↑": "Haut de page ↑",
      "Nuestro sitio web": "Notre site web",
      "sitio web próximamente": "site web bientôt",
      "Conócenos": "Découvre-nous",
      "Ver reveal ▶": "Voir le reveal ▶",
      "Subsistemas": "Sous-systèmes",
      "Prototipos": "Prototypes",
      "Software": "Logiciel",
      "Mecánico": "Mécanique",
      "Versión": "Version",
      "Contents": "Contenu",
      "Features": "Caractéristiques",
      "Fortalezas": "Forces",
      "Debilidades": "Faiblesses",
      "Arrastra para rotar · scroll para zoom": "Glisser pour tourner · molette pour zoomer",
      "Arrastra para rotar": "Glisser pour tourner",
      "CAD próximamente": "CAO bientôt",
      "Pantalla completa": "Plein écran",
      "Diagrama de control de PURPLE SPIKE": "Schéma de contrôle de PURPLE SPIKE",
      "Temporada": "Saison",
      "temporada": "saison",
      "Technical Binder de": "Technical Binder de",
      "Hecho con FIRST ♥.": "Fait avec FIRST ♥.",
      "Asistente": "Assistant",
      "Pregunta sobre el robot…": "Pose une question sur le robot…",
      "Pregúntame sobre": "Pose-moi une question sur",
      "¿Qué tipo de drivetrain usan?": "Quel type de drivetrain utilisez-vous ?",
      "¿Cómo funciona el turret?": "Comment fonctionne la tourelle ?",
      "¿Cuál es su estrategia autónoma?": "Quelle est votre stratégie autonome ?",
      "Aztlo no está disponible ahora mismo. Intenta de nuevo en un momento.":
        "Aztlo n'est pas disponible pour le moment. Réessaie dans un instant.",

      // —— Drivetrain ——
      "Chasis mecanum con transmision de movimiento por poleas y motores Yellow Jacket":
        "Châssis mecanum à transmission par poulies et moteurs Yellow Jacket",
      "Tipo": "Type",
      "Motores": "Moteurs",
      "Odometría": "Odométrie",
      "Drivetrain mecanum con transferencia de movimiento por poleas":
        "Drivetrain mecanum avec transfert de mouvement par poulies",
      "Centro de gravedad bajo para mayor estabilidad": "Centre de gravité bas pour plus de stabilité",
      "Odometría con 2 dead wheels para localización en el mapa para la torreta":
        "Odométrie avec 2 dead wheels pour la localisation sur le terrain pour la tourelle",
      "Chasis con transmision por poleas para mayor presicion":
        "Châssis à transmission par poulies pour plus de précision",

      // —— Intake ——
      "Pivot intake de 3 fases con llantas mini mecanum, gecko y compliant.":
        "Intake pivot à 3 phases avec roues mini mecanum, gecko et compliant.",
      "Indexing Asimetrico": "Indexation asymétrique",
      "Motor": "Moteur",
      "Captura": "Capture",
      "Llantas mini mecanum que redireccionan el artifact sin embudos":
        "Roues mini mecanum qui redirigent l'artifact sans entonnoirs",
      "Espacio suficiente para solo manipular 3 artifacts": "Assez d'espace pour gérer exactement 3 artifacts",
      "Solo permite el ingreso, no se escapan los artifacts": "Entrée à sens unique : les artifacts ne s'échappent pas",

      // —— Shooter ——
      "Shooter de doble motor y con un volante de inercia incorporado":
        "Shooter à double moteur avec volant d'inertie intégré",
      "Flywheel de doble motor": "Flywheel à double moteur",
      "Control": "Contrôle",
      "Rango": "Portée",
      "Flywheel con control de velocidad para tiros desde las dos zonas":
        "Flywheel à contrôle de vitesse pour tirer depuis les deux zones",
      "Mantiene RPM objetivo antes de que el transfer alimente": "Maintient le RPM cible avant que le transfer n'alimente",
      "Doble motor para alcanzar las rpm que necesitamos sin saturar un solo motor":
        "Double moteur pour atteindre les RPM nécessaires sans surcharger un seul moteur",
      "Montado sobre la torreta para el aimbot": "Monté sur la tourelle pour l'aimbot",

      // —— Transfer ——
      "Indexa las piezas del intake al shooter de forma continua y controlada":
        "Indexe les pièces de l'intake vers le shooter de façon continue et contrôlée",
      "Canal 3D + gate servo": "Canal 3D + gate servo",
      "Cola": "File",
      "3 piezas": "3 pièces",
      "Compresión": "Compression",
      "3 mm constante": "3 mm constant",
      "Efectua la recolección gracias a una compresión adecuada":
        "Effectue la collecte grâce à une compression adéquate",
      "Mantiene una fila de 3 artifacts listos": "Maintient une file de 3 artifacts prêts",
      "Gate con forma de cuchara para controlar el flujo de artifacts":
        "Gate en forme de cuillère pour contrôler le flux d'artifacts",

      // —— Turret ——
      "Turret de seguimiento con auto-aim que apunta siempre al goal":
        "Tourelle de suivi avec auto-aim qui vise toujours le goal",
      "Feedback": "Retour",
      "Encoder de motor": "Encodeur moteur",
      "Apuntado": "Visée",
      "Auto-aim por odometría": "Auto-aim par odométrie",
      "Mantiene el shooter apuntado aunque el robot se mueva":
        "Garde le shooter visé même quand le robot bouge",
      "El driver solo conduce el drivetrain, la torreta apunta sola":
        "Le pilote conduit seulement le drivetrain ; la tourelle vise toute seule",
      "Auto-aim por odometría (Pinpoint + atan2 desde la pose)":
        "Auto-aim par odométrie (Pinpoint + atan2 depuis la pose)",
      "Engranes helicoidales de doble hélice para evitar backlash":
        "Engrenages à double hélice pour éviter le backlash",

      // —— Software ——
      "El cerebro de PURPLE SPIKE: odometría, auto-aim del turret, control de flywheel y máquinas de estado, todo programado con un LLM local como par-programador.":
        "Le cerveau de PURPLE SPIKE : odométrie, auto-aim de la tourelle, contrôle du flywheel et machines à états, le tout programmé avec un LLM local comme pair-programmeur.",
      "Odometría Pinpoint": "Odométrie Pinpoint",
      "Pose (x, y, θ) y velocidad cada loop con 2 dead-wheels + IMU.":
        "Pose (x, y, θ) et vitesse à chaque loop avec 2 dead-wheels + IMU.",
      "Auto-aim del turret": "Auto-aim de la tourelle",
      "Apunta solo al goal (atan2 + dual-PD + kS), sin input del piloto.":
        "Vise le goal tout seul (atan2 + dual-PD + kS), sans input du pilote.",
      "Flywheel PIDF ×2": "Flywheel PIDF ×2",
      "Velocidad de salida repetible; valida con el encoder más lento.":
        "Vitesse de sortie répétable ; validée par l'encodeur le plus lent.",
      "FSM de ciclo + ráfaga": "FSM de cycle + rafale",
      "Coordina intake/transfer/shooter y solo dispara a velocidad.":
        "Coordonne intake/transfer/shooter et ne tire qu'à vitesse.",
      "Par-programador con IA": "Pair-programmeur IA",
      "LLM 100% local: la IA ejecuta, nosotros ingenieamos.":
        "LLM 100% local : l'IA exécute, nous concevons.",
      "Mejoras planeadas": "Améliorations prévues",
      "LUT rango→TPS, gate de zona (G416) y Shoot On The Move.":
        "LUT portée→TPS, gate de zone (G416) et Shoot On The Move.",

      // —— Prototipos ——
      "Nuestros robots": "Nos robots",
      "Las 3 versiones mas importantes de Purple Spike. Gira cada modelo 3D para compararlos.":
        "Les 3 versions les plus importantes de Purple Spike. Tourne chaque modèle 3D pour les comparer.",
      "Versión actual | Niagara Premier Event": "Version actuelle | Niagara Premier Event",
      "Rutina consistente de 6 artifacts en teleop": "Routine teleop constante de 6 artifacts",
      "Chasis rápido y confiable": "Châssis rapide et fiable",
      "El intake absorbía los artifacts de forma suave y rápida":
        "L'intake absorbait les artifacts de façon douce et rapide",
      "Diseño de outtake ineficiente con tiros inconsistentes":
        "Conception d'outtake inefficace avec des tirs inconstants",
      "Sin autónomo": "Pas d'autonome",
      "Fallas del PLA en componentes de transmisión impresos en 3D: el calor por fricción de los motores comprometía la integridad estructural":
        "Défaillances du PLA dans les composants de transmission imprimés en 3D : la chaleur de friction des moteurs compromettait l'intégrité structurelle",
      "Drivetrain robusto de placas paralelas movido por bandas, con placas maquinadas en CNC por nosotros":
        "Drivetrain robuste à plaques parallèles entraîné par courroies, avec plaques usinées en CNC par nous",
      "Primera rutina autónoma, anotando 9 piezas": "Première routine autonome, marquant 9 pièces",
      "Mayor consistencia e implementación de un controlador PID para regular con precisión la velocidad del shooter":
        "Plus de constance et un contrôleur PID pour réguler précisément la vitesse du shooter",
      "Ciclos lentos": "Cycles lents",
      "Problemas con las compresiones del intake y el shooter":
        "Problèmes avec les compressions de l'intake et du shooter",
      "Nuevo intake que toma 3 artifacts a la vez": "Nouvel intake qui prend 3 artifacts à la fois",
      "Nuevo chasis por bandas con una reducción para hacerlo más rápido":
        "Nouveau châssis à courroies avec une réduction pour le rendre plus rapide",
      "Turret para optimizar los ciclos": "Tourelle pour optimiser les cycles",
      "2 motores en el shooter para mayor consistencia": "2 moteurs dans le shooter pour plus de constance",
      "Optimización del intake para el ciclo del gate": "Optimisation de l'intake pour le cycle du gate",
      "Tolerancias flojas en las placas para los press-fits de baleros":
        "Tolérances lâches des plaques pour les press-fits de roulements",
      "Fricción extra entre las ruedas del outtake y las placas":
        "Friction supplémentaire entre les roues de l'outtake et les plaques",
    },
  };

  // Traduce un texto al idioma activo (o lo deja igual si no hay traducción).
  function t(s) {
    if (lang === "es" || typeof s !== "string") return s;
    return (DICT[lang] && DICT[lang][s]) || s;
  }

  // Traduce recursivamente todos los strings de un objeto (ej. window.BINDER).
  // Las rutas, colores, iconos, etc. no están en DICT → se quedan igual.
  function tData(obj) {
    if (typeof obj === "string") return t(obj);
    if (Array.isArray(obj)) return obj.map(tData);
    if (obj && typeof obj === "object") {
      var o = {};
      for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) o[k] = tData(obj[k]);
      return o;
    }
    return obj;
  }

  // Traduce los textos estáticos del HTML (atributo data-i18n y data-i18n-ph).
  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
  }

  function markActive(l) {
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === l);
    });
  }

  // Exponer para main.js / chat.js.
  window.t = t;
  window.tData = tData;
  window.I18N = { lang: lang };

  document.addEventListener("DOMContentLoaded", function () {
    applyStatic();
    markActive(lang);
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.dataset.lang === lang) return;
        localStorage.setItem("lang", b.dataset.lang);
        location.reload(); // recarga en el nuevo idioma (3D limpio)
      });
    });
  });
})();
