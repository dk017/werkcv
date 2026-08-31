import type { Metadata } from "next";
import Link from "next/link";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { getTemplateConfig } from "@/lib/templates/registry";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { RoleCvPrefillPanel } from "@/components/cv-voorbeelden/RoleCvPrefillPanel";
import { UseExampleButton } from "@/components/cv-voorbeelden/UseExampleButton";
import { administratiefMedewerker } from "@/lib/cv-voorbeelden/examples/zakelijk-en-financieel/administratief-medewerker";
import { getCitedAuthorityRouteConfig } from "@/lib/cited-authority-conversion";

const professionalTemplate = getTemplateConfig("professional");
const atsTemplate = getTemplateConfig("ats");
const simpleTemplate = getTemplateConfig("simple");
const citedAuthorityConfig = getCitedAuthorityRouteConfig("/cv-template-administratief-medewerker");

const recruiterSignals = [
  "Foutarme administratie en nauwkeurige verwerking onder tijdsdruk.",
  "Duidelijke ervaring met systemen zoals Excel, AFAS, Exact of SAP.",
  "Structuur in planning, dossiervorming en opvolging van acties.",
  "Heldere communicatie met collega's, leveranciers en klanten.",
];

const templateCards = [
  {
    label: "Beste allround keuze",
    name: professionalTemplate.nameDutch,
    body: "Rustige, zakelijke layout voor administratieve rollen waar betrouwbaarheid en overzicht centraal staan.",
    fit: "Past goed bij: administratief medewerker, backoffice, office support, secretarieel.",
    templateId: professionalTemplate.id,
  },
  {
    label: "Voor maximale ATS-veiligheid",
    name: atsTemplate.nameDutch,
    body: "Ultrascanbare structuur voor vacatures met veel sollicitanten en strikte ATS-selectie.",
    fit: "Past goed bij: corporate vacatures, uitzendportals, grote werkgevers.",
    templateId: atsTemplate.id,
  },
  {
    label: "Voor starters en korte CV's",
    name: simpleTemplate.nameDutch,
    body: "Eenvoudige template die je profiel, vaardigheden en stage-ervaring compact presenteert.",
    fit: "Past goed bij: junior kandidaten, carrièreswitchers, weinig werkervaring.",
    templateId: simpleTemplate.id,
  },
];

const profileExamples = [
  {
    title: "Algemeen administratief medewerker (medior)",
    text: "Nauwkeurige administratief medewerker met 5+ jaar ervaring in facturatie, dossierbeheer en agendacoordinatie. Verminderde correcties in de maandafsluiting met 28% door extra controlepunten in het proces. Ik breng structuur, betrouwbaarheid en rust in teams met hoge werkdruk.",
  },
  {
    title: "Starter / junior",
    text: "Gemotiveerde administratieve starter met stage-ervaring in documentverwerking, klantcontact en planning. Tijdens mijn stage heb ik een Excel-overzicht ingericht waardoor openstaande acties dagelijks inzichtelijk waren voor het team. Ik zoek een junior rol waarin ik nauwkeurigheid en leersnelheid combineer.",
  },
  {
    title: "Financieel administratief",
    text: "Financieel administratief medewerker met 4 jaar ervaring in debiteurenbeheer, factuurcontrole en ondersteuning van maandafsluitingen. Ik heb de doorlooptijd van factuurverwerking met 22% verkort door een standaard workflow in te voeren tussen inkoop en finance. Ik wil bijdragen aan een foutarme en voorspelbare administratie.",
  },
  {
    title: "Secretarieel / office support",
    text: "Servicegerichte office support professional met 6 jaar ervaring in complex agendabeheer, correspondentie en verslaglegging. Ik verbeterde de interne opvolging van vergaderacties door een uniforme notule- en reminderstructuur, waardoor deadlines consistenter werden gehaald. Ik ondersteun teams proactief met overzicht en prioritering.",
  },
];

const impactBullets = [
  "Factuurcontrole gestandaardiseerd; aantal correcties daalde met 32%.",
  "Digitaal dossierbeheer ingericht waardoor terugvindtijd van documenten sterk afnam.",
  "Openstaande acties wekelijks geborgd met statusrapportage; minder ad-hoc escalaties.",
  "Agendaproces geoptimaliseerd voor meerdere stakeholders, inclusief conflictvrije planning.",
  "Debiteurenopvolging aangescherpt; DSO verkort door consequente opvolgmomenten.",
  "Inkomende post- en mailboxstromen geprioriteerd met vaste SLA-afspraken binnen het team.",
  "Maandafsluiting ondersteund met controlelijsten; betere tijdigheid en minder herstelwerk.",
  "Interne overdracht verbeterd met heldere templates voor notulen, actielijsten en follow-up.",
];

