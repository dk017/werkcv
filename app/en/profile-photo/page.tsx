import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import NavUserMenu from "@/components/NavUserMenu";
import ProfilePhotoLanding, { type ProfilePhotoFaq } from "@/components/profile-photo/ProfilePhotoLanding";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { profilePhotoPrice } from "@/lib/site-content";
import ProfilePhotoGenerator from "@/app/profielfoto-cv-maken/ProfilePhotoGenerator";
import ProfilePhotoSamples, { type ProfilePhotoSample } from "@/app/profielfoto-cv-maken/ProfilePhotoSamples";

const profilePhotoSamples: ProfilePhotoSample[] = [
  {
    src: "/profile-photo-samples/dutch-consultant-man.jpg",
    alt: "AI-generated professional profile photo sample for a consultant in the Netherlands",
    role: "Consultant",
    style: "Corporate executive",
    note: "A safe business look for consulting, finance, sales and office roles where trust matters.",
  },
  {
    src: "/profile-photo-samples/dutch-tech-professional-man.jpg",
    alt: "AI-generated profile photo sample for a tech professional in the Netherlands",
    role: "Tech professional",
    style: "Clean LinkedIn",
    note: "Professional without feeling overdressed. Suitable for software, product and startup roles.",
  },
  {
    src: "/profile-photo-samples/dutch-hr-manager-woman.jpg",
    alt: "AI-generated profile photo sample for an HR manager",
    role: "HR manager",
    style: "Warm business",
    note: "Approachable and reliable while still feeling suitable for Dutch business contexts.",
  },
  {
    src: "/profile-photo-samples/dutch-starter-woman.jpg",
    alt: "AI-generated profile photo sample for a starter in the Netherlands",
    role: "Starter",
    style: "Smart casual",
    note: "Clean and friendly for internships, first jobs and junior applications.",
  },
  {
    src: "/profile-photo-samples/dutch-university-student-man.jpg",
    alt: "AI-generated profile photo sample for a university student",
    role: "University student",
    style: "Internship ready",
    note: "Young but serious enough for LinkedIn, internships and traineeships.",
  },
  {
    src: "/profile-photo-samples/international-student-netherlands-woman.jpg",
    alt: "AI-generated profile photo sample for an international student applying in the Netherlands",
    role: "International student",
    style: "Netherlands-ready",
    note: "Useful for English-language applications, internships and expat LinkedIn profiles in the Netherlands.",
  },
];

const faqItems: ProfilePhotoFaq[] = [
  {
    question: "How much does an AI profile photo cost at WerkCV?",
    answer: `You see 4 previews for free first. To use them, you pay ${profilePhotoPrice.displayEn} once, which includes 2 refinements. There is no subscription.`,
  },
  {
    question: "How long does it take?",
    answer: "Your 4 previews are usually ready within a minute. A refinement takes about as long.",
  },
  {
    question: "Which photo should I upload?",
    answer: "A recent selfie or portrait where your face is clear and facing the camera, without sunglasses or a cap, in reasonable light. Group photos or very dark photos work less well. You can upload 1 to 4 photos.",
  },
  {
    question: "Will it really look like me?",
    answer: "The tool deliberately keeps your face, skin tone, hair, glasses and features the same and mainly changes light, background and clothing. If you don't recognise yourself, use a refinement or simply don't use the photo: you only pay if you want to download one.",
  },
  {
    question: "Why 4 photos and not 40?",
    answer: "You need one good photo. You see your 4 previews before you pay and can adjust something with 2 refinements, so you only pay for a photo you will actually use.",
  },
  {
    question: "Can I put the photo straight onto my CV?",
    answer: "Yes. After payment you add your favourite photo to your WerkCV CV in one click, or download it for LinkedIn and other profiles.",
  },
  {
    question: "Can I use it as a passport photo?",
    answer: "No. Photos for a passport, ID card or driving licence must be unedited. The AI profile photo is meant for your CV, LinkedIn and other professional profiles.",
  },
  {
    question: "What happens to my photo?",
    answer: "WerkCV uses your upload only to create the photos and does not store your original photo afterwards. The generated photos are kept in your account so you can return to them. You can always ask WerkCV to delete them.",
  },
  {
    question: "Is my photo used to train AI?",
    answer: "No. The photos are made through the OpenAI API, which by default does not use data sent through the API to train models. WerkCV does not use your photo for anything else either.",
  },
  {
    question: "Do Dutch employers expect a photo on a CV?",
    answer: "A photo is optional in the Netherlands. Many applicants include a professional one, but follow the vacancy: if it asks for a CV without a photo, leave it out.",
  },
  {
    question: "Can I use the same photo for my CV and LinkedIn?",
    answer: "Yes, that is useful. The same photo on your CV and LinkedIn makes you recognisable to recruiters who look at both.",
  },
  {
    question: "Does this replace a professional photographer?",
    answer: "Not always. A photographer is still the best choice if you want full control over location, light and clothing. This tool is the fast, affordable route when you need a clean photo today.",
  },
];

