import { AttributionSnapshot } from "@/lib/attribution";

export type TrafficSource = {
  type: "ai" | "search" | "social" | "email" | "direct" | "referral" | "unknown";
  label: string;
  host: string | null;
};

const AI_HOSTS: Record<string, string> = {
  "chatgpt.com": "ChatGPT",
  "chat.openai.com": "ChatGPT",
  "perplexity.ai": "Perplexity",
  "claude.ai": "Claude",
  "gemini.google.com": "Gemini",
  "bard.google.com": "Gemini",
  "copilot.microsoft.com": "Microsoft Copilot",
  "you.com": "You.com",
  "phind.com": "Phind",
  "poe.com": "Poe",
  "kagi.com": "Kagi",
  "mistral.ai": "Mistral",
  "groq.com": "Groq",
  "grok.x.ai": "Grok",
  "meta.ai": "Meta AI",
};

const SEARCH_HOSTS: Record<string, string> = {
  "google.": "Google",
  "bing.com": "Bing",
  "duckduckgo.com": "DuckDuckGo",
  "yahoo.com": "Yahoo",
  "yandex.": "Yandex",
  "baidu.com": "Baidu",
  "ecosia.org": "Ecosia",
};

const SOCIAL_HOSTS: Record<string, string> = {
  "linkedin.com": "LinkedIn",
  "facebook.com": "Facebook",
  "instagram.com": "Instagram",
  "t.co": "X / Twitter",
  "twitter.com": "X / Twitter",
  "x.com": "X / Twitter",
  "reddit.com": "Reddit",
  "pinterest.": "Pinterest",
  "youtube.com": "YouTube",
};

function normalizeHost(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, "");
}

function hostLabel(host: string, map: Record<string, string>): string | null {
  const exact = map[host];
  if (exact) return exact;

  for (const [needle, label] of Object.entries(map)) {
    if (host.includes(needle)) return label;
  }

  return null;
}

function hostnameFromReferrer(referrer?: string | null): string | null {
  if (!referrer || referrer === "direct") return null;

  try {
    return normalizeHost(new URL(referrer).hostname);
  } catch {
    return null;
  }
}

export function classifyTrafficSource(
  referrer?: string | null,
  attribution?: AttributionSnapshot | null
): TrafficSource {
  const firstTouchSource = attribution?.utmSource?.toLowerCase() || "";
  const firstTouchMedium = attribution?.utmMedium?.toLowerCase() || "";
  const referrerHost = hostnameFromReferrer(referrer || attribution?.firstTouchReferrer || "");

  if (firstTouchSource) {
    const source = firstTouchSource.replace(/^www\./, "");
    const aiLabel = hostLabel(source, AI_HOSTS);
    if (aiLabel) return { type: "ai", label: aiLabel, host: referrerHost };

    const searchLabel = hostLabel(source, SEARCH_HOSTS);
    if (searchLabel) return { type: "search", label: searchLabel, host: referrerHost };

    const socialLabel = hostLabel(source, SOCIAL_HOSTS);
    if (socialLabel) return { type: "social", label: socialLabel, host: referrerHost };

    if (firstTouchMedium.includes("email") || firstTouchSource.includes("mail")) {
      return { type: "email", label: firstTouchSource, host: referrerHost };
    }

    return { type: "referral", label: firstTouchSource, host: referrerHost };
  }

  if (!referrerHost) return { type: "direct", label: "Direct", host: null };
  if (referrerHost === "werkcv.nl") return { type: "direct", label: "Internal", host: referrerHost };

  const aiLabel = hostLabel(referrerHost, AI_HOSTS);
  if (aiLabel) return { type: "ai", label: aiLabel, host: referrerHost };

  const searchLabel = hostLabel(referrerHost, SEARCH_HOSTS);
  if (searchLabel) return { type: "search", label: searchLabel, host: referrerHost };

  const socialLabel = hostLabel(referrerHost, SOCIAL_HOSTS);
  if (socialLabel) return { type: "social", label: socialLabel, host: referrerHost };

  return { type: "referral", label: referrerHost, host: referrerHost };
}

export type ParsedUserAgent = {
  deviceType: "mobile" | "tablet" | "desktop" | "bot" | "unknown";
  browserName: string;
  osName: string;
};

export function parseUserAgent(userAgent?: string | null): ParsedUserAgent {
  const ua = userAgent || "";
  const lower = ua.toLowerCase();

  const deviceType: ParsedUserAgent["deviceType"] = /bot|crawler|spider|preview/.test(lower)
    ? "bot"
    : /ipad|tablet|android(?!.*mobile)/.test(lower)
      ? "tablet"
      : /mobile|iphone|ipod|android/.test(lower)
        ? "mobile"
        : ua
          ? "desktop"
          : "unknown";

  const browserName = lower.includes("edg/")
    ? "Edge"
    : lower.includes("chrome/")
      ? "Chrome"
      : lower.includes("safari/") && !lower.includes("chrome/")
        ? "Safari"
        : lower.includes("firefox/")
          ? "Firefox"
          : lower.includes("opr/") || lower.includes("opera")
            ? "Opera"
            : lower.includes("bot")
              ? "Bot"
              : "Unknown";

  const osName = lower.includes("windows")
    ? "Windows"
    : lower.includes("mac os") || lower.includes("macintosh")
      ? "macOS"
      : lower.includes("iphone") || lower.includes("ipad")
        ? "iOS"
        : lower.includes("android")
          ? "Android"
          : lower.includes("linux")
            ? "Linux"
            : "Unknown";

  return { deviceType, browserName, osName };
}
