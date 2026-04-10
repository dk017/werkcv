"use client";

import { useState } from "react";
import Image from "next/image";

type SampleKey = "before" | "after";

const samples = {
  before: {
    key: "before" as const,
    tabLabel: "Bron-CV",
    kicker: "Voor",
    badge: "Bronbestand",
    badgeClassName: "border-2 border-rose-500 bg-white text-rose-700",
    accentClassName: "bg-[#FFF4EF]",
    title: "Echte preview van het bron-CV zoals het binnenkomt",
    description:
      "Dit is het type bestand waar een recruiter of consultant inhoudelijk mee verder kan, maar dat nog niet rustig genoeg is voor directe klantpresentatie.",
    pdfHref: "/downloads/agency-sample-bron-cv-hr-adviseur.pdf",
    previewSrc: "/agency-previews/agency-sample-bron-cv-hr-adviseur-page-1.png",
    previewAlt: "Preview van een fictief bron-CV van een Nederlandse HR-adviseur",
    buttonLabel: "Bekijk bron-PDF",
    bullets: [
      "Volledige contactgegevens en extra persoonsgegevens staan nog bovenin.",
      "Profieltekst is breed en generiek, zonder scherpe positionering voor voorstel.",
      "Werkervaring staat als lange tekstblokken en vraagt nog handmatige redactie.",
    ],
  },
  after: {
    key: "after" as const,
    tabLabel: "Client-ready",
    kicker: "Na",
    badge: "Client-ready",
    badgeClassName: "border-2 border-sky-500 bg-white text-sky-700",
    accentClassName: "bg-[#EEF8FF]",
    title: "Dezelfde kandidaat, maar nu client-ready voor voorstel",
    description:
      "Zelfde kerninhoud, maar nu herschreven naar een rustiger voorstelbare versie waarin privacy, scanbaarheid en recruiter-context direct kloppen.",
    pdfHref: "/downloads/agency-sample-client-ready-cv-hr-adviseur.pdf",
    previewSrc: "/agency-previews/agency-sample-client-ready-cv-hr-adviseur-page-1.png",
    previewAlt: "Preview van een fictief client-ready kandidaatprofiel voor een Nederlandse HR-adviseur",
    buttonLabel: "Bekijk client-ready PDF",
    bullets: [
      "Bovenkant is teruggebracht naar wat recruiter en opdrachtgever echt nodig hebben.",
      "Zelfde kandidaat, maar nu scanbaar gepositioneerd op HR-advies, verzuim en onboarding.",
      "Werkervaring is herschreven naar kortere bullets met context en resultaat.",
      "Contact loopt via bureau, zodat privacy en presentatie direct kloppen.",
    ],
  },
};

const tabButtonClassName =
  "border-2 px-4 py-3 text-left text-sm font-black transition-all md:px-5 md:py-4 md:text-base";

export default function AgencyCvSamplePair() {
  const [activeSample, setActiveSample] = useState<SampleKey>("after");
  const sample = samples[activeSample];

  return (
    <div className="mt-6 space-y-5">
      <div className="grid gap-3 md:grid-cols-2">
        {Object.values(samples).map((item) => {
          const isActive = item.key === activeSample;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveSample(item.key)}
              aria-pressed={isActive}
              className={`${tabButtonClassName} ${
                isActive
                  ? "border-black bg-yellow-400 text-black"
                  : "border-black bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">
                {item.kicker}
              </span>
              <span className="mt-1 block text-lg text-black">{item.tabLabel}</span>
              <span className="mt-1 block text-sm font-bold leading-relaxed">
                {item.key === "before"
                  ? "Bronbestand met inhoud, maar nog zonder klantklare redactie."
                  : "Rustiger voorstelbare versie met bureauvriendelijke bovenkant."}
              </span>
            </button>
          );
        })}
      </div>

      <article
        className={`border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-6 ${sample.accentClassName}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p
              className={`inline-block border px-2 py-1 text-xs font-black uppercase tracking-[0.18em] ${sample.badgeClassName}`}
            >
              {sample.kicker}
            </p>
            <h3 className="mt-3 text-2xl font-black text-black md:text-3xl">{sample.title}</h3>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700 md:text-base">
              {sample.description}
            </p>
          </div>

          <a
            href={sample.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-3 border-black bg-yellow-400 px-4 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            {sample.buttonLabel}
          </a>
        </div>

        <a
          href={sample.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block"
        >
          <Image
            src={sample.previewSrc}
            alt={sample.previewAlt}
            width={1310}
            height={1853}
            className="mx-auto h-auto w-full max-w-3xl shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-transform hover:-translate-y-1"
            sizes="(min-width: 1280px) 52rem, (min-width: 768px) 80vw, 100vw"
            priority
          />
        </a>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Wat je hier ziet
            </p>
            <ul className="mt-3 space-y-2 text-sm font-bold leading-relaxed text-black">
              {sample.bullets.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-black pt-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Waarom dit telt
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              De preview krijgt nu de volle breedte zodat het document zelf het verhaal vertelt,
              in plaats van extra UI die om aandacht vraagt.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Fictieve maar realistische Nederlandse kandidaat: Sanne Vermeer, HR-adviseur.
              Gemaakt als agency sample, niet als klantcase.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
