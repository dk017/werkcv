import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";

export const metadata: Metadata = {
  title: "Terms and Conditions | WerkCV",
  description:
    "Terms for using WerkCV, including one-time CV payments, digital delivery, AI-assisted features, and user responsibilities.",
  alternates: {
    canonical: "https://werkcv.nl/en/terms",
    languages: getLanguageAlternates("/en/terms") ?? undefined,
  },
};

export default function EnglishTermsPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/en" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <Link
            href="/en/templates"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
          >
            Build my CV
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-10">
          <h1 className="mb-2 text-3xl font-black text-black">Terms and Conditions</h1>
          <p className="mb-8 text-sm font-medium text-gray-500">Last updated: July 2026</p>

          <div className="max-w-none space-y-6 text-black">
            <section>
              <h2 className="mb-2 text-lg font-black">1. Service</h2>
              <p className="font-medium leading-relaxed">
                WerkCV provides an online CV builder, PDF export, application tools, templates,
                examples, and optional AI-assisted features. Creating and editing a CV is free.
                Payment is required when an unpaid CV is downloaded as a PDF.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">2. Accounts</h2>
              <p className="font-medium leading-relaxed">
                Entering and verifying an email login code creates or opens a WerkCV account. You
                are responsible for access to that email address and for the accuracy of the
                information stored in your account.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">3. Prices and payment</h2>
              <ul className="list-disc space-y-1 pl-6 font-medium">
                <li>The current total price is shown before you start checkout</li>
                <li>Individual CV downloads are one-time purchases, not subscriptions</li>
                <li>Prices displayed as tax-inclusive include applicable VAT</li>
                <li>Standard CV checkout is processed by Dodo Payments</li>
                <li>Selected additional products may be processed by Polar</li>
                <li>Available payment methods depend on country, device, and payment provider</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">4. Digital delivery and withdrawal</h2>
              <p className="font-medium leading-relaxed">
                Paid digital content is made available immediately after successful payment. Where
                applicable law permits, you expressly request immediate delivery and acknowledge
                that the statutory withdrawal right may end once delivery begins. This does not
                limit rights that cannot legally be excluded, including remedies for a defective
                or undelivered product.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">5. AI-assisted features</h2>
              <p className="font-medium leading-relaxed">
                AI output is provided as drafting assistance. You must review names, dates,
                qualifications, claims, translations, and vacancy-specific wording before using
                the result. WerkCV does not guarantee that generated wording is complete, correct,
                or suitable for every employer.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">6. Your content</h2>
              <p className="font-medium leading-relaxed">
                You retain ownership of the personal content you enter. You confirm that you may
                upload and process that content. WerkCV templates, software, branding, and original
                website content remain protected by applicable intellectual-property rights.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">7. Responsibility and availability</h2>
              <p className="font-medium leading-relaxed">
                You are responsible for the accuracy and lawful use of your CV. WerkCV does not
                guarantee an interview, job offer, ATS outcome, or uninterrupted availability. We
                will take reasonable steps to restore access or delivery when a paid service fails.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">8. Contact and governing law</h2>
              <p className="font-medium leading-relaxed">
                Questions about payment or delivery can be sent to contact@werkcv.nl. Dutch law
                applies, without removing mandatory consumer protections that apply in your
                country of residence. Disputes are submitted to the competent court under
                applicable law.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer uiLanguage="en" />
    </div>
  );
}
