"use client";
import { useSyncExternalStore } from "react";
import { AI_CONSENT_CHANGED, readAiAnalyticsConsent, setAiAnalyticsConsent } from "@/lib/ai-analytics-consent";
const subscribe = (callback: () => void) => { window.addEventListener(AI_CONSENT_CHANGED, callback); return () => window.removeEventListener(AI_CONSENT_CHANGED, callback); };
const snapshot = () => readAiAnalyticsConsent(document.cookie);
const serverSnapshot = () => null;
export default function AiAnalyticsPreferences({ locale }: { locale: "nl" | "en" }) {
  const consent = useSyncExternalStore(subscribe, snapshot, serverSnapshot); const en = locale === "en";
  return <aside aria-label={en ? "AI measurement preferences" : "Voorkeur voor AI-gebruiksmeting"} className="rounded-xl bg-slate-50 p-4 text-sm">
    <details><summary className="cursor-pointer font-semibold">{en ? "Optional usage measurement" : "Optionele gebruiksmeting"}: {consent === "granted" ? (en ? "on" : "aan") : (en ? "off" : "uit")}</summary>
      <p className="mt-3">{en ? "May WerkCV measure generated, accepted and rejected actions? We never include CV text, notes, employers or suggestion content. The editor works without measurement." : "Mag WerkCV meten welke acties worden gemaakt, geaccepteerd en geweigerd? We sturen nooit CV-tekst, notities, werkgevers of suggestie-inhoud mee. De editor werkt ook zonder meting."}</p>
      <div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => setAiAnalyticsConsent("granted")} aria-pressed={consent === "granted"} className="rounded-lg border px-3 py-2 font-semibold">{en ? "Allow" : "Toestaan"}</button><button type="button" onClick={() => setAiAnalyticsConsent("denied")} aria-pressed={consent === "denied"} className="rounded-lg border px-3 py-2 font-semibold">{en ? "Do not allow" : "Niet toestaan"}</button></div>
      <p role="status" className="mt-2">{consent === null ? (en ? "Measurement is off until you allow it." : "Meting staat uit totdat je die toestaat.") : (en ? "Your choice is saved in this browser." : "Je keuze is in deze browser opgeslagen.")}</p>
    </details>
  </aside>;
}
