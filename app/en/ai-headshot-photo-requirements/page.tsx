import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavUserMenu from "@/components/NavUserMenu";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { profilePhotoPrice } from "@/lib/site-content";
import { buildEnglishMetadata } from "@/app/en/metadata";

const pageUrl = "https://werkcv.nl/en/ai-headshot-photo-requirements";

const faqItems = [
  {
    question: "How many photos should I upload for an AI headshot?",
    answer:
      "One recent, sharp photo can be enough. Two to four photos can help when they show the same current appearance from slightly different angles. At WerkCV, your first photo is the primary identity reference.",
  },
  {
    question: "Can I use a selfie for an AI headshot?",
    answer:
      "Yes, if your face is sharp, evenly lit and not distorted. Keep the camera at eye level and farther from your face. A timer or another person usually creates a more natural perspective than a very close selfie.",
  },
  {
    question: "Can I upload a group photo or screenshot?",
    answer:
      "It is better not to. Other faces, small crops and compression make the reference less clear. Use the original photo file with only you in the frame whenever possible.",
  },
  {
    question: "Do I need the same clothes in every source photo?",
    answer:
      "No, but use photos from roughly the same period with the same current hairstyle, facial hair and glasses. If you want to keep your clothing, make your first photo the one with the outfit you want represented.",
  },
  {
    question: "Which file types does WerkCV accept?",
    answer:
      "WerkCV accepts one to four JPG, PNG or WebP files. Each photo can be up to 8 MB, with a maximum total upload of 24 MB.",
  },
  {
    question: "What if my source photo has a low resolution?",
    answer:
      "Prefer the original file from your phone and aim for at least about 1024 pixels on the shortest side. WerkCV warns below 512 pixels, but a larger file is not automatically suitable: sharpness, light and a visible face still matter.",
  },
  {
    question: "Can I use an AI-generated profile photo on LinkedIn?",
    answer:
      "LinkedIn permits an artistic rendering when it reflects your likeness. Only use a result that still represents you honestly and recognizably, and check the platform's current rules.",
  },
  {
    question: "Does WerkCV keep my original photos?",
    answer:
      "WerkCV uses source photos for the generation request and does not persist the original uploads afterwards. Generated results are stored in your account so you can return to them. You can request deletion.",
  },
];

const quickChecks = [
  "Recent: the photo shows how you look now.",
  "Solo: you are the only person in the image.",
  "Sharp: eyes, hairline and facial contours are clearly visible.",
  "Even light: no deep shadow, flash glare or bright window behind you.",
  "Natural: no beauty filter, sunglasses or heavy colour treatment.",
  "Close enough: your head and shoulders fill most of the image.",
];

const avoidChecks = [
  "Group photos or a tiny face cropped from a busy image.",
  "Screenshots, thumbnails or photos repeatedly sent through messaging apps.",
  "A face partly hidden by hair, hands, a phone or accessories.",
  "Very old photos or references with different ages and hairstyles.",
  "Extreme wide-angle selfies taken very close to your face.",
  "Heavy filters, portrait blur over the face or strong backlighting.",
];

export const metadata: Metadata = buildEnglishMetadata({
  title: "AI Headshot Photo Requirements: What Photos Should You Upload?",
  description:
    "Choose better source photos for a recognizable AI headshot. Learn about lighting, crop, resolution, number of photos, glasses, clothing and WerkCV upload limits.",
  path: "/en/ai-headshot-photo-requirements",
  nlPath: "/ai-headshot-foto-tips",
  keywords: [
    "AI headshot photo requirements",
    "what photos to upload for AI headshots",
    "AI headshot input photos",
    "AI headshot selfie tips",
    "professional profile photo Netherlands",
    "AI LinkedIn headshot",
  ],
  type: "article",
});

export default function AiHeadshotPhotoRequirementsPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9] text-slate-950">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "AI headshot photo requirements: what photos should you upload?",
          description:
            "Practical source-photo guidance for making a recognizable AI profile photo.",
          mainEntityOfPage: pageUrl,
          datePublished: "2026-07-28",
          dateModified: "2026-07-28",
          inLanguage: "en-NL",
          author: { "@id": "https://werkcv.nl/#organization" },
          publisher: { "@id": "https://werkcv.nl/#organization" },
        }}
      />
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/en" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-bold text-slate-600">
            <Link href="/en/profile-photo" className="hidden hover:text-black sm:block">
              AI profile photo
            </Link>
            <LanguageSwitcher tone="solid" />
            <div className="hidden sm:block">
              <NavUserMenu uiLanguage="en" />
            </div>
          </nav>
        </div>
      </header>

      <main>
        <article>
          <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_48%,#FFF4D8_100%)]">
            <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-800">
                Source-photo guide for AI headshots
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
                What photos should you upload for a recognizable AI headshot?
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
                Start with one recent, sharp photo containing only you. Put your clearest and
                most representative photo first. Add more only when they clarify the same
                current appearance.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/en/profile-photo#profielfoto-tool"
                  className="inline-flex items-center justify-center border-2 border-black bg-[#4ECDC4] px-6 py-3 font-black text-black shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5"
                >
                  Create my AI profile photo
                </Link>
                <a
                  href="#checklist"
                  className="inline-flex items-center justify-center border-2 border-black bg-white px-6 py-3 font-black text-black"
                >
                  Check the photos first
                </a>
              </div>
              <p className="mt-5 text-sm font-bold text-slate-600">
                Preview first. Download for a one-time {profilePhotoPrice.display}, including
                VAT. No subscription.
              </p>
            </div>
          </section>

          <section id="checklist" className="mx-auto max-w-5xl scroll-mt-8 px-6 py-14">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="border-2 border-black bg-[#E9FFFC] p-6 shadow-[5px_5px_0_#000]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-800">
                  Strong source photo
                </p>
                <h2 className="mt-2 text-3xl font-black">Look for these qualities</h2>
                <ul className="mt-5 space-y-3 font-medium leading-relaxed text-slate-700">
                  {quickChecks.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="font-black text-teal-700">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-black bg-[#FFF4D8] p-6 shadow-[5px_5px_0_#000]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">
                  Best avoided
                </p>
                <h2 className="mt-2 text-3xl font-black">These photos add uncertainty</h2>
                <ul className="mt-5 space-y-3 font-medium leading-relaxed text-slate-700">
                  {avoidChecks.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="font-black text-amber-800">×</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="border-y-4 border-black bg-white">
            <div className="mx-auto max-w-4xl px-6 py-14">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-800">
                Your first photo matters most
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Make photo 1 your primary identity reference
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">
                WerkCV treats the first upload as the main reference. Choose the image that
                best shows your current facial structure, hair, glasses and age. Additional
                photos can show a slight angle or your usual smile, but they should not
                contradict the first image.
              </p>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-950 text-white">
                      <th className="border-2 border-black p-4">Number</th>
                      <th className="border-2 border-black p-4">When it works</th>
                      <th className="border-2 border-black p-4">What to check</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium text-slate-700">
                    <tr>
                      <td className="border-2 border-black p-4 font-black">1 photo</td>
                      <td className="border-2 border-black p-4">Recent, sharp and close to front-facing.</td>
                      <td className="border-2 border-black p-4">Your face and current appearance must be fully clear.</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border-2 border-black p-4 font-black">2–4 photos</td>
                      <td className="border-2 border-black p-4">Useful for slight angles, glasses or facial hair.</td>
                      <td className="border-2 border-black p-4">Same person, period and recognizable appearance; no conflicting references.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-6 py-14">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-800">
              A five-minute setup
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Take a usable source photo at home
            </h2>
            <ol className="mt-8 space-y-5">
              {[
                ["Face soft daylight", "Stand facing a window, not with the window behind you. Avoid harsh midday sun, ceiling light and direct flash."],
                ["Place the camera at eye level", "Use a timer, stand or another person. Keep enough distance to avoid wide-angle facial distortion."],
                ["Frame head and shoulders", "Show your full head, hairline, neck and shoulders. Do not cut off ears, chin or hair."],
                ["Use a natural expression", "Look towards the camera with your normal neutral expression or relaxed smile. Do not force an unusually broad grin."],
                ["Show your current appearance", "Wear your usual glasses, hairstyle and facial hair. If you want to keep your outfit, wear it in photo 1."],
                ["Upload the original", "Use the file from your camera app instead of a screenshot or a social-media download."],
              ].map(([title, text], index) => (
                <li key={title} className="grid gap-4 border-l-4 border-black pl-5 sm:grid-cols-[48px_1fr]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4ECDC4] font-black">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-black">{title}</h3>
                    <p className="mt-1 leading-relaxed text-slate-700">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-y-4 border-black bg-[#E9FFFC]">
            <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 lg:grid-cols-2">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-800">
                  WerkCV upload rules
                </p>
                <h2 className="mt-3 text-3xl font-black">Files and resolution</h2>
                <ul className="mt-5 space-y-3 font-medium leading-relaxed text-slate-700">
                  <li><strong>Format:</strong> JPG, PNG or WebP.</li>
                  <li><strong>Number:</strong> at least 1 and no more than 4 photos.</li>
                  <li><strong>Size:</strong> up to 8 MB per photo and 24 MB in total.</li>
                  <li><strong>Recommendation:</strong> use the original, preferably 1024 pixels or more on the shortest side.</li>
                  <li><strong>Warning:</strong> WerkCV flags a shortest side below 512 pixels or an extremely wide or narrow crop.</li>
                </ul>
              </div>
              <div className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_#000]">
                <h2 className="text-2xl font-black">Glasses, hair and clothing</h2>
                <div className="mt-5 space-y-4 text-slate-700">
                  <p><strong>Glasses:</strong> wear them if you normally do. Turn slightly away from the window if the lenses reflect it.</p>
                  <p><strong>Hair or beard:</strong> use references showing your current style. Do not mix clean-shaven and bearded periods.</p>
                  <p><strong>Clothing:</strong> choose in the generator whether your outfit may be kept or adapted. A regulated uniform should appear only when it genuinely belongs to you and your role.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-6 py-14">
            <h2 className="text-3xl font-black sm:text-4xl">
              What AI can improve — and what it cannot
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="border-2 border-black bg-white p-6">
                <h3 className="text-xl font-black">Good use cases</h3>
                <p className="mt-3 leading-relaxed text-slate-700">
                  A calmer background, balanced lighting, a professional square crop and — if
                  you choose it — a small change to clothing or expression.
                </p>
              </div>
              <div className="border-2 border-black bg-white p-6">
                <h3 className="text-xl font-black">Not a reliable repair</h3>
                <p className="mt-3 leading-relaxed text-slate-700">
                  A hidden or blurred face, incorrect age information or conflicting
                  references. AI can also change details, so review every result yourself.
                </p>
              </div>
            </div>
            <div className="mt-8 border-2 border-black bg-[#FFF4D8] p-6">
              <h3 className="text-xl font-black">Identity check before downloading</h3>
              <p className="mt-3 leading-relaxed text-slate-700">
                Check facial shape, age, eyes, hairline, glasses, distinctive marks, teeth and
                your normal expression. Do not use a variant if you or someone close to you
                would not immediately recognize you.
              </p>
            </div>
          </section>

          <section className="border-y-4 border-black bg-white">
            <div className="mx-auto max-w-4xl px-6 py-14">
              <h2 className="text-3xl font-black sm:text-4xl">Frequently asked questions</h2>
              <div className="mt-8 divide-y-2 divide-slate-200 border-y-2 border-slate-200">
                {faqItems.map((item) => (
                  <details key={item.question} className="group py-5">
                    <summary className="cursor-pointer list-none pr-6 text-lg font-black">
                      {item.question}
                    </summary>
                    <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#4ECDC4]">
            <div className="mx-auto max-w-4xl px-6 py-14 text-center">
              <h2 className="text-3xl font-black sm:text-4xl">Is your source photo ready?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed">
                Create four previews, choose your favourite and pay only when you want to
                download it.
              </p>
              <Link
                href="/en/profile-photo#profielfoto-tool"
                className="mt-7 inline-flex border-2 border-black bg-white px-7 py-3 font-black shadow-[5px_5px_0_#000]"
              >
                Start with my photo
              </Link>
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-6 py-10 text-sm leading-relaxed text-slate-600">
            <h2 className="font-black text-slate-900">Sources and editorial basis</h2>
            <p className="mt-3">
              This guide combines current WerkCV upload rules with general photography
              principles and official profile guidance. Last substantively reviewed on 28 July
              2026.
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a className="font-bold underline" href="https://www.linkedin.com/business/talent/blog/product-tips/tips-for-taking-professional-linkedin-profile-pictures">
                  LinkedIn — tips for taking a professional profile picture
                </a>
              </li>
              <li>
                <a className="font-bold underline" href="https://www.linkedin.com/help/linkedin/answer/a1377087/profile-photo-guidelines-and-conditions">
                  LinkedIn — profile photo guidelines and conditions
                </a>
              </li>
              <li>
                <Link className="font-bold underline" href="/en/privacy">
                  WerkCV — privacy and photo processing
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
