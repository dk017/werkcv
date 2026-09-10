import type { AgencyGuideSection } from "@/components/agency/AgencyGuideArticle";
import { AGENCY_CURRENCY, AGENCY_MONTHLY_PRICE_CENTS, AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyCreditExplanation, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";

export const agencyBuyingGuideModified = "2026-09-10";
export function getAgencyUsageExamples() {
  return [10, 30, 100].map((items) => ({ items, allocatedCents: AGENCY_MONTHLY_PRICE_CENTS / items, display: new Intl.NumberFormat("nl-NL", { style: "currency", currency: AGENCY_CURRENCY }).format(AGENCY_MONTHLY_PRICE_CENTS / 100 / items) }));
}

export function getAgencyComparisonUsageExamples() {
  return [10, 30, 100, 300].map((items) => ({ items, allocatedCents: AGENCY_MONTHLY_PRICE_CENTS / items, display: new Intl.NumberFormat("nl-NL", { style: "currency", currency: AGENCY_CURRENCY }).format(AGENCY_MONTHLY_PRICE_CENTS / 100 / items) }));
}

export const agencyBuyingSections: AgencyGuideSection[] = [
  {
    eyebrow: "Kies het proces, niet alleen de opmaak",
    title: "Welke workflow past bij je bureau?",
    paragraphs: ["Vergelijk eerst wat je wilt opleveren: alleen een herkenbaar CV, of een vacaturegericht voorstel met broncontrole en een vastgelegde review. Dit zijn workflowcategorieën, geen beoordeling van alle aanbieders. Ook andere formatters en ATS-producten kunnen bewijs- en reviewfuncties bieden; controleer de concrete uitvoering."],
    table: {
      columns: ["Keuze", "Wanneer passend en werk dat overblijft", "Grens van MatchPack"],
      rows: [
        ["Word / handmatige template", "Redelijk bij weinig documenten en vooral cosmetische opmaak. Je beheert kopiëren, versies, bronvergelijking en PDF-controle zelf.", "Een abonnement is niet vanzelf voordeliger dan een bestaande Word-template bij laag gebruik."],
        ["Algemene AI-assistent", "Kan helpen bij een concept. Controleer iedere herschreven feitelijke uitspraak en beheer huisstijl en goedkeuring apart. Bestandsverwerking en privacyvoorwaarden verschillen per product en abonnement.", "MatchPack bundelt bronpassages, open punten, recruiterreview en export; het bewijst niet dat kandidaatfeiten waar zijn."],
        ["Gespecialiseerde CV-formatter", "Onderzoek dit als uniforme huisstijl en Word/PDF-opmaak de hoofdtaak zijn. Test inhoudsbehoud, bewerkbaarheid, versies en eventuele bewijsfuncties met een fictief CV.", "MatchPack richt zich ook op het vacaturegerichte voorstel. Broncontrole is geen exclusieve functie van WerkCV."],
        ["Opmaak binnen het ATS", "Logisch als het bestaande ATS de gewenste uitvoer al levert. Controleer templatebeperkingen, broncontrole, export en wie wijzigingen goedkeurt.", "MatchPack vervangt het ATS niet. Er is CSV-overdracht, geen native ATS-synchronisatie; houd rekening met handmatige overdracht."],
        ["WerkCV MatchPack", "Voor terugkerende kandidaatvoorstellen naast je bestaande proces: geselecteerde vacature-eisen naast CV-passages, recruiterreview en PDF/DOCX uit één goedgekeurde versie.", "Geen ranking, automatisch versturen, klantportaal of native ATS-koppeling. Controleer ook ontbrekende eisen en de uiteindelijke documenten."],
      ],
    },
  },
  {
    eyebrow: "Reken met werkelijk gebruik",
    title: "Wat kost het bij tien, dertig of honderd documenten?",
    links: [{ label: "Bekijk het huidige Agency-aanbod en de prijsvoorwaarden", href: "/agency#plan" }],
    paragraphs: [`MatchPack kost ${getAgencyMonthlyPriceDisplay("nl")} met ${AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde credits voor CV’s en MatchPacks samen, niet voor elk afzonderlijk. ${getAgencyCreditExplanation("nl")}`, "Dit zijn de abonnementskosten gedeeld door het aantal creditverbruikende items: geen losse verkooptarieven, aangetoonde besparingen of gemeten rendementen. Niet-gebruikte ruimte in het abonnement is geen besparing."],
    table: { columns: ["Werkelijk gebruik per maand", "Toegerekende abonnementskosten", "Betekenis"], rows: getAgencyUsageExamples().map(({ items, display }) => [`${items} items`, `${display} per item`, "De volledige maandprijs blijft verschuldigd; vergelijk met je bestaande werkwijze."]) },
  },
  {
    eyebrow: "Bereken je eigen scenario",
    costWorksheet: true,
    title: "Vergelijk niet alleen softwarekosten, maar ook reviewtijd",
    paragraphs: [
      "Vul voor je eigen bureau het maandvolume, de minuten per document en de interne uurkosten in. Neem ook overdracht naar het ATS, tweede lezers en controle van PDF en DOCX mee. Onderstaande berekening gebruikt uitsluitend hypothetische waarden; het is geen gemeten besparing.",
    ],
    table: {
      columns: ["Variabele", "Hypothetisch voorbeeld", "Wat je zelf moet meten"],
      rows: [
        ["Documenten per maand", "30", "Aantal CV's of MatchPacks dat werkelijk een definitieve review krijgt."],
        ["Reviewtijd per document", "20 minuten", "Start bij broncontrole en stop na goedgekeurde export; noteer uitzonderingen."],
        ["Interne uurkosten", "€45 per uur", "Gebruik je eigen kostprijs, niet een algemene marktclaim."],
        ["Overdracht en herstel", "10 minuten", "Meet CSV-overdracht, correcties, tweede controle en exportverschillen apart."],
        ["Softwarekosten", `${getAgencyMonthlyPriceDisplay("nl")} per betaalde periode`, "Gebruik de actuele factuur en leg credits, btw en ongebruikte ruimte vast."],
      ],
    },
  },
  {
    eyebrow: "Wel of niet passend",
    title: "Wanneer kies je beter iets anders?",
    links: [{ label: "Lees de Agency-privacyinformatie en verwerkingsdocumenten", href: "/agency/privacy" }],
    bullets: ["Kan passen: regelmatig vacaturegerichte klantintroducties maken met bronpassages, open punten, versies en bureau-export in één reviewproces.", "Minder passend: af en toe uitsluitend een mooier CV. Een goede Word-template kan voldoende zijn.", "Niet de juiste oplossing voor vereiste native ATS-synchronisatie, grootschalige bulkautomatisering of een klantportaal.", "Controleer vóór verwerking van kandidaatdata: bevoegdheid, verwerkersafspraken, subverwerkers, bewaartermijn, verwijdering en eventueel gebruik voor modeltraining. Neem dit niet aan op basis van een AI-label."],
    paragraphs: ["WerkCV publiceert deze gids en verkoopt MatchPack. Dit is geen onafhankelijke softwarevergelijking. Gebruik het fictieve voorbeeld om inhoud en uitvoer zelf te beoordelen, zonder echte kandidaatdata te delen."],
  },
];

export const agencyBuyingFaqs = [
  { question: "Kunnen we ons ATS houden?", answer: "Ja. MatchPack is een aanvullende voorbereidings- en reviewstap. CSV-import en -export zijn mogelijk, maar er is geen native ATS-synchronisatie. Beoordeel de extra overdracht voordat je overstapt." },
  { question: "Wat ontvangt de opdrachtgever?", answer: "De gekozen, goedgekeurde klantversie met introductie en CV als PDF of DOCX. Controleer de export; interne recruiternotities horen niet bij de klantuitvoer. Je verstuurt het voorstel zelf." },
  { question: "Wat als we maar tien voorstellen per maand maken?", answer: `Bij tien creditverbruikende items is de toegerekende maandprijs ${getAgencyUsageExamples()[0].display} per item. Dit is geen los tarief. Voor incidentele opmaak kan je bestaande Word-template een betere keuze zijn.` },
  { question: "Wat kunnen we gratis bekijken?", answer: "Het fictieve voorbeeld met downloads en de openbare checker. Dit is geen gratis volledig MatchPack-abonnement of gratis export van eigen MatchPacks." },
  { question: "Waar staan de afspraken over kandidaatdata?", answer: "Lees de Agency-privacyinformatie en de daar gekoppelde documenten vóór verwerking. Het oorspronkelijke uploadbestand wordt niet bewaard als bronbestand; geëxtraheerde tekst en gestructureerde gegevens vallen wel onder het ingestelde bewaarbeleid." },
];