export const metadata: Metadata = {
  title: `AI headshot for your CV & LinkedIn – see it free first | ${profilePhotoPrice.displayEn}`,
  description: `Turn a regular photo or selfie into a professional profile photo for your Dutch CV and LinkedIn. See 4 previews for free; pay only if you use one (${profilePhotoPrice.displayEn}, no subscription).`,
  keywords: [
    "ai headshot generator netherlands",
    "ai headshot free preview",
    "linkedin profile photo netherlands",
    "professional headshot ai",
    "cv photo netherlands",
    "ai profile photo maker",
  ],
  alternates: {
    canonical: "https://werkcv.nl/en/profile-photo",
    languages: {
      nl: "https://werkcv.nl/profielfoto-cv-maken",
      "nl-NL": "https://werkcv.nl/profielfoto-cv-maken",
      en: "https://werkcv.nl/en/profile-photo",
      "en-NL": "https://werkcv.nl/en/profile-photo",
      "x-default": "https://werkcv.nl/profielfoto-cv-maken",
    },
  },
  openGraph: {
    title: "AI headshot for your CV & LinkedIn – see it free first | WerkCV",
    description: `Professional profile photo from your selfie for Dutch job applications and LinkedIn. 4 free previews, ${profilePhotoPrice.displayEn} only if you use one.`,
    url: "https://werkcv.nl/en/profile-photo",
    siteName: "WerkCV",
    locale: "en_NL",
    type: "website",
    images: [{ url: "https://werkcv.nl/opengraph-image", width: 1200, height: 630, alt: "AI profile photo for CV and LinkedIn" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@werkcvnl",
    title: "AI headshot for your CV & LinkedIn – see it free first | WerkCV",
    description: `4 free previews from your selfie; ${profilePhotoPrice.displayEn} only if you use one.`,
    images: ["https://werkcv.nl/opengraph-image"],
  },
};

export default function EnglishProfilePhotoPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/en" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 sm:flex">
            <Link href="/en/ai-headshot-photo-requirements" className="hover:text-slate-900">Photo tips</Link>
            <Link href="/en/guides/netherlands-cv-photo-rules" className="hover:text-slate-900">CV photo rules</Link>
            <Link href="/en" className="hover:text-slate-900">Make a CV</Link>
            <NavUserMenu />
          </nav>
        </div>
      </header>

      <ProfilePhotoLanding
        locale="en"
        tool={<ProfilePhotoGenerator uiLanguage="en" />}
        styleGallery={<ProfilePhotoSamples samples={profilePhotoSamples} mode="gallery" uiLanguage="en" />}
        faq={faqItems}
        seoContent={
          <section className="mx-auto max-w-6xl px-6 pt-12">
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-slate-950">Photo on a Dutch CV: optional, often useful</h2>
              <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
                <p>
                  In the Netherlands a CV photo is not required, but many applicants add a professional one, especially for
                  client-facing roles in sales, healthcare, education, hospitality and HR. Leave it out if the vacancy asks for
                  an anonymous application or a CV without a photo.
                </p>
                <p>
                  Not sure? Read the{" "}
                  <Link href="/en/guides/netherlands-cv-photo-rules" className="font-black underline decoration-2 underline-offset-4">
                    CV photo rules for the Netherlands
                  </Link>{" "}
                  or the{" "}
                  <Link href="/en/ai-headshot-photo-requirements" className="font-black underline decoration-2 underline-offset-4">
                    tips for your source photo
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
        }
      />

      <Footer />
    </div>
  );
}
