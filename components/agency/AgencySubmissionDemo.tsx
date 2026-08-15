"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

type DemoTab = "intro" | "evidence" | "gaps" | "email" | "outputs";

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: "intro", label: "Klantintroductie" },
  { id: "evidence", label: "Bewijs per eis" },
  { id: "gaps", label: "Nog verifiëren" },
  { id: "email", label: "Begeleidende e-mail" },
  { id: "outputs", label: "Twee outputs" },
];

const evidence = [
  { requirement: "Hbo werk- en denkniveau", status: "Sterk", proof: "Bachelor HRM en zeven jaar relevante HR-ervaring.", tone: "bg-emerald-100 text-emerald-900" },
  { requirement: "Advies aan leidinggevenden", status: "Sterk", proof: "Adviseerde 24 teamleiders over verzuim, ontwikkeling en arbeidsvoorwaarden.", tone: "bg-emerald-100 text-emerald-900" },
  { requirement: "Ervaring met AFAS", status: "Gedeeltelijk", proof: "HR-systemen genoemd, maar AFAS staat niet expliciet in het bron-CV.", tone: "bg-amber-100 text-amber-950" },
  { requirement: "Beschikbaar per 1 oktober", status: "Ontbreekt", proof: "Beschikbaarheid komt niet uit het CV en moet door de recruiter worden bevestigd.", tone: "bg-rose-100 text-rose-900" },
];

