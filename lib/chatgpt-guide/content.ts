import { cvDownloadPrice } from "@/lib/site-content";

// Figures come from the tests of 27 Sep 2026 (docs/product/2026-09-27-chatgpt-cv-page-research.md):
// Dutch: 24 CVs with popular prompts, 16 with the rules below. English: 24 + 16, expat personas.

export type ChatGptGuideContent = {
  locale: "nl" | "en";
  path: string;
  updated: { iso: string; display: string };
  breadcrumbs: Array<{ label: string; href: string }>;
  eyebrow: string;
  h1: string;
  intro: string;
  byline: string;
  updatedLabel: string;
  ctaPrompts: string;
  ctaCheck: string;
  summaryTitle: string;
  summary: string[];
  employersTitle: string;
  employers: string[];
  concernsIntro: string;
  concerns: string[];
  sourceLabel: string;
  testTitle: string;
  testMethod: string;
  testColumns: [string, string, string];
  testRows: Array<{ finding: string; popular: string; ours: string }>;
  testNotes: Array<{ lead: string; text: string }>;
  testLimits: string;
  stepsTitle: string;
  steps: Array<{ title: string; body: string; source?: "openai" }>;
  stepLabel: string;
  promptsTitle: string;
  promptsIntro: string;
  prompts: Array<{ id: string; title: string; when: string; text: string }>;
  copyLabels: { idle: string; done: string };
  checkTitle: string;
  checkIntro: string;
  checklistTitle: string;
  checklist: string[];
  editorHref: string;
  editorCta: string;
  templatesHref: string;
  templatesCta: string;
  methodologyHref: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  relatedTitle: string;
  related: Array<{ href: string; label: string; body: string }>;
};

export const CHATGPT_GUIDE_SOURCES = {
  tilburg: {
    href: "https://www.tilburguniversity.edu/nl/actueel/persberichten/werkgevers-gedogen-sollicitatiebrief-en-cv-van-chatgpt",
    nl: "Tilburg University en Rendement, 19 november 2024",
    en: "Tilburg University and Rendement, 19 November 2024 (Dutch)",
  },
  openai: {
    href: "https://help.openai.com/en/articles/7730893-data-controls-faq",
    nl: "OpenAI Help Center, Data controls in ChatGPT",
    en: "OpenAI Help Center, Data controls in ChatGPT",
  },
} as const;

const UPDATED_ISO = "2026-09-27";

const NL_RULES = `Regels:
- Gebruik alleen feiten uit mijn gegevens. Voeg geen eigenschappen, vaardigheden, programma's, cijfers of resultaten toe die er niet in staan.
- Schrijf platte tekst: geen opmaaktekens zoals ** of #, en geen invulvelden zoals [telefoonnummer]. Laat onbekende gegevens gewoon weg.
- Gebruik de kopjes Profiel, Werkervaring, Opleiding, Vaardigheden en Talen, met de nieuwste functie bovenaan.
- Noteer elke taal als moedertaal of met een ERK-niveau (A1 t/m C2).
- Zet geen uitleg, tips of alternatieven in het cv. Begin direct met het cv.
- Zet na het cv een regel met ---EINDE CV--- en daaronder maximaal 3 vragen over informatie die ontbreekt.`;

const EN_RULES = `Rules:
- Use only facts from my details. Do not add personality traits, skills, software, numbers or results that are not in them.
- Write plain text: no formatting symbols such as ** or #, and no placeholders such as [phone number]. Leave unknown details out.
- Use the headings Profile, Work experience, Education, Skills and Languages, most recent job first.
- Give every language as native or with a CEFR level (A1 to C2).
- Do not put explanations, tips or alternatives in the CV. Start directly with the CV.
- After the CV, add a line ---END OF CV--- and below it at most 3 questions about missing information.`;

