import { cvDownloadPrice } from "@/lib/site-content";

export type ProductFaqItem = {
  id: string;
  question: string;
  answer: string;
  href?: string;
  linkLabel?: string;
};

export type ProductFaqGroup = {
  id: string;
  title: string;
  description: string;
  questions: readonly ProductFaqItem[];
};

export const productFaqGroups: readonly ProductFaqGroup[] = [
  {
    id: "starten",
    title: "Starten en account",
    description: "Inloggen, een bestaand CV uploaden en veilig verder werken.",
    questions: [
      {
        id: "wat-is-werkcv",
        question: "Wat is WerkCV?",
        answer:
          "WerkCV is een online CV-builder voor sollicitaties in Nederland. Je vult je gegevens zelf in of gebruikt een bestaand CV als startpunt, vergelijkt templates in een live voorbeeld en controleert het volledige document voordat je een PDF downloadt.",
        href: "/cv-maken",
        linkLabel: "Bekijk hoe je een CV maakt",
      },
      {
        id: "account-nodig",
        question: "Moet ik een account aanmaken?",
        answer:
          "Ja. WerkCV gebruikt je e-mailadres om je CV veilig aan je account te koppelen, je wijzigingen op te slaan en je later naar hetzelfde document te laten terugkeren. Je hoeft geen wachtwoord te onthouden.",
      },
      {
        id: "emailcode",
        question: "Waarom ontvang ik een code per e-mail?",
        answer:
          "De zescijferige code controleert dat het e-mailadres van jou is. Wanneer je de code voor het eerst invoert, wordt je WerkCV-account aangemaakt; bij een volgend bezoek geeft dezelfde methode opnieuw toegang tot je bestaande CV's. De code verloopt na 15 minuten.",
      },
      {
        id: "bestaand-cv-uploaden",
        question: "Kan ik mijn bestaande CV uploaden?",
        answer:
          "Ja. Je kunt een PDF- of Word-bestand uploaden. WerkCV haalt de tekst uit het document en gebruikt AI om de editor alvast te vullen. De import is een startpunt: controleer alle velden voordat je het CV verstuurt.",
        href: "/editor?upload=1",
        linkLabel: "Upload je huidige CV",
      },
      {
        id: "upload-formaten",
        question: "Welke bestanden kan ik uploaden?",
        answer:
          "De CV-import ondersteunt PDF, DOC en DOCX tot maximaal 10 MB. Een bestand met selecteerbare tekst werkt betrouwbaarder dan een scan of foto van een document.",
      },
      {
        id: "import-controleren",
        question: "Wat moet ik na een CV-import controleren?",
        answer:
          "Controleer in ieder geval je naam, contactgegevens, functietitels, werkgevers, datums, opleidingen, taalniveaus en alle bullet points. Een complexe opmaak of scan kan ervoor zorgen dat tekst onvolledig of in een andere volgorde wordt overgenomen.",
      },
    ],
  },
  {
    id: "bewerken",
    title: "Bewerken en opslaan",
    description: "Autosave, templates, pagina-indeling en gerichte CV-versies.",
    questions: [
      {
        id: "automatisch-opgeslagen",
        question: "Wordt mijn CV automatisch opgeslagen?",
        answer:
          "Ja. Tijdens het bewerken toont de editor eerst 'Opslaan...' en daarna 'Opgeslagen'. Wacht bij voorkeur op die bevestiging voordat je de pagina sluit of op een ander apparaat verdergaat.",
      },
      {
        id: "later-verder",
        question: "Kan ik mijn CV later verder afmaken?",
        answer:
          "Ja. Open Mijn CV's en kies het opgeslagen document om verder te werken. Je inhoud blijft aan je account gekoppeld zolang het document en je account bestaan.",
        href: "/mijn-cvs",
        linkLabel: "Open Mijn CV's",
      },
      {
        id: "template-wijzigen",
        question: "Kan ik het template of de kleur later wijzigen?",
        answer:
          "Ja. Je inhoud blijft behouden wanneer je van template of accentkleur wisselt. Controleer daarna opnieuw de volledige voorbeeldweergave, omdat templates de beschikbare ruimte en pagina-indeling verschillend gebruiken.",
        href: "/templates",
        linkLabel: "Vergelijk de templates",
      },
      {
        id: "bullets-verplaatsen",
        question: "Kan ik bullet points toevoegen, verwijderen en verplaatsen?",
        answer:
          "Ja. Bij werkervaring en stages kun je nieuwe bullet points invoegen, bestaande punten verwijderen en de volgorde aanpassen. Zet het belangrijkste resultaat voor de vacature bovenaan.",
      },
      {
        id: "tweede-pagina",
        question: "Waarom staat een onderdeel op een tweede pagina?",
        answer:
          "De pagina-indeling verandert met de hoeveelheid tekst, het gekozen template en de zichtbare onderdelen. Gebruik de volledige voorbeeldweergave om de echte paginering te controleren en kort minder relevante tekst in voordat je het lettertype te klein maakt.",
      },
      {
        id: "meerdere-versies",
        question: "Kan ik verschillende CV-versies voor vacatures maken?",
        answer:
          "Ja. Maak voor een duidelijk andere vacature een apart CV-document, zodat wijzigingen in de ene versie de andere versie niet overschrijven. Houd een volledige basisversie en pas per vacature vooral je doelrol, profiel, relevante prestaties en vaardigheden aan.",
        href: "/templates",
        linkLabel: "Start een nieuwe CV-versie",
      },
    ],
  },
  {
    id: "betaling",
    title: "Betaling en download",
    description: "De exacte prijs, betaalmomenten en toegang na betaling.",
    questions: [
      {
        id: "werkcv-gratis",
        question: "Is WerkCV gratis?",
        answer: `Je kunt gratis een CV aanmaken, bewerken, templates vergelijken en het volledige voorbeeld bekijken. De definitieve PDF-download kost eenmalig ${cvDownloadPrice.display} inclusief btw per afzonderlijk CV.`,
        href: "/prijzen",
        linkLabel: "Bekijk het volledige prijsmodel",
      },
      {
        id: "download-kosten",
        question: "Wat kost een CV-download?",
        answer: `De eerste PDF-download van een afzonderlijk CV kost eenmalig ${cvDownloadPrice.display} inclusief btw. Er is geen proefabonnement, maandbedrag of automatische verlenging.`,
      },
      {
        id: "geen-abonnement",
        question: "Is WerkCV een abonnement of proefperiode?",
        answer:
          "Nee. WerkCV start geen abonnement en schrijft later geen maandbedrag af. Je betaalt alleen wanneer je besluit een afzonderlijk CV als PDF te downloaden, dus er is niets dat je achteraf hoeft op te zeggen.",
        href: "/cv-maken-zonder-abonnement",
        linkLabel: "Lees hoe CV maken zonder abonnement werkt",
      },
      {
        id: "bekijken-voor-betalen",
        question: "Kan ik mijn volledige CV bekijken voordat ik betaal?",
        answer:
          "Ja. Je kunt de inhoud, pagina's, template en accentkleur in de volledige voorbeeldweergave controleren voordat je de betaalstap opent.",
      },
      {
        id: "opnieuw-betalen",
        question: "Wanneer moet ik opnieuw betalen?",
        answer:
          "Je betaalt niet opnieuw voor latere wijzigingen en downloads van hetzelfde betaalde CV. Maak je een nieuw CV als afzonderlijk document en wil je daarvan een PDF downloaden, dan geldt daarvoor een nieuwe eenmalige betaling.",
      },
      {
        id: "opnieuw-downloaden",
        question: "Kan ik hetzelfde betaalde CV later opnieuw downloaden?",
        answer:
          "Ja. Je kunt hetzelfde betaalde CV later opnieuw openen, inhoud aanpassen, van template of kleur wisselen en opnieuw als PDF downloaden zonder opnieuw voor dat document te betalen.",
      },
      {
        id: "betaalmethoden",
        question: "Welke betaalmethoden zijn beschikbaar?",
        answer:
          "De standaard CV-download wordt veilig afgerekend via Dodo Payments. Voor daarvoor geschikte Nederlandse checkouts is iDEAL beschikbaar. Andere getoonde methoden kunnen verschillen per land, apparaat, bank en betaalprovider.",
      },
      {
        id: "betaalbewijs",
        question: "Krijg ik een betaalbewijs of factuur?",
        answer:
          "Dodo Payments verwerkt de betaling, belasting en het betaalbewijs voor de standaard CV-download. Controleer na betaling ook je spammap. Ontbreekt het bewijs, neem dan contact op met het e-mailadres waarmee je betaalde.",
        href: "/contact",
        linkLabel: "Neem contact op",
      },
      {
        id: "betaling-download-mislukt",
        question: "Wat moet ik doen als betaling of download mislukt?",
        answer:
          "Vernieuw de editor niet direct en controleer eerst of je een betaalbevestiging hebt ontvangen. Open daarna hetzelfde CV opnieuw. Werkt de download nog steeds niet, stuur ons het gebruikte e-mailadres en het tijdstip van betaling; stuur nooit volledige bank- of kaartgegevens.",
        href: "/contact",
        linkLabel: "Meld een betaal- of downloadprobleem",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy en verwijderen",
    description: "Wie je CV kan zien en hoe WerkCV met uploads en AI-verwerking omgaat.",
    questions: [
      {
        id: "cv-openbaar",
        question: "Wordt mijn CV openbaar gepubliceerd?",
        answer:
          "Nee. WerkCV publiceert je CV niet automatisch als openbare webpagina. Het document is gekoppeld aan je account en noodzakelijke dienstverleners verwerken alleen gegevens voor functies die je gebruikt, zoals hosting, CV-import en betaling.",
        href: "/privacy",
        linkLabel: "Lees het privacybeleid",
      },
      {
        id: "gegevens-gebruikt",
        question: "Waarvoor gebruikt WerkCV mijn gegevens?",
        answer:
          "WerkCV gebruikt je gegevens om je account en CV op te slaan, de gevraagde PDF te leveren, betalingen te verwerken, functies uit te voeren die je zelf start en de technische werking van de dienst te verbeteren. CV-inhoud hoort niet thuis in analytics-events.",
        href: "/privacy",
        linkLabel: "Bekijk alle verwerkingsdoelen",
      },
      {
        id: "gegevens-verkocht",
        question: "Verkoopt WerkCV mijn persoonsgegevens?",
        answer:
          "Nee. WerkCV verkoopt je persoonsgegevens of CV-inhoud niet aan derden. Gegevens worden alleen met noodzakelijke dienstverleners gedeeld voor de functie die je gebruikt.",
        href: "/privacy",
        linkLabel: "Bekijk de gebruikte dienstverleners",
      },
      {
        id: "upload-bestand",
        question: "Wat gebeurt er met mijn geüploade CV-bestand?",
        answer:
          "WerkCV verwerkt het bestand om tekst te extraheren en de editor te vullen. De gestructureerde inhoud die je daarna opslaat, wordt onderdeel van je CV-account. Upload alleen informatie die je voor deze sollicitatiedienst wilt laten verwerken.",
        href: "/privacy",
        linkLabel: "Lees meer over uploads en bewaartermijnen",
      },
      {
        id: "ai-training",
        question: "Wordt mijn CV gebruikt om AI-modellen te trainen?",
        answer:
          "WerkCV gebruikt je CV niet om een eigen AI-model te trainen. Voor AI-functies die je zelf start, kan relevante tekst via de OpenAI API worden verwerkt. OpenAI vermeldt dat API-invoer en -uitvoer standaard niet worden gebruikt om modellen te trainen; voor beveiligingsdoeleinden kunnen beperkte logbewaartermijnen gelden.",
        href: "/privacy",
        linkLabel: "Lees hoe AI-verwerking is opgenomen in het privacybeleid",
      },
      {
        id: "verwijderen",
        question: "Kan ik mijn CV of account laten verwijderen?",
        answer:
          "Ja. Je kunt op grond van de AVG vragen om verwijdering van gegevens die niet langer wettelijk of contractueel nodig zijn. Stuur het verzoek vanaf het e-mailadres van je account, zodat we je identiteit kunnen controleren.",
        href: "/contact",
        linkLabel: "Dien een verwijderverzoek in",
      },
    ],
  },
  {
    id: "resultaat",
    title: "PDF, ATS en ondersteuning",
    description: "Wat WerkCV technisch levert en wat geen enkele CV-builder kan garanderen.",
    questions: [
      {
        id: "download-formaat",
        question: "In welk formaat download ik mijn CV?",
        answer:
          "WerkCV levert het CV als PDF. Gebruik altijd het bestandsformaat dat in de vacature wordt gevraagd; wanneer een werkgever expliciet om DOCX vraagt, is de WerkCV-PDF niet de juiste export voor die specifieke upload.",
      },
      {
        id: "voorbeeld-pdf",
        question: "Komt de PDF overeen met de volledige voorbeeldweergave?",
        answer:
          "Ja. De volledige voorbeeldweergave gebruikt dezelfde gepagineerde CV-weergave als de PDF-download. Controleer daar pagina-overgangen, afgebroken onderdelen en de gekozen template voordat je betaalt.",
      },
      {
        id: "ats-garantie",
        question: "Kan WerkCV garanderen dat mijn CV door ieder ATS komt?",
        answer:
          "Nee. Geen enkele CV-builder kan garanderen hoe ieder ATS een document verwerkt of rangschikt. WerkCV biedt rustige templates en een specifieke ATS-layout, maar de vacature-eisen, zoekwoorden, bestandsinstructies en instellingen van de werkgever blijven bepalend.",
        href: "/cv-tips/ats-vriendelijk-cv",
        linkLabel: "Lees de volledige ATS-uitleg",
      },
      {
        id: "gesprek-garantie",
        question: "Garandeert WerkCV dat ik word uitgenodigd?",
        answer:
          "Nee. WerkCV helpt je informatie helder en professioneel te presenteren, maar een uitnodiging hangt onder meer af van je ervaring, de vacature-eisen, concurrentie en de beoordeling door de werkgever.",
      },
      {
        id: "ondersteuning",
        question: "Hoe neem ik contact op als iets niet werkt?",
        answer:
          "Gebruik het contactformulier en vermeld het e-mailadres van je account, het betrokken CV en wat je vlak voor het probleem deed. Deel geen wachtwoorden, inlogcodes of volledige betaalgegevens.",
        href: "/contact",
        linkLabel: "Open het contactformulier",
      },
    ],
  },
];

export const productFaqItems = productFaqGroups.flatMap((group) => group.questions);

const aiFaqIds = new Set([
  "wat-is-werkcv",
  "account-nodig",
  "emailcode",
  "bestaand-cv-uploaden",
  "upload-formaten",
  "automatisch-opgeslagen",
  "werkcv-gratis",
  "download-kosten",
  "geen-abonnement",
  "bekijken-voor-betalen",
  "opnieuw-betalen",
  "opnieuw-downloaden",
  "betaalmethoden",
  "cv-openbaar",
  "gegevens-verkocht",
  "ai-training",
  "ats-garantie",
]);

export const aiProductFaqItems = productFaqItems
  .filter((item) => aiFaqIds.has(item.id))
  .map(({ question, answer, href }) => ({
    question,
    answer,
    canonicalUrl: href ? `https://werkcv.nl${href}` : "https://werkcv.nl/faq",
    language: "nl-NL",
  }));
