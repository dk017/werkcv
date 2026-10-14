import { cookies } from "next/headers";

// The redesigned app (dashboard + stepped editor) ships behind this switch.
// APP_V2_MODE=off   -> nobody sees it (production default)
// APP_V2_MODE=optin -> only browsers that opted in via /app-v2?aan=1 (local default)
// APP_V2_MODE=on    -> everyone, except browsers that opted out via /app-v2?aan=0
export const APP_V2_COOKIE = "werkcv_app_v2";

export type AppV2Mode = "off" | "optin" | "on";

export function getAppV2Mode(env: Record<string, string | undefined> = process.env): AppV2Mode {
  const raw = env.APP_V2_MODE?.trim().toLowerCase();
  if (raw === "off" || raw === "optin" || raw === "on") return raw;
  return env.NODE_ENV === "production" ? "off" : "optin";
}

export function resolveAppV2(mode: AppV2Mode, cookieValue: string | undefined): boolean {
  if (mode === "on") return cookieValue !== "0";
  if (mode === "optin") return cookieValue === "1";
  return false;
}

export async function isAppV2Active(): Promise<boolean> {
  const store = await cookies();
  return resolveAppV2(getAppV2Mode(), store.get(APP_V2_COOKIE)?.value);
}

// Only same-site relative paths, so the switch cannot be used as an open redirect.
export function safeAppV2Next(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\") || /[\u0000-\u001f\u007f]/.test(value)) return "/mijn-cvs";
  return value.slice(0, 512);
}
