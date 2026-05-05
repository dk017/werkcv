import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import NavUserMenu from "@/components/NavUserMenu";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { applicationBundlePrice, profilePhotoPrice } from "@/lib/site-content";
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

const faqItems = [
  {
    question: "Do I need a photo on my CV in the Netherlands?",
    answer:
      "No. A photo is not required on a Dutch CV. Many applicants still use one for roles where presentation, trust or personal contact matters. Always follow the vacancy instructions.",
  },
  {
    question: "Can I use the same photo for CV and LinkedIn?",
    answer:
      "Yes. A consistent photo on your CV and LinkedIn helps recruiters recognize you when they review both.",
  },
  {
    question: "Do I pay before seeing the result?",
    answer:
      `No. You create preview variants first. You only pay the one-time ${profilePhotoPrice.display} when you want to download the chosen photo.`,
  },
  {
    question: "Is the profile photo included in the CV bundle?",
    answer:
      `Yes. If you bought the CV + profile photo bundle for ${applicationBundlePrice.display}, the profile photo download is included.`,
  },
];

export const metadata: Metadata = {
  title: `AI profile photo for CV and LinkedIn | ${profilePhotoPrice.display} | WerkCV`,
  description:
    `Create a realistic AI profile photo for your CV and LinkedIn in the Netherlands. Preview first, then pay ${profilePhotoPrice.display} once if you want to download.`,
  alternates: {
    canonical: "https://werkcv.nl/en/profile-photo",
  },
  openGraph: {
    title: `AI profile photo for CV and LinkedIn | WerkCV`,
    description:
      "Create a professional profile photo for Dutch job applications, CVs and LinkedIn. Preview first, pay only when downloading.",
    url: "https://werkcv.nl/en/profile-photo",
    type: "website",
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
            <Link href="/en/cv-maker-netherlands" className="hover:text-slate-900">
              CV maker
            </Link>
            <Link href="/en/templates" className="hover:text-slate-900">
              Templates
            </Link>
            <Link href="/en/tools" className="hover:text-slate-900">
              Tools
            </Link>
            <NavUserMenu />
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_42%,#FFF4D8_100%)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                AI profile photo for Dutch applications
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                Create a professional profile photo for your CV and LinkedIn
              </h1>
              <p className="mt-5 text-lg font-medium leading-relaxed text-slate-700">
                Upload an existing photo or selfie and turn it into a realistic, recognizable profile photo for your
                Dutch CV, LinkedIn profile and job applications. Preview first, pay only when you want to download.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#profielfoto-tool"
                  className="inline-flex items-center justify-center border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Create my profile photo
                </Link>
                <Link
                  href="/en/templates"
                  className="inline-flex items-center justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
                >
                  Build my CV
                </Link>
              </div>
              <p className="mt-4 text-sm font-bold text-slate-700">
                One-time {profilePhotoPrice.display}. Or together with your CV for {applicationBundlePrice.display}. No subscription.
              </p>
            </div>

            <ProfilePhotoSamples samples={profilePhotoSamples.slice(0, 1)} mode="hero" uiLanguage="en" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Trust before upload
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950">
                See the kind of profile photo WerkCV aims for
              </h2>
            </div>
            <p className="text-sm font-medium leading-relaxed text-slate-700">
              The goal is not a fake studio portrait. The result should still look like you, but cleaner, sharper and
              safer for Dutch recruiters who see your CV and LinkedIn profile together.
            </p>
          </div>
          <ProfilePhotoSamples samples={profilePhotoSamples.slice(1)} mode="gallery" uiLanguage="en" />
        </section>

        <section id="profielfoto-tool" className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                "Upload 1 to 4 clear photos",
                "Create 4 preview variants",
                "Pay once only if you download",
              ].map((item) => (
                <div key={item} className="border-2 border-black bg-[#E9FFFC] p-4 text-sm font-black text-black">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <ProfilePhotoGenerator uiLanguage="en" />
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Profile photo questions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="text-sm font-black text-slate-950">{item.question}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
