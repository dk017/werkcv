import { cvDownloadPrice } from "@/lib/site-content";
import type { CvCheckLocale } from "./types";

/** Shown as "Laatst bijgewerkt" on the CV-check pages; update when the copy or checks change. */
export const CV_CHECK_PAGE_UPDATED = { iso: "2026-09-26", nl: "26 september 2026", en: "26 September 2026" } as const;

export type CvCheckLandingVariant = "general" | "vacancy";

export type CvCheckLandingContent = {
  locale: CvCheckLocale;
  variant: CvCheckLandingVariant;
  path: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  eyebrow: string;
  h1: string;
  /** First paragraph; written to work as a quotable answer. */
  intro: string;
  updatedLabel: string;
  pills: string[];
  methodologyHref: string;
  editorHref: string;
  /** Link to the sibling page (general ↔ vacancy). */
  switchLink: { href: string; label: string };
  whatWeCheckTitle: string;
  whatWeCheck: Array<{ title: string; body: string }>;
  whatWeCheckNote: string;
  differenceTitle: string;
  difference: string[];
  atsTitle: string;
  ats: string[];
  limitsTitle: string;
  limits: { does: string; doesNot: string; doesLabel: string; doesNotLabel: string };
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  relatedTitle: string;
  related: Array<{ href: string; label: string; body: string }>;
};

const NL_WHAT_WE_CHECK = [
  {
    title: "Leesbaarheid voor systemen",
    body: "Scans, twee kolommen, tekstvakken en kop- of voetteksten die sollicitatiesystemen verkeerd of niet lezen. Je ziet ook wat een systeem uit je cv haalt.",
  },
  { title: "Basis en contact", body: "Naam, e-mail, telefoon, woonplaats en LinkedIn: kan een recruiter je direct bereiken?" },
  { title: "Inhoud en bewijs", body: "Een concrete profieltekst, resultaten met cijfers, actieve werkwoorden en consistente data." },
  {
    title: "Nederlandse conventies",
    body: "Taalniveaus (moedertaal of A1–C2), mbo/hbo/wo, lengte, gevoelige gegevens zoals je BSN, en waar relevant VOG, BIG-registratie of rijbewijs.",
  },
];

const EN_WHAT_WE_CHECK = [
  {
    title: "Readable by systems",
    body: "Scans, two-column layouts, text boxes and headers or footers that application systems misread or skip. You also see what a system extracts from your CV.",
  },
  { title: "Basics and contact", body: "Name, email, phone, city and LinkedIn: can a recruiter reach you straight away?" },
  { title: "Content and evidence", body: "A concrete profile, results with numbers, active verbs and consistent dates." },
  {
    title: "Dutch conventions",
    body: "Language levels (native or CEFR A1–C2), MBO/HBO/WO, length, sensitive data such as a BSN, and where relevant a VOG, BIG registration or driving licence.",
  },
];

const NL_DIFFERENCE = [
  "Per eis uit de vacature zie je of je cv die aantoont, met een citaat uit de vacature én uit je cv. Geen losse percentages zonder uitleg.",
  "Je ziet wat een sollicitatiesysteem uit je cv leest: naam, contact, functies en kopjes. Zo zie je zelf of er iets misgaat.",
  "Nederlandse regels zitten erin: moedertaal telt als hoogste taalniveau, een 'pre' is geen harde eis, en een VOG of BIG-registratie noemen we alleen als je rol erom vraagt.",
  "Werkt met pdf, Word (docx) en geplakte tekst, in het Nederlands en het Engels.",
  "Het cijfer wordt in code berekend volgens een gepubliceerde methode. AI geeft nooit zelf een cijfer.",
];

