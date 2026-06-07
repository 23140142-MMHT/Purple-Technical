/* ════════════════════════════════════════════════════════════════════════
   CONTENIDO EDITABLE DEL BINDER  ·  EDITA SOLO ESTE ARCHIVO
   ------------------------------------------------------------------------
   Aquí cambias tu equipo, subsistemas, prototipos, etc. El resto de los .js
   leen estos datos y arman la página sola. No necesitas tocar el HTML.
   ════════════════════════════════════════════════════════════════════════ */
window.BINDER = {
  /* ---- Identidad del equipo ---- */
  team: {
    number: 4414,
    name: "HighTide",
    robotName: "RIPCURRENT",
    season: 2026,
    game: "REBUILT",
    tagline: "Built to ride the surge.",
    location: "Ventura, CA",
    // Paleta Aztech II — morado de marca. Solo negros, blancos y morados.
    primary: "#8f00ff", // morado principal (firma del equipo)
    accent: "#a361ff", // morado de acento (glow, bordes, links)
    youtubeId: "9VpVZiApRFw", // por si quieres un video en vez del 3D
    socials: {
      instagram: "https://instagram.com/team4414",
      youtube: "https://youtube.com/@team4414",
      github: "https://github.com/team4414",
      website: "https://team4414.com",
    },
  },

  /* ---- Modelo 3D del hero (ponlo en assets/cad/robot.glb) ---- */
  cadModelPath: "assets/cad/robot.glb",

  /* ---- Endpoint del chat (la función serverless). Cámbialo al desplegar. ----
     En local sin backend, el chat responde un mensaje de "no configurado". */
  chatEndpoint: "/api/chat",

  /* ---- SUBSISTEMAS (categoría Mecánico) ----
     Cada uno: imagen a la izquierda + info a la derecha (estilo 4414).
     'image' debe incluir el bumper visible para dar escala. */
  subsystems: [
    {
      id: "drivetrain",
      title: "Drivetrain",
      icon: "cog",
      summary: "Base mecanum de alta tracción con motores goBILDA Yellow Jacket.",
      image: "assets/subsystems/drivetrain.jpg",
      specs: [
        { label: "Tipo", value: "Mecanum" },
        { label: "Motores", value: "4x goBILDA 5203 (312 RPM)" },
        { label: "Odometría", value: "2 dead wheels + IMU" },
      ],
      features: [
        {
          text: "Base mecanum para movilidad omnidireccional",
          sub: ["Alinea el turret sin reorientar todo el robot"],
        },
        { text: "Odometría con 2 dead wheels para localización en el auto" },
        { text: "Chasis modular goBILDA para mantenimiento rápido en pits" },
      ],
    },
    {
      id: "intake",
      title: "Intake",
      icon: "download",
      summary: "Intake de rodillos compliant que recoge piezas y las envía al transfer.",
      image: "assets/subsystems/intake.jpg",
      specs: [
        { label: "Tipo", value: "Rodillo over-the-bumper" },
        { label: "Motor", value: "goBILDA 5203 (1150 RPM)" },
        { label: "Captura", value: "< 0.5s" },
      ],
      features: [
        {
          text: "Rodillos compliant que recogen la pieza en cualquier orientación",
          sub: ["Montaje over-the-bumper para máximo ancho de captura"],
        },
        { text: "Sensor de color/distancia para indexado automático" },
      ],
    },
    {
      id: "shooter",
      title: "Shooter",
      icon: "target",
      summary: "Shooter de flywheel con velocidad ajustable, montado sobre el turret.",
      image: "assets/subsystems/shooter.jpg",
      specs: [
        { label: "Tipo", value: "Flywheel simple" },
        { label: "Control", value: "Velocity PIDF" },
        { label: "Rango", value: "1 - 4 m" },
      ],
      features: [
        {
          text: "Flywheel con control de velocidad para tiros consistentes",
          sub: ["Mantiene RPM objetivo antes de que el transfer alimente"],
        },
        { text: "Montado sobre el turret para apuntar sin mover la base" },
        { text: "Velocidad por distancia (lookup table por visión)" },
      ],
    },
    {
      id: "transfer",
      title: "Transfer",
      icon: "arrow-left-right",
      summary: "Indexa las piezas del intake al shooter de forma controlada.",
      image: "assets/subsystems/transfer.jpg",
      specs: [
        { label: "Tipo", value: "Banda + indexador" },
        { label: "Cola", value: "3 piezas" },
        { label: "Sensores", value: "2x beam break" },
      ],
      features: [
        {
          text: "Desacopla la recolección del disparo para cadencia constante",
          sub: ["Mantiene una cola de hasta 3 piezas lista"],
        },
        { text: "Dos beam breaks para contar piezas y evitar disparos en vacío" },
      ],
    },
    {
      id: "turret",
      title: "Turret",
      icon: "crosshair",
      summary: "Turret rotativo que mantiene el shooter apuntando al objetivo.",
      image: "assets/subsystems/turret.jpg",
      specs: [
        { label: "Rango", value: "±150°" },
        { label: "Feedback", value: "Encoder absoluto" },
        { label: "Apuntado", value: "Auto-aim AprilTags" },
      ],
      features: [
        {
          text: "Mantiene el shooter apuntado aunque el robot se mueva",
          sub: ["El piloto solo conduce; el turret apunta solo"],
        },
        { text: "Auto-aim con AprilTags + odometría" },
        { text: "Encoder absoluto: sin homing al inicio del partido" },
      ],
    },
  ],

  /* ---- SOFTWARE (categoría Software) ---- */
  software: {
    id: "software",
    title: "Software",
    summary:
      "Autónomo, visión con AprilTags y app de scouting. El cerebro del auto-aim.",
    image: "assets/software/scouting.png",
    features: [
      {
        text: "Auto-aim del turret combinando AprilTags + odometría",
        sub: ["El shooter se mantiene apuntado mientras el robot se mueve"],
      },
      { text: "Rutas autónomas modulares seleccionables desde el dashboard" },
      { text: "App de scouting offline-first para selección de alianzas" },
    ],
  },

  /* ---- PROTOTIPOS (categoría Prototipos) ----
     Comparación antes/después entre dos eventos (slider). */
  prototyping: [
    {
      id: "mexico-vs-niagara",
      title: "Mexico Championship vs Niagara Premiere",
      summary:
        "Cómo evolucionó el robot entre ambos eventos. Arrastra el control para comparar.",
      beforeImage: "assets/prototyping/mexico.jpg",
      afterImage: "assets/prototyping/niagara.jpg",
      beforeLabel: "Mexico Championship",
      afterLabel: "Niagara Premiere",
      features: [
        {
          text: "Rediseño del transfer para eliminar atascos vistos en México",
          sub: ["Cola de 2 → 3 piezas y guías 3D nuevas"],
        },
        { text: "Turret con encoder absoluto (antes relativo con homing)" },
        { text: "Auto-aim afinado: +15% de precisión a media distancia" },
      ],
    },
  ],
};
