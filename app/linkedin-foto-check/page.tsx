import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LinkedInPhotoCheckLanding from "@/components/profile-photo/LinkedInPhotoCheckLanding";
import type { ProfilePhotoFaq } from "@/components/profile-photo/ProfilePhotoLanding";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { profilePhotoPrice } from "@/lib/site-content";

const faq: ProfilePhotoFaq[] = [
  { question: "Is de LinkedIn-foto check echt gratis?", answer: "Ja. De check is gratis en werkt zonder account. Je kunt maximaal 10 foto's per uur checken." },
  { question: "Wat gebeurt er met mijn foto?", answer: "We slaan je foto niet op. Voor de beoordeling gaat hij naar OpenAI; die gebruikt gegevens die via de API binnenkomen standaard niet om AI te trainen." },
  { question: "Hoe wordt de score berekend?", answer: "De AI beoordeelt negen punten (gezicht, uitsnede, oogcontact, uitstraling, licht, scherpte, achtergrond, kleding en resolutie) als goed, twijfel of verbeteren. De score van 0 tot 100 rekenen we daarna uit met vaste gewichten, zodat dezelfde foto steeds ongeveer dezelfde score krijgt." },
  { question: "Beoordeelt de check hoe ik eruitzie?", answer: "Nee. De check kijkt alleen naar de foto: licht, uitsnede, achtergrond en dergelijke. Uiterlijk, leeftijd, afkomst of religie spelen geen rol; een hoofddoek of bril is gewoon prima." },
  { question: "Welke afmeting heeft een LinkedIn-profielfoto?", answer: "LinkedIn raadt minstens 400 × 400 pixels aan en accepteert JPG en PNG tot 8 MB. LinkedIn toont je foto als cirkel, dus zorg dat je gezicht in het midden staat." },
  { question: "Mijn score is laag. Wat nu?", answer: `Volg de tips per punt, of maak van dezelfde foto een professionele versie met de WerkCV AI-profielfoto. Je ziet eerst gratis 4 voorbeelden; pas als je er een gebruikt betaal je eenmalig ${profilePhotoPrice.display}.` },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Gratis LinkedIn-foto check: score en tips voor je profielfoto | WerkCV",
  description: "Upload je LinkedIn-foto en krijg gratis een score van 0 tot 100 met concrete tips voor uitsnede, licht, achtergrond en scherpte. Zonder account, je foto wordt niet opgeslagen.",
  path: "/linkedin-foto-check",
  keywords: ["linkedin foto check", "linkedin profielfoto check", "linkedin foto beoordelen", "goede linkedin foto", "linkedin profielfoto tips"],
});

export default function LinkedInFotoCheckPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faq} />
      <LinkedInPhotoCheckLanding locale="nl" faq={faq} />
      <Footer />
    </div>
  );
}
