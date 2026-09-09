"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AGENCY_CONSENT_CHANGED, isAgencyAnalyticsPath, readAgencyAnalyticsConsent, setAgencyAnalyticsConsent } from "@/lib/agency-analytics-consent";

function subscribe(callback: () => void) {
  window.addEventListener(AGENCY_CONSENT_CHANGED, callback);
  return () => window.removeEventListener(AGENCY_CONSENT_CHANGED, callback);
}
const snapshot = () => readAgencyAnalyticsConsent(document.cookie);
const serverSnapshot = () => null;

export default function AgencyAnalyticsPreferences() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  if (!isAgencyAnalyticsPath(pathname) || pathname === "/kandidaat/bevestigen") return null;
  const en = pathname.startsWith("/en/");
  return (
    <aside aria-label={en ? "Analytics preferences" : "Voorkeur voor gebruiksmeting"} className="mx-auto my-6 max-w-6xl rounded-2xl border border-[#dbe5e1] bg-[#f4f7f5] p-5 text-sm text-[#193c36]" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
      <details>
        <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">{en ? "Analytics preferences" : "Voorkeur voor gebruiksmeting"}: {consent === "granted" ? (en ? "on" : "aan") : (en ? "off" : "uit")}</summary>
        <p className="mt-3 max-w-3xl leading-relaxed">{en ? "May WerkCV measure visits and clicks on MatchPack pages to improve them? This optional measurement goes to WerkCV and uses a browser identifier. It does not include CV text or proposal content. These pages do not load Google Analytics or session recordings. All examples, downloads and features work without measurement. You can change your choice here at any time." : "Mag WerkCV bezoeken en klikken op MatchPack-pagina’s meten om ze te verbeteren? Deze optionele meting gaat naar WerkCV en gebruikt een browseridentificatie. CV-tekst en voorstelinhoud worden niet meegestuurd. Deze pagina’s laden geen Google Analytics of sessieopnamen. Alle voorbeelden, downloads en functies werken ook zonder meting. Je kunt je keuze hier altijd wijzigen."}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setAgencyAnalyticsConsent("granted")} aria-pressed={consent === "granted"} className="rounded-xl border border-[#193c36] px-4 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">{en ? "Allow measurement" : "Meting toestaan"}</button>
          <button type="button" onClick={() => setAgencyAnalyticsConsent("denied")} aria-pressed={consent === "denied"} className="rounded-xl border border-[#193c36] px-4 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">{en ? "No measurement" : "Geen meting"}</button>
        </div>
        <p role="status" className="mt-3">{consent === null ? (en ? "Measurement is off until you allow it." : "De meting staat uit totdat je toestemming geeft.") : (en ? "Your choice is saved for this browser." : "Je keuze is opgeslagen voor deze browser.")}</p>
        <a href="/agency/privacy" className="mt-3 inline-block underline underline-offset-4">{en ? "MatchPack privacy information (Dutch)" : "Privacyinformatie MatchPack"}</a>
      </details>
    </aside>
  );
}
