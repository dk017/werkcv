import type { Metadata } from "next";
import RoleCoverLetterPage from "@/components/seo/RoleCoverLetterPage";

export const metadata: Metadata = {
  title: "Sollicitatiebrief Voorbeeld Horeca Medewerker | WerkCV",
  description:
    "Gebruik een sterk sollicitatiebrief voorbeeld voor horeca medewerker. Inclusief openingszinnen, servicegerichte voorbeeldalinea's, checklist en directe koppeling naar je horeca-CV.",
  keywords: [
    "sollicitatiebrief horeca medewerker",
    "sollicitatiebrief voorbeeld horeca",
    "motivatiebrief horeca voorbeeld",
    "horeca medewerker sollicitatiebrief",
    "korte motivatiebrief horeca",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-voorbeeld-horeca-medewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-voorbeeld-horeca-medewerker",
      "x-default": "https://werkcv.nl/sollicitatiebrief-voorbeeld-horeca-medewerker",
    },
  },
};

export default function SollicitatiebriefVoorbeeldHorecaMedewerkerPage() {
  return (
    <RoleCoverLetterPage
      roleLabel="horeca medewerker"
      pageTitle="Sollicitatiebrief voorbeeld horeca medewerker voor service, tempo en betrouwbaarheid"
      intro="Voor horeca-vacatures wil een werkgever snel zien dat je gastvrij bent, piekdrukte aankunt en praktisch inzetbaar bent. Deze pagina geeft je voorbeeldzinnen die goed werken voor bediening, allround horeca, fastservice en bijbaanachtige rollen."
      cvLink={{
        href: "/cv-template-horeca-medewerker",
        label: "Koppel met horeca CV template",
      }}
      examples={[
        {
          title: "Voorbeeld opening (horeca / bediening)",
          text: "Met veel enthousiasme solliciteer ik naar de functie van horeca medewerker bij [Bedrijfsnaam]. In mijn huidige en eerdere werk heb ik geleerd hoe belangrijk gastvrijheid, tempo en duidelijke samenwerking zijn om gasten een goede ervaring te geven, ook op drukke momenten.",
        },
        {
          title: "Voorbeeld kernalinea (service en tempo)",
          text: "Tijdens piekuren blijf ik rustig, houd ik overzicht over bestellingen en zorg ik dat gasten snel en vriendelijk worden geholpen. In mijn vorige rol werkte ik vaak in avonden en weekenden, waar ik me onderscheidde door tempo, teamwerk en nette communicatie.",
        },
        {
          title: "Voorbeeld motivatie-alinea (beschikbaarheid en fit)",
          text: "Wat mij aanspreekt in uw zaak is de combinatie van service en energie op de vloer. Ik werk graag in een team waar kwaliteit en gastbeleving centraal staan en ben flexibel inzetbaar op momenten dat het echt druk is.",
        },
        {
          title: "Voorbeeld afsluiting",
          text: "Graag licht ik in een gesprek toe hoe ik met gastvrijheid, tempo en betrouwbaarheid kan bijdragen aan uw team. Dank voor uw tijd en overweging. Ik kijk uit naar uw reactie.",
        },
      ]}
      recruiterSignals={[
        "Je noemt direct service, gastvrijheid en tempo.",
        "Je maakt beschikbaarheid en inzetbaarheid geloofwaardig.",
        "Je onderbouwt werkhouding met concrete praktijkervaring.",
        "Je brief blijft kort, energiek en rolgericht.",
      ]}
      checklist={[
        "Noem de functie en zaak of werkgever concreet in je opening.",
        "Laat zien dat je onder druk vriendelijk en nauwkeurig blijft.",
        "Verwerk beschikbaarheid als die relevant is voor de vacature.",
        "Sluit af met een duidelijke uitnodiging voor een gesprek.",
      ]}
      atsTerms={[
        "horeca medewerker",
        "bediening",
        "gastvrijheid",
        "kassa",
        "bestellingen",
        "piekuren",
        "weekenden",
        "flexibel inzetbaar",
        "teamwork",
        "servicegericht",
      ]}
      mistakes={[
        "Alleen zeggen dat je sociaal bent zonder bewijs uit praktijk of bijbaan.",
        "Geen beschikbaarheid noemen terwijl dat voor horeca vaak belangrijk is.",
        "Te formeel en afstandelijk schrijven voor een servicegerichte rol.",
        "Vergeten te laten zien dat je tempo aankunt op drukke momenten.",
      ]}
      faqs={[
        {
          question: "Wat zet je in een sollicitatiebrief voor horeca medewerker?",
          answer:
            "Laat vooral service, gastvrijheid, tempo, teamwerk en beschikbaarheid terugkomen. Koppel die punten aan echte ervaring uit horeca, retail of andere klantgerichte rollen.",
        },
        {
          question: "Kan ik ook solliciteren op horeca werk zonder veel ervaring?",
          answer:
            "Ja. Gebruik dan bijbaan, retail, vrijwilligerswerk of andere klantcontactervaring als bewijs dat je servicegericht en betrouwbaar bent.",
        },
        {
          question: "Hoe lang moet een horeca sollicitatiebrief zijn?",
          answer:
            "Houd hem kort en duidelijk: meestal 3 tot 5 alinea's. Werkgevers willen snel zien of je inzetbaar bent en goed met gasten omgaat.",
        },
        {
          question: "Mag ik beschikbaarheid in mijn brief noemen?",
          answer:
            "Ja, zeker bij horeca. Avonden, weekenden of flexibiliteit zijn vaak direct relevant voor de selectie.",
        },
      ]}
      sourceLinks={[
        {
          label: "CV template horeca medewerker (WerkCV)",
          href: "/cv-template-horeca-medewerker",
        },
        {
          label: "CV voorbeeld horeca medewerker (WerkCV)",
          href: "/cv-gids/cv-voorbeeld-horeca-medewerker",
        },
        {
          label: "Sollicitatiebrief generator (WerkCV)",
          href: "/tools/sollicitatiebrief-generator",
        },
      ]}
    />
  );
}