export default function AgencySubmissionDemo() {
  const [activeTab, setActiveTab] = useState<DemoTab>("intro");

  useEffect(() => {
    track("agency_submission_demo_viewed", { location: "agency_submission_demo" });
  }, []);

  const selectTab = (tab: DemoTab) => {
    setActiveTab(tab);
    track("agency_submission_demo_tab_changed", { tab });
  };

  return (
    <section id="voorbeeld" className="border-y-2 border-slate-900 py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Fictief maar compleet voorbeeld</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Zie wat je controleert en wat je opdrachtgever ontvangt.</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">Dit voorbeeld gebruikt verzonnen gegevens voor een HR-adviseur. De bewijsmatrix is intern; de klant krijgt een gecontroleerde introductie en het gekozen CV-pakket.</p>
          <div className="mt-6 border-2 border-slate-900 bg-yellow-300 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-[0.12em]">Invoer</p>
            <p className="mt-2 text-sm font-black">Kandidaat-CV + vacature HR-adviseur</p>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-700">WerkCV koppelt functie-eisen aan CV-bewijs. Onbekende beschikbaarheid, salarisindicatie en wensen blijven bewust leeg.</p>
          </div>
        </div>

        <div className="min-w-0 border-2 border-slate-900 bg-white shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
          <div className="flex gap-2 overflow-x-auto border-b-2 border-slate-900 bg-slate-50 p-3" role="tablist" aria-label="Voorbeeld kandidaatvoorstel">
            {tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => selectTab(tab.id)} className={`shrink-0 border-2 px-3 py-2 text-xs font-black ${activeTab === tab.id ? "border-slate-900 bg-emerald-400" : "border-slate-200 bg-white text-slate-600"}`}>{tab.label}</button>)}
          </div>

          <div className="min-h-[420px] p-5 sm:p-7">
            {activeTab === "intro" ? <div>
              <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Kandidaatvoorstel</p><h3 className="mt-2 text-3xl font-black">Nina de Vries</h3><p className="mt-1 text-sm font-bold text-slate-500">Voor de rol HR-adviseur</p></div><span className="border-2 border-slate-900 px-3 py-2 text-xs font-black">Fictieve case</span></div>
              <div className="mt-6 border-2 border-slate-900 bg-slate-50 p-4"><p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">Introductie door recruiter</p><p className="mt-3 text-sm leading-relaxed text-slate-700">Nina combineert zeven jaar brede HR-ervaring met aantoonbaar advies aan leidinggevenden. Haar recente projecten rond verzuim en medewerkerontwikkeling sluiten goed aan. Ervaring met AFAS en haar exacte startdatum worden vóór verzending nog bevestigd.</p></div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border-2 border-slate-200 p-3"><p className="text-[10px] font-black uppercase text-slate-500">Beschikbaar</p><p className="mt-1 text-sm font-black">Na bevestiging</p></div><div className="border-2 border-slate-200 p-3"><p className="text-[10px] font-black uppercase text-slate-500">Uren</p><p className="mt-1 text-sm font-black">32–36 uur</p></div><div className="border-2 border-slate-200 p-3"><p className="text-[10px] font-black uppercase text-slate-500">Regio</p><p className="mt-1 text-sm font-black">Utrecht / hybride</p></div></div>
            </div> : null}

            {activeTab === "evidence" ? <div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Alleen voor recruiter-review</p><h3 className="mt-2 text-2xl font-black">Functie-eis naast concreet CV-bewijs</h3><div className="mt-5 space-y-3">{evidence.map((item) => <div key={item.requirement} className="grid gap-3 border-2 border-slate-200 p-4 sm:grid-cols-[1fr_auto_1.4fr] sm:items-start"><p className="text-sm font-black">{item.requirement}</p><span className={`w-fit px-2 py-1 text-xs font-black ${item.tone}`}>{item.status}</span><p className="text-xs leading-relaxed text-slate-600">{item.proof}</p></div>)}</div></div> : null}

            {activeTab === "gaps" ? <div><p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">Niet invullen, wel navragen</p><h3 className="mt-2 text-2xl font-black">Openstaande informatie blijft zichtbaar.</h3><div className="mt-5 space-y-3">{["Bevestig of Nina daadwerkelijk met AFAS heeft gewerkt.", "Vraag de exacte beschikbaarheidsdatum en opzegtermijn na.", "Leg de gewenste salarisrange vast voordat het voorstel wordt verstuurd.", "Controleer of bedrijfs- en projectnamen in het geredigeerde concept mogen blijven staan."].map((item, index) => <div key={item} className="flex gap-3 border-2 border-amber-300 bg-amber-50 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center bg-amber-300 text-xs font-black">{index + 1}</span><p className="text-sm font-semibold leading-relaxed text-amber-950">{item}</p></div>)}</div></div> : null}

            {activeTab === "email" ? <div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Kopieerbaar en bewerkbaar</p><h3 className="mt-2 text-2xl font-black">Begeleidende e-mail</h3><div className="mt-5 border-2 border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700"><p className="font-black">Onderwerp: Kandidaatvoorstel HR-adviseur — Nina de Vries</p><p className="mt-5">Beste opdrachtgever,</p><p className="mt-3">Graag stel ik Nina de Vries voor voor de rol HR-adviseur. Zij combineert zeven jaar brede HR-ervaring met aantoonbaar advies aan leidinggevenden. Haar recente projecten rond verzuim en medewerkerontwikkeling sluiten goed aan.</p><p className="mt-3">Het gecontroleerde kandidaatvoorstel vind je in de bijlage. De openstaande punten licht ik graag persoonlijk toe.</p><p className="mt-3">Met vriendelijke groet,</p></div></div> : null}

            {activeTab === "outputs" ? <div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Eén gecontroleerde bron</p><h3 className="mt-2 text-2xl font-black">Kies het passende klantpakket.</h3><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="border-2 border-slate-900 bg-emerald-50 p-5"><p className="text-lg font-black">Volledig voorstel</p><ul className="mt-4 space-y-2 text-sm font-semibold text-slate-700"><li>✓ Introductiepagina in ingestelde agency-opmaak</li><li>✓ Bevestigde voorstelgegevens</li><li>✓ Volledig kandidaat-CV</li><li>✓ Bewijs uit dezelfde snapshot</li></ul><a href="/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.pdf" onClick={() => track("agency_sample_pack_downloaded", { variant: "full" })} className="mt-5 inline-flex border-2 border-slate-900 bg-emerald-400 px-3 py-2 text-xs font-black" download>Download voorbeeld-PDF</a></div><div className="border-2 border-slate-900 bg-white p-5"><p className="text-lg font-black">Geredigeerd concept</p><ul className="mt-4 space-y-2 text-sm font-semibold text-slate-700"><li>✓ Gestructureerde naam- en contactvelden leeggemaakt</li><li>✓ Dezelfde introductie en ervaring</li><li>✓ Reviewwaarschuwing zichtbaar</li><li>✓ Geen claim van juridische anonimiteit</li></ul><a href="/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.pdf" onClick={() => track("agency_sample_pack_downloaded", { variant: "anonymized" })} className="mt-5 inline-flex border-2 border-slate-900 bg-white px-3 py-2 text-xs font-black" download>Download geredigeerd voorbeeld</a></div></div></div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