export const CHATGPT_GUIDE_NL: ChatGptGuideContent = {
  locale: "nl",
  path: "/cv-gids/cv-maken-met-chatgpt",
  updated: { iso: UPDATED_ISO, display: "27 september 2026" },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "CV-gids", href: "/cv-gids" },
    { label: "CV maken met ChatGPT", href: "/cv-gids/cv-maken-met-chatgpt" },
  ],
  eyebrow: "CV-gids · ChatGPT",
  h1: "CV maken met ChatGPT: prompts, valkuilen en een gratis check",
  intro:
    "Je mag ChatGPT gebruiken voor je cv: in Nederlands onderzoek vindt 79% van de werkgevers dat prima, zolang alles klopt. Wij lieten het nieuwste model van OpenAI 24 cv's schrijven met de prompts uit populaire gidsen. Het verzon geen werkervaring, maar geen enkel resultaat was klaar om te versturen: er stonden opmaaktekens, invulvelden en advies in de tekst. Met de prompts op deze pagina ging dat van 24 van 24 naar 0 van 16.",
  byline: "Door de redactie van WerkCV",
  updatedLabel: "Laatst bijgewerkt",
  ctaPrompts: "Naar de prompts",
  ctaCheck: "Check je ChatGPT-cv",
  summaryTitle: "In het kort",
  summary: [
    "Geef ChatGPT je eigen feiten en regels mee; vraag niet om 'een voorbeeld-cv', want dat bevat verzonnen namen, werkgevers en data.",
    "Vraag om platte tekst zonder invulvelden, en om vragen ná het cv in plaats van advies erin.",
    "Plak geen BSN, adres of telefoonnummer, en zet training op je gesprekken uit.",
    "Haal restanten weg en check het resultaat voordat je verstuurt.",
  ],
  employersTitle: "Mag je ChatGPT gebruiken voor je cv?",
  employers: [
    "Bij de meeste werkgevers wel. In het onderzoek van Tilburg University en Rendement laat 79% van de organisaties sollicitanten zelf bepalen of en hoe ze een taalmodel gebruiken, zolang de informatie in de brief of het cv overeenkomt met de werkelijkheid. 11% zegt dat sollicitanten geen taalmodel mogen gebruiken. Werkgevers schatten dat 25% van de cv's en 29% van de brieven met een taalmodel wordt geschreven.",
  ],
  concernsIntro: "Waar werkgevers zich zorgen over maken:",
  concerns: [
    "kennis en vaardigheden zijn lastiger te beoordelen (62%);",
    "sollicitanten zijn minder zichzelf (49%);",
    "sollicitanten geven onbewust foute informatie (28%);",
    "privacy van sollicitatiegegevens (15%).",
  ],
  sourceLabel: "Bron",
  testTitle: "Wat er misging toen ChatGPT 24 cv's schreef",
  testMethod:
    "Op 27 september 2026 lieten we het huidige OpenAI-model (gpt-5.5, via de API, standaardinstellingen) cv's schrijven voor 8 fictieve sollicitanten, van magazijnmedewerker tot verpleegkundige. We gebruikten de drie prompts die populaire gidsen aanraden: 'schrijf een voorbeeld-cv voor een [functie]', 'maak een cv van deze gegevens' en 'pas mijn cv aan op deze vacature'. In elke vacature stonden twee eisen die de sollicitant niet had. Daarna deden we hetzelfde met de prompts van deze pagina.",
  testColumns: ["Wat we zagen", "Populaire prompts", "Prompts van deze pagina"],
  testRows: [
    { finding: "Opmaaktekens zoals ** en ## die als sterretjes in je cv terechtkomen", popular: "24 van 24", ours: "0 van 16" },
    { finding: "Advies of alternatieven midden in de cv-tekst (\"Als je wél ervaring hebt, voeg dan toe…\")", popular: "8 van 8 aangepaste cv's", ours: "0 van 8" },
    { finding: "Invulvelden zoals [jouw telefoonnummer]", popular: "7 van 24", ours: "0 van 16" },
    { finding: "Eigenschappen die niet in de notities stonden (stressbestendig, resultaatgericht)", popular: "5 van 8", ours: "0 van 8" },
    { finding: "Een ontbrekende eis uit de vacature geclaimd als ervaring", popular: "0 van 8", ours: "0 van 8" },
  ],
  testNotes: [
    {
      lead: "Wat goed ging:",
      text: "het model claimde geen ontbrekende eisen. Het zei zelf dat je Salesforce of een reachtruckcertificaat niet moet noemen als je het niet hebt.",
    },
    {
      lead: "Wat misging:",
      text: "het antwoord is geen kant-en-klaar cv. Advies, alternatieve zinnen en invulvelden staan tussen de cv-tekst, dus wie alles kopieert, stuurt dat mee. Talen kregen woorden als 'vloeiend' of 'redelijk' in plaats van een niveau. En de 'voorbeeld-cv'-prompt leverde verzonnen namen, adressen en werkgevers op, soms met een geboortedatum en 'referenties op aanvraag'.",
    },
    {
      lead: "Met de prompts hieronder",
      text: "kwamen er geen restanten en geen extra eigenschappen in de cv's. Waar een taalniveau ontbrak, vroeg het model ernaar in plaats van te gokken. Beantwoord die vragen en vul het cv daarmee aan.",
    },
  ],
  testLimits:
    "Beperkingen: 8 fictieve sollicitanten en één model op één dag. De ChatGPT-app kan een ander model of andere instellingen gebruiken, en uitkomsten verschillen per keer.",
  stepsTitle: "Stappenplan: zo maak je een cv met ChatGPT",
  stepLabel: "Stap",
  steps: [
    {
      title: "Bescherm je gegevens",
      body: "Laat je BSN, adres, telefoonnummer en e-mail weg; die vul je later zelf in. Zet in ChatGPT training op je gesprekken uit (Instellingen → Data controls → 'Improve the model for everyone') of gebruik een tijdelijke chat. Die wordt niet voor training gebruikt en maximaal 30 dagen bewaard.",
      source: "openai",
    },
    {
      title: "Schrijf je eigen feiten op",
      body: "Per functie: werkgever, jaartallen, 3 tot 5 taken en wat het opleverde als je dat weet. Daarnaast je opleiding, talen met niveau en de programma's die je gebruikt. Hoe concreter je input, hoe minder ChatGPT hoeft in te vullen.",
    },
    {
      title: "Gebruik een prompt met regels",
      body: "Neem prompt 1 of 2 hieronder. De regels zorgen voor platte tekst zonder invulvelden, alleen jouw feiten, Nederlandse kopjes en taalniveaus, en vragen ná het cv in plaats van advies erin.",
    },
    {
      title: "Beantwoord de vragen en controleer wat erbij kwam",
      body: "Lees het cv regel voor regel. Staat er een eigenschap, programma of getal dat je niet gaf? Haal het weg of vervang het door een voorbeeld dat klopt. Beantwoord de vragen onder het cv en laat het cv daarmee aanvullen.",
    },
    {
      title: "Zet het in een nette opmaak en check het",
      body: `Kopieer alleen de cv-tekst, zonder de vragen. Zet die in een cv-template met één kolom, zodat sollicitatiesystemen hem goed lezen, en plak de tekst in de check hieronder. In de WerkCV-editor is een template gratis; de PDF kost eenmalig ${cvDownloadPrice.display}.`,
    },
  ],
  promptsTitle: "Prompts om te kopiëren",
  promptsIntro: "Vervang alles tussen [haken] door je eigen tekst. Prompt 1 en 2 zijn de geteste versies uit de tabel hierboven.",
  prompts: [
    {
      id: "volledig_cv",
      title: "1. Een cv van je eigen gegevens",
      when: "Je hebt nog geen cv, of je oude cv is erg verouderd.",
      text: `Maak een Nederlands cv van mijn gegevens.\n${NL_RULES}\n\nMijn gegevens:\n[plak hier je functies met jaartallen, taken, opleiding, talen en programma's]`,
    },
    {
      id: "vacature",
      title: "2. Je cv aanpassen aan een vacature",
      when: "Je hebt een cv en wilt het afstemmen op één vacature.",
      text: `Pas mijn cv aan op de vacature hieronder. Leg de nadruk op wat ik al heb dat de vacature vraagt.\n${NL_RULES}\n- Neem niets uit de vacature over als ervaring als het niet in mijn cv staat. Noem ontbrekende eisen alleen onder de vragen na het cv.\n\nMijn cv:\n[plak hier je cv]\n\nVacature:\n[plak hier de volledige vacaturetekst]`,
    },
    {
      id: "profiel",
      title: "3. Alleen een profieltekst",
      when: "Je cv staat, maar je profiel is vaag of te lang.",
      text: `Schrijf een profieltekst van 3 tot 4 zinnen voor mijn cv, voor de functie [functie]. Gebruik alleen feiten uit mijn gegevens: functie, jaren ervaring, belangrijkste taken en één resultaat als dat erin staat. Geen eigenschappen zoals 'resultaatgericht' of 'teamspeler' als ik die niet met een voorbeeld onderbouw. Platte tekst, geen uitleg.\n\nMijn gegevens:\n[plak hier je werkervaring]`,
    },
    {
      id: "werkervaring",
      title: "4. Taken omzetten in sterke werkervaring",
      when: "Je werkervaring is een lijst taken zonder resultaat.",
      text: `Maak van deze taken 3 tot 5 korte cv-punten per functie. Begin elk punt met een werkwoord in de verleden tijd. Behoud getallen, programma's en namen precies zoals ik ze geef en verzin geen resultaten. Staat er geen resultaat bij, vraag er dan na de lijst naar. Platte tekst, geen opmaaktekens.\n\nMijn taken:\n[plak hier je taken per functie]`,
    },
    {
      id: "controle",
      title: "5. Laat ChatGPT je eigen cv nalezen",
      when: "Je wilt een tweede blik voordat je verstuurt.",
      text: `Lees mijn cv na als een Nederlandse recruiter. Noem maximaal 5 verbeterpunten, van belangrijk naar minder belangrijk, met bij elk punt het citaat uit mijn cv waar het over gaat. Herschrijf niets en voeg geen feiten toe.\n\nMijn cv:\n[plak hier je cv]`,
    },
  ],
  copyLabels: { idle: "Kopieer prompt", done: "Gekopieerd" },
  checkTitle: "Check wat ChatGPT schreef",
  checkIntro:
    "Plak de cv-tekst of upload je cv. De check vindt restanten zoals invulvelden, opmaaktekens en chatbottekst, en kijkt naar leesbaarheid voor sollicitatiesystemen, inhoud en Nederlandse regels zoals taalniveaus. Met een vacature zie je per eis of je cv die aantoont. Gratis, zonder account, en je cv wordt niet opgeslagen.",
  checklistTitle: "Checklist voordat je verstuurt",
  checklist: [
    "Geen sterretjes, hekjes of streepjes van de opmaak meer in je tekst.",
    "Geen invulvelden zoals [telefoonnummer] of XX% meer.",
    "Geen zinnen van de chatbot, zoals 'Hieronder staat je cv' of 'Als je wél ervaring hebt…'.",
    "Elke functie, datum, opleiding en elk getal klopt en kun je in een gesprek toelichten.",
    "Geen eigenschappen die je niet met een voorbeeld kunt onderbouwen.",
    "Talen staan als moedertaal of met een niveau (A1–C2); werkgevers vragen vaak B2 of hoger.",
    "Je contactgegevens staan bovenaan in de tekst, niet alleen in een kop- of voettekst.",
    "Je cv is in de taal van de vacature en past op 1 tot 2 pagina's.",
  ],
  editorHref: "/editor?template=professional&startSource=chatgpt_guide",
  editorCta: "Zet je tekst in een cv-template",
  templatesHref: "/templates",
  templatesCta: "Bekijk de templates",
  methodologyHref: "/cv-check/methodologie",
  faqTitle: "Veelgestelde vragen over een cv met ChatGPT",
  faq: [
    {
      question: "Mag ik mijn cv met ChatGPT schrijven?",
      answer:
        "Bij de meeste werkgevers wel. In onderzoek van Tilburg University en Rendement (2024) laat 79% van de organisaties sollicitanten zelf bepalen of ze een taalmodel gebruiken, zolang de informatie in het cv of de brief klopt. 11% zegt dat sollicitanten geen taalmodel mogen gebruiken. Staat er in de vacature iets over AI, volg dat dan.",
    },
    {
      question: "Zien werkgevers dat mijn cv met AI is gemaakt?",
      answer:
        "Soms, vooral aan restanten zoals opmaaktekens, invulvelden en algemene eigenschappen zonder voorbeeld. Werkgevers schatten zelf dat een kwart van de cv's met een taalmodel is geschreven. Voor een cv zijn ze minder streng dan voor een brief; waar ze zich vooral zorgen over maken, is of kennis en vaardigheden nog te beoordelen zijn (62%). Een cv met concrete, controleerbare feiten valt dus minder op dan een cv vol algemene woorden.",
    },
    {
      question: "Is het veilig om mijn cv in ChatGPT te plakken?",
      answer:
        "Plak geen BSN, paspoort- of bankgegevens en laat je adres, telefoonnummer en e-mail weg; die vul je later zelf in. Standaard kan OpenAI gesprekken gebruiken om modellen te trainen. Dat zet je uit via Instellingen → Data controls → 'Improve the model for everyone'. Een tijdelijke chat wordt niet voor training gebruikt en maximaal 30 dagen bewaard.",
    },
    {
      question: "Verzint ChatGPT werkervaring?",
      answer:
        "In onze test van 27 september 2026 (24 cv's, model gpt-5.5) claimde het geen ontbrekende eisen uit de vacature. Wel voegde het in 5 van de 8 cv's eigenschappen toe die niet in de notities stonden, en liet het opmaaktekens, invulvelden en advies in de tekst staan. Controleer dus vooral wat erbij is gekomen.",
    },
    {
      question: "Kan ChatGPT ook de opmaak en een PDF van mijn cv maken?",
      answer: `ChatGPT levert vooral tekst. Voor een nette opmaak die sollicitatiesystemen goed lezen, zet je de tekst in een cv-template. In de WerkCV-editor is dat gratis; de PDF kost eenmalig ${cvDownloadPrice.display}, zonder abonnement.`,
    },
    {
      question: "Moet mijn cv in het Nederlands of Engels?",
      answer:
        "In de taal van de vacature. Laat ChatGPT dan ook in die taal schrijven en controleer of kopjes, datums en taalniveaus consequent zijn. De cv-check hieronder meldt het als je cv en de vacature in verschillende talen zijn.",
    },
  ],
  relatedTitle: "Verder met je cv",
  related: [
    { href: "/cv-check", label: "Gratis cv-check", body: "Check je cv op leesbaarheid, inhoud en Nederlandse regels." },
    { href: "/cv-check/vacature", label: "CV vergelijken met vacature", body: "Zie per eis of je cv die aantoont." },
    { href: "/cv-tips/cv-schrijven-met-ai", label: "Cv schrijven met AI", body: "Wat AI goed kan bij je cv, en waar je zelf moet opletten." },
    { href: "/tools/profieltekst-generator", label: "Profieltekst generator", body: "Een korte profieltekst op basis van je eigen gegevens." },
  ],
};

