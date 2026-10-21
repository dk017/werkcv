import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LinkedInPhotoCheckLanding from "@/components/profile-photo/LinkedInPhotoCheckLanding";
import type { ProfilePhotoFaq } from "@/components/profile-photo/ProfilePhotoLanding";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { profilePhotoPrice } from "@/lib/site-content";

const faq: ProfilePhotoFaq[] = [
  { question: "Is the LinkedIn photo check really free?", answer: "Yes. The check is free and works without an account. You can check up to 10 photos per hour." },
  { question: "What happens to my photo?", answer: "We do not store your photo. For the review it is sent to OpenAI, which by default does not use data sent through its API to train AI." },
  { question: "How is the score calculated?", answer: "The AI rates nine points (face, framing, eye contact, expression, light, sharpness, background, clothing and resolution) as good, borderline or to improve. We then compute the 0–100 score with fixed weights, so the same photo gets roughly the same score each time." },
  { question: "Does the check judge how I look?", answer: "No. It only looks at the photo: light, framing, background and so on. Looks, age, background or religion play no role; a headscarf or glasses are perfectly fine." },
  { question: "What size should a LinkedIn profile photo be?", answer: "LinkedIn recommends at least 400 × 400 pixels and accepts JPG and PNG up to 8 MB. It shows your photo as a circle, so keep your face in the centre." },
  { question: "My score is low. What now?", answer: `Follow the tip per point, or turn the same photo into a professional version with the WerkCV AI profile photo. You see 4 previews for free; only if you use one do you pay ${profilePhotoPrice.displayEn} once.` },
];

export const metadata: Metadata = {
  title: "Free LinkedIn photo check: score and tips for your profile photo | WerkCV",
  description: "Upload your LinkedIn photo and get a free score from 0 to 100 with concrete tips on framing, light, background and sharpness. No account; your photo is not stored.",
  keywords: ["linkedin photo check", "linkedin profile picture analyzer", "linkedin photo score", "good linkedin photo", "linkedin profile photo tips"],
  alternates: {
    canonical: "https://werkcv.nl/en/linkedin-photo-check",
    languages: {
      nl: "https://werkcv.nl/linkedin-foto-check",
      en: "https://werkcv.nl/en/linkedin-photo-check",
      "x-default": "https://werkcv.nl/linkedin-foto-check",
    },
  },
  openGraph: {
    title: "Free LinkedIn photo check | WerkCV",
    description: "A 0–100 score and concrete tips for your LinkedIn profile photo. Free, no account.",
    url: "https://werkcv.nl/en/linkedin-photo-check",
    siteName: "WerkCV",
    locale: "en_NL",
    type: "website",
  },
};

export default function EnglishLinkedInPhotoCheckPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faq} />
      <LinkedInPhotoCheckLanding locale="en" faq={faq} />
      <Footer />
    </div>
  );
}