const EN_DIFFERENCE = [
  "For each requirement in the job ad you see whether your CV shows it, with a quote from the job ad and from your CV. No unexplained percentages.",
  "You see what an application system reads from your CV: name, contact details, job titles and headings, so you can spot problems yourself.",
  "Dutch rules are built in: native counts as the highest language level, a 'pre' is a nice-to-have rather than a hard requirement, and a VOG or BIG registration is only mentioned when the role needs it.",
  "Works with PDF, Word (docx) and pasted text, in English and Dutch.",
  "The grade is calculated in code using a published method. AI never sets the grade itself.",
];

const NL_ATS = [
  "Een ATS (applicant tracking system) is het systeem waarin werkgevers en recruitmentbureaus sollicitaties ontvangen. Het leest je cv uit naar velden zoals naam, functies en opleiding, en recruiters zoeken en filteren daarin.",
  "Een cv dat er voor mensen goed uitziet, kan voor zo'n systeem slecht leesbaar zijn: twee kolommen worden door elkaar gelezen, contactgegevens in een koptekst vallen weg en een gescande pdf bevat geen tekst. Dan vindt een recruiter je minder snel.",
  "Het bekende cijfer dat '75% van de cv's automatisch wordt afgewezen' heeft geen onderzoek als basis. Systemen wijzen zelden zelf af; mensen beslissen. Daarom kijkt deze check naar leesbaarheid, inhoud en aansluiting, niet naar een verzonnen 'ATS-score'.",
];

const EN_ATS = [
  "An ATS (applicant tracking system) is where employers and recruitment agencies receive applications. It extracts your CV into fields such as name, job titles and education, and recruiters search and filter those fields.",
  "A CV that looks good to people can be hard for such a system to read: two columns get mixed up, contact details in a header disappear and a scanned PDF contains no text at all. Recruiters then find you less easily.",
  "The popular claim that '75% of CVs are rejected automatically' has no study behind it. Systems rarely reject on their own; people decide. That is why this check looks at readability, content and fit, not at an invented 'ATS score'.",
];

const NL_GENERAL_FAQ = [
  {
    question: "Is de cv-check gratis?",
    answer: `Ja. Je krijgt het volledige rapport zonder account en zonder e-mailadres, ook de vergelijking met een vacature. Opnieuw checken na aanpassingen is ook gratis. Alleen als je je cv in de WerkCV-editor verbetert en als PDF downloadt, betaal je eenmalig ${cvDownloadPrice.display}, zonder abonnement.`,
  },
  {
    question: "Wordt mijn cv opgeslagen?",
    answer:
      "Nee. Je cv en de vacaturetekst worden alleen voor deze check gebruikt en daarna niet bewaard. In statistieken bewaren we geen cv-tekst, alleen technische gegevens zoals de duur van de check en welke controles niet slaagden.",
  },
  {
    question: "Wat doet een cv scanner of ATS checker precies?",
    answer:
      "Een ATS checker kijkt of software je cv goed kan uitlezen: kopjes, datums, contactgegevens en opmaak zoals kolommen of tekstvakken. Deze cv-check doet dat ook en kijkt daarnaast naar inhoud, Nederlandse conventies en, als je een vacature plakt, de aansluiting op die vacature.",
  },
  {
    question: "Wijst een ATS mijn cv automatisch af?",
    answer:
      "Zelden. Een sollicitatiesysteem leest vooral je gegevens uit en recruiters zoeken en filteren daarin. Het bekende cijfer dat '75% van de cv's door de ATS wordt afgewezen' heeft geen onderzoek als basis. Wat wel telt: dat het systeem je cv goed kan lezen, dat je de gevraagde ervaring aantoont en dat een recruiter dat snel ziet.",
  },
  {
    question: "Wat betekent mijn cijfer?",
    answer:
      "Het cijfer (1 tot 10) vat vier onderdelen samen: leesbaarheid voor systemen, basis en contact, inhoud en bewijs, en Nederlandse conventies. Met een vacature telt de aansluiting op de vacature voor de helft mee. Een ernstig probleem, zoals een gescande pdf of je BSN op je cv, houdt het cijfer onder de 5,5 tot je het oplost.",
  },
  {
    question: "Kan ik mijn cv door AI laten checken?",
    answer:
      "Ja. AI beoordeelt wat taalgevoel vraagt, zoals holle woorden in je profiel en welke eisen in een vacature staan. Vaste regels controleren de rest, zoals opbouw, datums en taalniveaus. Het cijfer rekenen we in code uit, zodat het controleerbaar is.",
  },
  {
    question: "Welke Nederlandse regels controleert de check?",
    answer:
      "Onder meer taalniveaus (moedertaal of A1–C2), een herkenbaar opleidingsniveau (mbo, hbo, wo), de lengte van je cv, of er gevoelige gegevens zoals je BSN op staan, en waar het past een VOG, BIG-registratie of rijbewijs. Foto, geboortedatum en nationaliteit zijn in Nederland optioneel; die noemen we alleen ter info.",
  },
  {
    question: "Is cv laten nakijken door een tool hetzelfde als een persoonlijke review?",
    answer:
      "Nee. De check vindt snel veelvoorkomende fouten en laat zien wat ontbreekt. Voor senior functies, een carrièreswitch of twijfel over hoe je jezelf positioneert, geeft een loopbaancoach of recruiter extra waarde. Gebruik de check dan als eerste ronde.",
  },
  {
    question: "Kan ik mijn cv daarna verbeteren in WerkCV?",
    answer: `Ja. Upload je cv in de WerkCV-editor, pas de punten uit het rapport aan en check opnieuw. Je betaalt pas bij het downloaden van je PDF: eenmalig ${cvDownloadPrice.display}.`,
  },
];