const hardSkills = [
  "Microsoft Excel (draaitabellen, formules, controles)",
  "Office 365 (Outlook, Word, Teams, SharePoint)",
  "AFAS, Exact of SAP (afhankelijk van je ervaring)",
  "Facturatie en basisboekhouding",
  "Dossier- en documentbeheer",
  "Agendabeheer en vergaderondersteuning",
];

const softSkills = [
  "Nauwkeurigheid en kwaliteitsbewustzijn",
  "Prioriteiten stellen in drukke periodes",
  "Discretie met vertrouwelijke informatie",
  "Samenwerken met meerdere afdelingen",
  "Klantvriendelijke en duidelijke communicatie",
  "Eigenaarschap op opvolging en deadlines",
];

const atsKeywords = [
  "administratief medewerker",
  "facturatie",
  "dossierbeheer",
  "agendabeheer",
  "documentverwerking",
  "debiteurenbeheer",
  "Office 365",
  "Excel",
  "AFAS",
  "Exact",
  "SAP",
  "maandafsluiting",
];

const starterPlan = [
  "Begin met een profieltekst die stage, bijbaan of vrijwilligerswerk omzet naar relevante administratieve skills.",
  "Voeg een aparte sectie toe met softwarekennis (Excel, Outlook, Teams) inclusief niveau.",
  "Gebruik 3 tot 5 taak-resultaat bullets, ook als resultaten klein zijn (bijvoorbeeld snellere verwerking of minder fouten).",
  "Toon betrouwbaarheid met concrete voorbeelden van planning, opvolging en nauwkeurigheid.",
];

const mistakes = [
  "Alleen taken opsommen zonder resultaat of verbeterimpact.",
  "Software vermelden die je nauwelijks beheerst.",
  "Een druk design kiezen waardoor scanbaarheid daalt.",
  "Eenzelfde CV gebruiken voor elke vacature zonder keyword-aanpassing.",
];

const faqs = [
  {
    question: "Wat is het beste cv template voor administratief medewerker?",
    answer:
      "Meestal werkt een rustige, professionele template het beste. Recruiters in administratie letten vooral op overzicht, structuur en betrouwbaarheid. Voor extra ATS-veiligheid kun je een ATS-vriendelijke layout kiezen.",
  },
  {
    question: "Welke vaardigheden moet ik noemen op een administratief CV?",
    answer:
      "Noem zowel hard skills (Excel, Office 365, AFAS/Exact/SAP, facturatie, dossierbeheer) als soft skills (nauwkeurigheid, prioritering, communicatie, discretie). Koppel ze waar mogelijk aan een concreet resultaat.",
  },
  {
    question: "Hoe maak ik een administratief CV zonder veel ervaring?",
    answer:
      "Gebruik stage, bijbaan of vrijwilligerswerk als bewijs voor administratieve kernskills. Laat zien hoe je documenten beheerde, acties opvolgde, planningen bewaakte of gegevens foutarm verwerkte.",
  },
  {
    question: "Wat is beter: cv voorbeeld of cv template?",
    answer:
      "Een voorbeeld helpt je met inhoud en formuleringen. Een template helpt je met structuur en presentatie. De beste aanpak is beide combineren: begin met een template en gebruik voorbeelden voor tekst en bullets.",
  },
];

