/* ════════════════════════════════════════════════════════════════════════
   api/chat.js — FUNCIÓN SERVERLESS (Vercel Edge) para el chatbot "Aztlo".

   Usa Google Gemini (tiene una capa GRATIS, sin tarjeta). La API key vive
   SOLO aquí (en el servidor), nunca llega al navegador.

   CÓMO ACTIVARLO (gratis):
     1) Consigue una API key gratis en  https://aistudio.google.com/app/apikey
        (inicia sesión con Google → "Create API key" → cópiala).
     2) En Vercel → Project → Settings → Environment Variables agrega:
          GEMINI_API_KEY = AIza...
     3) Redeploy. Aztlo queda listo, sin costo.

   Edita el TEAM y SYSTEM de abajo para ajustar lo que sabe Aztlo.
   No usa ninguna librería: solo fetch (incluido en el runtime de Vercel).
   ════════════════════════════════════════════════════════════════════════ */
export const config = { runtime: "edge" };

// Datos del equipo (edítalos si cambian).
const TEAM = { number: 17626, name: "Aztech II", robot: "PURPLE SPIKE", season: 2026, game: "DECODE" };

// Modelo gratis de Gemini (rápido y suficiente). Puedes probar "gemini-2.5-flash".
const MODEL = "gemini-2.0-flash";

// Contexto del robot (del Engineering Portfolio) para que Aztlo responda con precisión.
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

function textResponse(msg) {
  return new Response(msg, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

export default async function handler(req) {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return textResponse(
      "Aztlo aún no está configurado. Agrega GEMINI_API_KEY (gratis, en aistudio.google.com) en Vercel para activarlo."
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

  // Convierte el historial al formato de Gemini (rol "assistant" → "model").
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    MODEL +
    ":streamGenerateContent?alt=sse&key=" +
    apiKey;

  const upstream = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM }] },
      contents,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.6 },
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return textResponse(
      "Aztlo no está disponible ahora mismo. Mientras tanto, ¡acércate a nuestro pit Aztech II 17626 o escríbenos a @aztech_2_17626!"
    );
  }

  // Transformamos el SSE de Gemini en texto plano (solo los fragmentos de texto).
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
              const parts = evt?.candidates?.[0]?.content?.parts;
              if (parts) {
                for (const p of parts) if (p.text) controller.enqueue(encoder.encode(p.text));
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