const NL_VACANCY_FAQ = [
  {
    question: "Hoe vergelijk ik mijn cv met een vacature?",
    answer:
      "Upload je cv (pdf of Word) of plak de tekst, en plak de volledige vacaturetekst in het tweede veld. Je ziet per eis uit de vacature of je cv die aantoont, met een citaat uit de vacature en waar mogelijk uit je cv, plus de punten die je als eerste aanpast.",
  },
  {
    question: "Wat is het verschil tussen een harde eis en een 'pre'?",
    answer:
      "Een harde eis ('vereist', 'je hebt') moet je aantonen om serieus mee te doen. Een 'pre' of 'is een pluspunt' is een voordeel, geen voorwaarde. De check zet harde eisen bovenaan en telt een pre als pluspunt.",
  },
  {
    question: "Moet ik woorden uit de vacature overnemen in mijn cv?",
    answer:
      "Ja, als ze kloppen. Recruiters zoeken in sollicitatiesystemen op termen uit de vacature, dus gebruik dezelfde woorden voor ervaring en vaardigheden die je echt hebt. Neem nooit ervaring over die je niet hebt; de check stelt dat ook nooit voor.",
  },
  {
    question: "Hoe gaat de check om met taalniveaus en opleiding?",
    answer:
      "Volgens Nederlandse gewoontes: moedertaal telt als het hoogste niveau, B2 of C1 voldoet aan 'goede beheersing', en een gelijk of hoger opleidingsniveau voldoet aan een gevraagd werk- en denkniveau (mbo, hbo, wo).",
  },
  {
    question: "Wat als de vacature in het Engels is en mijn cv in het Nederlands?",
    answer:
      "Dan meldt de check dat. Meestal solliciteer je het best in de taal van de vacature. De vergelijking zelf werkt in beide talen.",
  },
  {
    question: "Is de vergelijking gratis en wordt mijn cv bewaard?",
    answer: `De vergelijking is gratis, zonder account. Je cv en de vacature worden niet opgeslagen. Alleen als je je cv in WerkCV aanpast en als PDF downloadt, betaal je eenmalig ${cvDownloadPrice.display}.`,
  },
];

