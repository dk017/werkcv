import { defaultCV, type CVData } from "./cv";

export type AiCvExample = { id: string; title: string; notes: string; rejected: string; explanation: string; vacancy: string; data: CVData };
/** Editorial fictional examples, not model benchmark results or customer records. */
export function aiCvExamples(locale: "nl" | "en"): AiCvExample[] {
  const en = locale === "en";
  return [
    {
      id: "retail", name: "Robin Voorbeeld", title: en ? "Retail assistant" : "Winkelmedewerker",
      notes: en ? "In a clothing shop I helped customers find the right size. I restocked clothing and tidied fitting rooms. On Saturdays I worked with three colleagues." : "In de kledingwinkel hielp ik klanten de goede maat vinden. Ik vulde kleding aan en ruimde de paskamers op. Op zaterdag werkte ik samen met drie collega's.",
      bullets: en ? ["Helped customers find the right clothing size.", "Restocked clothing and kept fitting rooms tidy.", "Worked with three colleagues on Saturdays."] : ["Hielp klanten bij het vinden van de juiste kledingmaat.", "Vulde kleding aan en hield de paskamers netjes.", "Werkte op zaterdag samen met drie collega's."],
      summary: en ? "Retail assistant experienced in helping customers choose clothing sizes, replenishing stock and keeping the shop tidy. Looking for a customer-facing retail role." : "Winkelmedewerker met ervaring in klanten helpen, kleding aanvullen en de winkel netjes houden. Zoekt een functie met direct klantcontact.",
      rejected: en ? "Led three colleagues and increased sales by 25%." : "Gaf leiding aan drie collega's en verhoogde de omzet met 25%.",
      explanation: en ? "Short bullets make the responsibilities easier to read. Working with colleagues does not mean leading them. No sales result was supplied." : "Korte punten maken de taken makkelijker leesbaar. Samenwerken is niet hetzelfde als leidinggeven. Er is geen omzetresultaat opgegeven.",
      degree: en ? "Retail employee, MBO level 2" : "Retailmedewerker, mbo niveau 2",
      skills: en ? ["Customer assistance", "Stock replenishment"] : ["Klanten helpen", "Kleding aanvullen"],
      vacancy: en ? "The shop is looking for someone to assist customers and replenish clothing. Cash register experience is preferred. This example supplies no cash register experience." : "De winkel zoekt iemand die klanten helpt en kleding aanvult. Kassa-ervaring is een pré. In dit voorbeeld is geen kassa-ervaring opgegeven.",
    },
    {
      id: "logistics", name: "Sam Voorbeeld", title: en ? "Warehouse assistant" : "Magazijnmedewerker",
      notes: en ? "I collected orders with a handheld scanner. I checked item numbers and packed boxes. I have no forklift certificate." : "Ik verzamelde bestellingen met een handscanner. Ik controleerde artikelnummers en pakte dozen in. Ik heb geen heftruckcertificaat.",
      bullets: en ? ["Collected orders using a handheld scanner.", "Checked item numbers and packed boxes.", "No forklift certificate."] : ["Verzamelde bestellingen met een handscanner.", "Controleerde artikelnummers en pakte dozen in.", "Geen heftruckcertificaat."],
      summary: en ? "Warehouse assistant experienced in collecting and packing orders and checking item numbers. Looking for warehouse work using a handheld scanner." : "Magazijnmedewerker met ervaring in bestellingen verzamelen, artikelnummers controleren en dozen inpakken. Zoekt magazijnwerk met een handscanner.",
      rejected: en ? "Certified forklift operator who processed 200 orders per day." : "Gecertificeerd heftruckchauffeur die dagelijks 200 bestellingen verwerkte.",
      explanation: en ? "The scanner and tasks come from the notes. The proposed certificate contradicts them, and the daily volume is invented." : "De handscanner en taken komen uit de notities. Het voorgestelde certificaat spreekt de bron tegen en het aantal bestellingen is verzonnen.",
      degree: en ? "Logistics employee, MBO level 2" : "Logistiek medewerker, mbo niveau 2",
      skills: en ? ["Handheld scanner", "Packing orders"] : ["Handscanner", "Bestellingen inpakken"],
      vacancy: en ? "A warehouse needs order picking and packing support. A forklift certificate is preferred: do not add one when the applicant does not have it." : "Een magazijn zoekt hulp bij orders verzamelen en inpakken. Een heftruckcertificaat is een pré: voeg dat niet toe als de kandidaat het niet heeft.",
    },
    {
      id: "student", name: "Noor Voorbeeld", title: en ? "MBO student seeking an internship" : "Mbo-student zoekt stage",
      notes: en ? "I study business administration. For a school project I entered invoices in Excel and checked the amounts with a classmate. I have not worked in an administration department." : "Ik volg een opleiding bedrijfsadministratie. Voor een schoolproject voerde ik facturen in Excel in en controleerde ik de bedragen met een klasgenoot. Ik heb nog niet op een administratie gewerkt.",
      bullets: en ? ["Entered invoices in Excel for a school project.", "Checked amounts together with a classmate."] : ["Voerde facturen in Excel in voor een schoolproject.", "Controleerde bedragen samen met een klasgenoot."],
      summary: en ? "Business administration student seeking an internship. Practised entering invoices in Excel and checking amounts in a school project. No professional administration experience yet." : "Student bedrijfsadministratie zoekt een stage. Oefende tijdens een schoolproject met facturen invoeren in Excel en bedragen controleren. Heeft nog geen professionele administratieve werkervaring.",
      rejected: en ? "Experienced financial administrator responsible for company bookkeeping." : "Ervaren financieel administrateur, verantwoordelijk voor de bedrijfsboekhouding.",
      explanation: en ? "School work can show relevant practice. It must remain labelled as a school project, not paid employment or a completed qualification." : "Schoolwerk kan relevante oefening laten zien. Het blijft een schoolproject, geen betaalde baan of afgeronde opleiding.",
      degree: en ? "Business administration, MBO — in progress" : "Bedrijfsadministratie, mbo — in opleiding",
      skills: en ? ["Excel: invoice entry practised at school", "Checking amounts"] : ["Excel: facturen invoeren op school", "Bedragen controleren"],
      vacancy: en ? "An administration internship asks for Excel practice and careful checking. Connect the school project to those tasks without calling it professional experience." : "Een administratieve stage vraagt om oefening met Excel en zorgvuldig controleren. Koppel het schoolproject aan die taken zonder het professionele ervaring te noemen.",
    },
  ].map(example => ({ ...example, data: {
    ...structuredClone(defaultCV),
    personal: { ...structuredClone(defaultCV.personal), name: example.name, title: example.title, email: `${example.id}@example.com`, phone: "", location: "Utrecht", resumeLanguage: locale, summary: example.summary },
    experience: example.id === "student" ? [] : [{ entryId: `fictional-${example.id}`, role: example.title, company: en ? "Example company (fictional)" : "Voorbeeldbedrijf (fictief)", location: "Utrecht", start: "2023-09", end: "2025-08", description: "", highlights: example.bullets }],
    education: [{ degree: example.degree, school: en ? "Example school (fictional)" : "Voorbeeldschool (fictief)", location: "Utrecht", start: "2021-09", end: example.id === "student" ? "" : "2023-07", description: example.id === "student" ? example.bullets.join("\n") : "" }],
    skills: example.skills.map(name => ({ name, level: 3 })),
    languages: [{ name: en ? "Dutch" : "Nederlands", level: en ? "Native" : "Moedertaal" }],
  } }));
}