export const CHATGPT_GUIDE_EN: ChatGptGuideContent = {
  locale: "en",
  path: "/en/guides/create-cv-with-chatgpt",
  updated: { iso: UPDATED_ISO, display: "27 September 2026" },
  breadcrumbs: [
    { label: "Home", href: "/en" },
    { label: "Guides", href: "/en/guides" },
    { label: "Create a CV with ChatGPT", href: "/en/guides/create-cv-with-chatgpt" },
  ],
  eyebrow: "CV guide · ChatGPT",
  h1: "Using ChatGPT for your CV in the Netherlands: tested prompts, pitfalls and a free check",
  intro:
    "You can use ChatGPT for a CV for jobs in the Netherlands: in a Dutch study, 79% of employers are fine with it as long as everything is true. We had OpenAI's newest model write 24 English CVs for international job seekers, using the prompts popular guides recommend. It did not claim requirements people didn't have, but none of the results was ready to send: every one contained formatting symbols, most had placeholders, and 2 of 8 tailored CVs switched to Dutch without being asked. With the prompts on this page, the leftovers went from 24 of 24 to 0 of 16.",
  byline: "By the WerkCV editorial team",
  updatedLabel: "Last updated",
  ctaPrompts: "Go to the prompts",
  ctaCheck: "Check your ChatGPT CV",
  summaryTitle: "In short",
  summary: [
    "Give ChatGPT your own facts and rules; don't ask for 'a CV for a [job]', which returns invented names, employers and dates.",
    "Ask for plain text without placeholders, and for questions after the CV instead of advice inside it.",
    "Keep your CV in the language of the job ad, and don't let ChatGPT write a Dutch CV that suggests a higher level of Dutch than you have.",
    "Don't paste your BSN, address or phone number, and turn off training on your chats.",
  ],
  employersTitle: "Can you use ChatGPT for your CV in the Netherlands?",
  employers: [
    "With most employers, yes. In a study by Tilburg University and publisher Rendement, 79% of Dutch organisations let applicants decide whether and how to use a language model, as long as the information in the letter or CV is true. 11% say applicants may not use one. Employers estimate that 25% of CVs and 29% of cover letters are written with a language model.",
  ],
  concernsIntro: "What employers worry about:",
  concerns: [
    "knowledge and skills become harder to judge (62%);",
    "applicants are less themselves (49%);",
    "applicants unintentionally give wrong information (28%);",
    "privacy of application data (15%).",
  ],
  sourceLabel: "Source",
  testTitle: "What went wrong when ChatGPT wrote 24 CVs",
  testMethod:
    "On 27 September 2026 we had OpenAI's current model (gpt-5.5, via the API, default settings) write English CVs for 8 fictional international job seekers in the Netherlands, from a warehouse operative to a nurse whose BIG registration is still in progress. We used the three prompts popular guides recommend: 'write a CV for a [job] in the Netherlands', 'create a CV from these details' and 'tailor my CV to this job'. Every job ad asked for two things the person didn't have, plus good Dutch. We then did the same with the prompts on this page.",
  testColumns: ["What we saw", "Popular prompts", "Prompts on this page"],
  testRows: [
    { finding: "Formatting symbols such as ** and ## that end up as asterisks in your CV", popular: "24 of 24", ours: "0 of 16" },
    { finding: "Placeholders such as [phone number]", popular: "17 of 24 (8 of 8 for 'write a CV for a [job]')", ours: "0 of 16" },
    { finding: "Advice or alternatives inside the CV text (\"If you have…, add this\")", popular: "8 of 8 tailored CVs", ours: "0 of 8" },
    { finding: "Personality traits that weren't in the notes (reliable, detail-oriented)", popular: "6 of 8", ours: "0 of 8" },
    { finding: "Date of birth, nationality or marital status added", popular: "3 of 8 for 'write a CV for a [job]'", ours: "0 of 16" },
    { finding: "Tailored CV switched to Dutch without being asked", popular: "2 of 8", ours: "0 of 8" },
    { finding: "A missing requirement claimed as experience", popular: "0 of 8", ours: "0 of 8" },
  ],
  testNotes: [
    {
      lead: "What went well:",
      text: "the model didn't claim missing requirements. For the nurse it wrote that BIG registration is in progress, and for the teacher it suggested checking whether a UK teaching qualification is recognised in the Netherlands. Twice it stretched a little ('familiar with Kotlin', 'familiar with IPM principles').",
    },
    {
      lead: "What went wrong:",
      text: "the answer is not a finished CV. Advice, alternative bullets and placeholders sit between the CV lines, so copying everything sends them along. When the job ad asked for good Dutch, 2 of 8 tailored CVs came back in Dutch for people with Dutch at A2 or B1, which suggests a level they don't have. The 'write a CV for a [job]' prompt returned invented people, sometimes with a date of birth, nationality, marital status or 'references available on request'.",
    },
    {
      lead: "With the prompts below",
      text: "there were no leftovers, no added traits and no personal details, all CVs stayed in English, and 15 of 16 listed languages as native or with a CEFR level.",
    },
  ],
  testLimits:
    "Limits: 8 fictional people and one model on one day. The ChatGPT app may use a different model or settings, and results vary between runs.",
  stepsTitle: "Step by step: creating a CV with ChatGPT",
  stepLabel: "Step",
  steps: [
    {
      title: "Protect your details",
      body: "Leave out your BSN, address, phone number and email; add them yourself later. In ChatGPT, turn off training on your chats (Settings → Data controls → 'Improve the model for everyone') or use a temporary chat. Temporary chats are not used for training and are kept for up to 30 days.",
      source: "openai",
    },
    {
      title: "Write down your own facts",
      body: "For each job: employer, years, 3 to 5 tasks and what they achieved if you know. Add your education (with the country), your languages with a level, including Dutch, and the software you use. The more specific your input, the less ChatGPT fills in.",
    },
    {
      title: "Use a prompt with rules",
      body: "Take prompt 1 or 2 below. The rules keep the CV in plain text without placeholders, limited to your facts, with standard headings and language levels, and put questions after the CV instead of advice inside it.",
    },
    {
      title: "Answer the questions and check what was added",
      body: "Read the CV line by line. Is there a trait, tool or number you didn't give? Remove it or replace it with a true example. Answer the questions below the CV and let ChatGPT add the answers.",
    },
    {
      title: "Put it in a clean layout and check it",
      body: `Copy only the CV text, without the questions. Put it in a single-column CV template so application systems read it correctly, and paste the text into the check below. A template is free in the WerkCV editor; the PDF costs ${cvDownloadPrice.displayEn} once.`,
    },
  ],
  promptsTitle: "Prompts to copy",
  promptsIntro: "Replace everything in [brackets] with your own text. Prompts 1 and 2 are the tested versions from the table above.",
  prompts: [
    {
      id: "full_cv_en",
      title: "1. A CV from your own details",
      when: "You don't have a CV yet, or your old one is out of date.",
      text: `Create a CV in English from my details for jobs in the Netherlands.\n${EN_RULES}\n\nMy details:\n[paste your jobs with years, tasks, education, languages and software]`,
    },
    {
      id: "tailor_en",
      title: "2. Tailoring your CV to a job ad",
      when: "You have a CV and want to match it to one job.",
      text: `Tailor my CV to the job below. Emphasise what I already have that the job asks for.\n${EN_RULES}\n- Do not add anything from the job ad as experience if it is not in my CV. Mention missing requirements only in the questions after the CV.\n\nMy CV:\n[paste your CV]\n\nJob ad:\n[paste the full job ad]`,
    },
    {
      id: "profile_en",
      title: "3. Only a profile",
      when: "Your CV is fine, but the profile is vague or too long.",
      text: `Write a CV profile of 3 to 4 sentences for the role of [job title]. Use only facts from my details: role, years of experience, main tasks and one result if it is there. No traits such as 'results-driven' or 'team player' unless I back them with an example. Plain text, no explanation.\n\nMy details:\n[paste your work experience]`,
    },
    {
      id: "bullets_en",
      title: "4. Turning tasks into strong experience bullets",
      when: "Your experience is a list of tasks without results.",
      text: `Turn these tasks into 3 to 5 short CV bullets per job. Start each bullet with a past-tense verb. Keep numbers, software and names exactly as I give them and do not invent results. If a result is missing, ask for it after the list. Plain text, no formatting symbols.\n\nMy tasks:\n[paste your tasks per job]`,
    },
    {
      id: "review_en",
      title: "5. Letting ChatGPT review your CV",
      when: "You want a second opinion before you apply.",
      text: `Review my CV as a recruiter in the Netherlands would. List at most 5 improvements, most important first, each with the quote from my CV it refers to. Do not rewrite anything and do not add facts.\n\nMy CV:\n[paste your CV]`,
    },
  ],
  copyLabels: { idle: "Copy prompt", done: "Copied" },
  checkTitle: "Check what ChatGPT wrote",
  checkIntro:
    "Paste the CV text or upload your CV. The check finds leftovers such as placeholders, formatting symbols and chatbot text, and looks at readability for application systems, content and Dutch conventions such as language levels. With a job ad you see, per requirement, whether your CV shows it. Free, no account, and your CV is not stored.",
  checklistTitle: "Checklist before you apply",
  checklist: [
    "No asterisks, hashes or dashes left from the formatting.",
    "No placeholders such as [phone number] or XX%.",
    "No chatbot sentences such as 'Below is your CV' or 'If you have…, add'.",
    "Every job, date, qualification and number is true and you can explain it in an interview.",
    "No traits you can't back with an example.",
    "Languages listed as native or with a level (A1–C2), including an honest level for Dutch.",
    "Your contact details are in the body at the top, not only in a header or footer.",
    "Your CV is in the language of the job ad and fits on 1 to 2 pages.",
  ],
  editorHref: "/en/editor?template=professional&startSource=chatgpt_guide_en",
  editorCta: "Put your text in a CV template",
  templatesHref: "/en/templates",
  templatesCta: "See the templates",
  methodologyHref: "/en/cv-check/methodology",
  faqTitle: "Frequently asked questions about a ChatGPT CV",
  faq: [
    {
      question: "Can I use ChatGPT for my CV when applying in the Netherlands?",
      answer:
        "With most employers, yes. In a 2024 study by Tilburg University and Rendement, 79% of Dutch organisations let applicants decide whether to use a language model, as long as the CV or letter is true; 11% say applicants may not use one. If the job ad says something about AI, follow that.",
    },
    {
      question: "Will Dutch employers notice my CV was written with AI?",
      answer:
        "Sometimes, mostly from leftovers such as formatting symbols, placeholders and generic traits without examples. Employers estimate that a quarter of CVs are written with a language model. Their main worry is that skills become harder to judge (62%), so a CV with specific, verifiable facts stands out less than one full of generic words.",
    },
    {
      question: "Should I let ChatGPT translate my CV into Dutch?",
      answer:
        "Only if you can work at the level your Dutch CV suggests. A fluent Dutch CV with 'Dutch A2' under languages sends mixed signals, and an interview may switch to Dutch. Use the language of the job ad; for English-language roles an English CV is normal. In our test, 2 of 8 tailored CVs switched to Dutch on their own when the ad asked for good Dutch, so check the language of what you get.",
    },
    {
      question: "Is it safe to paste my CV into ChatGPT?",
      answer:
        "Don't paste your BSN, passport or bank details, and leave out your address, phone number and email; add those yourself later. By default OpenAI can use conversations to train its models. Turn that off under Settings → Data controls → 'Improve the model for everyone'. A temporary chat is not used for training and is kept for up to 30 days.",
    },
    {
      question: "Should my Dutch CV have a photo, date of birth or nationality?",
      answer:
        "They are optional in the Netherlands, and many employers don't expect them. In our test, the 'write a CV for a [job]' prompt added a date of birth, nationality or marital status in 3 of 8 CVs. Leave them out unless the job ad asks for them; the CV check mentions them for information only and never lowers your grade for them.",
    },
    {
      question: "Can ChatGPT also create the layout and a PDF?",
      answer: `ChatGPT mainly gives you text. For a clean layout that application systems read correctly, put the text into a CV template. That is free in the WerkCV editor; the PDF costs ${cvDownloadPrice.displayEn} once, with no subscription.`,
    },
  ],
  relatedTitle: "Next steps for your CV",
  related: [
    { href: "/en/cv-check", label: "Free CV check", body: "Readability, content and Dutch conventions in one report." },
    { href: "/en/cv-check/job-match", label: "Compare your CV with a job ad", body: "See per requirement whether your CV shows it." },
    { href: "/en/ats-resume-netherlands", label: "ATS resumes in the Netherlands", body: "What Dutch application systems read and skip." },
    { href: "/en/dutch-cv-template", label: "Dutch CV template", body: "A clean single-column layout for Dutch applications." },
  ],
};