const EN_GENERAL_FAQ = [
  {
    question: "Is the CV check free?",
    answer: `Yes. You get the full report without an account or email address, including the comparison with a job ad, and re-checking after edits is free too. You only pay ${cvDownloadPrice.displayEn} once, with no subscription, if you improve your CV in the WerkCV editor and download it as a PDF.`,
  },
  {
    question: "Is my CV stored?",
    answer:
      "No. Your CV and the job ad are only used for this check and are not kept. Our statistics contain no CV text, only technical data such as how long the check took and which checks did not pass.",
  },
  {
    question: "Will an ATS automatically reject my CV?",
    answer:
      "Rarely. An applicant tracking system mostly extracts your details, and recruiters search and filter them. The popular claim that '75% of CVs are rejected by the ATS' has no study behind it. What matters is that systems can read your CV correctly, that you show the requested experience, and that a recruiter can see it quickly.",
  },
  {
    question: "What does the check look at for jobs in the Netherlands?",
    answer:
      "Among other things: a language level per language (native or CEFR A1–C2; Dutch employers often ask for B2 or higher), a recognisable education level (MBO, HBO/bachelor, WO/master), a length of 1–2 pages, sensitive data such as a BSN, and where relevant a VOG, BIG registration or driving licence.",
  },
  {
    question: "Should I include a photo on a Dutch CV?",
    answer:
      "It is optional. Many employers in the Netherlands, especially larger and international ones, do not expect one. The check mentions a photo, date of birth or nationality for information only; they never lower your grade.",
  },
  {
    question: "Should references be on a Dutch CV?",
    answer:
      "Usually not. Dutch employers ask for references later in the process if they need them. A line such as 'references available on request' is not needed either.",
  },
  {
    question: "Should my CV be in Dutch or English?",
    answer:
      "Use the language of the job ad. English CVs are common for international roles in the Netherlands. If you paste a job ad, the check flags when your CV and the job ad are in different languages.",
  },
  {
    question: "Is a Dutch CV different from an international resume?",
    answer:
      "The structure is familiar, but Dutch CVs tend to be direct and practical: a short profile, clear headings, reverse-chronological experience and a readable layout matter more than design. The check tests for exactly those points.",
  },
];

const EN_VACANCY_FAQ = [
  {
    question: "How do I compare my CV with a job description?",
    answer:
      "Upload your CV (PDF or Word) or paste the text, then paste the full job ad in the second field. For each requirement you see whether your CV shows it, with a quote from the job ad and where possible from your CV, plus the fixes to make first.",
  },
  {
    question: "What is the difference between a requirement and a 'pre'?",
    answer:
      "A hard requirement ('required', 'you have') is something you need to show. A 'pre' ('is een pre') in Dutch job ads means nice-to-have. The check lists hard requirements first and counts a pre as a plus.",
  },
  {
    question: "Should I copy keywords from the job ad?",
    answer:
      "Yes, where they are true. Recruiters search application systems for terms from the job ad, so use the same words for experience and skills you really have. Never add experience you do not have; the check never suggests that.",
  },
  {
    question: "How does it handle language levels and education?",
    answer:
      "Following Dutch conventions: native counts as the highest level, B2 or C1 meets 'good command of', and an equal or higher education level meets a requested working and thinking level (MBO, HBO, WO).",
  },
  {
    question: "Is the job match free, and is my CV stored?",
    answer: `The comparison is free, without an account. Your CV and the job ad are not stored. You only pay ${cvDownloadPrice.displayEn} once if you improve your CV in WerkCV and download it as a PDF.`,
  },
];

const NL_RELATED = [
  { href: "/cv-check/methodologie", label: "Zo berekenen we je cijfer", body: "Controles, weging en wat AI wel en niet doet." },
  { href: "/cv-tips/ats-vriendelijk-cv", label: "ATS-vriendelijk cv maken", body: "Opmaak en kopjes die systemen goed lezen." },
  { href: "/ats-cv-template", label: "ATS cv template", body: "Een opmaak met één kolom die systemen goed lezen." },
  { href: "/tools/linkedin-naar-cv", label: "LinkedIn naar cv", body: "Zet je LinkedIn-profiel om in een cv." },
];

