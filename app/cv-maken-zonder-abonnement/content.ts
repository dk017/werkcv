import { cvDownloadPrice } from "@/lib/site-content";

export const faqs = [
  {
    question: "Welke CV-maker werkt zonder abonnement?",
    answer: `WerkCV werkt zonder abonnement: je bouwt en bekijkt je CV gratis en betaalt eenmalig ${cvDownloadPrice.display} inclusief btw wanneer je dat CV als PDF downloadt. Er is geen proefperiode, automatische verlenging of maandelijkse opzegactie.`,
  },
  {
    question: "Bestaat er een volledig gratis CV-maker zonder abonnement?",
    answer: `Ja. Word, Google Docs en Europass kunnen zonder een CV-builderabonnement worden gebruikt. Je beheert de structuur, opmaak en PDF-controle dan grotendeels zelf. WerkCV is gratis tijdens het bouwen, maar vraagt ${cvDownloadPrice.display} inclusief btw voor de definitieve PDF.`,
  },
  {
    question: "Wat betekent 'gratis CV maken' meestal?",
    answer: "Controleer altijd welk onderdeel gratis is. Bij sommige diensten is alleen bouwen gratis en is downloaden betaald; andere starten na een goedkope proefperiode een abonnement. Kijk daarom naar de uiteindelijke PDF-prijs, automatische verlenging en opzegvoorwaarden.",
  },
  {
    question: "Kan ik mijn CV zien voordat ik betaal?",
    answer: "Ja. Bij WerkCV kun je de volledige inhoud, pagina's, template en accentkleur bekijken voordat je de eenmalige betaalstap opent.",
  },
  {
    question: "Moet ik later iets opzeggen?",
    answer: "Nee. WerkCV start geen abonnement, dus er is geen maandplan om te annuleren en er volgt geen automatische verlenging.",
  },
  {
    question: "Kan ik na betaling nog wijzigingen maken?",
    answer: "Ja. Je kunt hetzelfde betaalde CV later opnieuw openen, aanpassen, van template of kleur wisselen en opnieuw downloaden zonder opnieuw voor dat document te betalen.",
  },
  {
    question: "Voor wie is een CV-builder zonder abonnement logisch?",
    answer: "Een eenmalige builder past vooral bij iemand die tijdens een sollicitatieronde een professioneel CV nodig heeft maar geen doorlopende carrièresuite wil. Wie voortdurend meerdere documenten, brieven, vacatures en coaching gebruikt, kan juist meer hebben aan een uitgebreider abonnement.",
  },
  {
    question: "Waar moet ik CV-builderprijzen op vergelijken?",
    answer: "Vergelijk de prijs van de eerste bruikbare PDF, automatische verlenging, opzegvoorwaarden, aantal documenten, latere bewerking, herdownloads, templates en privacy. Vergelijk niet alleen de geadverteerde proefprijs.",
  },
] as const;

export const comparisonRows = [
  ["Prijsmodel", `Eenmalig ${cvDownloadPrice.display}`, "14-daagse proef", "14-daagse proef", "7-daagse proef"],
  ["Eerste betaalde bedrag", cvDownloadPrice.display, "€2,99", "€0,99", "€2,95"],
  ["Daarna", "Geen maandbedrag", "€21,99 per maand", "€19,99 per maand", "€14,95 per 4 weken"],
  ["Automatische verlenging", "Nee", "Ja", "Ja", "Ja"],
  ["Opzeggen nodig", "Nee", "Ja, om verlenging te stoppen", "Ja, om verlenging te stoppen", "Ja, om verlenging te stoppen"],
] as const;

export const comparisonSources = [
  {
    name: "CVMaker prijzen en helpcentrum",
    href: "https://www.cvmaker.nl/help",
  },
  {
    name: "CV.nl prijzen",
    href: "https://www.cv.nl/pricing",
  },
  {
    name: "CVster prijzen",
    href: "https://cvster.nl/pricing",
  },
] as const;

export const comparisonCheckedAt = "5 juli 2026";
