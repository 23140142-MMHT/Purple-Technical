/* ════════════════════════════════════════════════════════════════════════
   api/chat.js — FUNCIÓN SERVERLESS (Vercel Edge) para el chatbot.

   👉 Aquí —y SOLO aquí, en el servidor— vive tu API key. Nunca llega al
      navegador. Por eso el chat es seguro aunque el sitio sea estático.

   CÓMO ACTIVARLO:
     1) Sube esta carpeta a GitHub y conéctala a Vercel (vercel.com).
     2) En Vercel → Project → Settings → Environment Variables agrega:
          ANTHROPIC_API_KEY = sk-ant-...
     3) Deploy. La ruta /api/chat queda lista (BINDER.chatEndpoint = "/api/chat").

   Edita el TEAM y SYSTEM de abajo para que el bot conozca tu robot.
   No usa ninguna librería: solo fetch (incluido en el runtime de Vercel).
   ════════════════════════════════════════════════════════════════════════ */
export const config = { runtime: "edge" };

// Datos del equipo (edítalos si cambian).
const TEAM = { number: 17626, name: "Aztech II", robot: "PURPLE SPIKE", season: 2026, game: "DECODE" };

// Contexto del robot (sacado del Engineering Portfolio) para que Aztlo responda con precisión.
const SYSTEM = `Eres "Aztlo", el asistente oficial del equipo FTC ${TEAM.number} ${TEAM.name}.
Conoces a fondo su robot ${TEAM.robot} (temporada ${TEAM.season}, ${TEAM.game}).
Responde SIEMPRE en el idioma del usuario, de forma clara, técnica y entusiasta, en 1-3 párrafos.
Si NO sabes la respuesta o te preguntan algo que no está en tus datos, NUNCA la inventes. En vez de eso,
responde con calidez algo como: "¡Esa no me la sé! 😅 Pero sin problema — acércate a nuestro pit de
Aztech II 17626 o escríbenos por Instagram @aztech_2_17626 y con gusto te ayudamos." Adáptalo al idioma del usuario.

DATOS DEL ROBOT ${TEAM.robot}:
- Drivetrain: chasis mecanum de 4 motores goBILDA 435 RPM, reducción por poleas 32T:26T (~535 RPM), modular (interfaz de 8-9 tornillos), odometría con 2 dead wheels + IMU.
- Intake: pivot de 15.8" y 3 fases, ruedas mini mecanum (compliant + gecko + mecanum), motor REV, "Asymmetric Indexing", compresión 4→0.5 mm, auto-alineación pasiva a 57°, intake ~1 s.
- Shooter: flywheel de masa inercial con DOBLE motor (2x REV 6000 RPM, bandas y poleas, sin backlash), engranes FRC de alta masa como contrapeso, control de velocidad PIDF.
- Transfer: pieza 3D rígida con compresión constante de 3 mm para flujo sin atascos, gate de servo Swift.
- Turret: seguimiento de alta precisión, motor goBILDA 435 RPM, reducción 1.95:1 (58T:113T), engranes de doble hélice (anti-backlash), auto-aim por odometría (Pinpoint + atan2 + dual-PD + kS).
- Software: odometría Pinpoint + Pedro, auto-aim del turret, control PIDF del flywheel, máquinas de estado (FSM) para el ciclo; planeado: LUT rango→TPS, gate de zona G416 y Shoot On The Move. Programado con un LLM 100% local como par-programador.
- Estrategia: 21 artifacts en autónomo y 27 ciclos en teleop (4-5 s) con "gate recycling".
- Equipo: FTC ${TEAM.number} de la CDMX. Outreach: +775 personas alcanzadas, +8,000 árboles plantados y la Aztech Alliance (11 equipos mentorizados).`;

const MODEL = "claude-sonnet-4-6";

function textResponse(msg) {
  return new Response(msg, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

export default async function handler(req) {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return textResponse(
      "El asistente AI aún no está configurado. Agrega ANTHROPIC_API_KEY en Vercel para activarlo."
    );
  }

  let messages = [];
  try {
    const body = await req.json();
    messages = (body.messages || [])
      .filter((m) => m && (m.role === "user" || m.role === "assistant"))
      .map((m) => ({ role: m.role, content: String(m.content) }));
  } catch {
    return textResponse("No pude leer tu mensaje. Intenta de nuevo.");
  }
  if (!messages.length) return textResponse("Escríbeme una pregunta sobre el robot. 🤖");

  // Llamada a la API de Anthropic con streaming (SSE).
  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      messages,
      stream: true,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return textResponse("El asistente tuvo un problema. Intenta de nuevo en un momento.");
  }

  // Transformamos el SSE de Anthropic en texto plano (solo los deltas de texto).
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const l = line.trim();
            if (!l.startsWith("data:")) continue;
            const data = l.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const evt = JSON.parse(data);
              if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
                controller.enqueue(encoder.encode(evt.delta.text));
              }
            } catch {
              /* ignora líneas que no sean JSON */
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
  });
}
