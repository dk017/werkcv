import type { Metadata } from "next";
import AgencyGuideArticle, { type AgencyGuideArticleProps } from "@/components/agency/AgencyGuideArticle";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";

const slug = "cv-in-huisstijl-recruitmentbureau";
const route = getAgencyAcquisitionRoute(`/voor-bureaus/kennisbank/${slug}`)!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: `https://werkcv.nl/voor-bureaus/kennisbank/${slug}` },
  openGraph: {
    title: route.title,
    description: "Bewaar de bron, voeg alleen veilige huisstijlelementen toe en controleer iedere klantversie vóór verzending.",
    url: `https://werkcv.nl/voor-bureaus/kennisbank/${slug}`,
    type: "article",
    locale: "nl_NL",
  },
};

const guide: AgencyGuideArticleProps = {
  slug,
  title: route.h1,
  description: metadata.description as string,
  intro: "Een bureau kan een kandidaat-CV handmatig of met software in eigen huisstijl zetten. Bewaar de bron ongewijzigd, voeg alleen controleerbare branding toe en leg vast welke versie is goedgekeurd. WerkCV accepteert tekstgebaseerde PDF- of DOCX-bestanden als bron en maakt na review een gecontroleerde PDF- of DOCX-klantversie.",
  readingTime: "10 minuten",
  sections: [
    {
      eyebrow: "Eerst de bron, dan de presentatie",
      title: "Wat moet hetzelfde blijven?",
      paragraphs: [
        "Huisstijl mag de leesbaarheid en herkenbaarheid verbeteren, maar mag geen opleiding, functietitel, datum, werkgever, projectresultaat of kandidaatwens veranderen. Leg daarom een ongewijzigd bronbestand vast en werk met een aparte klantversie.",
        "Een recruiter controleert niet alleen of het document mooi is, maar ook of iedere herschreven regel nog dezelfde betekenis heeft. Een kortere bullet kan bijvoorbeeld een nuance over scope of verantwoordelijkheid verliezen.",
      ],
      table: {
        columns: ["Onderdeel", "Veilige bewerking", "Niet stilzwijgend wijzigen"],
        rows: [
          ["Logo en kleur", "Gebruik de goedgekeurde logo- en kleurset met voldoende contrast.", "Geen kleur of symbool dat een certificering, senioriteit of functieniveau suggereert."],
          ["Voorblad", "Voeg doelrol, bureaucontact en een korte bevestigde samenvatting toe.", "Geen nieuwe prestaties, beschikbaarheid of salaris zonder bevestiging."],
          ["Kopteksten", "Gebruik consistente, herkenbare sectienamen.", "Geen sectie verwijderen wanneer daardoor relevante context verdwijnt."],
          ["Werkervaring", "Normaliseer datumnotatie en witruimte.", "Geen functietitel, werkgever, periode of resultaat aanpassen zonder broncontrole."],
          ["Vaardigheden", "Sorteer relevante vaardigheden op basis van de vacature.", "Geen vaardigheid toevoegen omdat die waarschijnlijk bij de rol hoort."],
        ],
      },
    },
    {
      eyebrow: "Handmatig of met software",
      title: "Welke workflow past bij je bureau?",
      paragraphs: [
        "Handmatig opmaken in Word geeft controle maar vraagt discipline bij versies, tabellen en exports. Een vaste toolroute kan herhaalbare structuur en controlepunten bieden, zolang de recruiter de bron en output blijft vergelijken.",
      ],
      table: {
        columns: ["Stap", "Handmatige route", "WerkCV-route"],
        rows: [
          ["Bron bewaren", "Sla het originele bestand apart op met datum en kandidaat-ID.", "Upload een tekstgebaseerd PDF- of DOCX-CV; het originele uploadbestand wordt niet als bronbestand bewaard."],
          ["Structuur", "Kopieer naar een bureau-template en controleer iedere sectie.", "Analyseer het CV en vacature in MatchPack; eisen worden naast CV-bewijs gezet."],
          ["Commerciële gegevens", "Vul beschikbaarheid, tarief en locatie in vanuit de intake.", "Voeg alleen bevestigde gegevens toe in de reviewvelden."],
          ["Review", "Gebruik een tweede lezer of eigen checklist.", "WerkCV dwingt evidence-review, correcties, outputkeuze en vier goedkeuringsbevestigingen af."],
          ["Uitvoer", "Controleer Word- en PDF-versie na export.", "Een volledige en optionele versie zonder directe contactgegevens komen als PDF en DOCX uit dezelfde goedgekeurde snapshot."],
        ],
      },
    },
    {
      eyebrow: "Huisstijl zonder ruis",
      title: "Welke elementen horen op een kandidaat-CV?",
      paragraphs: [
        "Gebruik een beperkte set herkenbare elementen: logo, accentkleur, typografische schaal, footer, bureaucontact en een duidelijk voorblad. Maak de kandidaat niet ondergeschikt aan het bureaubeeld; de opdrachtgever moet de rol, ervaring en relevante bewijsstukken snel kunnen vinden.",
      ],
      bullets: [
        "Een logo en bureau-identiteit die niet concurreren met de naam, rol en kernervaring van de kandidaat.",
        "Een voorblad met doelrol, korte kandidaatintroductie, locatie, uren en beschikbaarheid alleen wanneer bevestigd.",
        "Een consequente datum- en functienotatie over alle onderdelen van het document.",
        "Een footer of bestandsnaam waarmee de ontvanger de versie kan herkennen zonder persoonsgegevens onnodig te herhalen.",
        "Een duidelijke scheiding tussen interne recruiternotities en wat naar de opdrachtgever gaat.",
      ],
    },
    {
      eyebrow: "Word of PDF",
      title: "Moet je Word of PDF naar een opdrachtgever sturen?",
      paragraphs: [
        "Volg eerst de instructie van de opdrachtgever. PDF is vaak praktisch voor een vaste klantweergave; Word is alleen passend wanneer de ontvanger de inhoud daadwerkelijk moet bewerken of wanneer het proces dat verlangt. WerkCV maakt na goedkeuring zowel PDF als DOCX uit dezelfde snapshot.",
        "Word-opmaak kan verspringen door ontbrekende fonts, tabelbreedtes, handmatige pagina-einden en verschillen tussen Word-versies. Als je toch Word gebruikt, houd stijlen, tabellen en kopteksten eenvoudig en exporteer daarna een PDF die je visueel én als tekst controleert.",
      ],
      examples: [
        { label: "Voorblad", body: "Kandidaatprofiel · Senior HR-adviseur · Utrecht / hybride · 32–36 uur · beschikbaarheid: nog te bevestigen." },
        { label: "Bestandsnaam", body: "Bureau-kandidaatvoorstel-HR-adviseur-v03.pdf — gebruik een interne kandidaat-ID wanneer de bestandsnaam extern geen naam hoeft te bevatten." },
      ],
    },
    {
      eyebrow: "Versies en controle",
      title: "Hoe voorkom je dat inhoud onbedoeld verandert?",
      paragraphs: [
        "Gebruik één gecontroleerde bron en geef elke klantversie een herkenbare status. Noteer wie de inhoud heeft gecontroleerd, welke commerciële gegevens zijn bevestigd, welke versie is gedeeld en wanneer de bron of toestemming opnieuw moet worden nagevraagd.",
      ],
      table: {
        columns: ["Versie", "Doel", "Controle vóór delen"],
        rows: [
          ["Bron-CV", "Interne referentie voor inhoud en bewijs.", "Niet herschrijven; bewaar toegang volgens je eigen retentiebeleid."],
          ["Werkconcept", "Recruiter corrigeert extracties en vult bevestigde gegevens aan.", "Controleer wijzigingen terug tegen bron en intake."],
          ["Volledig voorstel", "Klant ontvangt de gekozen volledige CV-versie.", "Controleer naam, contactvelden, werkgever, opleiding, voorwaarden en e-mail."],
          ["Versie zonder directe contactgegevens", "Optionele eerste deelversie wanneer het doel dat rechtvaardigt.", "Controleer directe én indirecte herkenbaarheid; dit is geen garantie op juridische anonimiteit."],
        ],
      },
    },
    {
      eyebrow: "Voor en na",
      title: "Maak de presentatie beter zonder bewijs toe te voegen",
      paragraphs: ["Een goede huisstijlbewerking maakt de bestaande informatie scanbaarder. Zij maakt een kandidaat niet automatisch geschikter en mag geen gat in het bron-CV verbergen."],
      examples: [
        { label: "Te commercieel", before: "“Zeer ervaren HR-adviseur die perfect past bij je organisatie.”", after: "“Zeven jaar HR-ervaring; volgens het CV advies aan 24 teamleiders over verzuim en medewerkerontwikkeling. AFAS-ervaring en startdatum worden nog bevestigd.”" },
        { label: "Te veel opmaak", before: "Een grote grafische scorebalk met ‘AFAS 5/5’ terwijl AFAS niet in het CV staat.", after: "Een tekstregel ‘AFAS: nog te bevestigen’ in de bewijsmatrix en een open punt in de introductie." },
      ],
    },
  ],
  faqs: [
    { question: "Moet een recruitmentbureau het originele CV sturen?", answer: "Niet altijd. Volg de afspraak met de opdrachtgever en de grondslag voor delen. Bewaar intern een ongewijzigde bron en stuur alleen een gecontroleerde versie die past bij het doel." },
    { question: "Mag een recruiter het CV opnieuw opmaken?", answer: "Een recruiter kan de presentatie aanpassen zolang de inhoud niet stilzwijgend verandert en de kandidaat- en bureauafspraken dit toelaten. Controleer wijzigingen terug tegen de bron." },
    { question: "Welke onderdelen van de huisstijl horen op het CV?", answer: "Gebruik bij voorkeur logo, kleur, typografie, footer, bestandsnaam en een duidelijk voorblad. Houd branding ondergeschikt aan rol, ervaring en leesbaarheid." },
    { question: "Wat moet op het voorblad staan?", answer: "Zet doelrol, korte relevante introductie en alleen bevestigde praktische gegevens zoals locatie, uren, beschikbaarheid en tariefindicatie. Houd interne notities buiten het klantdocument." },
    { question: "Moet het bestand Word of PDF zijn?", answer: "Volg de instructie van de opdrachtgever. PDF is geschikt voor een vaste klantversie; Word is alleen nodig wanneer bewerking of het proces dat verlangt. WerkCV maakt na goedkeuring beide uitvoerformaten vanuit dezelfde snapshot." },
    { question: "Hoe voorkom je verspringende Word-opmaak?", answer: "Gebruik eenvoudige stijlen, beperkte tabellen, vaste marges en ingebedde fonts waar toegestaan. Exporteer daarna een PDF en controleer pagina-einden, links en tekstselectie." },
    { question: "Hoe bewaar je het originele CV?", answer: "Bewaar een ongewijzigde bron apart van klantversies, beperk toegang en leg je eigen bewaartermijn en verwijderproces vast. WerkCV bewaart het originele uploadbestand niet als bronbestand." },
    { question: "Hoeveel versies heb je per kandidaat nodig?", answer: "Gebruik zo weinig mogelijk versies: een bron, een werkconcept en de goedgekeurde klantversie. Voeg een versie zonder directe contactgegevens alleen toe wanneer het doel dit rechtvaardigt." },
    { question: "Hoe controleer je of inhoud niet onbedoeld is gewijzigd?", answer: "Vergelijk de uiteindelijke PDF met de bron en de bevestigde intake. Controleer vooral functietitels, data, werkgevers, opleidingen, resultaten, beschikbaarheid, tarieven en contactgegevens." },
  ],
  sources: [
    { label: "Europass: Create your CV", href: "https://europass.europa.eu/en/create-europass-cv", note: "Ondersteunt duidelijke taal, relevante feiten, reverse-chronologische ervaring en leesbare presentatie." },
    { label: "NVP Sollicitatiecode", href: "https://www.nvp-hrnetwerk.nl/sollicitatiecode", note: "Geeft context voor zorgvuldigheid, transparantie en vertrouwelijkheid in Nederlandse werving en selectie." },
    { label: "Greenhouse Support: Unsuccessful resume parse", href: "https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse", note: "Laat zien waarom complexe tabellen, afbeeldingen, kolommen en tekstvakken in een ATS-route extra controle nodig hebben; dit is geen universele parserregel." },
  ],
  ctaTitle: "Bekijk de gecontroleerde bureauworkflow",
  ctaText: "Gebruik het fictieve voorbeeld om te zien hoe bron, bewijs, klantintroductie en PDF-output bij elkaar blijven.",
};

export default function CvInHuisstijlRecruitmentbureauPage() {
  return <AgencyGuideArticle {...guide} />;
}
