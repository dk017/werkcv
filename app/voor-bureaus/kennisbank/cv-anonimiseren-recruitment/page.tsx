import type { Metadata } from "next";
import AgencyGuideArticle, { type AgencyGuideArticleProps } from "@/components/agency/AgencyGuideArticle";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";

const slug = "cv-anonimiseren-recruitment";
const route = getAgencyAcquisitionRoute(`/voor-bureaus/kennisbank/${slug}`)!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: `https://werkcv.nl/voor-bureaus/kennisbank/${slug}` },
  openGraph: {
    title: route.title,
    description: "Operationele checklist voor directe en indirecte identificatie in kandidaat-CV's, zonder garantie op AVG-compliance.",
    url: `https://werkcv.nl/voor-bureaus/kennisbank/${slug}`,
    type: "article",
    locale: "nl_NL",
  },
};

const guide: AgencyGuideArticleProps = {
  slug,
  title: route.h1,
  description: metadata.description as string,
  intro: "Een naam, e-mailadres en telefoonnummer uit een CV halen kan directe herkenning verminderen, maar maakt het document niet automatisch anoniem. Werkgevers, opleidingen, projecten, locaties, datums en tekstfragmenten kunnen samen nog naar één kandidaat wijzen. Gebruik daarom een tweede controle, leg het deeldoel vast en behandel een contactvrije versie als persoonsgegevens zolang herleiding mogelijk blijft.",
  readingTime: "12 minuten",
  sections: [
    {
      eyebrow: "Eerst het begrippenverschil",
      title: "Anonimiseren en pseudonimiseren zijn niet hetzelfde",
      paragraphs: [
        "De Autoriteit Persoonsgegevens en de European Data Protection Board onderscheiden pseudonimisering van anonimisering. Bij pseudonimisering is de koppeling met een persoon afgeschermd of vervangen, maar kan aanvullende informatie de persoon nog identificeerbaar maken. Echte anonimisering vereist dat herleiding niet meer redelijk mogelijk is.",
        "Voor recruitment betekent dit een praktische waarschuwing: een CV zonder naam kan nog steeds persoonlijke informatie bevatten. Noem de WerkCV-uitvoer daarom een versie zonder directe contactgegevens of een contactvrije conceptversie, niet automatisch een juridisch anoniem document.",
      ],
      table: {
        columns: ["Term", "Wat het praktisch betekent", "Recruiteractie"],
        rows: [
          ["Directe persoonsgegevens", "Naam, e-mail, telefoonnummer, adres, LinkedIn-profiel of foto kunnen rechtstreeks naar de kandidaat wijzen.", "Verwijder of controleer alleen wat het afgesproken doel vereist; check ook headers, footers en bestandsmetadata."],
          ["Indirecte identificatoren", "Werkgever, opleiding, zeldzame functietitel, project, datumcombinatie, locatie of unieke loopbaan kunnen samen herkenbaar zijn.", "Lees de uiteindelijke PDF als opdrachtgever en bepaal of de combinatie de kandidaat alsnog herkenbaar maakt."],
          ["Pseudonimiseren", "Identiteit is afgeschermd maar kan met aanvullende informatie worden teruggekoppeld.", "Blijf het document als persoonsgegevens behandelen en beperk toegang en deeldoel."],
          ["Anonimiseren", "Herleiding naar een geïdentificeerde of identificeerbare persoon is niet meer redelijk mogelijk.", "Maak geen juridische claim op basis van een automatische redactiestap; leg je eigen beoordeling vast."],
        ],
      },
    },
    {
      eyebrow: "Checklist voor directe gegevens",
      title: "Welke gegevens kun je mogelijk verwijderen?",
      paragraphs: [
        "Begin met de directe velden die het doel van delen niet nodig heeft. Werk daarna door de vrije tekst en PDF-opmaak; een naam kan bijvoorbeeld in een introductie, bestandsnaam, hyperlink of voettekst zijn blijven staan.",
      ],
      bullets: [
        "Naam, e-mailadres, telefoonnummer en volledig woonadres wanneer de opdrachtgever deze niet nodig heeft voor de eerste beoordeling.",
        "LinkedIn-, GitHub- of portfolio-URL's die de identiteit rechtstreeks onthullen; gebruik alleen een link als het doel dat rechtvaardigt.",
        "Foto, geboortedatum, BSN of andere gevoelige of niet-relevante details die niet nodig zijn voor de vacature.",
        "Bestandsnaam, documenteigenschappen, opmerkingen, revisies en verborgen tekst in het Office- of PDF-bestand.",
        "Naam of contactgegevens in voorblad, e-mailtekst, headers, footers, alt-tekst of vrije profielvelden.",
      ],
    },
    {
      eyebrow: "Indirecte herkenbaarheid",
      title: "Is naam en telefoonnummer verwijderen voldoende?",
      paragraphs: [
        "Nee, niet zonder contextcontrole. Een combinatie als ‘eerste compliance lead bij de enige fintech in een kleine stad’, een exacte projectdatum en een zeldzame opleiding kan voor een opdrachtgever genoeg zijn om de kandidaat te raden. Dat kan de juiste uitkomst zijn wanneer de opdrachtgever de kandidaat al kent, maar het moet een bewuste beslissing zijn.",
      ],
      table: {
        columns: ["Controlepunt", "Risicosignaal", "Mogelijke actie"],
        rows: [
          ["Werkgevers", "Een unieke werkgever of een combinatie van twee werkgevers maakt de loopbaan herkenbaar.", "Gebruik sector- of typeomschrijving alleen wanneer dat de bewijswaarde behoudt en het deeldoel dit toelaat."],
          ["Opleiding", "Een zeldzame opleiding, promotie of onderzoeksgroep maakt de kandidaat vindbaar.", "Beoordeel of opleidingsniveau volstaat of dat de specifieke instelling nodig is."],
          ["Projecten", "Een publiek beschreven of zeer specifiek project is via Google of LinkedIn te koppelen.", "Verwijder niet automatisch bewijs; bespreek of een bredere projectomschrijving het doel nog dient."],
          ["Locaties en datums", "Een korte combinatie van plaats, maand en werkgever kan één persoon aanwijzen.", "Rond detail alleen af wanneer de vacaturebeslissing daardoor niet wordt misleid."],
          ["Tekstfragmenten", "Een unieke functietitel of zin staat ook in een online profiel.", "Zoek in de PDF naar namen en zinsdelen; controleer introductie en vrije tekst apart."],
        ],
      },
    },
    {
      eyebrow: "Menselijke review",
      title: "Waarom automatische redactie niet genoeg is",
      paragraphs: [
        "Software kan bekende contactpatronen vinden, maar kent niet automatisch de context van een kleine sector, een nicheproject of een opdrachtgever die de kandidaat al kent. Gebruik automatische redactie als eerste stap en laat een recruiter de uiteindelijke PDF lezen vóór verzending.",
      ],
      examples: [
        { label: "Onvoldoende controle", body: "De naam en het e-mailadres zijn verdwenen, maar ‘implementatie van het enige ziekenhuis-EPD in gemeente X, maart 2024’ blijft staan. De combinatie kan de kandidaat identificeren." },
        { label: "Betere controle", body: "De recruiter bekijkt het deeldoel, bespreekt of de werkgever en het project nodig zijn, controleert beide PDF-versies en noteert waarom de gekozen details wel of niet worden gedeeld." },
      ],
      bullets: [
        "Lees de volledige PDF op desktop én mobiel; controleer tekstselectie en links.",
        "Zoek op naam, e-mail, telefoon, LinkedIn, unieke werkgevers, opleidingen, projecten en locaties.",
        "Vergelijk de contactvrije versie met het bron-CV en de kandidaatintake.",
        "Laat een tweede persoon meekijken bij een uitzonderlijk profiel of een gevoelige opdrachtgevercontext.",
      ],
    },
    {
      eyebrow: "Toestemming en doel",
      title: "Mag een recruiter een CV aanpassen of delen?",
      paragraphs: [
        "Een bureau moet kunnen uitleggen waarom het kandidaatdata verwerkt en met wie een versie wordt gedeeld. De precieze rechtsgrond en informatieplicht hangen af van je situatie; deze gids kiest daarom geen juridische grondslag voor je. Leg minimaal vast welke toestemming of andere grondslag je gebruikt, voor welke vacature of klant, welke versie is gedeeld en hoe lang je de gegevens bewaart.",
        "Vraag de kandidaat niet om een algemene toestemming die niet uitlegt wat er gebeurt. Geef een begrijpelijke beschrijving van de volledige en contactvrije versie, de opdrachtgever, het doel en een contactpunt voor vragen of intrekking waar dat van toepassing is.",
      ],
      table: {
        columns: ["Procesmoment", "Vastleggen", "Niet doen"],
        rows: [
          ["Intake", "De doelrol, klantcontext, relevante voorwaarden en deelafspraak.", "Een algemene ‘mag ik je CV gebruiken?’ zonder doel of ontvanger."],
          ["Redactie", "Welke directe velden zijn verwijderd en welke indirecte signalen zijn beoordeeld.", "Stellen dat het resultaat AVG-proof of volledig anoniem is zonder beoordeling."],
          ["Goedkeuring", "Wie de PDF en e-mail heeft gecontroleerd en wanneer.", "Een AI-concept rechtstreeks naar de klant sturen."],
          ["Bewaren", "Bewaartermijn, toegangsrollen en verwijdermoment voor bron en klantversies.", "Alle versies onbeperkt bewaren omdat ze misschien later nuttig zijn."],
        ],
      },
    },
    {
      eyebrow: "Twee uitkomsten",
      title: "Hoe maak je een volledige en een contactvrije versie?",
      paragraphs: [
        "Werk vanuit één gecontroleerde snapshot. De volledige versie bevat de gegevens die de opdrachtgever voor het afgesproken doel nodig heeft. De optionele versie zonder directe contactgegevens laat dezelfde bevestigde ervaring en introductie staan, maar verwijdert directe velden en toont een waarschuwing voor resterende herkenbaarheid.",
        "WerkCV maakt analyse, correctie, introductie en outputkeuze in dezelfde review beschikbaar. Analyse en conceptreview gebruiken geen Agency-credit; de definitieve goedkeuring van het voorstel gebruikt één gedeelde credit en maakt het gekoppelde CV aan.",
      ],
      examples: [
        { label: "Volledig voorstel", body: "Gebruik wanneer identiteit en contactgegevens onderdeel zijn van de afgesproken klantrelatie. Controleer dat de kandidaatgegevens actueel en bevoegd gedeeld zijn." },
        { label: "Zonder directe contactgegevens", body: "Gebruik alleen wanneer het deeldoel dit ondersteunt. Controleer werkgevers, scholen, projecten, locaties en tekstfragmenten; de versie is niet automatisch juridisch anoniem." },
      ],
    },
    {
      eyebrow: "Bestandshygiëne",
      title: "Waarom documenten niet alleen visueel mogen worden afgedekt",
      paragraphs: [
        "Een zwart blok over tekst kan de onderliggende tekst toegankelijk laten via kopiëren, zoekfuncties, documentlagen of metadata. Gebruik echte redactie of verwijder de gegevens uit de bron van het exportbestand en controleer daarna de tekstlaag. Een PDF die er afgedekt uitziet is niet automatisch veilig gedeeld.",
      ],
    },
  ],
  faqs: [
    { question: "Welke gegevens moet een recruiter uit een CV verwijderen?", answer: "Verwijder directe velden die het afgesproken deeldoel niet nodig heeft, zoals naam, e-mail, telefoon, adres, foto of directe profiel-links. Controleer daarna vrije tekst, bestandsnaam en metadata." },
    { question: "Wat is het verschil tussen anonimiseren en pseudonimiseren?", answer: "Bij pseudonimiseren blijft herleiding met aanvullende informatie mogelijk; bij echte anonimisering is herleiding niet meer redelijk mogelijk. Een CV zonder naam is daarom niet automatisch anoniem." },
    { question: "Is naam en contactgegevens verwijderen voldoende?", answer: "Nee. Werkgevers, opleidingen, projecten, locaties, datums en unieke tekst kunnen samen een kandidaat herkenbaar maken. Lees de uiteindelijke PDF in context." },
    { question: "Mag een recruitmentbureau een CV aanpassen?", answer: "Een bureau kan een presentatie of redactie aanpassen wanneer het doel, de afspraken en de relevante regels dit toelaten. Bewaar de bron, wijzig geen feiten zonder controle en leg de gekozen versie vast." },
    { question: "Mag een recruiter een kandidaat zonder toestemming voorstellen?", answer: "Dat hangt af van de toepasselijke afspraken en rechtsgrond. Leg vast waarom en aan wie je gegevens deelt en win bij twijfel privacy- of juridisch advies in." },
    { question: "Hoe leg ik toestemming vast?", answer: "Leg doel, opdrachtgever, vacature, gedeelde versie, datum, informatie aan de kandidaat en het bureaucontact vast. Gebruik begrijpelijke taal en volg je eigen privacyproces." },
    { question: "Hoe lang mag een bureau een CV bewaren?", answer: "Bewaar niet langer dan nodig voor het doel en je wettelijke of contractuele verplichtingen. Definieer bewaartermijnen en verwijdermomenten in je eigen proces; deze pagina kiest geen termijn voor je." },
    { question: "Welke indirecte gegevens kunnen een kandidaat identificeren?", answer: "Denk aan unieke werkgevers, opleidingen, projecten, functietitels, locaties, datums, publicaties en zinnen die online terug te vinden zijn. De combinatie is vaak belangrijker dan één veld." },
    { question: "Hoe controleer ik of persoonlijke gegevens zijn verwijderd?", answer: "Doorzoek en selecteer de PDF-tekst, inspecteer headers, footers, links en metadata en lees de versie als opdrachtgever. Controleer ook de vrije introductie en e-mail." },
    { question: "Moet het originele CV apart worden bewaard?", answer: "Houd een ongewijzigde bron en klantversies logisch gescheiden wanneer je proces dat vereist. Beperk toegang en verwijder volgens je eigen bewaarbeleid." },
  ],
  sources: [
    { label: "Autoriteit Persoonsgegevens: Handleiding AVG", href: "https://autoriteitpersoonsgegevens.nl/uploads/imported/handleidingalgemeneverordeninggegevensbescherming.pdf", note: "Legt uit dat gepseudonimiseerde gegevens persoonsgegevens blijven en dat echte anonimisering herleiding moet voorkomen." },
    { label: "EDPB: Anonymisation and pseudonymisation", href: "https://www.edpb.europa.eu/topics/ai-and-technology/anonymisationpseudonymisation_en", note: "Ondersteunt het onderscheid tussen pseudonimisering als safeguard en anonimisering waarbij data niet meer aan een persoon kan worden gekoppeld." },
    { label: "Rijksoverheid: persoonsgegevens aan anderen doorgeven", href: "https://www.rijksoverheid.nl/vraag-en-antwoord/privacy-en-persoonsgegevens/mogen-organisaties-mijn-persoonsgegevens-aan-anderen-doorgeven", note: "Geeft algemene overheidsinformatie over het delen van persoonsgegevens; je eigen doel, grondslag en proces moeten afzonderlijk worden beoordeeld." },
  ],
  ctaTitle: "Bekijk hoe de contactvrije versie in de workflow past",
  ctaText: "Gebruik het fictieve MatchPack-voorbeeld om directe velden, resterende herkenbaarheid en de menselijke goedkeuringsstap te bekijken.",
};

export default function CvAnonimiserenRecruitmentPage() {
  return <AgencyGuideArticle {...guide} />;
}
