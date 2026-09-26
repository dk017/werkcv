import type { Metadata } from "next";
import Link from "next/link";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { CATEGORY_LABELS, CRITICAL_CAP_SCORE, GENERAL_WEIGHTS, VACANCY_WEIGHTS, toGrade } from "@/lib/cv-check/score";
import { CV_CHECK_SCORE_VERSION } from "@/lib/cv-check/types";

export const metadata: Metadata = {
  ...buildDutchMetadata({
    title: "Zo berekent de WerkCV CV-check je cijfer | Methodologie",
    description:
      "Welke controles de WerkCV CV-check doet, hoe zwaar elk onderdeel meetelt, wat regels en wat AI beoordelen, en wat het cijfer niet zegt.",
    path: "/cv-check/methodologie",
  }),
  robots: { index: false, follow: true },
};

const categoryDetails: Record<keyof typeof GENERAL_WEIGHTS, string[]> = {
  parsing: [
    "Leesbare tekst: een gescande pdf of foto telt als ernstig probleem.",
    "Leesvolgorde: we meten hoeveel regels twee kolommen naast elkaar hebben.",
    "Word-bestanden: contactgegevens alleen in kop- of voettekst, en tekstvakken.",
    "Standaardkopjes, consistente datumnotatie, bestandsgrootte en bestandsnaam.",
  ],
  basics: ["E-mail, telefoon, woonplaats en LinkedIn.", "Opleiding en vaardigheden aanwezig."],
  content: [
    "Profieltekst: aanwezig, lengte, jaren ervaring, geen holle containerwoorden.",
    "Werkervaring: meetbare resultaten, actieve werkwoorden, data bij functies.",
    "Taalgebruik: consistente taal, geen ik-vorm, leesbare kopjes.",
  ],
  dutch: [
    "Taalniveaus: moedertaal of een ERK-niveau (A1–C2) per taal.",
    "Herkenbaar opleidingsniveau (mbo, hbo, wo) en lengte van 1–2 pagina's.",
    "Geen BSN, paspoort-, ID- of bankgegevens (ernstig probleem).",
    "VOG, BIG-registratie en rijbewijs alleen als de rol of vacature erom vraagt.",
    "Foto, geboortedatum, nationaliteit en burgerlijke staat: alleen ter info, ze tellen niet mee.",
  ],
};

export default function CvCheckMethodologyPage() {
  const categories = Object.keys(GENERAL_WEIGHTS) as Array<keyof typeof GENERAL_WEIGHTS>;
  return (
    <main className="wk-section">
      <div className="wk-container max-w-3xl space-y-10">
        <header>
          <p className="wk-eyebrow">Methodologie · versie {CV_CHECK_SCORE_VERSION}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--wk-ink)]">Zo berekent de CV-check je cijfer</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">
            We publiceren welke controles we doen en hoe zwaar ze meetellen, zodat je het cijfer kunt controleren en begrijpen.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Wat het cijfer wel en niet is</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--wk-ink-muted)]">
            <li>Een samenvatting van controleerbare punten in je cv, als rapportcijfer van 1 tot 10.</li>
            <li>Geen voorspelling of garantie van een uitnodiging, en geen simulatie van één specifiek sollicitatiesysteem.</li>
            <li>
              Sollicitatiesystemen wijzen cv&apos;s zelden automatisch af. Ze lezen je gegevens uit en recruiters zoeken en filteren erin. Daarom kijken we naar leesbaarheid, inhoud en aansluiting, niet naar een verzonnen &lsquo;ATS-score&rsquo;.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Onderdelen en weging</h2>
          <div className="wk-table-scroll-hint mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--wk-border)]">
                  <th className="py-2 pr-4">Onderdeel</th>
                  <th className="py-2 pr-4">Zonder vacature</th>
                  <th className="py-2">Met vacature</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--wk-border)]">
                  <td className="py-2 pr-4 font-semibold">Aansluiting op de vacature</td>
                  <td className="py-2 pr-4">–</td>
                  <td className="py-2">{VACANCY_WEIGHTS.vacancy}%</td>
                </tr>
                {categories.map((id) => (
                  <tr key={id} className="border-b border-[var(--wk-border)]">
                    <td className="py-2 pr-4 font-semibold">{CATEGORY_LABELS[id].nl}</td>
                    <td className="py-2 pr-4">{GENERAL_WEIGHTS[id]}%</td>
                    <td className="py-2">{VACANCY_WEIGHTS[id] ? `${VACANCY_WEIGHTS[id]}%` : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 space-y-5">
            {categories.map((id) => (
              <div key={id}>
                <h3 className="font-semibold text-[var(--wk-ink)]">{CATEGORY_LABELS[id].nl}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--wk-ink-muted)]">
                  {categoryDetails[id].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Van score naar cijfer</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--wk-ink-muted)]">
            <li>Elke controle heeft een gewicht binnen zijn onderdeel; deels goed levert deels punten op. Controles die voor jouw cv niet gelden, tellen niet mee.</li>
            <li>De onderdelen tellen mee volgens de tabel hierboven en vormen samen een score van 0 tot 100. Die zetten we om naar een cijfer: 0 wordt 1,0 en 100 wordt 10,0.</li>
            <li>
              Een ernstig probleem, zoals een gescande pdf of je BSN op je cv, houdt het cijfer op maximaal {toGrade(CRITICAL_CAP_SCORE).toLocaleString("nl-NL")} tot je het oplost.
            </li>
            <li>Onvoldoende onder 5,5 · voldoende tot 7,0 · goed tot 8,5 · uitstekend vanaf 8,5.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Wat regels doen en wat AI doet</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--wk-ink-muted)]">
            <li>Het cijfer wordt altijd in code berekend. AI geeft nooit zelf een cijfer.</li>
            <li>Opbouw, contactgegevens, data, lengte, taalniveaus en gevoelige gegevens controleren we met vaste regels.</li>
            <li>
              AI helpt bij oordelen die taal vragen: holle woorden in je profiel, de kracht van je werkwoorden, en bij een vacature welke eisen erin staan en of je cv die aantoont. Elke eis komt met een letterlijk citaat uit de vacature, en waar mogelijk uit je cv.
            </li>
            <li>
              Nederlandse regels liggen vast in code: moedertaal telt als het hoogste taalniveau, een gelijk of hoger opleidingsniveau voldoet aan een &lsquo;werk- en denkniveau&rsquo;, en een &lsquo;pre&rsquo; is een pluspunt, geen harde eis.
            </li>
            <li>AI raadt je nooit aan ervaring te claimen die je niet hebt, en beoordeelt geen persoonlijke kenmerken zoals leeftijd, afkomst of geslacht.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Privacy</h2>
          <p className="mt-3 text-[var(--wk-ink-muted)]">
            Je cv en de vacaturetekst worden alleen voor deze check gebruikt en niet opgeslagen. In logbestanden en statistieken bewaren we geen cv-tekst, alleen technische gegevens zoals de duur van de check. Zie ook onze{" "}
            <Link href="/privacy" className="font-semibold underline underline-offset-4">
              privacyverklaring
            </Link>
            .
          </p>
        </section>

        <p>
          <Link href="/cv-check" className="wk-button wk-button-primary">
            Terug naar de CV-check
          </Link>
        </p>
      </div>
    </main>
  );
}
