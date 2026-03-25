import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import EUBlueCardTool from "./EUBlueCardTool";

const faqItems = [
    {
        question: "What is the EU Blue Card salary threshold in the Netherlands in 2026?",
        answer: "From January 1, 2026 up to and including June 30, 2026, the standard Dutch EU Blue Card threshold is EUR 5,942 gross per month excluding holiday allowance. A reduced threshold of EUR 4,754 applies to qualifying recent graduates.",
    },
    {
        question: "How long must the contract be for an EU Blue Card?",
        answer: "The employment contract usually needs to be valid for at least 6 months.",
    },
    {
        question: "Do I need a recognised sponsor for the EU Blue Card route?",
        answer: "No. Unlike the highly skilled migrant route, the Dutch EU Blue Card route does not require the employer to be a recognised sponsor.",
    },
    {
        question: "Can work experience replace a diploma?",
        answer: "In some cases, yes. The route can involve either a higher education diploma or sufficiently strong relevant work experience, depending on the role and route conditions.",
    },
];

const blueCardCvIntentLinks = [
  {
    href: "/en/dutch-cv-template",
    label: "Use a Dutch CV template",
    description: "Move from route comparison to a template that fits Dutch recruiter expectations.",
  },
  {
    href: "/en/netherlands-cv-format",
    label: "Review the Netherlands CV format",
    description: "Check the local structure before you send applications under the Blue Card route.",
  },
  {
    href: "/en/guides/translate-resume-to-dutch-format",
    label: "Convert your current resume",
    description: "Useful if you already have a CV but need a Dutch-ready structure fast.",
  },
  {
    href: "/editor",
    label: "Build your Dutch CV in the editor",
    description: "Turn the Blue Card route check into an application-ready CV without leaving WerkCV.",
  },
];

export const metadata: Metadata = {
    title: "EU Blue Card Checker Netherlands 2026 | WerkCV.nl",
    description: "Check whether a Dutch job offer broadly fits the EU Blue Card route in 2026. Includes current salary threshold, 6-month contract rule and qualification check.",
    keywords: [
        "eu blue card netherlands 2026",
        "eu blue card salary netherlands",
        "blue card checker netherlands",
        "ind eu blue card salary threshold",
        "expat netherlands blue card",
    ],
};

export default function EUBlueCardCheckerPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <FAQJsonLd questions={faqItems} />

            <header className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-black text-2xl tracking-tight text-black">
                            Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
                        </span>
                    </Link>
                    <Link href="/tools" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                        ← All tools
                    </Link>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Tools", href: "/tools" },
                        { label: "EU Blue Card checker", href: "/tools/eu-blue-card-checker" },
                    ]} />
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-black uppercase tracking-wide bg-violet-100 text-violet-800 px-3 py-1 border border-violet-300 rounded-full">
                                Expat
                            </span>
                            <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                                Updated March 11, 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            EU Blue Card checker
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Compare your Dutch offer against the current EU Blue Card rules without digging through immigration tables. This checker is built for expats who want a fast route comparison before they commit to a move or application strategy.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                ["Standard threshold", "EUR 5,942", "gross per month excl. holiday allowance"],
                                ["Reduced threshold", "EUR 4,754", "for qualifying recent graduates"],
                                ["Contract rule", "At least 6 months", "shorter contracts usually fail"],
                            ].map(([label, value, note]) => (
                                <div key={label} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">{label}</p>
                                    <p className="text-lg font-black text-slate-900">{value}</p>
                                    <p className="text-xs text-slate-500 mt-1">{note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            Why this route matters
                        </p>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p>The EU Blue Card can be a strong alternative to the highly skilled migrant route.</p>
                            <p>It does not depend on a recognised sponsor, which changes how you assess employers.</p>
                            <p>That makes route comparison valuable before you rewrite your CV and start applying.</p>
                        </div>
                    </aside>
                </section>

                <section className="mb-12">
                    <EUBlueCardTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Main route checks
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Salary threshold must be met excluding holiday allowance.</li>
                            <li>The contract usually needs to be valid for at least 6 months.</li>
                            <li>The role must be highly qualified and linked to your background.</li>
                            <li>You normally need a diploma or qualifying work experience.</li>
                        </ul>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Why expats compare this to the kennismigrant route
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>The salary threshold can differ by route and date band.</li>
                            <li>The employer does not need recognised sponsor status for the Blue Card route.</li>
                            <li>The best route depends on your age, salary, background and employer profile.</li>
                            <li>Your CV still needs to fit Dutch expectations whichever route you choose.</li>
                        </ul>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Best next steps after the Blue Card check"
                    description="Use the immigration route check together with CV localization and title matching so your application works in the Dutch market, not just on paper."
                    tools={[
                        {
                            href: "/tools/kennismigrant-salary-checker",
                            title: "Highly skilled migrant salary checker",
                            description: "Compare the Blue Card route with the standard sponsor-based route.",
                            badge: "Expat",
                        },
                        {
                            href: "/tools/zoekjaar-checker",
                            title: "Zoekjaar checker",
                            description: "Check whether the orientation year route is still open after graduation or research.",
                            badge: "Expat",
                        },
                        {
                            href: "/tools/job-title-translator",
                            title: "Job title translator NL-EN",
                            description: "Localize your job title for Dutch vacancies and recruiter search.",
                            badge: "Expat",
                        },
                        {
                            href: "/editor",
                            title: "Build your Dutch CV",
                            description: "Move straight from route planning to an editable CV.",
                            badge: "CV",
                        },
                    ]}
                />

                <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            CV next step
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            From Blue Card route to Dutch CV preparation
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Once the route looks viable, the next bottleneck is usually not immigration paperwork but a CV that fits Dutch formatting, wording and recruiter expectations.
          </p>
          <SectionIntentLinks links={blueCardCvIntentLinks} locale="en" />
        </section>

        <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Frequently asked questions
                        </h2>
                    </div>
                    <div className="bg-white border-2 border-black divide-y divide-slate-200">
                        {faqItems.map((item) => (
                            <div key={item.question} className="p-5">
                                <h3 className="font-black text-slate-900 mb-2">{item.question}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-slate-50 border-2 border-slate-200 p-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                        Sources
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li>
                            <a href="https://ind.nl/en/required-amounts-income-requirements" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                IND - Required amounts and income requirements
                            </a>
                        </li>
                        <li>
                            <a href="https://ind.nl/en/residence-permits/work/european-blue-card" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                IND - European Blue Card
                            </a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}
