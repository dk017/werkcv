"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clarityAllowedOnPath } from "@/components/ConditionalClarity";
import {
  CLARITY_CONSENT_CHANGED,
  CLARITY_CONSENT_REOPEN,
  readClarityConsent,
  setClarityConsent,
} from "@/lib/clarity-consent";
import { track } from "@/lib/analytics";

const copy = {
  nl: {
    label: "Toestemming voor sessie-opnames",
    text: "Mogen we zien hoe je de site gebruikt? Met Microsoft Clarity zien we klikken en scrollen, zodat we WerkCV makkelijker kunnen maken. Je cv-tekst en wat je typt worden afgeschermd. Zonder toestemming werkt alles gewoon.",
    allow: "Toestaan",
    deny: "Liever niet",
    more: "Privacybeleid",
    privacy: "/privacy",
  },
  en: {
    label: "Consent for session recordings",
    text: "May we see how you use the site? With Microsoft Clarity we see clicks and scrolling, so we can make WerkCV easier to use. Your CV text and what you type are hidden. Everything works without it.",
    allow: "Allow",
    deny: "No thanks",
    more: "Privacy policy",
    privacy: "/en/privacy",
  },
} as const;

function subscribe(callback: () => void) {
  window.addEventListener(CLARITY_CONSENT_CHANGED, callback);
  return () => window.removeEventListener(CLARITY_CONSENT_CHANGED, callback);
}
const snapshot = () => readClarityConsent(document.cookie);
// On the server (and the first client render) behave as if a choice exists, so the banner never
// flashes in the prerendered HTML.
const serverSnapshot = () => "denied" as const;

export default function ClarityConsentBanner() {
  const pathname = usePathname() || "/";
  const consent = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [reopened, setReopened] = useState(false);
  const allowed = clarityAllowedOnPath(pathname);
  const visible = allowed && (consent === null || reopened);
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl";
  const t = copy[locale];

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(CLARITY_CONSENT_REOPEN, reopen);
    return () => window.removeEventListener(CLARITY_CONSENT_REOPEN, reopen);
  }, []);

  useEffect(() => {
    if (visible) track("clarity_consent_shown", { page_path: pathname, locale, reopened });
  }, [visible, pathname, locale, reopened]);

  if (!visible) return null;

  const choose = (choice: "granted" | "denied") => {
    setClarityConsent(choice);
    track("clarity_consent_chosen", { page_path: pathname, locale, choice, reopened });
    setReopened(false);
  };

  return (
    <aside
      aria-label={t.label}
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-lg sm:inset-x-auto sm:left-4 sm:mx-0"
      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
    >
      <p className="leading-relaxed">
        {t.text}{" "}
        <Link href={t.privacy} className="font-medium underline underline-offset-2">{t.more}</Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t.allow}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t.deny}
        </button>
      </div>
    </aside>
  );
}
