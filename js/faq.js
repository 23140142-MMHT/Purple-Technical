/* ════════════════════════════════════════════════════════════════════════
   faq.js — Preguntas pre-hechas del chatbot (NO usa IA / API key).
   Organizadas por sección, en formato pregunta → respuesta, trilingüe.
   Editar: agrega/quita secciones o items. Cada texto tiene {es,en,fr}.
   ════════════════════════════════════════════════════════════════════════ */
window.FAQ = [
  {
    section: { es: "Estrategia de juego", en: "Game strategy", fr: "Stratégie de jeu" },
    items: [
      {
        q: {
          es: "¿Cuál es su estrategia de juego?",
          en: "What's your game strategy?",
          fr: "Quelle est votre stratégie de jeu ?",
        },
        a: {
          es: "En autónomo logramos 21 artifacts clasificados con una rutina secuenciada para minimizar tiempo muerto. En teleop hacemos 27 ciclos de 4-5 s gracias al “gate recycling”: el robot se posiciona en diagonal contra el perímetro para embudar las piezas, y el intake toma 3 artifacts a la vez.",
          en: "In autonomous we score 21 classified artifacts with a sequence engineered to minimize dead time. In teleop we run 27 cycles at 4–5 s each thanks to “gate recycling”: the robot sits diagonally against the perimeter to funnel pieces, and the intake grabs 3 artifacts at a time.",
          fr: "En autonome nous classons 21 artifacts avec une séquence conçue pour minimiser le temps mort. En teleop nous réalisons 27 cycles de 4–5 s grâce au « gate recycling » : le robot se place en diagonale contre le périmètre pour canaliser les pièces, et l'intake prend 3 artifacts à la fois.",
        },
      },
      {
        q: {
          es: "¿Qué hace su rutina autónoma?",
          en: "What does your autonomous do?",
          fr: "Que fait votre routine autonome ?",
        },
        a: {
          es: "Está diseñada para máxima consistencia: dispara 3 artifacts precargados, sale de la launch zone y completa ciclos de gate recycling para un total de 21 artifacts antes del teleop.",
          en: "It's built for maximum consistency: it launches 3 preloaded artifacts, exits the launch zone, and completes gate-recycling cycles for a total of 21 artifacts before teleop.",
          fr: "Elle est conçue pour une consistance maximale : elle lance 3 artifacts préchargés, sort de la launch zone et enchaîne des cycles de gate recycling pour un total de 21 artifacts avant le teleop.",
        },
      },
    ],
  },
  {
    section: { es: "Drivetrain", en: "Drivetrain", fr: "Drivetrain" },
    items: [
      {
        q: {
          es: "¿Qué tipo de drivetrain usan?",
          en: "What kind of drivetrain do you use?",
          fr: "Quel type de drivetrain utilisez-vous ?",
        },
        a: {
          es: "Un chasis mecanum de 4 motores y 4 ruedas con reducción por poleas. Usa 4 motores goBILDA de 435 RPM con relación de poleas 32T:26T, llegando a ~535 RPM en el chasis para ciclos rápidos.",
          en: "A 4-motor, 4-wheel mecanum chassis with pulley reduction. It uses 4 goBILDA 435 RPM motors with a 32T:26T pulley ratio, reaching ~535 RPM at the chassis for fast cycles.",
          fr: "Un châssis mecanum à 4 moteurs et 4 roues avec réduction par poulies. Il utilise 4 moteurs goBILDA de 435 RPM avec un rapport de poulies 32T:26T, atteignant ~535 RPM au châssis pour des cycles rapides.",
        },
      },
      {
        q: {
          es: "¿Por qué un chasis modular?",
          en: "Why a modular chassis?",
          fr: "Pourquoi un châssis modulaire ?",
        },
        a: {
          es: "Cada mecanismo se monta directo a la base por una interfaz estándar de 8-9 tornillos, permitiendo mantenimiento independiente sin desarmar todo. El layout diagonal de motores deja el ancho justo para 3 artifacts.",
          en: "Every mechanism mounts directly to the base via a standard 8–9 screw interface, allowing independent, teardown-free maintenance. The diagonal motor layout keeps the width just right for 3 artifacts.",
          fr: "Chaque mécanisme se monte directement sur la base via une interface standard de 8–9 vis, permettant une maintenance indépendante sans tout démonter. La disposition diagonale des moteurs garde la largeur juste pour 3 artifacts.",
        },
      },
    ],
  },
  {
    section: { es: "Intake", en: "Intake", fr: "Intake" },
    items: [
      {
        q: {
          es: "¿Cómo funciona el intake?",
          en: "How does the intake work?",
          fr: "Comment fonctionne l'intake ?",
        },
        a: {
          es: "Es un pivot intake de 15.8\" y 3 fases con ruedas mini mecanum (compliant + gecko + mecanum). El pivot ajusta la compresión de 4 mm a 0.5 mm para evitar atascos por torque, y nuestra “Asymmetric Indexing” guía la pieza sin embudos.",
          en: "It's a 15.8\", 3-stage pivot intake with mini mecanum wheels (compliant + gecko + mecanum). The pivot adjusts compression from 4 mm to 0.5 mm to prevent torque stalls, and our “Asymmetric Indexing” guides the piece without funnels.",
          fr: "C'est un intake pivot de 15,8\" à 3 phases avec roues mini mecanum (compliant + gecko + mecanum). Le pivot ajuste la compression de 4 mm à 0,5 mm pour éviter les blocages de couple, et notre « Asymmetric Indexing » guide la pièce sans entonnoirs.",
        },
      },
      {
        q: {
          es: "¿Cómo se alinean tan rápido?",
          en: "How do you align so fast?",
          fr: "Comment vous alignez-vous si vite ?",
        },
        a: {
          es: "Con una placa de auto-alineación pasiva que traba el robot a 57° contra el gate. Elimina el tiempo que el piloto perdía posicionando y garantiza un intake de ~1 segundo idéntico cada vez.",
          en: "With a passive self-alignment plate that locks the robot at 57° against the gate. It eliminates the time the driver lost positioning and guarantees an identical ~1-second intake every time.",
          fr: "Avec une plaque d'auto-alignement passive qui verrouille le robot à 57° contre le gate. Elle élimine le temps perdu par le pilote à se positionner et garantit un intake de ~1 seconde identique à chaque fois.",
        },
      },
    ],
  },
  {
    section: { es: "Shooter", en: "Shooter", fr: "Shooter" },
    items: [
      {
        q: {
          es: "¿Cómo es el shooter?",
          en: "What's the shooter like?",
          fr: "Comment est le shooter ?",
        },
        a: {
          es: "Un flywheel de masa inercial con doble motor: dos motores REV de 6000 RPM sincronizados por bandas y poleas (sin backlash). Engranes FRC de alta masa actúan como contrapeso inercial para mantener RPM estable bajo compresión.",
          en: "An inertial-mass dual-motor flywheel: two synchronized 6000 RPM REV motors driven by belts and pulleys (zero backlash). High-mass FRC gears act as an inertial counterweight to keep RPM stable under compression.",
          fr: "Un flywheel à masse inertielle et double moteur : deux moteurs REV de 6000 RPM synchronisés par courroies et poulies (sans backlash). Des engrenages FRC de grande masse servent de contrepoids inertiel pour garder un RPM stable sous compression.",
        },
      },
      {
        q: {
          es: "¿Por qué dos motores?",
          en: "Why two motors?",
          fr: "Pourquoi deux moteurs ?",
        },
        a: {
          es: "Para recuperar velocidad al instante y disparar en ráfaga sin caídas de RPM. El control PIDF valida con el encoder más lento, así solo dispara cuando ambas ruedas están a velocidad.",
          en: "To recover speed instantly and rapid-fire without RPM drops. The PIDF control validates with the slower encoder, so it only fires when both wheels are at speed.",
          fr: "Pour récupérer la vitesse instantanément et tirer en rafale sans chute de RPM. Le contrôle PIDF valide avec l'encodeur le plus lent, donc il ne tire que lorsque les deux roues sont à vitesse.",
        },
      },
    ],
  },
  {
    section: { es: "Turret", en: "Turret", fr: "Tourelle" },
    items: [
      {
        q: {
          es: "¿Cómo apunta el turret?",
          en: "How does the turret aim?",
          fr: "Comment vise la tourelle ?",
        },
        a: {
          es: "Se apunta solo al goal calculando el azimut con atan2 desde la pose del robot, y lo sigue con un controlador dual-PD + feedforward de fricción estática (kS). Así el piloto solo conduce y la torreta apunta sola, aunque el robot se mueva.",
          en: "It aims at the goal by itself, computing azimuth with atan2 from the robot's pose, and tracks it with a dual-PD controller + static-friction feedforward (kS). The driver just drives and the turret aims itself, even while the robot moves.",
          fr: "Elle vise le goal toute seule en calculant l'azimut avec atan2 depuis la pose du robot, et le suit avec un contrôleur dual-PD + feedforward de friction statique (kS). Le pilote conduit seulement et la tourelle vise toute seule, même quand le robot bouge.",
        },
      },
      {
        q: {
          es: "¿Por qué engranes de doble hélice?",
          en: "Why double-helix gears?",
          fr: "Pourquoi des engrenages à double hélice ?",
        },
        a: {
          es: "Los engranes rectos generaban backlash, deslizamiento y vibración. Imprimimos engranes de doble hélice (herringbone) cuyos dientes en ángulo se traban y eliminan el juego, con una reducción 1.95:1 (58T:113T) para apuntado preciso.",
          en: "Straight spur gears caused backlash, slippage and vibration. We 3D-printed double-helix (herringbone) gears whose angled teeth interlock and eliminate play, with a 1.95:1 reduction (58T:113T) for precise aiming.",
          fr: "Les engrenages droits causaient backlash, glissement et vibrations. Nous avons imprimé des engrenages à double hélice (herringbone) dont les dents inclinées s'emboîtent et éliminent le jeu, avec une réduction 1,95:1 (58T:113T) pour une visée précise.",
        },
      },
    ],
  },
  {
    section: { es: "Transfer", en: "Transfer", fr: "Transfer" },
    items: [
      {
        q: {
          es: "¿Qué hace el transfer?",
          en: "What does the transfer do?",
          fr: "Que fait le transfer ?",
        },
        a: {
          es: "Lleva los artifacts del intake al shooter con una pieza 3D rígida que mantiene compresión constante de 3 mm para flujo continuo sin atascos. Un gate de servo (Swift) regula la cadencia de alimentación y evita disparos accidentales.",
          en: "It moves artifacts from the intake to the shooter with a rigid 3D-printed piece that holds a constant 3 mm compression for continuous, jam-free flow. A servo gate (Swift) regulates the feed cadence and prevents accidental shots.",
          fr: "Il amène les artifacts de l'intake au shooter avec une pièce 3D rigide qui maintient une compression constante de 3 mm pour un flux continu sans blocage. Un gate à servo (Swift) régule la cadence d'alimentation et évite les tirs accidentels.",
        },
      },
    ],
  },
  {
    section: { es: "Software / Control", en: "Software / Control", fr: "Logiciel / Contrôle" },
    items: [
      {
        q: {
          es: "¿Cómo programaron el robot?",
          en: "How did you program the robot?",
          fr: "Comment avez-vous programmé le robot ?",
        },
        a: {
          es: "Toda la lógica se apoya en odometría Pinpoint + Pedro (pose y velocidad cada loop). Sobre eso corre el auto-aim del turret, el control PIDF del flywheel y máquinas de estado para el ciclo. Lo desarrollamos con un LLM 100% local como par-programador: “la IA ejecuta, nosotros ingenieamos”.",
          en: "All the logic builds on Pinpoint + Pedro odometry (pose and velocity every loop). On top runs the turret auto-aim, the flywheel PIDF control and state machines for the cycle. We built it with a 100% local LLM as a pair-programmer: “the AI executes, we engineer”.",
          fr: "Toute la logique repose sur l'odométrie Pinpoint + Pedro (pose et vitesse à chaque loop). Par-dessus tournent l'auto-aim de la tourelle, le contrôle PIDF du flywheel et des machines à états pour le cycle. Nous l'avons développé avec un LLM 100% local comme pair-programmeur : « l'IA exécute, nous concevons ».",
        },
      },
      {
        q: {
          es: "¿Qué mejoras de software vienen?",
          en: "What software improvements are coming?",
          fr: "Quelles améliorations logicielles arrivent ?",
        },
        a: {
          es: "Tres planeadas: una LUT rango→TPS para elegir la velocidad por distancia, un gate de zona de lanzamiento que bloquea tiros fuera de la launch zone (regla G416) usando solo la pose, y Shoot On The Move (SOTM) con objetivo virtual para tirar en movimiento.",
          en: "Three planned: a LUT range→TPS to pick velocity by distance, a launch-zone gate that blocks shots outside the launch zone (rule G416) using only the pose, and Shoot On The Move (SOTM) with a virtual target to fire while moving.",
          fr: "Trois prévues : une LUT portée→TPS pour choisir la vitesse selon la distance, un gate de zone de lancement qui bloque les tirs hors de la launch zone (règle G416) en utilisant seulement la pose, et Shoot On The Move (SOTM) avec cible virtuelle pour tirer en mouvement.",
        },
      },
    ],
  },
  {
    section: { es: "Equipo", en: "Team", fr: "Équipe" },
    items: [
      {
        q: {
          es: "¿Quiénes son Aztech II?",
          en: "Who is Aztech II?",
          fr: "Qui est Aztech II ?",
        },
        a: {
          es: "Somos el equipo FTC 17626 de la CDMX. Nuestra misión es usar la tecnología para impulsar cambio social en México e inspirar líderes en STEM. Nuestro plan de sustentabilidad, el “Ciclo del Guerrero Azteca” (FTC→FRC→Mentores), nos asegura mentores cada año.",
          en: "We are FTC team 17626 from Mexico City. Our mission is to use technology to drive social change in Mexico and inspire STEM leaders. Our sustainability plan, the “Azteca Warrior Cycle” (FTC→FRC→Mentors), ensures we always have mentors.",
          fr: "Nous sommes l'équipe FTC 17626 de Mexico. Notre mission est d'utiliser la technologie pour générer un changement social au Mexique et inspirer des leaders STEM. Notre plan de durabilité, le « Cycle du Guerrier Aztèque » (FTC→FRC→Mentors), nous assure des mentors chaque année.",
        },
      },
      {
        q: {
          es: "¿Qué hacen de outreach?",
          en: "What outreach do you do?",
          fr: "Que faites-vous comme outreach ?",
        },
        a: {
          es: "Llegamos a +775 personas con talleres “Make & Take”, plantamos +8,000 árboles (compensando +100 ton de CO₂ con Blue Switch), y lideramos la Aztech Alliance: ayudamos a crear 9 equipos y mentorizamos a 11.",
          en: "We reached +775 people with “Make & Take” workshops, planted +8,000 trees (offsetting +100 tons of CO₂ with Blue Switch), and lead the Aztech Alliance: we helped create 9 teams and mentor 11.",
          fr: "Nous avons touché +775 personnes avec des ateliers « Make & Take », planté +8 000 arbres (compensant +100 tonnes de CO₂ avec Blue Switch), et dirigeons l'Aztech Alliance : nous avons aidé à créer 9 équipes et en mentorons 11.",
        },
      },
    ],
  },
];
