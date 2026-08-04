import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import B2BLeadForm from "@/components/b2b/B2BLeadForm";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import AgencyCtaLink from "@/components/agency/AgencyCtaLink";
import AgencyCvSamplePair from "@/components/agency/AgencyCvSamplePair";
import AgencyInteractiveDemo from "@/components/agency/AgencyInteractiveDemo";
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

const audienceItems = [
  "Recruitment- en staffingbureaus",
  "Detacheerders en consultancybureaus",
  "CV-schrijvers en career services",
  "Boutique agencies die consistente klantpresentatie nodig hebben",
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

const audienceOptions = [
  { value: "recruitment", label: "Recruitmentbureau" },
  { value: "staffing", label: "Staffing of detachering" },
  { value: "cv-writer", label: "CV-schrijver of career service" },
  { value: "consultancy", label: "Consultancybureau" },
  { value: "other", label: "Anders" },
];

const volumeOptions = [
  { value: "under-10", label: "Minder dan 10 per maand" },
  { value: "10-25", label: "10 tot 25 per maand" },
  { value: "26-50", label: "26 tot 50 per maand" },
  { value: "over-50", label: "Meer dan 50 per maand" },
  { value: "unknown", label: "Nog niet scherp" },
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
      href="#agency-contact"
      label="Bespreek je agency-account"
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
          <div className="flex items-center gap-4 text-sm font-bold">
            <Link href="/templates" className="hidden hover:text-emerald-700 sm:inline">Templates</Link>
            <Link href="/login?next=%2Fagency%2Faccount" className="hover:text-emerald-700">Agency-account</Link>
          </div>
        </header>

        <section className="grid gap-10 pb-14 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Voor recruitmentbureaus, CV-schrijvers en detacheerders</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              Tot 50 klantklare CV&apos;s per maand in jullie vaste huisstijl.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              WerkCV Agency geeft één account een duidelijke Dutch-first CV-route. Maak, bewerk en exporteer professionele PDF-CV&apos;s zonder telkens opnieuw te beginnen in Word.
            </p>
            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <PrimaryAgencyAction location="agency_hero" />
              <AgencyCtaLink
                href="#plan"
                label="Bekijk wat inbegrepen is"
                location="agency_hero_details"
                className="text-sm font-black text-slate-700 underline decoration-2 underline-offset-4 hover:text-emerald-700"
              />
              <AgencyCtaLink
                href="#agency-demo"
                label="Probeer de interactieve demo"
                location="agency_hero_demo"
                className="text-sm font-black text-slate-700 underline decoration-2 underline-offset-4 hover:text-emerald-700"
              />
            </div>
            <div className="mt-6 grid max-w-xl grid-cols-2 gap-2 text-xs font-bold text-slate-600 sm:grid-cols-4">
              <span className="border border-slate-300 bg-white px-3 py-2">€149/maand</span>
              <span className="border border-slate-300 bg-white px-3 py-2">50 CV&apos;s</span>
              <span className="border border-slate-300 bg-white px-3 py-2">PDF-output</span>
              <span className="border border-slate-300 bg-white px-3 py-2">Opzegbaar</span>
            </div>
          </div>

          <div className="border-2 border-slate-900 bg-slate-950 p-4 shadow-[8px_8px_0px_0px_rgba(78,205,196,1)] sm:p-6">
            <div className="border-2 border-slate-900 bg-white p-5 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">WerkCV Agency Plan</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                <p className="text-5xl font-black tracking-tight">€149</p>
                <p className="pb-1 text-sm font-black text-slate-600">per maand</p>
              </div>
              <p className="mt-3 border-y-2 border-slate-200 py-3 text-lg font-black">Tot 50 nieuwe CV&apos;s per actieve maandperiode</p>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-relaxed">
                {planItems.map((item) => <li key={item} className="flex gap-2"><span className="font-black text-emerald-700">✓</span><span>{item}</span></li>)}
              </ul>
              <div className="mt-6"><PrimaryAgencyAction location="agency_plan_card" /></div>
              <p className="mt-4 text-center text-xs font-semibold text-slate-500">Eén duidelijke account. Eén limiet. Geen verborgen volumelogica.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 border-y-2 border-slate-900 py-8 sm:grid-cols-3">
          {[
            ["1", "Vaste route", "Je bureau krijgt één herkenbare CV-opmaak en werkwijze."],
            ["2", "50 CV's", "Maak nieuwe kandidaat-CV's binnen je actieve maandperiode."],
            ["3", "PDF klaar", "Bewerk, controleer en exporteer een document dat je kunt doorsturen."],
          ].map(([number, title, body]) => (
            <article key={number} className="flex gap-4 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-sm font-black">{number}</span>
              <div><h2 className="font-black">{title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p></div>
            </article>
          ))}
        </section>

        <section className="grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Het probleem dat je oplost</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Geen losse Word-bestanden meer tussen intake en opdrachtgever.</h2>
            <p className="mt-4 leading-relaxed text-slate-600">Kandidaat-CV&apos;s komen binnen met verschillende stijlen, volgordes en detailniveaus. WerkCV geeft je een vaste Nederlandse basis, zodat elk document rustiger en herkenbaarder uit jullie bureau komt.</p>
            <ul className="mt-6 space-y-3 text-sm font-bold">
              {[
                "Minder tijd kwijt aan koppen, marges en opmaak herstellen",
                "Consistente presentatie voor kandidaten en opdrachtgevers",
                "Een duidelijke Dutch-first structuur in plaats van generieke templates",
                "Geen zwaar ATS-traject nodig om te starten",
              ].map((item) => <li key={item} className="flex gap-2"><span className="text-emerald-700">✓</span>{item}</li>)}
            </ul>
          </div>
          <div>
            <AgencyCvSamplePair />
          </div>
        </section>

        <AgencyInteractiveDemo />

        <section id="plan" className="grid gap-8 border-y-2 border-slate-900 py-14 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Wat je koopt</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Één product, helder afgebakend.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {audienceItems.map((item) => <div key={item} className="border-2 border-slate-200 bg-white p-4 text-sm font-bold">{item}</div>)}
            </div>
          </div>
          <div className="border-2 border-slate-900 bg-yellow-300 p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-2xl font-black">Voor €149 per maand krijg je</h3>
            <ul className="mt-5 space-y-3 text-sm font-bold leading-relaxed">
              {planItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
            <p className="mt-5 border-t-2 border-slate-900 pt-4 text-xs font-semibold leading-relaxed text-slate-700">Bewerken en opnieuw downloaden van hetzelfde CV kost geen extra slot. Ongebruikte CV&apos;s rollen niet door.</p>
          </div>
        </section>

        <section className="grid gap-6 py-14 md:grid-cols-3">
          {[
            ["Dutch-first", "Structuur en opmaak die passen bij Nederlandse vacatures en klantpresentatie."],
            ["Handmatige setup", "We zetten één branded route zorgvuldig voor je account klaar."],
            ["Privacy duidelijk", "Retentie, redactie en gebruik van kandidaatdata spreken we vooraf concreet af."],
          ].map(([title, body]) => <article key={title} className="border-2 border-slate-900 bg-white p-5"><h3 className="text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p></article>)}
        </section>

        <section className="border-2 border-slate-900 bg-slate-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Klaar om te starten?</p><h2 className="mt-2 text-3xl font-black">Geef je bureau één vaste CV-route.</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">Betaal €149 per maand en maak tot 50 nieuwe CV&apos;s binnen je actieve periode.</p></div>
            <PrimaryAgencyAction location="agency_bottom" />
          </div>
        </section>

        <section className="py-14">
          <h2 className="text-3xl font-black tracking-tight">Veelgestelde vragen</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => <details key={faq.question} className="border-2 border-slate-200 bg-white p-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{faq.answer}</p></details>)}
          </div>
        </section>

        <section id="agency-contact" className="grid gap-8 border-t-2 border-slate-900 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Liever eerst overleggen?</p>
            <h2 className="mt-3 text-3xl font-black">Heb je een specifieke huisstijl- of privacyvraag?</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">Gebruik het formulier als je eerst wilt controleren of één account en 50 CV&apos;s passen bij jullie volume. Voor een standaard aankoop blijft de directe checkout de snelste route.</p>
          </div>
          <B2BLeadForm
            pageType="agency"
            pagePath="/agency"
            title="Stel je agency-vraag"
            description="We reageren normaal binnen 1 tot 2 werkdagen over huisstijl, volume, privacy of onboarding."
            submitLabel="Verstuur vraag"
            audienceLabel="Type organisatie"
            audienceOptions={audienceOptions}
            rolePlaceholder="Bijvoorbeeld eigenaar, recruiter of consultant"
            volumeLabel="Hoeveel CV's verwerk je per maand?"
            volumeOptions={volumeOptions}
            goalLabel="Waar wil je duidelijkheid over?"
            goalPlaceholder="Beschrijf kort je huidige werkwijze, huisstijl, volume of privacyvraag."
            notesPlaceholder="Optioneel: link naar je website of voorbeeldoutput."
            successMessage="Ontvangen. We reageren normaal binnen 1 tot 2 werkdagen."
          />
        </section>
      </main>

      <FAQJsonLd questions={faqs} />
      <OrganizationJsonLd />
      <Footer />
    </div>
  );
}
