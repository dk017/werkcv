import { ApplicationHelpArticle } from "@/lib/sollicitatiehulp/types";

export const applicationHelpArticles: ApplicationHelpArticle[] = [
  {
    slug: "geachte-heer-mevrouw",
    category: "brief",
    title: "Geachte heer/mevrouw? Kies een betere aanhef",
    description:
      "Kies in tien seconden een correcte, eigentijdse aanhef voor je sollicitatiebrief of zakelijke e-mail—met of zonder naam van de ontvanger.",
    metaTitle: "Geachte heer/mevrouw: juiste aanhef + voorbeelden",
    metaDescription:
      "Is Geachte heer/mevrouw nog goed? Kies de juiste aanhef voor een sollicitatiebrief of zakelijke e-mail, met voorbeelden voor elke situatie.",
    keywords: [
      "geachte heer mevrouw",
      "geachte heer/mevrouw",
      "aanhef sollicitatiebrief",
      "aanhef onbekende ontvanger",
      "genderneutrale aanhef",
      "beste of geachte",
    ],
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingTime: 6,
    quickAnswer:
      "‘Geachte heer/mevrouw’ is begrijpelijk, maar meestal niet de beste eerste keuze. Weet je de naam, schrijf dan ‘Beste Robin de Vries,’ of formeler ‘Geachte Robin de Vries,’. Ken je de naam niet, spreek de rol of groep aan: ‘Beste recruiter,’ of ‘Geachte selectiecommissie,’.",
    keyTakeaways: [
      "Gebruik de naam van de ontvanger als die in de vacature of op de website staat.",
      "Kies ‘Beste’ voor professioneel en benaderbaar; kies ‘Geachte’ voor bewust formeel en afstandelijk.",
      "Is de naam onbekend, benoem dan liever de rol of groep dan ‘heer/mevrouw’.",
      "Zet een komma achter de aanhef en begin de eerste zin met een hoofdletter.",
    ],
    sections: [
      {
        id: "keuzehulp",
        title: "Welke aanhef past bij jouw situatie?",
        answer:
          "Naam bekend? Gebruik de volledige naam. Naam onbekend? Spreek de functie, afdeling of selectiecommissie aan.",
        paragraphs: [
          "Een goede aanhef laat zien dat je weet wie je voor je hebt. De juiste keuze hangt daarom niet alleen af van formaliteit, maar vooral van de informatie die je over de ontvanger hebt.",
          "Bekijk eerst de vacature, de contactpersoon bij de vacature en de teampagina van de organisatie. Eén minuut zoeken levert vaak een persoonlijkere opening op.",
        ],
        table: {
          headers: ["Situatie", "Aanbevolen aanhef", "Waarom"],
          rows: [
            ["Volledige naam bekend", "Beste Robin de Vries,", "Persoonlijk, professioneel en genderneutraal"],
            ["Naam bekend, zeer formele context", "Geachte Robin de Vries,", "Correct met bewust meer afstand"],
            ["Alleen rol bekend", "Beste recruiter,", "Gericht zonder een gender aan te nemen"],
            ["Brief aan een commissie", "Geachte selectiecommissie,", "Spreekt de ontvangende groep precies aan"],
            ["Geen naam of rol te vinden", "Geachte lezer,", "Neutraal, maar minder persoonlijk"],
          ],
        },
      },
      {
        id: "naam-bekend",
        title: "Als je de naam van de ontvanger kent",
        answer:
          "‘Beste + voornaam en achternaam’ is in modern zakelijk Nederlands vaak de veiligste keuze.",
        paragraphs: [
          "Met de volledige naam vermijd je een onnodige aanname over iemands aanspreekvorm. Dat maakt ‘Beste Robin de Vries,’ geschikt wanneer je niet weet hoe iemand aangesproken wil worden.",
          "Kies je voor de traditionele vorm, gebruik dan ‘Geachte heer De Vries,’ of ‘Geachte mevrouw De Vries,’. Combineer ‘Geachte’ niet met ‘meneer’: die stijlniveaus passen minder goed bij elkaar.",
        ],
        examples: [
          {
            label: "Meestal de beste keuze",
            text: "Beste Robin de Vries,",
            explanation: "Persoonlijk, professioneel en zonder genderaanduiding.",
            tone: "recommended",
          },
          {
            label: "Formeler alternatief",
            text: "Geachte Robin de Vries,",
            explanation: "Past bij een formele organisatie of brief, maar klinkt afstandelijker.",
            tone: "alternative",
          },
          {
            label: "Liever niet",
            text: "Geachte meneer De Vries,",
            explanation: "‘Geachte heer’ is de gebruikelijke formele combinatie; ‘meneer’ past beter bij ‘Beste’.",
            tone: "avoid",
          },
        ],
      },
      {
        id: "naam-onbekend",
        title: "Als je de naam niet kent",
        answer:
          "Maak de aanhef specifiek met de rol of groep: ‘Beste recruiter,’ werkt beter dan een algemene formule.",
        paragraphs: [
          "‘Geachte heer/mevrouw’ is niet fout, maar de formulering voelt generiek en sluit niet iedereen in. Een functie- of groepsnaam vertelt bovendien direct dat je weet waar je brief terechtkomt.",
          "Gebruik geen verzonnen naam en raad geen gender op basis van een voornaam. Kun je de ontvanger niet achterhalen, kies dan de meest specifieke rol die uit de vacature blijkt.",
        ],
        bullets: [
          "Beste recruiter,",
          "Beste HR-team,",
          "Geachte selectiecommissie,",
          "Beste medewerkers van de klantenservice,",
          "Geacht bestuur,",
        ],
      },
      {
        id: "sollicitatiebrief",
        title: "De beste aanhef voor een sollicitatiebrief",
        answer:
          "Spiegel de toon van de vacature, maar blijf professioneel: meestal is ‘Beste [volledige naam],’ passend.",
        paragraphs: [
          "Een informele vacature is geen reden om te openen met ‘Hoi!’ als je nog geen contact hebt gehad. ‘Beste’ is warm genoeg voor moderne organisaties en zakelijk genoeg voor een eerste kennismaking.",
          "Heb je de contactpersoon al gesproken? Verwijs daar niet in de aanhef naar, maar in je eerste zin. Bijvoorbeeld: ‘Dank voor ons telefoongesprek van dinsdag. De combinatie van klantcontact en procesverbetering sprak mij direct aan.’",
        ],
        examples: [
          {
            label: "Moderne organisatie",
            text: "Beste Samira El Amrani,",
            explanation: "Veilig wanneer de vacature persoonlijk en toegankelijk is geschreven.",
            tone: "recommended",
          },
          {
            label: "Formele procedure",
            text: "Geachte leden van de benoemingscommissie,",
            explanation: "Geschikt als de aanvraag expliciet via een formele commissie loopt.",
            tone: "alternative",
          },
        ],
      },
      {
        id: "spelling-en-leestekens",
        title: "Hoofdletters, tussenvoegsels en komma",
        answer:
          "Begin de aanhef met een hoofdletter, schrijf heer/mevrouw klein en plaats een komma aan het einde.",
        paragraphs: [
          "In ‘Geachte mevrouw Van der Knaap,’ krijgt ‘mevrouw’ een kleine letter. Een tussenvoegsel krijgt in Nederland een hoofdletter als er geen voornaam of voorletter vóór staat: ‘mevrouw Van der Knaap’, maar ‘Robin van der Knaap’.",
          "Na de komma begint de eerste echte zin van je brief met een hoofdletter. Laat na de aanhef een witregel staan; zo blijft de brief scanbaar.",
        ],
      },
    ],
    sources: [
      {
        publisher: "Genootschap Onze Taal",
        title: "Geachte heer/mevrouw",
        url: "https://onzetaal.nl/taalloket/geachte-heer-mevrouw",
        note: "Taaladvies over neutrale aanheffen wanneer naam of gender onbekend is.",
      },
      {
        publisher: "Genootschap Onze Taal",
        title: "Hoofdletters in de aanhef van brief of mail",
        url: "https://onzetaal.nl/taalloket/hoofdletters-in-aanhef-brief-of-mail",
        note: "Conventies voor hoofdletters, aanspreekvormen en Nederlandse tussenvoegsels.",
      },
      {
        publisher: "Taaladvies.net",
        title: "Opmaak van een zakelijke brief in Nederland",
        url: "https://taaladvies.net/opmaak-van-een-zakelijke-brief-in-nederland-algemeen/",
        note: "Nederlandse conventies voor aanhef, brieftekst, slotgroet en ondertekening.",
      },
    ],
    faqs: [
      {
        question: "Is ‘Geachte heer/mevrouw’ fout?",
        answer:
          "Nee. De aanhef is begrijpelijk en nog in gebruik, maar een neutrale aanhef met de volledige naam, functie of groep is meestal persoonlijker en eigentijdser.",
      },
      {
        question: "Schrijf je ‘Geachte Heer/Mevrouw’ met hoofdletters?",
        answer:
          "Nee. Alleen het eerste woord van de aanhef en eigennamen krijgen een hoofdletter: ‘Geachte heer De Vries,’ of ‘Geachte mevrouw Van der Knaap,’.",
      },
      {
        question: "Is ‘Beste’ te informeel voor een sollicitatiebrief?",
        answer:
          "Meestal niet. ‘Beste + volledige naam’ is professioneel en benaderbaar. Gebruik ‘Geachte’ wanneer de organisatie of procedure duidelijk formeel is.",
      },
      {
        question: "Wat schrijf je als er geen contactpersoon in de vacature staat?",
        answer:
          "Controleer eerst de organisatiepagina. Vind je niemand, spreek dan de rol of groep aan, bijvoorbeeld ‘Beste recruiter,’ of ‘Geachte selectiecommissie,’.",
      },
    ],
    related: [
      {
        href: "/sollicitatiehulp/naar-aanleiding-van",
        label: "Naar aanleiding van: zo schrijf je het goed",
        description: "Kies na je aanhef een sterke, foutloze eerste zin.",
      },
      {
        href: "/sollicitatiehulp/hopende-u-hiermee-voldoende-te-hebben-geinformeerd",
        label: "Een zakelijke brief modern afsluiten",
        description: "Vervang een ouderwetse slotzin door een duidelijke vervolgstap.",
      },
      {
        href: "/sollicitatiebrief-maken",
        label: "Sollicitatiebrief maken",
        description: "Bekijk structuur en voorbeelden voor de volledige brief.",
      },
    ],
    primaryCta: {
      href: "/tools/sollicitatiebrief-generator",
      label: "Maak je sollicitatiebrief",
      description: "Zet je vacature en ervaring om in een persoonlijke eerste versie.",
    },
    secondaryCta: {
      href: "/sollicitatiebrief-voorbeeld",
      label: "Bekijk briefvoorbeelden",
      description: "Zie hoe aanhef, kern en afsluiting samenkomen.",
    },
    order: 10,
  },
  {
    slug: "hopende-u-hiermee-voldoende-te-hebben-geinformeerd",
    category: "taal",
    title: "‘Hopende u hiermee voldoende te hebben geïnformeerd’: beter afsluiten",
    description:
      "De bekende slotzin klinkt afstandelijk en is vaak geen volledige zin. Kies een helder alternatief dat past bij het doel van je brief of e-mail.",
    metaTitle: "Hopende u hiermee voldoende te hebben geïnformeerd: beter",
    metaDescription:
      "Vervang ‘Hopende u hiermee voldoende te hebben geïnformeerd’ door een moderne slotzin. 18 alternatieven voor informatie, actie en sollicitatie.",
    keywords: [
      "hopende u hiermee voldoende te hebben geïnformeerd",
      "ik hoop u hiermee voldoende geïnformeerd te hebben",
      "brief afsluiten",
      "zakelijke brief afsluiten",
      "alternatief hopende",
      "slotzin sollicitatiebrief",
    ],
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingTime: 7,
    quickAnswer:
      "Vervang ‘Hopende u hiermee voldoende te hebben geïnformeerd’ door een actieve zin die zegt wat je nu verwacht. Bijvoorbeeld: ‘Ik hoop dat dit uw vraag beantwoordt.’, ‘Laat u het weten als u nog vragen heeft?’ of bij een sollicitatie: ‘Graag licht ik mijn motivatie toe in een gesprek.’",
    keyTakeaways: [
      "De losse formulering met ‘hopende’ is afstandelijk en voelt onvolledig.",
      "Een goede slotzin benoemt het doel: informeren, uitnodigen, bevestigen of om actie vragen.",
      "Gebruik één passende vervolgstap; stapel geen drie beleefdheidsformules op elkaar.",
      "Schrijf ‘hiermee’ in modern Nederlands, niet het verouderde ‘hiermede’.",
    ],
    sections: [
      {
        id: "is-de-zin-goed",
        title: "Is de zin fout of vooral ouderwets?",
        answer:
          "Als losse slotregel is de formulering geen volledige zin; als aanloop naar ‘verblijf ik’ is zij grammaticaal mogelijk, maar sterk verouderd.",
        paragraphs: [
          "‘Hopende’ is een tegenwoordig deelwoord. In oudere brieven volgde daarop vaak een hoofdzin, zoals ‘Hopende u hiermee van dienst te zijn, verblijf ik ...’. Zonder zo’n hoofdzin blijft alleen een zinsdeel over.",
          "Het grootste probleem is niet alleen grammatica. De formulering vertelt de lezer niet wat er van hem of haar wordt verwacht. Moderne zakelijke taal maakt die vervolgstap expliciet.",
        ],
        examples: [
          {
            label: "Duidelijk en compleet",
            text: "Ik hoop dat dit uw vraag beantwoordt.",
            explanation: "Een volledige zin die precies bij een informatief antwoord past.",
            tone: "recommended",
          },
          {
            label: "Correct maar formeel",
            text: "Ik hoop u hiermee voldoende geïnformeerd te hebben.",
            explanation: "Grammaticaal compleet, maar nog steeds afstandelijk en algemeen.",
            tone: "alternative",
          },
          {
            label: "Niet als losse zin",
            text: "Hopende u hiermee voldoende te hebben geïnformeerd.",
            explanation: "Er ontbreekt een hoofdzin; bovendien blijft de gewenste vervolgstap onduidelijk.",
            tone: "avoid",
          },
        ],
      },
      {
        id: "alternatieven-per-doel",
        title: "Kies een alternatief op basis van je doel",
        answer:
          "De beste slotzin is niet de beleefdste standaardzin, maar de zin die het gewenste vervolg helder maakt.",
        paragraphs: [
          "Kies eerst wat de lezer na je bericht moet weten of doen. Formuleer daarna één korte slotzin. Zo klinkt je brief menselijker en verklein je de kans op heen-en-weer mailen.",
        ],
        table: {
          headers: ["Doel", "Passende slotzin", "Toon"],
          rows: [
            ["Vraag beantwoorden", "Ik hoop dat dit uw vraag beantwoordt.", "Neutraal"],
            ["Ruimte voor vragen", "Heeft u nog vragen? Ik help u graag verder.", "Behulpzaam"],
            ["Reactie vóór een datum", "Laat u mij uiterlijk 18 augustus weten of dit akkoord is?", "Duidelijk"],
            ["Afspraak bevestigen", "Ik zie u graag op donderdag 20 augustus om 10.00 uur.", "Concreet"],
            ["Documenten meesturen", "In de bijlage vindt u de gevraagde documenten.", "Zakelijk"],
            ["Geen actie nodig", "U hoeft naar aanleiding van dit bericht niets te doen.", "Geruststellend"],
          ],
        },
      },
      {
        id: "sollicitatiebrief-afsluiten",
        title: "Een sollicitatiebrief afsluiten zonder cliché",
        answer:
          "Sluit af met belangstelling voor een gesprek en koppel die aan de bijdrage die je wilt leveren.",
        paragraphs: [
          "Een sollicitatiebrief is geen klantenservicebericht. ‘Ik hoop u voldoende geïnformeerd te hebben’ past daarom niet bij het doel: je wilt een vervolg in de selectieprocedure.",
          "Vermijd ook een eisende toon als ‘Ik verwacht spoedig uw reactie’. Zelfverzekerd betekent dat je concreet bent, niet dat je de uitkomst alvast voorschrijft.",
        ],
        examples: [
          {
            label: "Sterk en inhoudelijk",
            text: "Graag licht ik in een gesprek toe hoe ik mijn ervaring met procesverbetering bij uw serviceteam kan inzetten.",
            explanation: "De uitnodiging is gekoppeld aan relevante waarde voor de werkgever.",
            tone: "recommended",
          },
          {
            label: "Kort alternatief",
            text: "Ik kijk ernaar uit mijn motivatie in een gesprek verder toe te lichten.",
            explanation: "Correct en bruikbaar wanneer de vorige alinea al specifiek genoeg is.",
            tone: "alternative",
          },
          {
            label: "Te dwingend",
            text: "Ik verwacht op korte termijn een uitnodiging van u.",
            explanation: "De formulering neemt een besluit van de werkgever voor en kan arrogant overkomen.",
            tone: "avoid",
          },
        ],
      },
      {
        id: "formeel-of-informeel",
        title: "Formeel, neutraal of persoonlijk afsluiten",
        answer:
          "Spiegel de relatie en het kanaal, maar houd de slotzin altijd concreet.",
        paragraphs: [
          "In een formeel besluit past ‘Heeft u naar aanleiding van deze brief nog vragen, dan licht ik het besluit graag toe.’ In een normale zakelijke e-mail is ‘Laat gerust weten als iets nog niet duidelijk is’ natuurlijker.",
          "Gebruik in één bericht consequent ‘u’ of ‘je’. Wisselen tussen beide maakt zelfs een goede slotzin onrustig.",
        ],
        bullets: [
          "Formeel: ‘Ik vertrouw erop u hiermee duidelijkheid te hebben gegeven.’",
          "Neutraal: ‘Ik hoop dat dit de vervolgstappen verduidelijkt.’",
          "Persoonlijk: ‘Laat gerust weten als je nog iets wilt bespreken.’",
          "Actiegericht: ‘Wilt u de ondertekende versie vóór vrijdag retourneren?’",
        ],
      },
      {
        id: "slotgroet",
        title: "En daarna: de slotgroet",
        answer:
          "Zet na je slotzin een witregel en gebruik meestal ‘Met vriendelijke groet,’.",
        paragraphs: [
          "‘Met vriendelijke groet,’ is in Nederland de veiligste zakelijke slotgroet. ‘Hoogachtend,’ past alleen bij een bewust formele of juridische brief. In een lopend contact kan ‘Hartelijke groet,’ passend zijn.",
          "Onderteken met je voor- en achternaam. Vermeld daaronder alleen contactgegevens die niet al logisch uit het bericht of je cv blijken.",
        ],
      },
    ],
    sources: [
      {
        publisher: "Taaladvies.net",
        title: "Opmaak van een zakelijke brief in Nederland",
        url: "https://taaladvies.net/opmaak-van-een-zakelijke-brief-in-nederland-algemeen/",
        note: "Adviseert actieve moderne formuleringen in plaats van traditionele ‘hopende’-constructies.",
      },
      {
        publisher: "Genootschap Onze Taal",
        title: "Taalalmanak: de sollicitatiebrief",
        url: "https://onzetaal.nl/uploads/editor/Taalalmanak.pdf",
        note: "Bespreekt formele clichés en rustige, zakelijke alternatieven in sollicitatiebrieven.",
      },
    ],
    faqs: [
      {
        question: "Is ‘Hopende u hiermee voldoende te hebben geïnformeerd’ correct Nederlands?",
        answer:
          "Als losse regel is het geen volledige zin. In een oudere constructie met een hoofdzin kan het grammaticaal werken, maar in moderne zakelijke communicatie is een actieve, concrete slotzin duidelijker.",
      },
      {
        question: "Wat is het beste korte alternatief?",
        answer:
          "Na een informatief antwoord: ‘Ik hoop dat dit uw vraag beantwoordt.’ Als je vervolgvragen verwacht: ‘Heeft u nog vragen? Ik help u graag verder.’",
      },
      {
        question: "Hoe sluit je een sollicitatiebrief af?",
        answer:
          "Koppel je belangstelling voor een gesprek aan de bijdrage die je wilt leveren, bijvoorbeeld: ‘Graag licht ik toe hoe ik mijn ervaring met planning in uw team kan inzetten.’",
      },
      {
        question: "Is ‘hiermede’ nog correct?",
        answer:
          "Het woord bestaat, maar klinkt sterk verouderd. Gebruik in hedendaags Nederlands ‘hiermee’.",
      },
    ],
    related: [
      {
        href: "/sollicitatiehulp/geachte-heer-mevrouw",
        label: "Een brief goed beginnen",
        description: "Kies een persoonlijke, genderneutrale of formele aanhef.",
      },
      {
        href: "/sollicitatiehulp/naar-aanleiding-van",
        label: "Naar aanleiding van of na aanleiding van?",
        description: "Los een van de meest gemaakte fouten in zakelijke brieven op.",
      },
      {
        href: "/sollicitatiebrief-maken",
        label: "Volledige sollicitatiebrief schrijven",
        description: "Werk van opening naar bewijs en een passende afsluiting.",
      },
    ],
    primaryCta: {
      href: "/tools/sollicitatiebrief-generator",
      label: "Schrijf een persoonlijke sollicitatiebrief",
      description: "Maak een eerste versie met een doelgerichte slotzin.",
    },
    secondaryCta: {
      href: "/sollicitatiebrief-voorbeeld",
      label: "Bekijk complete voorbeelden",
      description: "Vergelijk openingen, bewijsalinea’s en afsluitingen.",
    },
    order: 20,
  },
  {
    slug: "naar-aanleiding-van",
    category: "taal",
    title: "Naar aanleiding van of na aanleiding van?",
    description:
      "‘Naar aanleiding van’ is correct. Leer het verschil met ‘na’, bekijk voorbeelden voor zakelijke e-mails en schrijf een sterkere openingszin.",
    metaTitle: "Naar aanleiding van of na aanleiding van? Uitleg",
    metaDescription:
      "‘Naar aanleiding van’ is juist; ‘na aanleiding van’ is fout. Bekijk de regel, 15 voorbeelden en betere openingen voor brief, mail en sollicitatie.",
    keywords: [
      "naar aanleiding van",
      "na aanleiding van",
      "nav aanleiding van",
      "naar aanleiding van uw vacature",
      "naar aanleiding van ons gesprek",
      "naar aanleiding betekenis",
    ],
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingTime: 6,
    quickAnswer:
      "‘Naar aanleiding van’ is de juiste vaste combinatie. Zij betekent ‘door’ of ‘als gevolg van’. ‘Na’ gebruik je voor tijd of volgorde: ‘na het gesprek’. Dus: ‘Naar aanleiding van ons gesprek stuur ik mijn cv’ en ‘Na ons gesprek stuurde ik mijn cv’ zijn allebei goed, maar betekenen niet precies hetzelfde.",
    keyTakeaways: [
      "Schrijf altijd ‘naar aanleiding van’; ‘na aanleiding van’ is niet juist.",
      "Gebruik ‘na’ wanneer je alleen een moment of volgorde bedoelt.",
      "In een sollicitatiebrief is de combinatie correct, maar vaak onnodig algemeen.",
      "Noem in je openingszin liever het concrete detail dat je in beweging bracht.",
    ],
    sections: [
      {
        id: "regel",
        title: "Waarom is ‘naar aanleiding van’ correct?",
        answer:
          "Het gaat om een vaste combinatie waarin ‘naar’ ongeveer ‘als gevolg van’ of ‘door’ betekent.",
        paragraphs: [
          "‘Aanleiding’ is de reden waardoor je iets doet. In de vaste combinatie hoort daarom ‘naar’. De fout ontstaat makkelijk omdat de r aan het einde van ‘naar’ in gesproken taal nauwelijks hoorbaar kan zijn.",
          "Een geheugensteun: kun je de combinatie vervangen door ‘door’ of ‘vanwege’, dan schrijf je ‘naar aanleiding van’. Kun je ‘later dan’ bedoelen, dan kan ‘na’ juist zijn.",
        ],
        examples: [
          {
            label: "Correct",
            text: "Naar aanleiding van uw vraag heb ik de planning aangepast.",
            explanation: "De vraag is de reden voor de aanpassing.",
            tone: "recommended",
          },
          {
            label: "Ook correct, andere betekenis",
            text: "Na uw vraag werd het even stil.",
            explanation: "‘Na’ geeft hier alleen een volgorde in de tijd aan.",
            tone: "alternative",
          },
          {
            label: "Onjuist",
            text: "Na aanleiding van uw vraag heb ik de planning aangepast.",
            explanation: "In de vaste combinatie hoort ‘naar’.",
            tone: "avoid",
          },
        ],
      },
      {
        id: "na-of-naar",
        title: "Het verschil tussen ‘na’ en ‘naar’ in één overzicht",
        answer:
          "‘Na’ ordent gebeurtenissen in de tijd; ‘naar aanleiding van’ benoemt de reden of aanleiding.",
        paragraphs: [
          "De zinnen kunnen dicht bij elkaar liggen, maar leggen een ander verband. Dat verschil helpt je om niet alleen correct, maar ook preciezer te schrijven.",
        ],
        table: {
          headers: ["Bedoeling", "Voorbeeld", "Test"],
          rows: [
            ["Reden", "Naar aanleiding van uw klacht neem ik contact op.", "Vervangbaar door ‘vanwege’"],
            ["Volgorde", "Na uw klacht volgde een onderzoek.", "Vervangbaar door ‘later dan’"],
            ["Reden", "Naar aanleiding van ons gesprek stuur ik de offerte.", "Het gesprek zette de actie in gang"],
            ["Moment", "Na ons gesprek werk ik de offerte uit.", "De actie vindt later plaats"],
          ],
        },
      },
      {
        id: "zakelijke-voorbeelden",
        title: "Voorbeelden voor brief en e-mail",
        answer:
          "Zet na de vaste combinatie meteen de concrete actie, vraag of afspraak.",
        paragraphs: [
          "‘Naar aanleiding van’ is functioneel wanneer je een eerder contactmoment of document precies koppelt aan je bericht. Voeg een datum of onderwerp toe als de ontvanger meerdere zaken behandelt.",
        ],
        bullets: [
          "Naar aanleiding van uw e-mail van 10 augustus bevestig ik dat de afspraak doorgaat.",
          "Naar aanleiding van ons telefoongesprek stuur ik u de aangepaste offerte.",
          "Naar aanleiding van klacht 4821 ontvangt u hierbij ons onderzoeksverslag.",
          "Naar aanleiding van de teamvergadering heb ik drie beslispunten uitgewerkt.",
          "Naar aanleiding van uw verzoek vindt u de loonstrook in de beveiligde bijlage.",
        ],
      },
      {
        id: "sollicitatiebrief",
        title: "‘Naar aanleiding van uw vacature’ in een sollicitatiebrief",
        answer:
          "De opening is correct, maar vertelt nog niet waarom juist deze vacature jou aanspreekt.",
        paragraphs: [
          "Werkgevers weten al dat je brief naar aanleiding van de vacature komt. Gebruik de schaarse eerste regels liever om een relevante aanleiding, ervaring of motivatie te noemen.",
          "Wil je de vacaturebron vermelden omdat daarom wordt gevraagd? Doe dat compact in de onderwerpregel of eerste alinea, en ga direct door naar inhoudelijk bewijs.",
        ],
        examples: [
          {
            label: "Sterkere opening",
            text: "Toen ik las dat jullie serviceteam de wachttijd wil halveren, herkende ik precies het vraagstuk dat ik bij mijn huidige werkgever heb opgelost.",
            explanation: "Noemt een concreet vacaturedetail en verbindt dat direct aan bewijs.",
            tone: "recommended",
          },
          {
            label: "Functioneel",
            text: "Naar aanleiding van de vacature voor planner op Werk.nl solliciteer ik naar deze functie.",
            explanation: "Correct, maar algemeen; laat snel een specifiekere tweede zin volgen.",
            tone: "alternative",
          },
          {
            label: "Fout en algemeen",
            text: "Na aanleiding van uw vacature wil ik graag solliciteren.",
            explanation: "‘Na’ is fout in deze vaste combinatie en de zin onderscheidt je niet.",
            tone: "avoid",
          },
        ],
      },
      {
        id: "afkorting-nav",
        title: "Kun je ‘n.a.v.’ schrijven?",
        answer:
          "De afkorting wordt begrepen, maar schrijf de woorden voluit in formele of publieksgerichte tekst.",
        paragraphs: [
          "In interne notities of een korte onderwerpregel kan ‘n.a.v.’ ruimte besparen. In een sollicitatiebrief, klantbericht of webtekst leest ‘naar aanleiding van’ rustiger en professioneler.",
          "Gebruik ‘nav’ zonder punten niet als vervanging in lopende Nederlandse tekst; die vorm kan bovendien worden gelezen als een andere afkorting of technisch label.",
        ],
      },
    ],
    sources: [
      {
        publisher: "Genootschap Onze Taal",
        title: "Naar aanleiding van / na aanleiding van",
        url: "https://onzetaal.nl/taalloket/na-naar-aanleiding-van",
        note: "Legt de vaste combinatie, betekenis en het verschil met tijdsbepalend ‘na’ uit.",
      },
      {
        publisher: "Taaladvies.net",
        title: "Opmaak van een zakelijke brief in Nederland",
        url: "https://taaladvies.net/opmaak-van-een-zakelijke-brief-in-nederland-algemeen/",
        note: "Zakelijke briefconventies waarop de toepassingsvoorbeelden zijn afgestemd.",
      },
    ],
    faqs: [
      {
        question: "Wat is juist: naar aanleiding van of na aanleiding van?",
        answer:
          "‘Naar aanleiding van’ is juist. Het is een vaste combinatie met de betekenis ‘door’ of ‘als gevolg van’.",
      },
      {
        question: "Waarom hoor je vaak ‘na aanleiding van’?",
        answer:
          "De slot-r van ‘naar’ is in gesproken taal soms nauwelijks hoorbaar. Daardoor wordt de fout ook in geschreven tekst gemaakt.",
      },
      {
        question: "Is ‘naar aanleiding van uw vacature’ een goede openingszin?",
        answer:
          "De formulering is correct, maar algemeen. Een concreet detail uit de vacature plus jouw relevante ervaring maakt een overtuigender opening.",
      },
      {
        question: "Wat is een alternatief voor ‘naar aanleiding van’?",
        answer:
          "Afhankelijk van de zin kun je schrijven ‘door’, ‘vanwege’, ‘over’, ‘zoals besproken’ of direct beginnen met de actie: ‘Dank voor ons gesprek. Hierbij stuur ik ...’.",
      },
    ],
    related: [
      {
        href: "/sollicitatiehulp/geachte-heer-mevrouw",
        label: "De juiste aanhef kiezen",
        description: "Begin je brief persoonlijk en met de juiste hoofdletters.",
      },
      {
        href: "/sollicitatiehulp/hopende-u-hiermee-voldoende-te-hebben-geinformeerd",
        label: "De brief helder afsluiten",
        description: "Kies een concrete slotzin in plaats van een formeel cliché.",
      },
      {
        href: "/sollicitatiebrief-maken",
        label: "Een overtuigende sollicitatiebrief maken",
        description: "Bouw een brief rond motivatie, bewijs en aansluiting.",
      },
    ],
    primaryCta: {
      href: "/tools/sollicitatiebrief-generator",
      label: "Maak een sterkere brief",
      description: "Begin met het relevante vacaturedetail, niet met een standaardzin.",
    },
    secondaryCta: {
      href: "/sollicitatiebrief-voorbeeld",
      label: "Vergelijk briefopeningen",
      description: "Bekijk complete Nederlandse sollicitatiebriefvoorbeelden.",
    },
    order: 30,
  },
  {
    slug: "cv-betekenis",
    category: "cv",
    title: "Wat betekent cv? Betekenis, spelling en inhoud",
    description:
      "Cv staat voor curriculum vitae: de loop van je leven. Bekijk de juiste spelling, het meervoud en wat een cv voor een sollicitatie bevat.",
    metaTitle: "Cv betekenis: waar staat cv voor en wat staat erin?",
    metaDescription:
      "Cv betekent curriculum vitae (‘levensloop’). Leer de juiste spelling—cv, het cv en cv’s—plus de 7 onderdelen van een goed sollicitatie-cv.",
    keywords: [
      "cv betekenis",
      "wat betekent cv",
      "waar staat cv voor",
      "curriculum vitae betekenis",
      "wat is een cv",
      "cv afkorting",
    ],
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingTime: 7,
    quickAnswer:
      "Cv is de afkorting van het Latijnse curriculum vitae: ‘loop van het leven’ of ‘levensloop’. Bij een sollicitatie is je cv een compact overzicht van relevante werkervaring, opleiding, vaardigheden en resultaten. De juiste Nederlandse spelling is cv, met kleine letters en zonder punten.",
    keyTakeaways: [
      "Cv staat voor curriculum vitae, letterlijk de loop van het leven.",
      "Schrijf cv met kleine letters en zonder punten; schrijf het meervoud als cv’s.",
      "In de betekenis curriculum vitae is het ‘het cv’ en ‘een goed cv’.",
      "Een sollicitatie-cv is geen volledige autobiografie: selecteer wat relevant is voor de functie.",
    ],
    sections: [
      {
        id: "betekenis",
        title: "Waar staat de afkorting cv voor?",
        answer:
          "Cv staat voor curriculum vitae, een Latijnse woordgroep die ‘loop van het leven’ betekent.",
        paragraphs: [
          "Het woord curriculum betekent ‘loop’ en vitae betekent ‘van het leven’. In een sollicitatiecontext gaat het niet om elk detail uit je leven, maar om de feiten die laten zien wat je professioneel kunt bijdragen.",
          "Je cv vormt samen met de vacature en vaak een sollicitatiebrief de basis van de eerste selectie. Het document moet daarom snel antwoord geven op drie vragen: wat kun je, waar blijkt dat uit en past dat bij deze functie?",
        ],
      },
      {
        id: "spelling",
        title: "Schrijf je cv, CV of c.v.?",
        answer:
          "De standaardspelling is cv: kleine letters, geen punten.",
        paragraphs: [
          "Cv is een letter voor letter uitgesproken afkorting van een gewone woordgroep. Zulke ingeburgerde afkortingen krijgen in het Nederlands meestal kleine letters en geen punten.",
          "Aan het begin van een zin krijgt alleen de eerste letter een hoofdletter: ‘Cv’s verschillen per land.’ In een titel kan de gekozen huisstijl hoofdletters gebruiken, maar in gewone tekst is cv de taalnorm.",
        ],
        table: {
          headers: ["Vraag", "Juiste vorm", "Voorbeeld"],
          rows: [
            ["Enkelvoud", "cv", "Stuur je cv als pdf."],
            ["Lidwoord", "het cv", "Het cv sluit aan op de vacature."],
            ["Bijvoeglijk naamwoord", "een goed cv", "Maak een goed cv van maximaal twee pagina’s."],
            ["Meervoud", "cv’s", "De recruiter vergelijkt twintig cv’s."],
            ["Voluit, meervoud", "curricula vitae", "De commissie beoordeelt de curricula vitae."],
          ],
        },
      },
      {
        id: "onderdelen",
        title: "Wat staat er in een cv?",
        answer:
          "Een modern cv bevat contactgegevens, profiel, ervaring, opleiding en relevante vaardigheden; andere onderdelen zijn functieafhankelijk.",
        paragraphs: [
          "De vacature bepaalt de volgorde en nadruk. Voor een ervaren kandidaat staat werkervaring meestal boven opleiding. Voor een student of starter kan opleiding, stage of projectervaring juist eerder komen.",
        ],
        bullets: [
          "Naam, woonplaats, telefoonnummer en professioneel e-mailadres",
          "Een korte profieltekst die doelrol en relevante waarde samenvat",
          "Werkervaring in omgekeerd chronologische volgorde",
          "Opleidingen en relevante cursussen of certificaten",
          "Vaardigheden die je met voorbeelden of resultaten kunt onderbouwen",
          "Talen en digitale kennis wanneer die voor de functie tellen",
          "Optionele projecten, vrijwilligerswerk, publicaties of nevenactiviteiten",
        ],
      },
      {
        id: "wat-hoeft-er-niet-in",
        title: "Wat hoeft niet in je cv?",
        answer:
          "Laat gegevens weg die geen professionele keuze ondersteunen of onnodig privacygevoelig zijn.",
        paragraphs: [
          "Een cv is een selectiedocument, geen bevolkingsregister. Je hoeft niet automatisch je volledige adres, geboortedatum, geboorteplaats, burgerlijke staat of BSN op te nemen.",
          "Ook een pasfoto is niet verplicht. Kies alleen voor een foto wanneer die professioneel is en jij die bewust wilt gebruiken. Vermeld referenties pas wanneer de werkgever erom vraagt, of schrijf dat ze op verzoek beschikbaar zijn als dit relevant is.",
        ],
      },
      {
        id: "cv-op-maat",
        title: "Waarom één basis-cv niet hetzelfde is als één standaard-cv",
        answer:
          "Bewaar één volledig basisdocument en maak daaruit per vacature een gerichte versie.",
        paragraphs: [
          "Je basis-cv mag al je bruikbare ervaring bevatten. Voor een sollicitatie selecteer en herschik je de onderdelen die bij de vacature passen. Dat is geen informatie verbergen; het is de lezer helpen om relevant bewijs snel te vinden.",
          "Neem woorden uit de vacature alleen over als ze jouw ervaring eerlijk beschrijven. Voeg vervolgens bewijs toe: omvang, resultaat, frequentie, doelgroep of gebruikte methode.",
        ],
        examples: [
          {
            label: "Alleen een eigenschap",
            text: "Klantgericht en resultaatgericht.",
            explanation: "Algemeen en niet controleerbaar.",
            tone: "avoid",
          },
          {
            label: "Eigenschap met bewijs",
            text: "Beantwoordde gemiddeld 45 klantvragen per dag en verhoogde de first-time-fix van 71% naar 83%.",
            explanation: "Maakt gedrag, schaal en resultaat zichtbaar.",
            tone: "recommended",
          },
        ],
      },
    ],
    sources: [
      {
        publisher: "Genootschap Onze Taal",
        title: "CV / C.V. / cv / c.v.",
        url: "https://onzetaal.nl/taalloket/cv-cv",
        note: "Geeft de norm voor afkorting, kleine letters, punten en het lidwoord.",
      },
      {
        publisher: "Genootschap Onze Taal",
        title: "Curriculum vitaes / curricula vitae",
        url: "https://onzetaal.nl/taalloket/curriculum-vitaes-curricula-vitae",
        note: "Legt de Latijnse betekenis en de meervoudsvormen curricula vitae en cv’s uit.",
      },
      {
        publisher: "Europass — Europese Unie",
        title: "Cv opstellen met Europass",
        url: "https://europass.europa.eu/nl/create-europass-cv",
        note: "Europese richtlijnen over relevantie, maatwerk, leesbaarheid en chronologie.",
      },
    ],
    faqs: [
      {
        question: "Wat is de betekenis van cv?",
        answer:
          "Cv staat voor curriculum vitae, Latijn voor ‘loop van het leven’ of ‘levensloop’. Bij solliciteren is het een overzicht van relevante ervaring, opleiding en vaardigheden.",
      },
      {
        question: "Is het de cv of het cv?",
        answer:
          "In de betekenis curriculum vitae is het ‘het cv’, omdat het ook ‘het curriculum vitae’ is. ‘De cv’ kan centrale verwarming betekenen.",
      },
      {
        question: "Hoe schrijf je het meervoud van cv?",
        answer:
          "Je schrijft cv’s met een apostrof. Voluit is het Latijnse meervoud curricula vitae.",
      },
      {
        question: "Hoe lang moet een cv zijn?",
        answer:
          "Voor de meeste Nederlandse sollicitaties is één of twee pagina’s voldoende. Relevantie en scanbaarheid zijn belangrijker dan een absoluut aantal pagina’s.",
      },
    ],
    related: [
      {
        href: "/sollicitatiehulp/cv-vs-resume",
        label: "Cv of resume?",
        description: "Kies de juiste term en inhoud voor Nederland, Europa of de VS.",
      },
      {
        href: "/cv-maken",
        label: "Een cv maken dat bij de vacature past",
        description: "Ga van betekenis en structuur naar een compleet document.",
      },
      {
        href: "/cv-tips/professioneel-cv-onderdelen",
        label: "Alle cv-onderdelen uitgelegd",
        description: "Bepaal wat je opneemt en in welke volgorde.",
      },
    ],
    primaryCta: {
      href: "/editor",
      label: "Maak nu je cv",
      description: "Vul de juiste onderdelen in en download je gerichte versie als pdf.",
    },
    secondaryCta: {
      href: "/cv-voorbeelden",
      label: "Bekijk cv-voorbeelden",
      description: "Vergelijk inhoud en nadruk voor verschillende beroepen.",
    },
    order: 40,
  },
  {
    slug: "cv-vs-resume",
    category: "cv",
    title: "Cv versus resume: wat is het verschil?",
    description:
      "In Nederland bedoelen werkgevers meestal hetzelfde, maar in de Verenigde Staten kan een academic CV wezenlijk verschillen van een resume.",
    metaTitle: "Cv vs resume: verschil in Nederland, Europa en de VS",
    metaDescription:
      "Wat is het verschil tussen cv en resume? Vergelijk betekenis, lengte en gebruik in Nederland, Europa, het VK en de VS met een praktische keuzehulp.",
    keywords: [
      "cv vs resume",
      "resume vs cv",
      "verschil cv resume",
      "resume betekenis",
      "resume nederlands",
      "cv engels",
    ],
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingTime: 8,
    quickAnswer:
      "In Nederland en veel Europese landen is ‘cv’ de normale term voor een gericht sollicitatiedocument. Bij internationale bedrijven kan ‘resume’ hetzelfde bedoelen. In de Verenigde Staten is een resume meestal kort en functiegericht, terwijl een CV vooral voor academische, onderzoeks- en medische loopbanen een uitgebreid overzicht van prestaties is.",
    keyTakeaways: [
      "Volg altijd de term en instructies in de vacature.",
      "Voor een Nederlandse vacature lever je doorgaans een cv aan, ook als het document compact en op maat is.",
      "Voor een reguliere Amerikaanse baan wordt meestal een resume gevraagd.",
      "Een Amerikaans academic CV is geen langer standaard-cv, maar een ander document met onderzoek, onderwijs en publicaties.",
    ],
    sections: [
      {
        id: "kort-verschil",
        title: "Het verschil in één tabel",
        answer:
          "De betekenis hangt af van land en sector: context is belangrijker dan alleen het woord op de bestandsnaam.",
        paragraphs: [
          "‘Cv’ en ‘resume’ worden wereldwijd niet overal op dezelfde manier gebruikt. Daardoor zijn stellige regels als ‘een cv is altijd lang’ of ‘een resume is altijd één pagina’ misleidend.",
        ],
        table: {
          headers: ["Context", "Gebruikelijke term", "Inhoud en lengte"],
          rows: [
            ["Nederland en veel van Europa", "cv", "Gericht overzicht, vaak 1–2 pagina’s"],
            ["Verenigd Koninkrijk", "CV", "Sollicitatiedocument voor reguliere banen"],
            ["Verenigde Staten, bedrijfsleven", "resume", "Kort, resultaatgericht en per functie aangepast"],
            ["Verenigde Staten, academisch/onderzoek", "CV", "Uitgebreid overzicht zonder vaste paginalimiet"],
            ["Internationaal bedrijf", "Volg vacature", "Controleer taal, land en expliciete eisen"],
          ],
        },
      },
      {
        id: "nederland-en-europa",
        title: "Wat stuur je in Nederland en Europa?",
        answer:
          "Voor een Nederlandse vacature stuur je een cv, afgestemd op de functie en meestal beperkt tot relevante informatie.",
        paragraphs: [
          "Hoewel curriculum vitae letterlijk ‘levensloop’ betekent, verwachten Nederlandse werkgevers geen volledige levensgeschiedenis. Een goed cv selecteert juist de ervaring en vaardigheden die bij de functie passen.",
          "De Europese dienst Europass gebruikt eveneens de term cv en adviseert om het document op de specifieke baan af te stemmen. ‘Cv’ betekent in Europa dus niet automatisch een lang academisch document.",
        ],
      },
      {
        id: "verenigde-staten",
        title: "Resume en CV in de Verenigde Staten",
        answer:
          "Een resume is het normale document voor de meeste banen; een CV hoort vooral bij academische en onderzoeksfuncties.",
        paragraphs: [
          "Een Amerikaans resume zet relevante ervaring, vaardigheden en meetbare resultaten compact bij elkaar. De inhoud verandert per vacature.",
          "Een academic CV documenteert de academische loopbaan veel vollediger. Denk aan onderzoek, onderwijs, publicaties, presentaties, beurzen, prijzen, commissies en professionele lidmaatschappen. Het document groeit mee met de loopbaan.",
        ],
        bullets: [
          "Resume: selectief, functiegericht en resultaatgedreven",
          "Academic CV: volledig overzicht van academische prestaties",
          "Resume: vaak één of twee pagina’s, afhankelijk van ervaringsniveau en instructies",
          "Academic CV: geen vaste paginalimiet",
        ],
      },
      {
        id: "keuzehulp",
        title: "Welk document moet jij maken?",
        answer:
          "Neem de vacature letterlijk: lever het gevraagde document in en controleer bij twijfel de recruiter.",
        paragraphs: [
          "Kijk naar vier signalen: land van de functie, taal van de vacature, sector en exacte sollicitatie-instructie. Een Amerikaanse multinational in Amsterdam kan ‘resume’ schrijven terwijl een Nederlands cv wordt bedoeld.",
          "Twijfel je bij een internationale of academische procedure? Vraag: ‘Verwacht u een compact, functiegericht resume of een volledig academisch CV?’ Die vraag voorkomt dat je het verkeerde informatieniveau kiest.",
        ],
        examples: [
          {
            label: "Nederlandse marketingfunctie",
            text: "Maak een Nederlands cv van één of twee pagina’s met campagnes, resultaten en relevante tools.",
            explanation: "De normale Nederlandse sollicitatiecontext.",
            tone: "recommended",
          },
          {
            label: "Amerikaanse softwarefunctie",
            text: "Maak een beknopt resume met technische impact, schaal en resultaten per relevante rol.",
            explanation: "Sluit aan op de reguliere Amerikaanse arbeidsmarkt.",
            tone: "recommended",
          },
          {
            label: "Postdoc in de VS",
            text: "Maak een academic CV met onderzoek, publicaties, onderwijs, presentaties en beurzen.",
            explanation: "De academische context vraagt een vollediger dossier.",
            tone: "alternative",
          },
        ],
      },
      {
        id: "vertalen",
        title: "Je Nederlandse cv omzetten naar een Engels resume",
        answer:
          "Vertaal niet alleen de woorden; pas selectie, bewijs, conventies en persoonlijke gegevens aan de doelmarkt aan.",
        paragraphs: [
          "Begin opnieuw bij de vacature. Schrap irrelevante oudere ervaring, herschrijf taken als resultaten en gebruik termen die in de doelmarkt gangbaar zijn. Laat functietitels begrijpelijk zijn zonder diploma’s of verantwoordelijkheden groter te maken dan ze zijn.",
          "Voor een Amerikaanse sollicitatie laat je doorgaans foto, geboortedatum, burgerlijke staat en volledige adresgegevens weg. Controleer altijd lokale verwachtingen; internationale organisaties kunnen eigen instructies hebben.",
        ],
        bullets: [
          "Gebruik professioneel Engels uit de vacature, niet een woord-voor-woordvertaling",
          "Zet prestaties vooraan en kwantificeer waar dat eerlijk kan",
          "Vertaal opleidingsniveau begrijpelijk en behoud de officiële Nederlandse diplomanaam waar nodig",
          "Sla lokale persoonsgegevens over als ze niet worden gevraagd",
          "Sla het document op met een duidelijke bestandsnaam, bijvoorbeeld Noor_Jansen_Resume.pdf",
        ],
      },
    ],
    sources: [
      {
        publisher: "Europass — Europese Unie",
        title: "Cv opstellen met Europass",
        url: "https://europass.europa.eu/nl/create-europass-cv",
        note: "Laat zien dat ‘cv’ in Europa het gangbare, op een vacature af te stemmen sollicitatiedocument is.",
      },
      {
        publisher: "Yale University Office of Career Strategy",
        title: "CV to Resume Conversion",
        url: "https://ocs.yale.edu/resources/resume-to-cv-conversion/",
        note: "Vergelijkt het Amerikaanse functiegerichte resume met het uitgebreide academische CV.",
      },
      {
        publisher: "MIT Career Advising & Professional Development",
        title: "Crafting an effective resume",
        url: "https://capd.mit.edu/resources/career-toolkit-crafting-an-effective-resume/",
        note: "Beschrijft het doel van een resume en het academische gebruik van een CV in de VS.",
      },
    ],
    faqs: [
      {
        question: "Is een resume hetzelfde als een cv?",
        answer:
          "In Nederland en veel internationale bedrijfscontexten worden de termen vaak voor hetzelfde sollicitatiedocument gebruikt. In de VS is een resume doorgaans kort en functiegericht en een CV vooral academisch en uitgebreid.",
      },
      {
        question: "Wat is de Nederlandse vertaling van resume?",
        answer:
          "In een sollicitatiecontext is ‘cv’ meestal de bruikbaarste Nederlandse vertaling. Een samenvatting is de letterlijke algemene betekenis, maar niet de normale naam van het document.",
      },
      {
        question: "Moet een resume altijd één pagina zijn?",
        answer:
          "Nee. Een resume moet beknopt en relevant zijn, maar passende lengte hangt af van ervaringsniveau, sector en de instructies van de werkgever.",
      },
      {
        question: "Kan ik mijn Nederlandse cv rechtstreeks vertalen voor een baan in de VS?",
        answer:
          "Een letterlijke vertaling is zelden genoeg. Pas de selectie, resultaatgerichte formulering, persoonsgegevens en indeling aan de Amerikaanse vacature en context aan.",
      },
    ],
    related: [
      {
        href: "/sollicitatiehulp/cv-betekenis",
        label: "Wat betekent cv?",
        description: "Bekijk de Nederlandse betekenis, spelling en kernonderdelen.",
      },
      {
        href: "/cv-maken-in-engels",
        label: "Cv maken in het Engels",
        description: "Pas taal, functietitels en internationale conventies goed toe.",
      },
      {
        href: "/en/editor",
        label: "Build an English resume",
        description: "Start direct met een Engelstalige, functiegerichte versie.",
      },
    ],
    primaryCta: {
      href: "/cv-maken-in-engels",
      label: "Maak je Engelse cv",
      description: "Zet inhoud en conventies om voor een internationale sollicitatie.",
    },
    secondaryCta: {
      href: "/editor",
      label: "Open de cv-editor",
      description: "Maak een gerichte Nederlandse versie voor je volgende vacature.",
    },
    order: 50,
  },
  {
    slug: "burgerlijke-staat-op-cv",
    category: "cv",
    title: "Burgerlijke staat op je cv: vermelden of weglaten?",
    description:
      "Je burgerlijke staat hoort normaal niet op een Nederlands cv. Lees waarom, wat je wél bij persoonsgegevens zet en hoe je reageert als een werkgever ernaar vraagt.",
    metaTitle: "Burgerlijke staat op cv: wel of niet vermelden? | WerkCV",
    metaDescription:
      "Moet je gehuwd, ongehuwd of kinderen op je cv zetten? Meestal niet. Bekijk de Nederlandse privacy- en discriminatiecontext plus een praktisch cv-voorbeeld.",
    keywords: [
      "burgerlijke staat op cv",
      "burgerlijke staat cv",
      "gehuwd op cv",
      "ongehuwd op cv",
      "kinderen op cv vermelden",
      "persoonlijke gegevens cv",
    ],
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingTime: 8,
    quickAnswer:
      "Laat je burgerlijke staat normaal weg van een Nederlands cv. Of je ongehuwd, gehuwd, gescheiden of geregistreerd partner bent, zegt niets over je geschiktheid voor een functie en is privé-informatie. Vermeld in het blok met persoonsgegevens alleen wat de recruiter nodig heeft om je te herkennen en te bereiken. Gegevens voor salaris- of personeelsadministratie komen pas na indiensttreding via een apart, beveiligd proces aan bod.",
    keyTakeaways: [
      "Burgerlijke staat is voor een gewone sollicitatie niet functiegerelateerd en hoeft niet op je cv.",
      "Ook het aantal kinderen, een kinderwens en de naam of het beroep van je partner laat je weg.",
      "Rijksoverheid zegt dat een werkgever tijdens de sollicitatie in de regel geen vragen over privézaken hoort te stellen.",
      "Onderscheid naar burgerlijke staat valt binnen het Nederlandse gelijkebehandelingsrecht, ook bij werving en selectie.",
      "Na indiensttreding kan een werkgever andere persoonsgegevens nodig hebben voor administratie; dat maakt ze nog geen cv-onderdeel.",
    ],
    sections: [
      {
        id: "kort-advies",
        title: "Moet burgerlijke staat op je cv?",
        answer:
          "Nee, normaal niet. Laat ‘gehuwd’, ‘ongehuwd’, ‘gescheiden’ en vergelijkbare informatie weg.",
        paragraphs: [
          "Een cv is een gericht bewijsdocument: het laat zien welke ervaring, opleiding, vaardigheden en resultaten aansluiten op de vacature. Burgerlijke staat helpt een werkgever niet om jouw professionele geschiktheid te beoordelen. De informatie neemt ruimte in en kan bovendien onnodige aannames oproepen.",
          "Oudere cv-modellen bevatten soms standaardregels voor burgerlijke staat, geboortedatum, geboorteplaats, nationaliteit en gezin. Dat maakt die informatie niet noodzakelijk. Moderne Nederlandse sollicitaties vragen vooral om een duidelijke naam, bereikbaarheid, relevante loopbaaninformatie en bewijs dat bij de functie past.",
        ],
        examples: [
          {
            label: "Persoonsgegevens met privé-informatie",
            text: "Burgerlijke staat: gehuwd · Twee kinderen · Geboren 14 mei 1991",
            explanation: "Deze gegevens zijn voor de meeste functies niet nodig en voegen geen professioneel bewijs toe.",
            tone: "avoid",
          },
          {
            label: "Functioneel contactblok",
            text: "Noor Jansen · Utrecht · 06 12 34 56 78 · noor.jansen@example.nl · linkedin.com/in/noorjansen",
            explanation: "De recruiter kan je herkennen, bereiken en je professionele profiel openen zonder onnodige privégegevens.",
            tone: "recommended",
          },
        ],
      },
      {
        id: "wat-betekent-burgerlijke-staat",
        title: "Wat bedoelt men met burgerlijke staat?",
        answer:
          "In een cv-context gaat het om informatie over je juridische relatiestatus, bijvoorbeeld ongehuwd, gehuwd, geregistreerd partner, gescheiden of weduwe/weduwnaar.",
        paragraphs: [
          "Burgerlijke staat is niet hetzelfde als gezinssamenstelling. Toch staan in verouderde voorbeelden soms ook ‘twee kinderen’ of het beroep van een partner. Die informatie is evenmin nodig om je werkervaring of vaardigheden te beoordelen.",
          "Je naamgebruik is een andere vraag. Gebruik op je cv de naam waarmee je professioneel aangesproken wilt worden en zorg dat die herkenbaar aansluit op je sollicitatieformulier en contactgegevens. Je hoeft niet uit te leggen of een achternaam door huwelijk, partnerschap of een andere persoonlijke keuze wordt gebruikt.",
        ],
      },
      {
        id: "privacy-en-gelijke-behandeling",
        title: "Wat zeggen privacy en gelijke behandeling?",
        answer:
          "De praktische lijn is: sollicitatievragen horen relevant voor de functie te zijn, privévragen hoef je in de regel niet te beantwoorden en burgerlijke staat is een beschermde discriminatiegrond.",
        paragraphs: [
          "Rijksoverheid legt uit dat een werkgever tijdens een sollicitatie alleen vragen hoort te stellen die relevant zijn voor de functie. Vragen over privézaken, zoals een kinderwens, hoef je in de regel niet te beantwoorden. Dat ondersteunt de praktische keuze om je relatiestatus niet uit eigen beweging op je cv te zetten.",
          "Het College voor de Rechten van de Mens noemt burgerlijke staat als een grond waarover het binnen het terrein arbeid kan oordelen. Dat terrein omvat ook werving en selectie. Dit betekent niet dat elke losse vraag automatisch bewezen discriminatie is; wel dat een werkgever een kandidaat niet ongelijk mag behandelen vanwege diens burgerlijke staat.",
          "De Autoriteit Persoonsgegevens benadrukt bij screening dat alleen gegevens mogen worden opgevraagd die voor de functie van belang zijn en dat voor screening een legitieme reden nodig is. Een cv met minder niet-relevante persoonsgegevens verkleint tegelijk je eigen privacyrisico.",
        ],
      },
      {
        id: "welke-persoonsgegevens",
        title: "Welke persoonsgegevens zet je wél op je cv?",
        answer:
          "Neem genoeg informatie op om herkenbaar en bereikbaar te zijn; beoordeel de rest op functiebelang en privacy.",
        paragraphs: [
          "Het onderstaande overzicht is geen wettelijke verplichte lijst. Het is een praktische selectie voor een regulier Nederlands cv. De vacature kan om specifieke informatie vragen, bijvoorbeeld een rijbewijs voor een mobiele functie of een portfolio voor ontwerpwerk.",
        ],
        table: {
          headers: ["Gegeven", "Normaal advies", "Waarom"],
          rows: [
            ["Naam", "Opnemen", "Nodig om je sollicitatie te identificeren"],
            ["Telefoon en professioneel e-mailadres", "Opnemen", "Nodig om je uit te nodigen of vragen te stellen"],
            ["Woonplaats", "Vaak opnemen", "Geeft globale locatie zonder je volledige adres te delen"],
            ["LinkedIn of portfolio", "Optioneel", "Alleen als actueel, professioneel en relevant"],
            ["Volledig woonadres", "Meestal weglaten", "In de eerste selectie is woonplaats vaak voldoende"],
            ["Geboortedatum of leeftijd", "Meestal weglaten", "Niet nodig om vakbekwaamheid te tonen"],
            ["Burgerlijke staat en kinderen", "Weglaten", "Privé en niet functiegerelateerd"],
            ["BSN of kopie identiteitsbewijs", "Nooit op je cv", "Zeer privacygevoelig; pas via het juiste proces na indiensttreding"],
          ],
        },
      },
      {
        id: "werkgever-vraagt",
        title: "Wat doe je als een werkgever er toch naar vraagt?",
        answer:
          "Vraag rustig waarom de informatie nodig is en leid het gesprek terug naar je beschikbaarheid en geschiktheid voor de functie.",
        paragraphs: [
          "In een gesprek kun je zeggen: ‘Mijn privésituatie houd ik graag buiten de sollicitatie. Ik kan wel bevestigen dat ik beschikbaar ben voor de genoemde uren en werkzaamheden.’ Daarmee geef je antwoord op het mogelijke functiebelang zonder persoonlijke details te delen.",
          "Staat burgerlijke staat als verplicht veld in een online formulier? Vraag de recruiter of privacycontactpersoon waarom het nodig is en of je het veld kunt overslaan. Leg geen onjuiste informatie vast. Bewaar eventueel een kopie van de vraag en de reactie als je je zorgen maakt over ongelijke behandeling.",
          "Denk je dat je vanwege je burgerlijke staat bent benadeeld? Het College voor de Rechten van de Mens legt uit wanneer het een individuele discriminatieklacht kan beoordelen. Voor advies over jouw specifieke situatie kun je het College, een antidiscriminatievoorziening of een juridisch adviseur benaderen.",
        ],
        examples: [
          {
            label: "Professionele grens",
            text: "Mijn privésituatie houd ik graag buiten de sollicitatie. Ik ben beschikbaar voor de uren en diensten die in de vacature staan.",
            explanation: "Beantwoordt de functionele vraag zonder burgerlijke staat of gezinssituatie te delen.",
            tone: "recommended",
          },
          {
            label: "Eerst om uitleg vragen",
            text: "Kunt u toelichten waarom mijn burgerlijke staat voor deze functie of procedure nodig is?",
            explanation: "Geeft de werkgever ruimte om de relevantie en verwerking uit te leggen.",
            tone: "alternative",
          },
        ],
      },
      {
        id: "na-indiensttreding",
        title: "Waarom vraagt HR na indiensttreding soms meer gegevens?",
        answer:
          "Een werkgever heeft voor contract, loonadministratie en personeelsregelingen meer gegevens nodig dan een recruiter voor de eerste selectie.",
        paragraphs: [
          "Het moment en doel maken verschil. Na acceptatie van een aanbod kan HR via een beveiligd proces gegevens vragen die nodig zijn voor identificatie, loonheffingen, pensioen of andere arbeidsvoorwaarden. Rijksoverheid noemt bijvoorbeeld naam en woonplaats als gegevens die bij de arbeidsovereenkomst horen.",
          "Stuur zulke informatie niet alvast in je openbare cv en zet nooit je BSN of een kopie van je identiteitsbewijs in een standaard sollicitatiebestand. Vraag bij twijfel welk kanaal wordt gebruikt, voor welk doel de gegevens nodig zijn en hoe lang ze worden bewaard.",
        ],
      },
    ],
    sources: [
      {
        publisher: "Rijksoverheid",
        title: "Welke vragen mogen niet gesteld worden tijdens een sollicitatiegesprek?",
        url: "https://www.rijksoverheid.nl/vraag-en-antwoord/gelijke-behandeling-op-het-werk/welke-vragen-mogen-niet-gesteld-worden-tijdens-een-sollicitatiegesprek",
        note: "Officiële uitleg dat sollicitatievragen relevant voor de functie horen te zijn en dat privévragen in de regel niet beantwoord hoeven te worden.",
      },
      {
        publisher: "College voor de Rechten van de Mens",
        title: "Wat gebeurt er bij het aanvragen van een oordeel bij het College?",
        url: "https://www.mensenrechten.nl/mensenrechten-voor-jou/discriminatie-en-gelijke-behandeling/discriminatieklachten-en-verzoek",
        note: "Toont dat het College over burgerlijke staat kan oordelen binnen arbeid, waaronder werving en selectie.",
      },
      {
        publisher: "Autoriteit Persoonsgegevens",
        title: "Screening, internet en sociale media — privacyrechten van werknemers",
        url: "https://autoriteitpersoonsgegevens.nl/uploads/imported/cbp-do-s-dont-s-werkgevers-privacyrechten-werknemers.pdf",
        note: "Legt uit dat screening een legitieme reden vereist en beperkt hoort te blijven tot gegevens die voor de functie van belang zijn.",
      },
      {
        publisher: "Rijksoverheid",
        title: "Wat staat er in een arbeidsovereenkomst?",
        url: "https://www.rijksoverheid.nl/vraag-en-antwoord/arbeidsovereenkomst-en-cao/wat-staat-er-in-een-arbeidsovereenkomst",
        note: "Maakt duidelijk welke basisgegevens en arbeidsafspraken pas bij de arbeidsovereenkomst schriftelijk worden vastgelegd.",
      },
    ],
    faqs: [
      {
        question: "Is burgerlijke staat verplicht op een cv?",
        answer:
          "Nee. Voor een regulier Nederlands cv is er geen reden om ongehuwd, gehuwd, gescheiden of geregistreerd partnerschap te vermelden. Houd je cv gericht op relevante ervaring, opleiding, vaardigheden en bereikbaarheid.",
      },
      {
        question: "Moet ik kinderen op mijn cv vermelden?",
        answer:
          "Nee. Het aantal kinderen en je gezinssamenstelling zijn privé en geen bewijs van geschiktheid. Als werktijden belangrijk zijn, bevestig dan alleen je concrete beschikbaarheid.",
      },
      {
        question: "Mag een werkgever vragen of ik getrouwd ben?",
        answer:
          "Rijksoverheid zegt dat een werkgever tijdens een sollicitatie in de regel geen vragen over privézaken hoort te stellen en dat je zulke vragen niet hoeft te beantwoorden. Vraag naar de functiegerelateerde reden of leid terug naar je beschikbaarheid en geschiktheid.",
      },
      {
        question: "Kan discriminatie op burgerlijke staat worden gemeld?",
        answer:
          "Ja. Het College voor de Rechten van de Mens kan discriminatieklachten over burgerlijke staat binnen arbeid beoordelen, waaronder werving en selectie. De beoordeling hangt altijd af van de concrete feiten en context.",
      },
      {
        question: "Welke persoonlijke gegevens horen wel op mijn cv?",
        answer:
          "Zet minimaal je naam, telefoonnummer en professioneel e-mailadres op je cv. Woonplaats, LinkedIn en portfolio zijn vaak nuttig maar situatieafhankelijk. Laat BSN, identiteitskopie, burgerlijke staat en gezinssamenstelling weg.",
      },
    ],
    related: [
      {
        href: "/cv-tips/professioneel-cv-onderdelen",
        label: "Welke onderdelen horen op je cv?",
        description: "Bouw een compleet cv op met alleen relevante, scanbare informatie.",
      },
      {
        href: "/sollicitatiehulp/cv-betekenis",
        label: "Wat betekent cv?",
        description: "Bekijk wat een modern sollicitatie-cv wel en niet hoeft te bevatten.",
      },
      {
        href: "/cv-maken-zonder-verborgen-kosten",
        label: "Cv maken met duidelijke keuzes",
        description: "Werk je gegevens uit in een transparante Nederlandse cv-flow.",
      },
    ],
    primaryCta: {
      href: "/editor",
      label: "Maak een privacybewust cv",
      description: "Neem alleen op wat een recruiter nodig heeft en zet je professionele bewijs centraal.",
    },
    secondaryCta: {
      href: "/cv-tips/professioneel-cv-onderdelen",
      label: "Bekijk alle cv-onderdelen",
      description: "Controleer per onderdeel wat relevant is voor jouw sollicitatie.",
    },
    order: 60,
  },
];
