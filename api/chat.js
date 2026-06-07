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

// TODO: ajusta estos datos a tu equipo.
const TEAM = { name: "Aztech II", robot: "RIPCURRENT", season: 2026, game: "REBUILT" };

const SYSTEM = `Eres el asistente técnico oficial del equipo de robótica ${TEAM.name}.
Conoces el robot ${TEAM.robot} de la temporada ${TEAM.season} (${TEAM.game}): subsistemas
(drivetrain, intake, shooter, transfer, turret), software y estrategia.
Sé conciso, técnico y entusiasta. Responde SIEMPRE en el idioma del usuario.
Si no sabes algo específico, di: "Para más detalles, contacta al equipo directamente."`;

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
