import type { Metadata } from "next";
import Link from "next/link";
import { agencyPrivacyFacts, getAgencyStorageDescription } from "@/lib/agency-privacy-content";

const pageUrl = "https://werkcv.nl/agency/privacy";

export const metadata: Metadata = {
  title: "MatchPack privacy, retentie en DPA | WerkCV",
  description: "Hoe WerkCV MatchPack bronbestanden, kandidaatdata, revisies en Agency-toegang verwerkt.",
  alternates: {
    canonical: pageUrl,
    languages: {
      nl: pageUrl,
      "nl-NL": pageUrl,
      en: "https://werkcv.nl/en/agency/privacy",
      "en-GB": "https://werkcv.nl/en/agency/privacy",
      "x-default": pageUrl,
    },
  },
  robots: { index: true, follow: true },
};

export default function AgencyPrivacyPage() {
  return (
    <main className="bg-[var(--wk-canvas)]">
      <section className="border-b border-[var(--wk-border)] bg-gradient-to-br from-[#fffef0] via-[#f8fbf7] to-[#eaf7f5]">
        <div className="wk-container py-16 sm:py-20">
          <p className="wk-eyebrow">MatchPack privacy</p>
          <h1 className="mt-5 max-w-4xl break-words text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
            Wat er wordt opgeslagen, hoelang en onder wiens verantwoordelijkheid.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">
            Deze pagina beschrijft de huidige MatchPack-workspace voor bureaus. Het is productinformatie, geen juridisch advies. Je bureau blijft verwerkingsverantwoordelijke voor kandidaatdata en moet een geldige grondslag, passende instructies en afspraken met klanten hebben.
          </p>
        </div>
      </section>

      <article className="wk-container wk-section max-w-5xl">
        <div className="grid gap-5 md:grid-cols-2">
          <section className="wk-card">
            <h2 className="text-2xl font-semibold">Wat gebeurt er met het bronbestand?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              {getAgencyStorageDescription("nl")}
            </p>
          </section>

          <section className="wk-card">
            <h2 className="text-2xl font-semibold">Retentie en verwijderen</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              Nieuwe Agency-abonnementen starten met een bewaartermijn van {agencyPrivacyFacts.retention.defaultDays} dagen voor inhoudelijke MatchPack-data. De eigenaar kan {agencyPrivacyFacts.retention.options.join(", ")} dagen kiezen via <Link href="/agency/account/settings" className="font-bold text-[var(--wk-primary)] underline">Instellingen</Link>. Dit geldt voor kandidaatinhoud, vacaturetekst, bewijsverwijzingen, revisies en het afgeleide CV. {agencyPrivacyFacts.retention.excludes} blijven behouden voor administratie en quota-audit. Bestaande accounts activeren het beleid expliciet; verwijderen levert geen credit terug. Een afzonderlijk MatchPack kan door de eigenaar worden verwijderd; automatisch verlopen inhoud wordt dagelijks verwerkt wanneer de productie-scheduler actief is.
            </p>
          </section>

          <section className="wk-card">
            <h2 className="text-2xl font-semibold">Contactgegevens verwijderen is geen anonimiseren</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              De optionele variant maakt bekende naam- en contactvelden leeg en verwijdert contactachtige tekst waar dat herkenbaar is. Namen in lopende tekst, werkgevers, scholen, projecten en zeldzame combinaties kunnen nog steeds naar een persoon verwijzen. Controleer het normale én het contactvrije PDF/DOCX-bestand vóór delen met een klant. Gebruik geen gevoelige of live kandidaatdata zonder de vereiste toestemming en instructies.
            </p>
          </section>

          <section className="wk-card">
            <h2 className="text-2xl font-semibold">Rollen en toegangsbeheer</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              De eigenaar beheert templates, teamleden en verwijderen. Editors kunnen nieuw werk maken en wijzigen. Reviewers kunnen bewijs controleren, corrigeren en goedkeuren. Viewers kunnen alleen lezen. Toegang is gekoppeld aan het login-e-mailadres; verwijder een teamlid zodra de samenwerking stopt.
            </p>
          </section>
        </div>

        <section id="gebruiksmeting" className="mt-8 wk-card">
          <h2 className="text-2xl font-semibold">Optionele gebruiksmeting</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Op MatchPack-pagina’s staat optionele gebruiksmeting standaard uit. Je kunt onderaan de pagina toestemming geven of intrekken via ‘Voorkeur voor gebruiksmeting’. Met toestemming ontvangt WerkCV bezoeken en klikken met een browseridentificatie en technische bezoekinformatie. Deze gebeurtenissen bevatten geen CV-tekst of voorstelinhoud. We laden hier geen Google Analytics of sessieopnamen. De browser bewaart je keuze maximaal 180 dagen. Zonder toestemming blijven de voorbeelden, downloads en functies beschikbaar. Noodzakelijke verwerking voor je account, betalingen en aangevraagde documenten staat los van deze keuze.</p>
        </section>

        <section id="subprocessors" className="mt-8 wk-card">
          <p className="wk-eyebrow">Huidige verificatiestatus</p>
          <h2 className="mt-4 text-2xl font-semibold">Verwerkers en subverwerkers</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
            MatchPack kan afhankelijk van de deployment gebruikmaken van AI-verwerking, betaalverwerking, login-e-mail en hosting/PostgreSQL. De juridische entiteit, regio, doorgiftemechanismen en contractstatus moeten vóór een echte klantinzet uit de actuele providercontracten worden geverifieerd. WerkCV leidt deze gegevens niet af uit een hostname of omgevingsvariabele. Vraag de actuele lijst en DPA-voorwaarden op via <a className="font-bold text-[var(--wk-primary)] underline" href="mailto:contact@werkcv.nl">contact@werkcv.nl</a>.
          </p>
          <p className="wk-table-scroll-hint">Veeg horizontaal om alle kolommen te bekijken.</p>
          <div className="mt-5 overflow-x-auto rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[var(--wk-surface-subtle)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Categorie</th>
                  <th className="px-4 py-3 font-semibold">Doel</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {agencyPrivacyFacts.processors.map((processor) => (
                  <tr key={processor.name} className="border-t border-[var(--wk-border)] align-top">
                    <td className="px-4 py-3 font-semibold">{processor.name}</td>
                    <td className="px-4 py-3 text-[var(--wk-ink-muted)]">{processor.purpose}</td>
                    <td className="px-4 py-3 text-[var(--wk-ink-muted)]">{processor.verificationStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="dpa" className="mt-8 wk-card wk-card-warning">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-warning)]">DPA-aanvraag</p>
          <h2 className="mt-3 text-2xl font-semibold">Controleer de actuele documenten vóór live gebruik.</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
            Status: {agencyPrivacyFacts.dpa.status}. Wil je MatchPack voor echte kandidaatdata inzetten? Vraag vóór gebruik de actuele verwerkersinformatie en DPA op via <a className="font-bold text-[var(--wk-primary)] underline" href="mailto:contact@werkcv.nl">contact@werkcv.nl</a>. Beschrijf je use-case, landen/regio&apos;s en gewenste bewaartermijn. Tot die informatie feitelijk is geverifieerd en juridisch is beoordeeld, gebruik je alleen fictieve CV&apos;s. Toestemming van een kandidaat vervangt de ontbrekende verwerkersafspraken niet.
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--wk-border)] pt-6">
          <Link href="/agency" className="wk-button wk-button-secondary">← Terug naar MatchPack</Link>
          <Link href="/voor-bureaus/kennisbank/matchpack-handleiding" className="wk-button wk-button-quiet">Bekijk de handleiding →</Link>
        </div>
      </article>
    </main>
  );
}
