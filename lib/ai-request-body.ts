export class AiInputError extends Error {
  constructor(readonly code: "INVALID_INPUT" | "INPUT_TOO_LARGE" | "REQUEST_TIMEOUT") { super(code); }
}

export async function readAiJson(request: Request, maxBytes = 200000, timeoutMs = 5000): Promise<unknown> {
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) throw new AiInputError("INVALID_INPUT");
  if (Number(request.headers.get("content-length")) > maxBytes) throw new AiInputError("INPUT_TOO_LARGE");
  const reader = request.body?.getReader();
  if (!reader) throw new AiInputError("INVALID_INPUT");
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => {
    void reader.cancel().catch(() => undefined);
    reject(new AiInputError("REQUEST_TIMEOUT"));
  }, timeoutMs); });
  try {
    return await Promise.race([(async () => {
      let size = 0;
      let text = "";
      const decoder = new TextDecoder("utf-8", { fatal: true });
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maxBytes) { void reader.cancel().catch(() => undefined); throw new AiInputError("INPUT_TOO_LARGE"); }
        text += decoder.decode(value, { stream: true });
      }
      return JSON.parse(text + decoder.decode()) as unknown;
    })(), timeout]);
  } catch (error) {
    if (error instanceof AiInputError) throw error;
    throw new AiInputError("INVALID_INPUT");
  } finally { if (timer) clearTimeout(timer); }
}