const adminTemplateIntentLinks = [
  {
    href: "/cv-gids/cv-voorbeeld-administratief-medewerker-parttime",
    label: "CV voorbeeld administratief medewerker parttime",
    description: "Gebruik deze variant als je beschikbaarheid, overdracht en parttime uren extra goed moet positioneren.",
  },
  {
    href: "/cv-maken",
    label: "CV aanmaken voor administratief werk",
    description: "Gebruik een directe route naar een rustige sollicitatieversie voor administratie en backoffice.",
  },
  {
    href: "/gratis-cv-template",
    label: "Gratis CV template kiezen",
    description: "Vergelijk eerst gratis layout-opties voordat je je admin-CV definitief maakt.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met template",
    description: "Start vanuit een templateflow in plaats van losse layoutkeuzes in Word.",
  },
  {
    href: "/professioneel-cv-template",
    label: "Professioneel CV template vergelijken",
    description: "Handig als je vooral betrouwbaarheid en structuur wilt uitstralen.",
  },
  {
    href: "/ats-cv-template",
    label: "ATS CV template voor administratie",
    description: "Relevant voor corporate vacatures en portals met striktere softwareselectie.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Administratief Medewerker - Direct Sollicitatieklaar | WerkCV",
  description:
    "Gebruik het beste CV template voor administratief medewerker. Inclusief profieltekst voorbeelden, werkervaring bullets, ATS-keywords en startertips. Start gratis in de editor.",
  keywords: [
    "cv template administratief medewerker",
    "administratief medewerker cv template",
    "cv voorbeeld administratief medewerker template",
    "financieel administratief medewerker cv",
    "office support cv template",
    "secretarieel cv template",
    "administratief cv maken",
    "cv administratie voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-administratief-medewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-administratief-medewerker",
      "x-default": "https://werkcv.nl/cv-template-administratief-medewerker",
    },
  },
};

