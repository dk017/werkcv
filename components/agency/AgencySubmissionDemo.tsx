"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { agencyFictionalExample } from "@/lib/agency-fictional-example";

type DemoTab = "intro" | "evidence" | "gaps" | "email" | "outputs";

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: "intro", label: "Klantintroductie" },
  { id: "evidence", label: "Bewijs per eis" },
  { id: "gaps", label: "Nog verifiëren" },
  { id: "email", label: "Begeleidende e-mail" },
  { id: "outputs", label: "Twee outputs" },
];

const evidence = agencyFictionalExample.evidence.slice(0, 4).map((item) => ({
  ...item,
  status: item.status === "supported" ? "Ondersteund" : item.status === "partially_supported" ? "Gedeeltelijk" : item.status === "confirmation_required" ? "Bevestigen" : "Niet ondersteund",
  proof: item.sourceSnippet ?? item.explanation,
  tone: item.status === "supported" ? "bg-emerald-100 text-emerald-900" : item.status === "partially_supported" || item.status === "confirmation_required" ? "bg-amber-100 text-amber-950" : "bg-rose-100 text-rose-900",
}));
const openPoints = agencyFictionalExample.evidence.filter((item) => item.status !== "supported");

export default function AgencySubmissionDemo() {
  const [activeTab, setActiveTab] = useState<DemoTab>("intro");

  useEffect(() => {
    track("agency_submission_demo_viewed", { location: "agency_submission_demo" });
  }, []);

  const selectTab = (tab: DemoTab) => {
    setActiveTab(tab);
    track("agency_submission_demo_tab_changed", { tab });
    if (tab === "outputs") {
      track("agency_sample_output_viewed", { variant: "full", location: "agency_submission_demo" });
    }
  };

  return (
    <section data-example-demo="true" className="min-w-0 py-4 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Fictief maar compleet voorbeeld</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Zie wat je controleert en wat je opdrachtgever ontvangt.</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{agencyFictionalExample.notice} De bewijsmatrix is intern; de klant krijgt een gecontroleerde introductie en het gekozen CV-pakket.</p>
          <div className="wk-card wk-card-warning mt-6 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em]">Invoer</p>
            <p className="mt-2 text-sm font-black">Kandidaat-CV + vacature {agencyFictionalExample.vacancy.title}</p>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-700">WerkCV koppelt functie-eisen aan CV-bewijs. Onbekende beschikbaarheid, salarisindicatie en wensen blijven bewust leeg.</p>
          </div>
        </div>

        <div className="wk-card min-w-0 overflow-hidden p-0">
          <div className="flex flex-wrap gap-2 border-b border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-3" role="tablist" aria-label="Voorbeeld kandidaatvoorstel">
            {tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => selectTab(tab.id)} className={`min-h-10 rounded-[var(--wk-radius-sm)] border px-3 py-2 text-xs font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wk-focus)] ${activeTab === tab.id ? "border-[var(--wk-primary)] bg-[var(--wk-accent-soft)] text-[var(--wk-ink)]" : "border-[var(--wk-border)] bg-white text-[var(--wk-ink-muted)]"}`}>{tab.label}</button>)}
          </div>

          <div className="min-h-[420px] p-5 sm:p-7">
            {activeTab === "intro" ? <div>
              <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Kandidaatvoorstel</p><h3 className="mt-2 text-3xl font-black">{agencyFictionalExample.candidate.name}</h3><p className="mt-1 text-sm font-bold text-slate-500">Voor de rol {agencyFictionalExample.candidate.role}</p></div><span className="rounded-full border border-[var(--wk-border)] px-3 py-2 text-xs font-black">Fictieve case</span></div>
              <div className="wk-card mt-6 bg-[var(--wk-surface-subtle)] p-4"><p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">Introductie door recruiter</p><p className="mt-3 text-sm leading-relaxed text-slate-700">{agencyFictionalExample.recruiterIntroduction}</p></div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="wk-card p-3"><p className="text-[10px] font-black uppercase text-slate-500">Beschikbaar</p><p className="mt-1 text-sm font-black">Na bevestiging</p></div><div className="wk-card p-3"><p className="text-[10px] font-black uppercase text-slate-500">Uren</p><p className="mt-1 text-sm font-black">{agencyFictionalExample.candidate.hours}</p></div><div className="wk-card p-3"><p className="text-[10px] font-black uppercase text-slate-500">Regio</p><p className="mt-1 text-sm font-black">{agencyFictionalExample.candidate.location}</p></div></div>
            </div> : null}

            {activeTab === "evidence" ? <div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Alleen voor recruiter-review</p><h3 className="mt-2 text-2xl font-black">Functie-eis naast concreet CV-bewijs</h3><div className="mt-5 space-y-3">{evidence.map((item) => <div key={item.requirement} className="grid min-w-0 gap-3 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] p-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.4fr)] sm:items-start"><p className="break-words text-sm font-black">{item.requirement}</p><span className={`w-fit rounded-full border border-transparent px-2 py-1 text-xs font-black ${item.tone}`}>{item.status}</span><p className="break-words text-xs leading-relaxed text-slate-600">{item.proof}</p></div>)}</div></div> : null}

            {activeTab === "gaps" ? <div><p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">Niet invullen, wel navragen</p><h3 className="mt-2 text-2xl font-black">Openstaande informatie blijft zichtbaar.</h3><div className="mt-5 space-y-3">{openPoints.map((item, index) => <div key={item.id} className="flex min-w-0 gap-3 rounded-[var(--wk-radius-sm)] border border-[var(--wk-warning)] bg-[var(--wk-warning-soft)] p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--wk-highlight)] text-xs font-black">{index + 1}</span><p className="break-words text-sm font-semibold leading-relaxed text-[var(--wk-ink)]">{item.nextAction}</p></div>)}</div></div> : null}

            {activeTab === "email" ? <div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Kopieerbaar en bewerkbaar</p><h3 className="mt-2 text-2xl font-black">Begeleidende e-mail</h3><div className="wk-card mt-5 p-5 text-sm leading-relaxed text-slate-700"><p className="font-black">Onderwerp: {agencyFictionalExample.clientEmail.subject}</p><p className="mt-5 whitespace-pre-line">{agencyFictionalExample.clientEmail.body}</p></div></div> : null}

            {activeTab === "outputs" ? <div><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Eén gecontroleerde bron</p><h3 className="mt-2 text-2xl font-black">Kies het passende klantpakket.</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">De PDF- en DOCX-bestanden hieronder zijn gegenereerd uit dezelfde fictieve goedgekeurde snapshot.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="wk-card wk-card-success p-5"><p className="text-lg font-black">Volledig voorstel</p><ul className="mt-4 space-y-2 text-sm font-semibold text-slate-700"><li>✓ Introductiepagina in ingestelde agency-opmaak</li><li>✓ Bevestigde voorstelgegevens</li><li>✓ Volledig kandidaat-CV</li><li>✓ Bewijs uit dezelfde snapshot</li></ul><div className="mt-5 flex flex-wrap gap-2"><a href="/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.pdf" onClick={() => track("agency_sample_pack_downloaded", { variant: "full" })} className="wk-button wk-button-primary wk-button-small" download>Download PDF</a><a href="/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur.docx" onClick={() => track("agency_sample_pack_downloaded", { variant: "full" })} className="wk-button wk-button-secondary wk-button-small" download>Download DOCX</a></div></div><div className="wk-card p-5"><p className="text-lg font-black">Zonder directe contactgegevens</p><ul className="mt-4 space-y-2 text-sm font-semibold text-slate-700"><li>✓ Gestructureerde naam- en contactvelden leeggemaakt</li><li>✓ Dezelfde introductie en ervaring</li><li>✓ Reviewwaarschuwing zichtbaar</li><li>✓ Geen claim van juridische anonimiteit</li></ul><div className="mt-5 flex flex-wrap gap-2"><a href="/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.pdf" onClick={() => track("agency_sample_pack_downloaded", { variant: "contact_reduced" })} className="wk-button wk-button-primary wk-button-small" download>Download PDF</a><a href="/downloads/werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur-geanonimiseerd.docx" onClick={() => track("agency_sample_pack_downloaded", { variant: "contact_reduced" })} className="wk-button wk-button-secondary wk-button-small" download>Download DOCX</a></div></div></div></div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
