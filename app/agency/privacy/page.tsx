import type { Metadata } from "next";
import Link from "next/link";
import { agencyPrivacyFacts } from "@/lib/agency-privacy-content";

export const metadata: Metadata = {
  title: "MatchPack privacy, retentie en DPA | WerkCV",
  description: "Hoe WerkCV MatchPack bronbestanden, kandidaatdata, revisies en agency-toegang verwerkt.",
  alternates: { canonical: "https://werkcv.nl/agency/privacy" },
};

export default function AgencyPrivacyPage() {
  return (
    <main className="wk-agency-privacy min-h-screen bg-[#FFFEF9] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <p className="wk-eyebrow mt-12">MatchPack privacy</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Wat er wordt opgeslagen, hoelang en onder wiens verantwoordelijkheid.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">Deze pagina beschrijft de huidige MatchPack-workspace voor bureaus. Het is productinformatie, geen juridisch advies. Je bureau blijft verwerkingsverantwoordelijke voor kandidaatdata en moet een geldige grondslag, passende instructies en afspraken met klanten hebben.</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
          <section><h2 className="text-2xl font-black text-slate-950">Wat gebeurt er met het bronbestand?</h2><p className="mt-3">Het geüploade PDF- of DOCX-bestand wordt alleen gebruikt om tekst uit te lezen. Het originele bestand wordt na de analyse niet als downloadbaar bronbestand opgeslagen. Wel bewaren we de uitgelezen vacaturetekst, gestructureerde kandidaatdata, de versie zonder directe contactgegevens, analyse-uitkomsten, bewijsverwijzingen, revisies en goedkeuringsinformatie zodat je de review kunt uitvoeren.</p></section>
          <section><h2 className="text-2xl font-black text-slate-950">Retentie en verwijderen</h2><p className="mt-3">Nieuwe Agency-abonnementen starten met een bewaartermijn van {agencyPrivacyFacts.retention.defaultDays} dagen voor inhoudelijke MatchPack-data. De eigenaar kan {agencyPrivacyFacts.retention.options.join(", ")} dagen kiezen via <Link href="/agency/account/settings" className="font-bold text-emerald-700 underline">Instellingen</Link>. Dit geldt voor kandidaatinhoud, vacaturetekst, bewijsverwijzingen, revisies en het afgeleide CV. {agencyPrivacyFacts.retention.excludes} blijven behouden voor administratie en quota-audit. Bestaande accounts activeren het beleid expliciet; verwijderen levert geen slot terug. Een afzonderlijk MatchPack kan door de eigenaar worden verwijderd; automatisch verlopen inhoud wordt dagelijks verwerkt wanneer de productie-scheduler actief is.</p></section>
          <section><h2 className="text-2xl font-black text-slate-950">Contactgegevens verwijderen is geen anonimiseren</h2><p className="mt-3">De optionele variant maakt bekende naam- en contactvelden leeg en verwijdert contactachtige tekst waar dat herkenbaar is. Namen in lopende tekst, werkgevers, scholen, projecten en zeldzame combinaties kunnen nog steeds naar een persoon verwijzen. Controleer het normale én het contactvrije PDF/DOCX-bestand vóór delen met een klant. Gebruik geen gevoelige of live kandidaatdata zonder de vereiste toestemming en instructies.</p></section>
          <section><h2 className="text-2xl font-black text-slate-950">Rollen en toegangsbeheer</h2><p className="mt-3">De eigenaar beheert templates, teamleden en verwijderen. Editors kunnen nieuw werk maken en wijzigen. Reviewers kunnen bewijs controleren, corrigeren en goedkeuren. Viewers kunnen alleen lezen. Toegang is gekoppeld aan het login-e-mailadres; verwijder een teamlid zodra de samenwerking stopt.</p></section>
          <section id="subprocessors"><h2 className="text-2xl font-black text-slate-950">Verwerkers en subverwerkers</h2><p className="mt-3">MatchPack kan afhankelijk van de deployment gebruikmaken van AI-verwerking, betaalverwerking, login-e-mail en hosting/PostgreSQL. De juridische entiteit, regio, doorgiftemechanismen en contractstatus moeten vóór een echte klantinzet uit de actuele providercontracten worden geverifieerd. WerkCV leidt deze gegevens niet af uit een hostname of omgevingsvariabele. Vraag de actuele lijst en DPA-voorwaarden op via <a className="font-bold text-emerald-700 underline" href="mailto:contact@werkcv.nl">contact@werkcv.nl</a>.</p><p className="wk-table-scroll-hint">Veeg horizontaal om alle kolommen te bekijken.</p><div className="mt-4 overflow-x-auto border-2 border-slate-200"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="px-3 py-3 font-black">Categorie</th><th className="px-3 py-3 font-black">Doel</th><th className="px-3 py-3 font-black">Status</th></tr></thead><tbody>{agencyPrivacyFacts.processors.map((processor) => <tr key={processor.name} className="border-t"><td className="px-3 py-3">{processor.name}</td><td className="px-3 py-3">{processor.purpose}</td><td className="px-3 py-3">{processor.verificationStatus}</td></tr>)}</tbody></table></div></section>
          <section className="border-2 border-amber-400 bg-amber-50 p-5"><h2 className="text-2xl font-black text-amber-950">DPA-aanvraag</h2><p className="mt-3 text-amber-950">Status: {agencyPrivacyFacts.dpa.status}. Wil je MatchPack voor echte kandidaatdata inzetten? Vraag vóór gebruik de actuele verwerkersinformatie en DPA op via contact@werkcv.nl. Beschrijf je use-case, landen/regio&apos;s en gewenste bewaartermijn. Tot die informatie feitelijk is geverifieerd en juridisch is beoordeeld, gebruik je fictieve of correct geautoriseerde CV&apos;s voor tests.</p></section>
        </div>
        <div className="mt-10 border-t-2 border-slate-900 pt-6 text-sm font-bold"><Link href="/agency" className="text-emerald-700 underline underline-offset-4">← Terug naar MatchPack</Link></div>
      </article>
    </main>
  );
}
