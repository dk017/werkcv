import { cvDownloadPrice } from "@/lib/site-content";
import {
  consumerCvPricingFactsById,
  formatPricingCheckedAtNl,
  toConsumerCvPricingView,
} from "@/lib/commercial/consumer-cv-pricing";

const comparisonNow = new Date();
const cvmaker = toConsumerCvPricingView(consumerCvPricingFactsById.cvmaker, comparisonNow);
const cvNl = toConsumerCvPricingView(consumerCvPricingFactsById.cv_nl, comparisonNow);
const cvster = toConsumerCvPricingView(consumerCvPricingFactsById.cvster, comparisonNow);

function priceOrUnverified(value: string | null): string {
  return value || "Actuele prijs niet onafhankelijk geverifieerd";
}

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
  ["Prijsmodel", `Eenmalig ${cvDownloadPrice.display}`, "Proef + abonnement", "Proef + abonnement", "Gratis beperkt + premium"],
  ["Eerste betaalde bedrag", cvDownloadPrice.display, priceOrUnverified(cvmaker.displayedInitialPriceTextNl), priceOrUnverified(cvNl.displayedInitialPriceTextNl), priceOrUnverified(cvster.displayedInitialPriceTextNl)],
  ["Daarna", "Geen maandbedrag", priceOrUnverified(cvmaker.displayedRecurringPriceTextNl), priceOrUnverified(cvNl.displayedRecurringPriceTextNl), priceOrUnverified(cvster.displayedRecurringPriceTextNl)],
  ["Automatische verlenging", "Nee", cvmaker.cancellationRequired ? "Ja" : "Onbekend", cvNl.cancellationRequired ? "Ja" : "Onbekend", cvster.cancellationRequired ? "Ja bij de premiumproef" : "Onbekend"],
  ["Opzeggen nodig", "Nee", cvmaker.cancellationRequired ? "Ja, om verlenging te stoppen" : "Onbekend", cvNl.cancellationRequired ? "Ja, om verlenging te stoppen" : "Onbekend", cvster.cancellationRequired ? "Ja bij de premiumproef" : "Onbekend"],
  ["Gecontroleerd", "WerkCV-prijsbron", formatPricingCheckedAtNl(cvmaker.checkedAt), formatPricingCheckedAtNl(cvNl.checkedAt), formatPricingCheckedAtNl(cvster.checkedAt)],
] as const;

export const comparisonSources = [
  {
    name: "CVMaker officiële prijsuitleg",
    href: cvmaker.officialUrl,
  },
  {
    name: "CV.nl officiële prijzen",
    href: cvNl.officialUrl,
  },
  {
    name: "CVster officiële prijzen",
    href: cvster.officialUrl,
  },
] as const;

export const comparisonCheckedAt = formatPricingCheckedAtNl(cvmaker.checkedAt);