export default function CvTemplateAdministratiefMedewerkerPage() {
  if (!citedAuthorityConfig) throw new Error("Missing cited-authority admin template route config");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "CV Template Administratief Medewerker",
        item: "https://werkcv.nl/cv-template-administratief-medewerker",
      },
    ],
  };

  return (
    <div className="wk-editorial-page">
      <main className="wk-editorial-main">
        <section className="wk-editorial-hero mb-14 grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div>
            <p className="wk-editorial-kicker mb-3">
              Rol-intent: administratie
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[var(--wk-ink)] md:text-5xl">
              CV template administratief medewerker dat direct betrouwbaar en professioneel overkomt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              Sollicitaties voor administratieve functies vragen om duidelijke details: nauwkeurigheid, structuur, softwarekennis en opvolging. Op deze pagina combineer je een rustige
              CV-template met profielteksten, werkervaringbullets en relevante vacaturetermen die je met je eigen bewijs kunt invullen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#prefilled-role-cv"
                className="wk-button wk-button-primary"
              >
                Bekijk ingevuld admin-CV
              </Link>
              <Link
                href="/cv-gids/cv-voorbeeld-administratief-medewerker"
                className="wk-button wk-button-secondary"
              >
                Bekijk volledig CV voorbeeld
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Template + inhoud in één flow",
                "ATS-keywords voor administratie",
                "Gratis starten, later downloaden",
              ].map((item) => (
                <div
                  key={item}
                  className="wk-trust-pill justify-center px-4 py-3 text-center normal-case tracking-normal"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="wk-editorial-card h-fit p-6">
            <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[var(--wk-ink)]">Wat recruiters voor administratie direct willen zien</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {recruiterSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t border-[var(--wk-border)] pt-5">
              <Link
                href="/tools/cv-keywords"
                className="text-sm font-extrabold text-[var(--wk-primary)] underline decoration-2 underline-offset-4"
              >
                Controleer je vacaturematch met de CV keywords tool
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Template-keuze
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke CV template werkt het best voor administratief medewerker?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {templateCards.map((card) => (
              <article
                key={card.name}
                className="wk-editorial-card flex h-full flex-col p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                  {card.label}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">{card.name}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.fit}</p>
                <div className="mt-auto pt-5">
                  <TrackedLandingLink
                    href={`/editor?template=${encodeURIComponent(card.templateId)}&startSource=${encodeURIComponent(`cited_authority_admin_template_empty_${card.templateId}`)}`}
                    trackingLocation="cited_authority:admin_cv:empty_template"
                    trackingLabel={`cited_authority_admin_template:empty_${card.templateId}`}
                    startCvContext={{
                      entryPoint: `cited_authority_admin_template_empty_${card.templateId}`,
                      templateId: card.templateId,
                      pagePath: "/cv-template-administratief-medewerker",
                      uiLanguage: "nl",
                    }}
                    className="wk-button wk-button-primary"
                  >
                    Start leeg met {card.name}
                  </TrackedLandingLink>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <Link
              href="/professioneel-cv-template"
              className="wk-editorial-card-link p-4 text-sm font-extrabold"
            >
              Vergelijk met professioneel CV template
            </Link>
            <Link
              href="/ats-cv-template"
              className="wk-editorial-card-link p-4 text-sm font-extrabold"
            >
              Vergelijk met ATS CV template
            </Link>
            <Link
              href="/templates"
              className="wk-editorial-card-link p-4 text-sm font-extrabold"
            >
              Bekijk alle templates
            </Link>
            <Link
              href="/cv-template-klantenservice-medewerker"
              className="wk-editorial-card-link p-4 text-sm font-extrabold"
            >
              Bekijk klantenservice variant
            </Link>
            <Link
              href="/cv-template-office-manager"
              className="wk-editorial-card-link p-4 text-sm font-extrabold"
            >
              Bekijk office manager variant
            </Link>
          </div>
          <div className="wk-editorial-card mt-8 p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Template-intentie
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Van administratieve templatekeuze naar de juiste CV-route
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Deze vervolgstappen helpen je om vanuit een rolgerichte template door te gaan naar de juiste aanmaak-, template- of ATS-route zonder je structuur opnieuw te hoeven uitvinden.
            </p>
            <SectionIntentLinks links={adminTemplateIntentLinks} locale="nl" />
          </div>
        </section>

        <div className="mb-14">
          <RoleCvPrefillPanel
            roleLabel="administratief medewerker"
            templateId={citedAuthorityConfig.templateId}
            colorThemeId={administratiefMedewerker.colorThemeId}
            sampleCV={administratiefMedewerker.sampleCV}
            proofItems={["Dossier- en factuurbeheer", "Excel, AFAS en Exact", "Procesresultaten"]}
            startSource={citedAuthorityConfig.startSource}
            canonicalPath={citedAuthorityConfig.canonicalPath}
            heading="Bekijk de administratieve opmaak met volledige fictieve inhoud"
            primaryLabel="Open ingevuld admin-CV"
            eyebrow="Voorbeeldinhoud + template"
            citedAuthorityIntentId="admin_cv"
          />
        </div>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready profieltekst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden voor administratieve functies
          </h2>
          <div className="mt-6 space-y-5">
            {profileExamples.map((example) => (
              <article
                key={example.title}
                className="wk-editorial-card p-6"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools/profieltekst-generator"
              className="wk-button wk-button-primary"
            >
              Genereer profieltekst
            </Link>
            <Link
              href="/profieltekst-cv-voorbeelden"
              className="wk-button wk-button-secondary"
            >
              Meer profieltekst voorbeelden
            </Link>
            <Link
              href="/sollicitatiebrief-voorbeeld-administratief-medewerker"
              className="wk-button wk-button-secondary"
            >
              Voorbeeld sollicitatiebrief admin
            </Link>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="wk-editorial-card p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Werkervaring bullets
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Sterke bullets voor je administratief CV
            </h2>
            <ul className="mt-5 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {impactBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/werkervaring-bullets"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Maak bullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="wk-editorial-card p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + ATS termen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Vaardigheden en keywords die vaak terugkomen in vacatures
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="wk-editorial-card-muted p-4">
                <p className="text-sm font-black text-black">Hard skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {hardSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="wk-editorial-card-muted p-4">
                <p className="text-sm font-black text-black">Soft skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {softSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                ATS keyword bank
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                {atsKeywords.join(" | ")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="wk-editorial-card-dark p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Zonder ervaring
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Zo bouw je een sterk administratief CV als starter
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {starterPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="wk-editorial-card p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat je CV onduidelijk of minder geloofwaardig kan maken
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/cv-gids/cv-voorbeeld-administratief-medewerker"
                className="text-sm font-extrabold text-[var(--wk-primary)] underline decoration-2 underline-offset-4"
              >
                Bekijk ook: volledig CV voorbeeld administratief medewerker
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een CV template voor administratief medewerker
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="wk-editorial-card group"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-[var(--wk-border)] px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="wk-editorial-card-dark px-6 py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Klaar om je administratief CV af te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw je CV in de editor en download wanneer je tevreden bent
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start gratis met een professionele template, gebruik de voorbeelden op deze pagina en rond af met een sollicitatieklare PDF.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <UseExampleButton
                templateId={citedAuthorityConfig.templateId}
                colorThemeId={administratiefMedewerker.colorThemeId}
                sampleCV={administratiefMedewerker.sampleCV}
                label="Open ingevuld admin-CV"
                startSource={citedAuthorityConfig.startSource}
                pagePath={citedAuthorityConfig.canonicalPath}
                uiLanguage="nl"
                trackingLocation="cited_authority:admin_cv:primary"
                trackingLabel="cited_authority_admin_template:open_editor"
              />
              <Link
                href="/prijzen"
                className="wk-button wk-button-primary"
              >
                Bekijk prijzen
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

    </div>
  );
}
