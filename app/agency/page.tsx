import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import AgencyCtaLink from "@/components/agency/AgencyCtaLink";
import PublicEditorSection from "@/components/public-editor/PublicEditorSection";
import { FAQJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { isAgencyDodoConfigured } from "@/lib/dodo";

export const metadata: Metadata = {
  title: "CV software voor recruitmentbureaus | WerkCV Agency Plan",
  description:
    "Maak tot 50 klantklare CV's per maand in jullie vaste WerkCV-route. Dutch-first opmaak, één branded route, PDF-output en maandelijkse opzegbaarheid.",
  alternates: { canonical: "https://werkcv.nl/agency" },
  openGraph: {
    title: "WerkCV Agency Plan — 50 CV's per maand",
    description: "Een vaste Dutch-first CV-route voor recruiters, detacheerders en bureaus.",
    url: "https://werkcv.nl/agency",
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const planItems = [
  "Tot 50 nieuwe CV's per actieve maandperiode",
  "Eén vaste branded CV-route voor jullie bureau",
  "Handmatige onboarding en template-instelling",
  "Dutch-first structuur en professionele PDF-export",
  "Priority support voor de agency-account",
  "Privacy- en retentieafspraken vooraf duidelijk",
];

const faqs = [
  {
    question: "Wat krijg ik voor €149 per maand?",
    answer:
      "Je krijgt één agency-account waarmee je tot 50 nieuwe CV's per actieve maandperiode kunt maken, bewerken en als PDF exporteren via één vaste branded WerkCV-route.",
  },
  {
    question: "Wat telt als één CV?",
    answer:
      "Een nieuw CV-document telt als één CV. Bewerken, opnieuw openen of opnieuw downloaden van hetzelfde document telt niet opnieuw.",
  },
  {
    question: "Rollen ongebruikte CV's door naar de volgende maand?",
    answer: "Nee. De limiet wordt elke nieuwe betaalde maandperiode opnieuw 50 CV's; ongebruikte CV's worden niet opgeteld bij de volgende periode.",
  },
  {
    question: "Kan ik opzeggen?",
    answer: "Ja. Je kunt opzeggen wanneer je wilt. Je behoudt toegang tot het einde van de betaalde periode.",
  },
  {
    question: "Krijgt mijn hele team toegang?",
    answer:
      "De eerste versie is één agency-account voor de betalende eigenaar. Gedeelde teamaccounts en uitgebreide rechten zijn een aparte vervolgstap en worden niet stilzwijgend beloofd.",
  },
  {
    question: "Ondersteunt WerkCV ATS- of ATS-integraties?",
    answer:
      "Het Agency Plan levert een vaste CV-workflow en PDF-output. ATS-integraties, bulkbeheer en meerdere workspaces vallen niet binnen dit eerste plan.",
  },
];

const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-center text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 disabled:cursor-wait disabled:opacity-60";

function PrimaryAgencyAction({ location }: { location: string }) {
  if (isAgencyDodoConfigured()) {
    return (
      <AgencyCheckoutButton
        location={location}
        label="Start WerkCV Agency — €149/maand"
        className={primaryButtonClass}
      />
    );
  }

  return (
    <AgencyCtaLink
      href="/contact"
      label="Neem contact op"
      location={`${location}_fallback`}
      className={primaryButtonClass}
    />
  );
}

export default function AgencyPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
          <Link href="/" className="text-xl font-black tracking-tight">
            Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
          </Link>
          <Link href="/login?next=%2Fagency%2Faccount" className="text-sm font-bold hover:text-emerald-700">Agency-account</Link>
        </header>

        <section className="py-14 text-center sm:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Voor recruitmentbureaus, CV-schrijvers en detacheerders</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Tot 50 klantklare CV&apos;s per maand in één vaste workflow.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Maak, bewerk en exporteer professionele PDF-CV&apos;s vanuit één Dutch-first route. Geen losse Word-bestanden en geen verborgen volumelogica.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryAgencyAction location="agency_hero" />
              <AgencyCtaLink
                href="#public-editor"
                label="Probeer de editor"
                location="agency_hero_demo"
                className="text-sm font-black text-slate-700 underline decoration-2 underline-offset-4 hover:text-emerald-700"
              />
            </div>
            <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2 text-xs font-bold text-slate-600">
              <span className="border border-slate-300 bg-white px-3 py-2">€149/maand</span>
              <span className="border border-slate-300 bg-white px-3 py-2">Tot 50 CV&apos;s</span>
              <span className="border border-slate-300 bg-white px-3 py-2">PDF-output</span>
              <span className="border border-slate-300 bg-white px-3 py-2">Opzegbaar</span>
            </div>
          </div>
        </section>

        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <PublicEditorSection
            locale="nl"
            flow="agency"
            source="public_editor_agency"
          />
        </div>

        <section className="grid gap-4 border-y-2 border-slate-900 py-8 sm:grid-cols-3">
          {[
            ["1", "Upload of begin leeg", "Importeer een bestaand CV of maak een nieuw document vanaf nul."],
            ["2", "Standaardiseer", "Gebruik één Dutch-first structuur en vaste branded route voor elk klantdocument."],
            ["3", "Exporteer als PDF", "Controleer de live preview en stuur een professioneel CV door."],
          ].map(([number, title, body]) => (
            <article key={number} className="flex gap-4 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-sm font-black">{number}</span>
              <div><h2 className="font-black">{title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p></div>
            </article>
          ))}
        </section>

        <section id="plan" className="border-y-2 border-slate-900 py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Één plan, helder afgebakend</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">WerkCV Agency Plan</h2>
              <p className="mt-3 max-w-2xl text-lg font-bold leading-relaxed text-slate-700">
                €149 per maand · tot 50 nieuwe CV&apos;s · opzegbaar wanneer je wilt.
              </p>
              <ul className="mt-6 grid gap-3 text-sm font-semibold leading-relaxed sm:grid-cols-2">
                {planItems.map((item) => <li key={item} className="flex gap-2"><span className="font-black text-emerald-700">✓</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="border-2 border-slate-900 bg-yellow-300 p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">Direct starten</p>
              <p className="mt-3 text-5xl font-black tracking-tight">€149</p>
              <p className="mt-1 text-sm font-black text-slate-700">per maand · tot 50 CV&apos;s</p>
              <div className="mt-6"><PrimaryAgencyAction location="agency_plan_card" /></div>
              <p className="mt-4 text-xs font-semibold leading-relaxed text-slate-700">Bewerken en opnieuw downloaden van hetzelfde CV telt niet opnieuw. Ongebruikte CV&apos;s rollen niet door.</p>
            </div>
          </div>
        </section>

        <section className="py-14">
          <h2 className="text-3xl font-black tracking-tight">Veelgestelde vragen</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => <details key={faq.question} className="border-2 border-slate-200 bg-white p-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{faq.answer}</p></details>)}
          </div>
        </section>

        <section className="border-2 border-slate-900 bg-slate-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Klaar om te starten?</p>
              <h2 className="mt-2 text-3xl font-black">Geef je bureau één vaste CV-route.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">Start met één account, maak tot 50 nieuwe CV&apos;s en betaal €149 per maand.</p>
            </div>
            <PrimaryAgencyAction location="agency_bottom" />
          </div>
        </section>
      </main>

      <FAQJsonLd questions={faqs} />
      <OrganizationJsonLd />
      <Footer />
    </div>
  );
}
