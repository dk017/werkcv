import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";

export const metadata: Metadata = {
  title: "Privacy Policy | WerkCV",
  description:
    "How WerkCV processes CV data, uploaded files, payments, AI requests, analytics data, and privacy requests.",
  alternates: {
    canonical: "https://werkcv.nl/en/privacy",
    languages: getLanguageAlternates("/en/privacy") ?? undefined,
  },
};

export default function EnglishPrivacyPage() {
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
          <h1 className="mb-2 text-3xl font-black text-black">Privacy Policy</h1>
          <p className="mb-8 text-sm font-medium text-gray-500">Last updated: July 2026</p>

          <div className="max-w-none space-y-6 text-black">
            <section>
              <h2 className="mb-2 text-lg font-black">1. About WerkCV</h2>
              <p className="font-medium leading-relaxed">
                WerkCV is an online CV builder, application tool, and career-resource website for
                people applying for jobs in the Netherlands. Privacy questions and requests can be
                sent to contact@werkcv.nl.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">2. Data we process</h2>
              <ul className="list-disc space-y-1 pl-6 font-medium">
                <li>Account and contact details, including your email address</li>
                <li>Personal details and content entered in a CV or cover letter</li>
                <li>Files and images you upload for CV or profile-photo features</li>
                <li>Payment, order, invoice, and entitlement information</li>
                <li>Pages visited, browser, device type, referral source, and product interactions</li>
                <li>Support messages and privacy requests you send to us</li>
              </ul>
              <p className="mt-2 font-medium leading-relaxed">
                Standard CV downloads are paid through Dodo Payments. Polar may be used for
                selected additional products. WerkCV does not store full card numbers or bank
                account credentials.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">3. Why we use this data</h2>
              <ul className="list-disc space-y-1 pl-6 font-medium">
                <li>Create, save, edit, and export your CV</li>
                <li>Process payments and provide paid download access</li>
                <li>Run AI features you actively request, such as import, analysis, or rewriting</li>
                <li>Send login codes, service messages, and support replies</li>
                <li>Measure reliability and improve the website and editor</li>
                <li>Prevent abuse, investigate errors, and protect the service</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">4. Legal bases</h2>
              <p className="font-medium leading-relaxed">
                Account, CV, AI, and payment processing is necessary to provide the service you
                request or perform our agreement with you. Security, limited internal analytics,
                and error investigation may rely on our legitimate interests. Consent is the legal
                basis for external analytics where applicable rules or technical impact require it.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">5. Storage and analytics</h2>
              <p className="font-medium leading-relaxed">
                WerkCV uses functional storage for login, sessions, language, attribution, and
                progress. We also use first-party product analytics. Google Analytics and Microsoft
                Clarity may process technical usage data and online identifiers for statistics and
                product improvement. CV content is not included in WerkCV analytics events and is
                not used for personalised advertising.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">6. Service providers</h2>
              <ul className="list-disc space-y-1 pl-6 font-medium">
                <li><strong>Dodo Payments</strong> - standard CV checkout, tax handling, and invoicing</li>
                <li><strong>Polar</strong> - payments for selected additional products</li>
                <li><strong>OpenAI</strong> - AI features you choose to run</li>
                <li><strong>Hetzner</strong> - EU hosting and storage</li>
                <li><strong>Google Analytics</strong> - website and usage statistics</li>
                <li><strong>Microsoft Clarity</strong> - aggregated usage and UX analysis</li>
                <li><strong>Email service provider</strong> - login codes, service email, and support</li>
              </ul>
              <p className="mt-2 font-medium leading-relaxed">
                We share only the data needed for the relevant function and never sell personal
                data. Some providers may process data outside the European Economic Area. We use
                the safeguards and contractual arrangements available and required for each
                provider.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">7. Retention</h2>
              <p className="font-medium leading-relaxed">
                CV data is kept while your account is active or while needed to provide the
                service. Payment and invoice records are retained for applicable accounting and
                tax periods. Technical and analytics data is not kept longer than needed for
                product analysis, security, and error investigation.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-black">8. Your rights</h2>
              <p className="font-medium leading-relaxed">
                Subject to applicable law, you may request access, correction, deletion,
                restriction, objection, or data portability. Contact contact@werkcv.nl. We may ask
                you to verify control of the email address before acting on a request. You may also
                complain to the Dutch Data Protection Authority.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer uiLanguage="en" />
    </div>
  );
}
