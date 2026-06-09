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
        { label: "Tipo", value: "Flywheel simple" },//dATO
        { label: "Control", value: "Velocity PIDF" },//DATO
        { label: "Rango", value: "1 - 4 m" },//DATO
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
        { label: "Apuntado", value: "Auto-aim AprilTags" },
      ],
      features: [
        {
          text: "Mantiene el shooter apuntado aunque el robot se mueva",
          sub: ["El driver solo conduce el drivetrain, la torreta apunta sola"],
        },
        { text: "Auto-aim con AprilTags + odometría" },
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
    image: "assets/software/scouting.png",
    features: [
      {
        text: "Odometría Pinpoint + Pedro: conoce la pose (x, y, θ) y la velocidad del robot en el campo",
        sub: [
          "goBILDA Pinpoint fusiona 2 dead-wheels en un pod de 4 barras con IMU; sin esto no existe el auto-aim ni la lógica de zonas",
        ],
      },
      {
        text: "Auto-aim del turret: el lanzador apunta solo al goal aunque el chasis se mueva o gire, sin input del piloto",
        sub: [
          "Calcula el azimut con atan2 desde la pose y lo sigue con un controlador dual-PD + feedforward de fricción estática (kS)",
        ],
      },
      {
        text: "Control de velocidad de los 2 flywheels (PIDF) para una salida repetible pese a la caída de RPM al disparar",
        sub: [
          "2 DcMotorEx en lazo de velocidad: feedforward F·target + trim proporcional P·e, validado por el encoder más lento (lectura conservadora de 'listo')",
        ],
      },
      {
        text: "Servo de compuerta + FSM de ráfaga: solo libera el ARTIFACT cuando el flywheel está a velocidad (evita tiros débiles y atascos)",
        sub: ["Máquina de estados IDLE → OPENING → BURSTING → DONE, sincronizada con la alimentación del intake"],
      },
      {
        text: "FSM de ciclo (IDLE / COLLECTING / SHOOTING / OUTTAKE) que coordina intake, transfer y shooter",
        sub: [
          "Recolecta los artifacts en horizontal para ciclos más rápidos",
          "Detecta 'lleno' por timeout para encadenar el tiro en autónomo",
        ],
      },
      {
        text: "LUT rango → TPS (planeado): elige la velocidad correcta por distancia sin resolver aerodinámica en tiempo real",
        sub: ["Interpola linealmente entre puntos de calibración medidos en el campo"],
      },
      {
        text: "Gate de zona de lanzamiento (planeado): bloquea el disparo fuera de las 2 launch zones (regla G416) usando solo la pose",
        sub: ["Modelo de funciones (GeoGebra) de ambas zonas; inZone(x, y) habilita o bloquea triggerShoot()"],
      },
      {
        text: "Shoot On The Move — SOTM (planeado): acierta al goal en movimiento compensando la velocidad que hereda el ARTIFACT",
        sub: ["Objetivo virtual G' = G − v·t_f con iteración de punto fijo; re-consulta azimut y LUT sobre G'"],
      },
      {
        text: "Par-programador con IA: corremos un LLM 100% local en las laptops del equipo para cerrar la brecha entre entender y programar",
        sub: [
          "Programadores de 13–14 años: 'la IA ejecuta, nosotros ingenieamos' — sabemos qué necesitamos, por qué y cómo verificar que funciona",
        ],
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
            "Consistently achieving a 6 artifact autonomous routine",
            "Fast and reliable chassis",
            "The intake absorbed artifacts smoothly and quickly",
          ],
          weaknesses: [
            "Inefficient outtake design with inconsistent shots",
            "No autonomous",
            "PLA material failures in 3D-printed power transmission components, combined with frictional heat from the motors, compromised structural integrity",
          ],
        },
        {
          label: "V2 | Mexico Championship",
          model3d: "assets/cad/mexico.glb",
          strengths: [
            "A robust parallel plate drivetrain driven by belts, featuring our in-house CNC-machined plates",
            "First autonomous routine, scoring 9 game pieces",
            "Improved consistency and implemented a PID controller for precise shooter speed regulation",
          ],
          weaknesses: ["Slow cycles", "Problems with intake and shooter compressions"],
        },
        {
          label: "Actual Version | Niagara Premier Event",
          model3d: "assets/cad/niagara.glb",
          strengths: [
            "New intake that can take 3 at a time",
            "New band chassis with a reduction to make it faster",
            "Turret to optimize the cycles",
            "2 motors in the shooter to make it more consistent",
            "Intake optimization for gate cycling",
          ],
          weaknesses: [
            "Loose plate tolerances for bearing press-fits",
            "Friction overhead between outtake wheels and plates",
          ],
        },
      ],
    },
  ],
};
