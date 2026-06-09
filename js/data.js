/* ════════════════════════════════════════════════════════════════════════
   CONTENIDO EDITABLE DEL BINDER  ·  EDITA SOLO ESTE ARCHIVO
   ------------------------------------------------------------------------
   Aquí cambias tu equipo, subsistemas, prototipos, etc. El resto de los .js
   leen estos datos y arman la página sola. No necesitas tocar el HTML.
   ════════════════════════════════════════════════════════════════════════ */
window.BINDER = {
  /* ---- Identidad del equipo ---- */
  team: {
    number: 17626,
    name: "Aztech II",
    robotName: "PURPLE SPIKE",
    season: 2026,
    game: "DECODE",
    tagline: "Built to ride the surge.",
    location: "CDMX,MX",
    // Paleta Aztech II — morado de marca. Solo negros, blancos y morados.
    primary: "#8f00ff", // morado principal (firma del equipo)
    accent: "#a361ff", // morado de acento (glow, bordes, links)
    youtubeId: "QDia3e12czc", // ID del video de reveal (botón "Ver reveal")
    socials: {
      instagram: "https://www.instagram.com/aztech_2_17626/" ,
      website: "https://team4414.com",
    },
  },

  /* ---- Modelo 3D del hero ----
     .gltf: sube robot.gltf + su .bin + texturas a assets/cad/ (todos juntos).
     .glb : un solo archivo en assets/cad/robot.glb (cambia la ruta abajo). */
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
      summary: "Chasis mecanum con transmision de movimiento por poleas y motores Yellow Jacket",
      image: "assets/subsystems/drivetrain.jpg",
      // Modelo 3D interactivo para ESTE subsistema (en vez de la imagen).
      // Borra esta línea si prefieres mostrar la imagen de arriba.
      model3d: "assets/cad/robot.glb",
      // Corrige la orientación del modelo (en GRADOS). Si sale al revés/de lado,
      // ajusta estos valores: prueba x:180, x:-90, x:90 o z:180 hasta que quede.
      model3dRotation: { x: -90, y: 0, z: 0 },
      specs: [
        { label: "Tipo", value: "Mecanum Custom" },
        { label: "Motores", value: "4x goBILDA 5203 (415 RPM)" },
        { label: "Odometría", value: "2 dead wheels + IMU" },
      ],
      features: [
        {
          text: "Drivetrain mecanum con transferencia de movimiento por poleas",
          sub: ["Centro de gravedad bajo para mayor estabilidad"],
        },
        { text: "Odometría con 2 dead wheels para localización en el mapa para la torreta" },
        { text: "Chasis con transmision por poleas para mayor presicion" },
      ],
    },
    {
      id: "intake",
      title: "Intake",
      icon: "download",
      summary: "Pivot intake de 3 fases con llantas mini mecanum, gecko y compliant.",
      image: "assets/subsystems/intake.jpg",
      model3d: "assets/cad/intake.glb",
      model3dRotation: { x: 0, y: 90, z: 0 },
      specs: [
        { label: "Tipo", value: "Indexing Asimetrico" },
        { label: "Motor", value: "Rev HD Hex Motor" },
        { label: "Captura", value: "< 0.5s" },
      ],
      features: [
        {
          text: "Llantas mini mecanum que redireccionan el artifact sin embudos",
          sub: ["Espacio suficiente para solo manipular 3 artifacts"],
        },
        { text: "Solo permite el ingreso, no se escapan los artifacts" },
      ],
    },
    {
      id: "shooter",
      title: "Shooter",
      icon: "target",
      summary: "Shooter de doble motor y con un volante de inercia incorporado",
      image: "assets/subsystems/shooter.jpg",
      model3d: "assets/cad/shooter.glb",
      model3dRotation: { x: -90, y: 0, z: 0 },
      specs: [
        { label: "Tipo", value: "Doble flywheel" },
        { label: "Control", value: "Velocity PIDF" },
        { label: "Rango", value: "1 - 4 m" },
      ],
      features: [
        {
          text: "Flywheel con control de velocidad para tiros desde las dos zonas",
          sub: ["Mantiene RPM objetivo antes de que el transfer alimente"],
        },
        { text: "Doble motor para alcanzar las rpm que necesitamos sin saturar un solo motor" },
        { text: "Montado sobre la torreta para el aimbot" },
      ],
    },
    {
      id: "transfer",
      title: "Transfer",
      icon: "arrow-left-right",
      summary: "Indexa las piezas del intake al shooter de forma continua y controlada",
      image: "assets/subsystems/transfer.jpg",
      model3d: "assets/cad/transfer.glb",
      model3dRotation: { x: -90, y: 0, z: 0 },
      specs: [
        { label: "Tipo", value: "Banda + indexador" },
        { label: "Cola", value: "3 piezas" },
        { label: "Sensores", value: "2x beam break" },
      ],
      features: [
        {
          text: "Efectua la recolección gracias a una compresión adecuada",
          sub: ["Mantiene una fila de 3 artifacts listos"],
        },
        { text: "Gate con forma de cuchara para controlar el flujo de artifacts" },
      ],
    },
    {
      id: "turret",
      title: "Turret",
      icon: "crosshair",
      summary: "Direct drive turret con auto aiming que apunta siempre al goal",
      image: "assets/subsystems/turret.jpg",
      model3d: "assets/cad/turret.glb",
      model3dRotation: { x: -90, y: 0, z: 0 },
      specs: [
        { label: "Rango", value: "±150°" },
        { label: "Feedback", value: "Encoder absoluto" },
        { label: "Apuntado", value: "Auto-aim por odometría" },
      ],
      features: [
        {
          text: "Mantiene el shooter apuntado aunque el robot se mueva",
          sub: ["El driver solo conduce el drivetrain, la torreta apunta sola"],
        },
        { text: "Auto-aim por odometría (Pinpoint + atan2 desde la pose)" },
        { text: "Engranes helicoidales de doble hélice para evitar backlash" },
      ],
    },
  ],

  /* ---- SOFTWARE (categoría Software) ---- */
  software: {
    id: "software",
    title: "Software",
    summary:
      "El cerebro de PURPLE SPIKE: odometría, auto-aim del turret, control de flywheel y máquinas de estado, todo programado con un LLM local como par-programador.",
    image: "assets/software/control.png",
    // Cuadritos compactos (título + 1 línea). Solo lo más importante.
    components: [
      {
        title: "Odometría Pinpoint",
        desc: "Pose (x, y, θ) y velocidad cada loop con 2 dead-wheels + IMU.",
      },
      {
        title: "Auto-aim del turret",
        desc: "Apunta solo al goal (atan2 + dual-PD + kS), sin input del piloto.",
      },
      {
        title: "Flywheel PIDF ×2",
        desc: "Velocidad de salida repetible; valida con el encoder más lento.",
      },
      {
        title: "FSM de ciclo + ráfaga",
        desc: "Coordina intake/transfer/shooter y solo dispara a velocidad.",
      },
      {
        title: "Par-programador con IA",
        desc: "LLM 100% local: la IA ejecuta, nosotros ingenieamos.",
      },
      {
        title: "Mejoras planeadas",
        desc: "LUT rango→TPS, gate de zona (G416) y Shoot On The Move.",
      },
    ],
  },

  /* ---- PROTOTIPOS (categoría Prototipos) ----
     Comparación antes/después entre dos eventos (slider). */
  prototyping: [
    {
      id: "mexico-vs-niagara",
      title: "Our Robots",
      summary:
        "Las 3 versiones mas importantes de Purple Spike. Gira cada modelo 3D para compararlos.",
      // Rotación de corrección aplicada a TODOS los modelos 3D.
      model3dRotation: { x: -90, y: 0, z: 0 },
      // Cada versión: etiqueta, modelo 3D (o null = recuadro "próximamente"),
      // y sus listas de strengths/weaknesses.
      versions: [
        {
          label: "V1 | Cuautitlan Regional",
          model3d: null, // sube assets/cad/cuautitlan.glb cuando lo tengas
          strengths: [
            "Rutina de teleop consistente de 6 artifacts",
            "Chasis rápido y confiable",
            "El intake absorbía los artifacts de forma suave y rápida",
          ],
          weaknesses: [
            "Diseño de outtake ineficiente con tiros inconsistentes",
            "Sin autónomo",
            "Fallas del PLA en componentes de transmisión impresos en 3D: el calor por fricción de los motores comprometía la integridad estructural",
          ],
        },
        {
          label: "V2 | Mexico Championship",
          model3d: "assets/cad/mexico.glb",
          strengths: [
            "Drivetrain robusto de placas paralelas movido por bandas, con placas maquinadas en CNC por nosotros",
            "Primera rutina autónoma, anotando 9 piezas",
            "Mayor consistencia e implementación de un controlador PID para regular con precisión la velocidad del shooter",
          ],
          weaknesses: ["Ciclos lentos", "Problemas con las compresiones del intake y el shooter"],
        },
        {
          label: "Versión actual | Niagara Premier Event",
          model3d: "assets/cad/niagara.glb",
          strengths: [
            "Nuevo intake que toma 3 artifacts a la vez",
            "Nuevo chasis por bandas con una reducción para hacerlo más rápido",
            "Turret para optimizar los ciclos",
            "2 motores en el shooter para mayor consistencia",
            "Optimización del intake para el ciclo del gate",
          ],
          weaknesses: [
            "Tolerancias flojas en las placas para los press-fits de baleros",
            "Fricción extra entre las ruedas del outtake y las placas",
          ],
        },
      ],
    },
  ],
};
