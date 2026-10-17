/**
 * OpenAI's app directory proves domain ownership by fetching
 * https://werkcv.nl/.well-known/openai-apps-challenge (rewritten here in next.config.ts).
 * The token comes from the platform.openai.com app form and is set as OPENAI_APPS_CHALLENGE in .env;
 * until it is set, the URL answers 404.
 */
export const dynamic = "force-dynamic";

export function GET() {
  const token = process.env.OPENAI_APPS_CHALLENGE?.trim();
  if (!token) return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(token, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
