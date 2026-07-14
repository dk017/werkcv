export type MotivationLetterTone = "professioneel" | "enthousiast" | "beknopt";

export type MotivationLetterPreset = {
  slug: string;
  label: string;
  eyebrow: string;
  role: string;
  tone: MotivationLetterTone;
  context: string;
  preview: string;
  proofPrompts: string[];
};

export const motivationLetterPresets: MotivationLetterPreset[] = [
  {
    slug: "starter",
    label: "Starter / eerste baan",
    eyebrow: "Zonder lange werkhistorie",
    role: "Junior data-analist",
    tone: "enthousiast",
    context:
      "Ik rond mijn opleiding Bedrijfskunde af en heb tijdens mijn stage dashboards gebouwd in Power BI. Daarmee werd de wekelijkse rapportage voor het salesteam sneller en overzichtelijker. Ik zoek mijn eerste vaste baan en wil mijn analytische vaardigheden verder ontwikkelen. Schrijf concreet en gebruik mijn stage als bewijs, zonder te doen alsof ik al jaren ervaring heb.",
    preview:
      "Tijdens mijn stage ontdekte ik hoe sterk mijn analytische vaardigheden en communicatie samenkomen in een datagedreven omgeving. Met een nieuw Power BI-dashboard maakte ik de wekelijkse rapportage voor het salesteam sneller en overzichtelijker.",
    proofPrompts: ["Stage of afstudeerproject", "Gebruikte tools", "Meetbaar of zichtbaar resultaat"],
  },
  {
    slug: "carriere-switch",
    label: "Carrièreswitch",
    eyebrow: "Vertaal overdraagbare ervaring",
    role: "Customer success manager",
    tone: "professioneel",
    context:
      "Na zes jaar retailmanagement wil ik overstappen naar customer success. Ik stuurde een team van 12 medewerkers aan, verbeterde de NPS met 14 punten en zette een nieuw onboardingproces op. Leg uit hoe klantfocus, teamcoaching en procesverbetering overdraagbaar zijn. Wees eerlijk dat dit een overstap is en vermijd algemene uitspraken over een nieuwe uitdaging.",
    preview:
      "Na zes jaar retailmanagement wil ik mijn klantgerichte en resultaatgedreven aanpak inzetten binnen customer success. In mijn huidige rol stuurde ik twaalf medewerkers aan, verbeterde ik de NPS met veertien punten en vernieuwde ik het onboardingproces.",
    proofPrompts: ["Overdraagbare vaardigheden", "Waarom deze richting", "Resultaat uit je huidige vak"],
  },
  {
    slug: "ervaren-professional",
    label: "Ervaren professional",
    eyebrow: "Positioneer scope en impact",
    role: "Senior projectmanager",
    tone: "professioneel",
    context:
      "Ik heb acht jaar ervaring met cross-functionele veranderprojecten. In mijn huidige rol verkortte ik met een team van 18 collega's de doorlooptijd met 22% en bracht ik planning, risico's en besluitvorming samen in één governanceproces. Ik zoek een rol met grotere strategische verantwoordelijkheid. Laat één sterk resultaat centraal staan en herhaal niet mijn hele cv.",
    preview:
      "Wat mij aanspreekt is de combinatie van strategische verantwoordelijkheid en uitvoering dicht bij de operatie. In mijn huidige functie leidde ik een cross-functioneel programma dat de doorlooptijd met 22% verkortte.",
    proofPrompts: ["Omvang van je verantwoordelijkheid", "Belangrijkste resultaat", "Waarom juist deze volgende stap"],
  },
  {
    slug: "zonder-werkervaring",
    label: "Zonder werkervaring",
    eyebrow: "Gebruik school, bijbaan en gedrag",
    role: "Klantenservice medewerker",
    tone: "enthousiast",
    context:
      "Ik heb nog geen formele klantenservice-ervaring. Op school organiseerde ik een evenement voor 120 bezoekers en in mijn bijbaan als vakkenvuller help ik dagelijks klanten en werk ik zorgvuldig onder tijdsdruk. Ik ben beschikbaar in avonden en weekenden. Gebruik alleen deze echte voorbeelden en presenteer leervermogen en betrouwbaarheid als bewijs.",
    preview:
      "Hoewel ik nog niet eerder als klantenservice medewerker werkte, heb ik al wel geleerd om rustig te blijven wanneer meerdere mensen tegelijk iets nodig hebben. Tijdens een schoolevenement hielp ik de ontvangst voor 120 bezoekers organiseren.",
    proofPrompts: ["Bijbaan of vrijwilligerswerk", "Schoolproject", "Beschikbaarheid en leervermogen"],
  },
  {
    slug: "stage",
    label: "Stage",
    eyebrow: "Koppel leerdoel aan bijdrage",
    role: "Marketing stagiair",
    tone: "enthousiast",
    context:
      "Ik volg hbo Communicatie en zoek een meewerkstage vanaf september voor vijf maanden. Voor een studieproject maakte ik een contentanalyse en campagnevoorstel voor een lokale culturele organisatie. Ik werk met Canva, Google Analytics en basisvaardigheden in Adobe. Leg uit wat ik al kan bijdragen en wat ik gericht wil leren.",
    preview:
      "De combinatie van content, analyse en publiekscommunicatie in deze stage sluit direct aan op mijn opleiding. In een recent project vertaalde ik een contentanalyse naar een uitvoerbaar campagnevoorstel voor een culturele organisatie.",
    proofPrompts: ["Opleiding en periode", "Relevant project", "Concreet leerdoel"],
  },
  {
    slug: "open-sollicitatie",
    label: "Open sollicitatie",
    eyebrow: "Zonder bestaande vacature",
    role: "Administratief medewerker",
    tone: "beknopt",
    context:
      "Ik ben administratief medewerker met vier jaar ervaring in orderverwerking, klantcontact en Excel. Ik verwerkte gemiddeld 80 orders per dag en verminderde fouten door een controlelijst in te voeren. Ik ben geïnteresseerd in organisaties in de duurzame energiesector. Schrijf als open sollicitatie: benoem welk probleem ik kan helpen oplossen en vraag om een kort kennismakingsgesprek zonder te doen alsof er een vacature is.",
    preview:
      "Graag kom ik in contact over toekomstige administratieve mogelijkheden binnen uw organisatie. Met vier jaar ervaring in orderverwerking en klantcontact kan ik snel bijdragen aan een betrouwbare backoffice en duidelijke opvolging.",
    proofPrompts: ["Type organisatie", "Probleem dat je oplost", "Concrete open vraag"],
  },
];

export function getMotivationLetterPreset(slug: string | null | undefined) {
  if (!slug) return undefined;
  return motivationLetterPresets.find((preset) => preset.slug === slug);
}

export function getMotivationGeneratorHref(preset: MotivationLetterPreset) {
  return `/tools/sollicitatiebrief-generator?voorbeeld=${encodeURIComponent(preset.slug)}#brief-generator`;
}