const EN_RELATED = [
  { href: "/en/cv-check/methodology", label: "How we calculate your grade", body: "Checks, weights and what AI does and does not do." },
  { href: "/en/ats-resume-netherlands", label: "ATS resumes in the Netherlands", body: "What Dutch application systems read and skip." },
  { href: "/en/guides/cv-format-netherlands-english", label: "Netherlands CV format", body: "Structure and length Dutch recruiters expect." },
  { href: "/en/dutch-cv-template", label: "Dutch CV template", body: "A clean single-column layout for Dutch applications." },
];

const NL_BASE = {
  locale: "nl" as const,
  updatedLabel: `Laatst bijgewerkt: ${CV_CHECK_PAGE_UPDATED.nl}`,
  methodologyHref: "/cv-check/methodologie",
  editorHref: "/editor?template=professional&startSource=cv_check",
  whatWeCheckTitle: "Wat de cv-check controleert",
  whatWeCheck: NL_WHAT_WE_CHECK,
  differenceTitle: "Wat deze cv-check anders doet",
  difference: NL_DIFFERENCE,
  atsTitle: "Wat is een ATS en waarom telt het?",
  ats: NL_ATS,
  limitsTitle: "Wat je wel en niet krijgt",
  limits: {
    doesLabel: "Wel",
    does: "Een rapport met je cijfer, de punten die je als eerste verbetert, citaten uit je eigen cv en, met een vacature, per eis of je die aantoont.",
    doesNotLabel: "Niet",
    doesNot: "Geen garantie op een uitnodiging en geen simulatie van één specifiek systeem. Voor senior functies of een carrièreswitch is een persoonlijke review een goede aanvulling.",
  },
  relatedTitle: "Verder met je cv",
  related: NL_RELATED,
};

const EN_BASE = {
  locale: "en" as const,
  updatedLabel: `Last updated: ${CV_CHECK_PAGE_UPDATED.en}`,
  methodologyHref: "/en/cv-check/methodology",
  editorHref: "/en/editor?template=professional&startSource=cv_check_en",
  whatWeCheckTitle: "What the CV check looks at",
  whatWeCheck: EN_WHAT_WE_CHECK,
  differenceTitle: "What this CV check does differently",
  difference: EN_DIFFERENCE,
  atsTitle: "What is an ATS and why does it matter?",
  ats: EN_ATS,
  limitsTitle: "What you get and what you don't",
  limits: {
    doesLabel: "You get",
    does: "A report with your grade, the fixes to make first, quotes from your own CV and, with a job ad, whether your CV shows each requirement.",
    doesNotLabel: "You don't get",
    doesNot: "A guaranteed interview or a simulation of one specific system. For senior roles or a career change, a personal review is a good addition.",
  },
  relatedTitle: "Next steps for your CV",
  related: EN_RELATED,
};

