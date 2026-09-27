import type { ChatGptGuideContent } from "./content";

// Figures from the cover-letter test of 27 Sep 2026 (docs/product/2026-09-27-chatgpt-cv-page-research.md §7):
// 8 fictional applicants × 3 prompt styles, gpt-5.5.

const LETTER_RULES = `Regels:
- Gebruik alleen feiten uit mijn cv en de vacature. Verzin niets over mij of over de organisatie, zoals waarden, prijzen of projecten die niet in de vacature staan.
- Claim geen eisen uit de vacature die niet in mijn cv staan. Noem die alleen onder de vragen na de brief.
- Maximaal 250 woorden, in de ik-vorm, zonder standaardopening als 'Hierbij solliciteer ik'. Begin met waarom deze functie bij mij past.
- Schrijf platte tekst: geen opmaaktekens zoals ** of #, en geen invulvelden zoals [datum] of [naam]. Laat onbekende gegevens gewoon weg.
- Zet geen uitleg, tips of alternatieven in de brief. Begin direct met de aanhef.
- Zet na de brief een regel met ---EINDE BRIEF--- en daaronder maximaal 3 vragen over informatie die ontbreekt.`;

export const CHATGPT_LETTER_GUIDE_NL: ChatGptGuideContent = {
  locale: "nl",
  path: "/cv-gids/sollicitatiebrief-met-chatgpt",
  updated: { iso: "2026-09-27", display: "27 september 2026" },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "CV-gids", href: "/cv-gids" },
    { label: "Sollicitatiebrief met ChatGPT", href: "/cv-gids/sollicitatiebrief-met-chatgpt" },
  ],
  eyebrow: "CV-gids · ChatGPT",
  h1: "Sollicitatiebrief of motivatiebrief schrijven met ChatGPT: geteste prompt en valkuilen",
  intro:
    "Je mag ChatGPT gebruiken voor je sollicitatiebrief, maar bij een brief letten werkgevers beter op dan bij een cv: 18% zegt dat je kans op een gesprek kleiner wordt als de brief met AI gemaakt lijkt. Wij lieten het nieuwste model van OpenAI 24 brieven schrijven. Het claimde geen ervaring die ontbrak, maar met de populaire prompts begon elke brief met dezelfde soort openingszin, en stonden er invulvelden en eigenschappen in die niemand had opgegeven. Met de prompt op deze pagina gebeurde dat in geen enkele brief.",
  byline: "Door de redactie van WerkCV",
  updatedLabel: "Laatst bijgewerkt",
  ctaPrompts: "Naar de prompts",
  ctaCheck: "Check je brief",
  summaryTitle: "In het kort",
  summary: [
    "Geef ChatGPT je cv, de volledige vacature en regels mee; zonder je gegevens krijg je een sjabloon met invulvelden en verzonnen eigenschappen.",
    "Vraag om een eerste zin over waarom de functie bij je past, niet om 'Met veel interesse solliciteer ik…'.",
    "Voeg zelf één concreet voorbeeld toe: de brief met regels is feitelijk, maar vlak.",
    "Plak geen BSN, adres of telefoonnummer, en check de brief op restanten voordat je verstuurt.",
  ],
  employersTitle: "Mag je ChatGPT gebruiken voor je sollicitatiebrief?",
  employers: [
    "Bij de meeste werkgevers wel. In het onderzoek van Tilburg University en Rendement laat 79% van de organisaties sollicitanten zelf bepalen of en hoe ze een taalmodel gebruiken, zolang de informatie in de brief of het cv klopt. 11% zegt dat het niet mag. 80% van de organisaties vraagt nog om een brief, en werkgevers schatten dat 29% van de brieven met een taalmodel wordt geschreven.",
    "Bij een brief zijn werkgevers strenger dan bij een cv. 18% zegt dat de kans op een gesprek kleiner wordt als de brief met een taalmodel gemaakt lijkt, bij 37% blijft de kans gelijk en bij 23% hangt het van de functie af.",
  ],
  concernsIntro: "Waar werkgevers zich zorgen over maken:",
  concerns: [
    "kennis en vaardigheden zijn lastiger te beoordelen (62%);",
    "sollicitanten zijn minder zichzelf (49%);",
    "sollicitanten geven onbewust foute informatie (28%);",
    "privacy van sollicitatiegegevens (15%).",
  ],
  sourceLabel: "Bron",
  testTitle: "Wat er misging toen ChatGPT 24 brieven schreef",
  testMethod:
    "Op 27 september 2026 lieten we het huidige OpenAI-model (gpt-5.5, via de API, standaardinstellingen) sollicitatiebrieven schrijven voor 8 fictieve sollicitanten, elk met een fictieve vacature waarin twee eisen stonden die de sollicitant niet had. We gebruikten twee prompts die populaire gidsen aanraden: 'schrijf een motivatiebrief voor de functie [functie] bij [bedrijf]' zonder verdere gegevens, en 'schrijf een sollicitatiebrief op basis van mijn cv en deze vacature'. Daarna deden we hetzelfde met de prompt van deze pagina.",
  testColumns: ["Wat we zagen", "Zonder je gegevens", "Met cv en vacature", "Prompt van deze pagina"],
  testRows: [
    { finding: "Invulvelden zoals [datum] of [naam]", values: ["8 van 8", "5 van 8", "0 van 8"] },
    { finding: "Opmaaktekens zoals ** die als sterretjes in je brief komen", values: ["7 van 8", "2 van 8", "0 van 8"] },
    { finding: "Eigenschappen die niemand had opgegeven (gedreven, leergierig, stressbestendig)", values: ["8 van 8", "7 van 8", "0 van 8"] },
    { finding: "Dezelfde soort openingszin ('Met veel interesse…', 'Graag solliciteer ik…')", values: ["8 van 8", "8 van 8", "0 van 8"] },
    { finding: "Iets over de werkgever dat niet in de vacature stond", values: ["–", "2 van 8", "0 van 8"] },
    { finding: "Een ontbrekende eis geclaimd als ervaring", values: ["–", "0 van 8", "0 van 8"] },
    { finding: "Gemiddeld aantal woorden", values: ["246", "293", "151"] },
  ],
  testNotes: [
    {
      lead: "Wat goed ging:",
      text: "met cv en vacature claimde het model geen ontbrekende eisen. Het schreef eerlijk 'Hoewel ik nog geen ervaring heb met Salesforce…' en noemde wat de sollicitant wel meebracht.",
    },
    {
      lead: "Wat misging:",
      text: "zonder je gegevens krijg je een sjabloon: invulvelden, verzonnen eigenschappen en een algemene openingszin. Ook met cv en vacature begon elke brief met 'Met veel interesse…' of iets vergelijkbaars, en twee keer stond er iets over de werkgever dat niet in de vacature stond, zoals 'waar klantgerichtheid centraal staat'.",
    },
    {
      lead: "Met de prompt hieronder",
      text: "waren de brieven feitelijk en zonder restanten, maar ook vlak: het model herhaalde vooral feiten uit de vacature. Het vroeg na de brief om ontbrekende informatie en een concreet voorbeeld. Beantwoord die vragen; daar wordt je brief persoonlijk van.",
    },
  ],
  testLimits:
    "Beperkingen: 8 fictieve sollicitanten en één model op één dag. De ChatGPT-app kan een ander model of andere instellingen gebruiken, en uitkomsten verschillen per keer.",
  stepsTitle: "Stappenplan: zo schrijf je een sollicitatiebrief met ChatGPT",
  stepLabel: "Stap",
  steps: [
    {
      title: "Bescherm je gegevens",
      body: "Laat je BSN, adres, telefoonnummer en e-mail weg; die zet je er later zelf in. Zet in ChatGPT training op je gesprekken uit (Instellingen → Data controls → 'Improve the model for everyone') of gebruik een tijdelijke chat. Die wordt niet voor training gebruikt en maximaal 30 dagen bewaard.",
      source: "openai",
    },
    {
      title: "Verzamel je materiaal",
      body: "Je hebt nodig: de volledige vacaturetekst, je cv, één of twee voorbeelden van wat je deed en wat het opleverde, en de reden waarom je bij deze werkgever wilt werken. Alleen wat jij zelf weet, maakt een brief persoonlijk.",
    },
    {
      title: "Gebruik de prompt met regels",
      body: "Neem prompt 1 hieronder. De regels voorkomen invulvelden, verzonnen eigenschappen, beweringen over de werkgever en een standaardopening, en zetten vragen ná de brief in plaats van advies erin.",
    },
    {
      title: "Beantwoord de vragen en maak hem persoonlijk",
      body: "Voeg je eigen voorbeeld toe (prompt 3 helpt), haal zinnen weg die je zelf nooit zou zeggen en controleer elk feit over jezelf en de werkgever.",
    },
    {
      title: "Check en verstuur",
      body: "Plak de brief in de check hieronder. Houd hem op één pagina en sla hem als pdf op als je een bestand moet uploaden. Vraagt het sollicitatieformulier alleen om een korte motivatie, gebruik dan prompt 4.",
    },
  ],
  promptsTitle: "Prompts om te kopiëren",
  promptsIntro: "Vervang alles tussen [haken] door je eigen tekst. Prompt 1 is de geteste versie uit de tabel hierboven.",
  prompts: [
    {
      id: "brief_cv_vacature",
      title: "1. Een brief op basis van je cv en de vacature",
      when: "Je hebt een cv en een concrete vacature.",
      text: `Schrijf een sollicitatiebrief op basis van mijn cv en de vacature hieronder.\n${LETTER_RULES}\n\nMijn cv:\n[plak hier je cv]\n\nVacature:\n[plak hier de volledige vacaturetekst]`,
    },
    {
      id: "brief_opening",
      title: "2. Een sterke eerste zin",
      when: "Je brief staat, maar begint met 'Met veel interesse…'.",
      text: "Schrijf 3 varianten van de eerste 2 zinnen van mijn sollicitatiebrief voor [functie] bij [organisatie]. Begin met waarom deze functie bij mij past, alleen op basis van: [je reden en je relevante ervaring]. Geen standaardopening zoals 'Hierbij solliciteer ik' of 'Met veel interesse'. Platte tekst, geen uitleg.",
    },
    {
      id: "brief_voorbeeld",
      title: "3. Eén voorbeeld uitwerken",
      when: "Je wilt laten zien wat je kunt in plaats van het te zeggen.",
      text: "Maak van dit voorbeeld een alinea van maximaal 80 woorden voor mijn sollicitatiebrief: de situatie, wat ik deed en wat het opleverde. Gebruik alleen mijn feiten en verzin geen cijfers; ontbreekt een resultaat, vraag er dan na de alinea naar. Platte tekst.\n\nMijn voorbeeld:\n[beschrijf kort wat er gebeurde en wat jij deed]",
    },
    {
      id: "brief_formulier",
      title: "4. Een korte motivatie voor een sollicitatieformulier",
      when: "Het formulier vraagt om een motivatie in een tekstvak, niet om een brief.",
      text: "Schrijf een motivatie van maximaal 100 woorden voor het motivatieveld van een sollicitatieformulier voor [functie] bij [organisatie]. Gebruik alleen feiten uit mijn gegevens, zonder aanhef, afsluiting of standaardopening. Platte tekst.\n\nMijn gegevens:\n[je relevante ervaring en waarom je deze functie wilt]",
    },
    {
      id: "brief_nalezen",
      title: "5. Laat ChatGPT je brief nalezen",
      when: "Je wilt een tweede blik voordat je verstuurt.",
      text: "Lees mijn sollicitatiebrief na als een Nederlandse recruiter die deze vacature beoordeelt. Noem maximaal 5 verbeterpunten, van belangrijk naar minder belangrijk, met bij elk punt het citaat uit mijn brief. Herschrijf niets en voeg geen feiten toe.\n\nVacature:\n[plak de vacature]\n\nMijn brief:\n[plak je brief]",
    },
  ],
  copyLabels: { idle: "Kopieer prompt", done: "Gekopieerd" },
  checkKind: "letter",
  checkTitle: "Check je brief",
  checkIntro:
    "Plak je brief. De check zoekt invulvelden, opmaaktekens, chatbottekst, een veelgebruikte openingszin en eigenschappen die je misschien niet onderbouwt. Gratis; de check draait in je browser en je brief wordt niet opgeslagen.",
  checklistTitle: "Checklist voordat je verstuurt",
  checklist: [
    "Geen [datum], [naam] of andere invulvelden meer; datum en aanhef kloppen.",
    "Geen sterretjes of hekjes van de opmaak.",
    "Geen zinnen van de chatbot of alternatieve versies.",
    "De eerste zin zegt waarom deze functie bij je past, niet dat je solliciteert.",
    "Minstens één concreet voorbeeld uit je eigen werk.",
    "Niets over de werkgever dat je niet zelf hebt gecontroleerd.",
    "Ontbrekende eisen niet claimen; benoem hooguit wat je wel meebrengt.",
    "Past op één pagina, en als pdf opgeslagen als je een bestand uploadt.",
  ],
  editorHref: "/tools/sollicitatiebrief-generator",
  editorCta: "Naar de gratis briefgenerator",
  templatesHref: "/motivatiebrief-voorbeeld",
  templatesCta: "Bekijk voorbeeldbrieven",
  methodologyHref: "/cv-check/methodologie",
  faqTitle: "Veelgestelde vragen over een sollicitatiebrief met ChatGPT",
  faq: [
    {
      question: "Mag ik mijn sollicitatiebrief met ChatGPT schrijven?",
      answer:
        "Bij de meeste werkgevers wel. In onderzoek van Tilburg University en Rendement (2024) laat 79% van de organisaties sollicitanten zelf bepalen of ze een taalmodel gebruiken, zolang de informatie klopt; 11% zegt dat het niet mag. Staat er in de vacature iets over AI, volg dat dan.",
    },
    {
      question: "Zien werkgevers dat mijn brief met AI is geschreven?",
      answer:
        "Werkgevers schatten dat 29% van de brieven met een taalmodel wordt geschreven, en bij een brief zijn ze strenger dan bij een cv: 18% zegt dat de kans op een gesprek kleiner wordt als de brief met AI gemaakt lijkt. In onze test vielen vooral dezelfde openingszin, invulvelden en eigenschappen zonder voorbeeld op. Een brief met jouw eigen voorbeeld en reden valt minder op.",
    },
    {
      question: "Wat is het verschil tussen een sollicitatiebrief en een motivatiebrief?",
      answer:
        "In de praktijk gebruiken werkgevers de woorden vaak door elkaar. 'Motivatiebrief' hoor je vaker bij een opleiding of stage; voor een baan gaat het meestal om dezelfde brief. De prompts op deze pagina werken voor allebei.",
    },
    {
      question: "Is het veilig om mijn cv en brief in ChatGPT te plakken?",
      answer:
        "Plak geen BSN, paspoort- of bankgegevens en laat je adres, telefoonnummer en e-mail weg. Standaard kan OpenAI gesprekken gebruiken om modellen te trainen. Dat zet je uit via Instellingen → Data controls → 'Improve the model for everyone'. Een tijdelijke chat wordt niet voor training gebruikt en maximaal 30 dagen bewaard.",
    },
    {
      question: "Hoe lang moet mijn sollicitatiebrief zijn?",
      answer:
        "Houd hem op één pagina. In onze test gaven de populaire prompts gemiddeld 246 tot 293 woorden; met onze prompt waren het er 151, waarna je zelf een concreet voorbeeld toevoegt.",
    },
    {
      question: "Kan WerkCV mijn brief schrijven?",
      answer:
        "Ja, met de gratis sollicitatiebrief-generator. Die gebruikt alleen jouw invoer en de vacature. Controleer het resultaat daarna met de check op deze pagina en maak het persoonlijk met je eigen voorbeeld.",
    },
  ],
  relatedTitle: "Verder met je sollicitatie",
  related: [
    { href: "/tools/sollicitatiebrief-generator", label: "Sollicitatiebrief generator", body: "Een eerste versie op basis van de vacature en jouw ervaring." },
    { href: "/cv-gids/cv-maken-met-chatgpt", label: "CV maken met ChatGPT", body: "Geteste prompts voor je cv, en wat er misgaat als je alles kopieert." },
    { href: "/cv-tips/sollicitatiebrief-tips", label: "Sollicitatiebrief tips", body: "Opbouw, toon en wat recruiters willen lezen." },
    { href: "/cv-check/vacature", label: "CV vergelijken met vacature", body: "Zie per eis of je cv die aantoont." },
  ],
};
