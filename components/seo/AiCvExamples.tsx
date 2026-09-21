"use client";

import { useEffect, useRef, useState } from "react";
import { aiCvExamples } from "@/lib/ai-cv-examples";
import ScaledCvPreview from "@/app/editor/ScaledCvPreview";
import { IllustrativeCvProvider } from "@/app/editor/templates/document-heading";
import { getDefaultThemeId } from "@/lib/templates/registry";

export default function AiCvExamples({ locale }: { locale: "nl" | "en" }) {
  const en = locale === "en";
  const examples = aiCvExamples(locale);
  const [selected, setSelected] = useState("retail");
  const [template, setTemplate] = useState("professional");
  const [scale, setScale] = useState(0.35);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / 794)));
    observer.observe(node); return () => observer.disconnect();
  }, []);
  const example = examples.find(e => e.id === selected)!;
  return <section id="voorbeelden" className="py-12">
    <p className="wk-eyebrow">{en ? "Fictional editorial demonstration — no AI request" : "Fictieve redactionele demonstratie — geen AI-aanvraag"}</p>
    <h2 className="mt-3 text-3xl font-semibold">{en ? "From your notes to a readable CV" : "Van je notities naar een leesbaar cv"}</h2>
    <div className="my-5 flex flex-wrap gap-3">{examples.map(e => <button key={e.id} type="button" aria-pressed={selected === e.id} onClick={() => setSelected(e.id)} className="wk-button wk-button-secondary">{e.title}</button>)}</div>
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <article className="wk-card"><h3 className="text-xl font-semibold">{en ? "Original notes" : "Oorspronkelijke notities"}</h3><p className="mt-3 leading-7">{example.notes}</p></article>
        <article className="wk-card"><h3 className="text-xl font-semibold">{en ? "What improved?" : "Wat is verbeterd?"}</h3><p className="mt-3 leading-7">{example.explanation}</p><h4 className="mt-4 font-semibold">{en ? "Do not use this inflated version" : "Gebruik deze overdreven versie niet"}</h4><p className="mt-2 rounded-xl bg-amber-50 p-3">{example.rejected}</p></article>
        <article id="vacaturevoorbeeld" className="wk-card"><h3 className="text-xl font-semibold">{en ? "Tailor to a vacancy" : "Aanpassen aan een vacature"}</h3><p className="mt-3 leading-7">{example.vacancy}</p><p className="mt-3 text-sm">{en ? "Missing from a CV does not necessarily mean missing experience. Ask for a real example before adding a skill." : "Niet genoemd in een cv betekent niet automatisch geen ervaring. Vraag eerst om een echt voorbeeld voordat je een vaardigheid toevoegt."}</p></article>
      </div>
      <div className="min-w-0"><label className="mb-4 block font-medium">{en ? "Compare existing templates" : "Vergelijk bestaande templates"}<select className="ml-3 max-w-full rounded-lg border bg-white p-2" value={template} onChange={event => setTemplate(event.target.value)}><option value="professional">Professional</option><option value="classical">Classical</option></select></label>
        <div ref={container} className="overflow-hidden rounded-2xl border bg-white" aria-hidden="true">
          <IllustrativeCvProvider>
          <ScaledCvPreview data={example.data} templateId={template} colorThemeId={getDefaultThemeId(template)} scale={scale} pageCount={1} paginated />
          </IllustrativeCvProvider>
        </div>
      </div>
    </div>
    {examples.map(example => <details key={example.id} id={`example-text-${example.id}`} className="wk-card mt-6"><summary className="cursor-pointer font-semibold">{en ? "Read the complete example as text" : "Lees het volledige voorbeeld als tekst"}: {example.title}</summary><article className="mt-4 space-y-4">
      <h3 className="text-xl font-semibold">{example.data.personal.name} — {example.title}</h3><p>{example.data.personal.location} · {example.data.personal.email}</p><h4 className="font-semibold">{en ? "Profile" : "Profiel"}</h4><p>{example.data.personal.summary}</p>
      {example.data.experience.map(entry => <section key={entry.entryId}><h4 className="font-semibold">{entry.role} — {entry.company}</h4><p>{entry.start} – {entry.end}</p><ul className="mt-2 list-disc pl-5">{entry.highlights.map((line, i) => <li key={i}>{line}</li>)}</ul></section>)}
      <h4 className="font-semibold">{en ? "Education" : "Opleiding"}</h4>{example.data.education.map(entry => <div key={entry.degree}><p>{entry.degree} — {entry.school}</p><p>{entry.start} – {entry.end || (en ? "Present" : "Heden")}</p><p className="whitespace-pre-line">{entry.description}</p></div>)}
      <h4 className="font-semibold">{en ? "Skills and languages" : "Vaardigheden en talen"}</h4><p>{example.data.skills.map(s => s.name).join(" · ")}</p><p>{example.data.languages.map(l => `${l.name}: ${l.level}`).join(" · ")}</p>
    </article></details>)}
  </section>;
}