export const CV_CHECK_LANDINGS: Record<"nlGeneral" | "nlVacancy" | "enGeneral" | "enVacancy", CvCheckLandingContent> = {
  nlGeneral: {
    ...NL_BASE,
    variant: "general",
    path: "/cv-check",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "CV-check", href: "/cv-check" },
    ],
    eyebrow: "Gratis cv-check en ATS checker",
    h1: "Gratis cv-check met AI: zie wat systemen en recruiters uit je cv halen",
    intro:
      "Upload je cv en zie binnen een minuut wat een sollicitatiesysteem (ATS) uit je cv leest, welke punten je als eerste verbetert en of je cv past bij Nederlandse gewoontes. Plak je een vacature, dan zie je per eis of je cv die aantoont. Gratis, zonder account, en je cv wordt niet opgeslagen.",
    pills: ["Gratis, zonder account", "Je cv wordt niet opgeslagen", "Pdf, Word of geplakte tekst", "Nederlandse regels: taalniveau, mbo/hbo, VOG"],
    switchLink: { href: "/cv-check/vacature", label: "Wil je vooral je cv vergelijken met een vacature? Ga naar de vacature-check" },
    whatWeCheckNote:
      "Plak je een vacature, dan zie je daarnaast per eis of je cv die aantoont, met citaten uit je cv en de vacature. Harde eisen staan bovenaan; een 'pre' telt als pluspunt.",
    faqTitle: "Veelgestelde vragen over de cv-check",
    faq: NL_GENERAL_FAQ,
  },
  nlVacancy: {
    ...NL_BASE,
    variant: "vacancy",
    path: "/cv-check/vacature",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "CV-check", href: "/cv-check" },
      { label: "CV vergelijken met vacature", href: "/cv-check/vacature" },
    ],
    eyebrow: "CV vergelijken met vacature",
    h1: "Vergelijk je cv met een vacature: zie per eis of je die aantoont",
    intro:
      "Plak de vacaturetekst naast je cv en zie per eis of je cv die aantoont, met een citaat uit de vacature en uit je cv. Harde eisen staan bovenaan, een 'pre' telt als pluspunt, en je krijgt de drie punten die je als eerste aanpast. Gratis, zonder account.",
    pills: ["Per eis met citaten", "Harde eisen en pre's apart", "Gratis, zonder account", "Je cv wordt niet opgeslagen"],
    switchLink: { href: "/cv-check", label: "Geen vacature bij de hand? Doe de algemene cv-check" },
    whatWeCheckNote:
      "Met een vacature telt de aansluiting op de vacature voor de helft mee in je cijfer; de andere helft gaat over leesbaarheid, inhoud en Nederlandse conventies.",
    faqTitle: "Veelgestelde vragen over cv vergelijken met een vacature",
    faq: NL_VACANCY_FAQ,
  },
  enGeneral: {
    ...EN_BASE,
    variant: "general",
    path: "/en/cv-check",
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "CV check", href: "/en/cv-check" },
    ],
    eyebrow: "Free CV checker for the Netherlands",
    h1: "Free AI CV check: see what Dutch recruiters and application systems get from your CV",
    intro:
      "Upload your CV and within a minute see what an applicant tracking system (ATS) reads from it, which fixes to make first and whether it fits Dutch hiring conventions. Paste a job ad to see, per requirement, whether your CV shows it. Free, no account, and your CV is not stored.",
    pills: ["Free, no account", "Your CV is not stored", "PDF, Word or pasted text", "Dutch rules: language levels, MBO/HBO, VOG"],
    switchLink: { href: "/en/cv-check/job-match", label: "Mainly want to compare your CV with a job ad? Use the job match check" },
    whatWeCheckNote:
      "Paste a job ad to also see, per requirement, whether your CV shows it, with quotes from both. Hard requirements come first; a nice-to-have ('pre' in Dutch job ads) counts as a plus.",
    faqTitle: "Frequently asked questions",
    faq: EN_GENERAL_FAQ,
  },
  enVacancy: {
    ...EN_BASE,
    variant: "vacancy",
    path: "/en/cv-check/job-match",
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "CV check", href: "/en/cv-check" },
      { label: "CV and job match", href: "/en/cv-check/job-match" },
    ],
    eyebrow: "CV and job match checker",
    h1: "Compare your CV with a job ad in the Netherlands",
    intro:
      "Paste the job ad next to your CV and see, per requirement, whether your CV shows it, with a quote from the job ad and from your CV. Hard requirements come first, a 'pre' counts as a plus, and you get the three fixes to make first. Free, no account.",
    pills: ["Per requirement, with quotes", "Requirements and 'pre's separated", "Free, no account", "Your CV is not stored"],
    switchLink: { href: "/en/cv-check", label: "No job ad at hand? Run the general CV check" },
    whatWeCheckNote:
      "With a job ad, the fit counts for half of your grade; the other half covers readability, content and Dutch conventions.",
    faqTitle: "Frequently asked questions about the job match",
    faq: EN_VACANCY_FAQ,
  },
};
