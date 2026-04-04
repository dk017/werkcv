import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import KennismigrantSalaryTool from "./KennismigrantSalaryTool";

const faqItems = [
    {
        question: "What is the highly skilled migrant salary threshold in the Netherlands in 2026?",
        answer: "From January 1, 2026 up to and including June 30, 2026, the IND thresholds are EUR 5,942 gross per month for applicants aged 30 or over, EUR 4,357 for applicants under 30, and EUR 3,122 for the reduced salary criterion.",
    },
    {
        question: "Does holiday allowance count toward the threshold?",
        answer: "No. The IND salary thresholds are checked excluding the standard 8% holiday allowance.",
    },
    {
        question: "Do I need a recognised sponsor for the highly skilled migrant route?",
        answer: "Usually yes. The employer normally needs to be a recognised sponsor with the IND for the highly skilled migrant route.",
    },
    {
        question: "Does this tool give legal approval?",
        answer: "No. It is a quick eligibility screen for salary and sponsor status. IND still assesses the full route, documents, market-conform salary and the exact basis for any reduced threshold.",
    },
];

const migrationCvIntentLinks = [
    {
        href: "/en/dutch-cv-template",
        label: "Use a Dutch CV template",
        description: "Move from salary eligibility to a CV that matches Dutch hiring expectations.",
    },
    {
        href: "/en/netherlands-cv-format",
        label: "Check the Netherlands CV format",
        description: "See what Dutch recruiters expect before you start applying.",
    },
    {
        href: "/en/guides/translate-resume-to-dutch-format",
        label: "Convert your current resume",
        description: "Useful if you already have a CV but need a Dutch-ready structure.",
    },
    {
        href: "/editor",
        label: "Start your Dutch CV in the editor",
        description: "Turn the visa-route check into an application-ready CV without leaving the flow.",
    },
];

export const metadata: Metadata = {
    title: "Highly Skilled Migrant Salary Checker Netherlands 2026 | WerkCV",
    description: "Check the IND 2026 salary thresholds for the Dutch highly skilled migrant route. Includes under-30, 30+ and reduced salary criterion checks.",
    keywords: [
        "highly skilled migrant salary 2026",
        "kennismigrant salary check netherlands",
        "IND salary threshold 2026",
        "recognized sponsor netherlands",
        "highly skilled migrant netherlands salary",
    ],
};

export default function KennismigrantSalaryCheckerPage() {
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
                        { label: "Highly skilled migrant salary checker", href: "/tools/kennismigrant-salary-checker" },
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
                            Highly skilled migrant salary checker
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Use this tool to quickly check whether your Dutch job offer is broadly aligned with the current IND salary thresholds for the highly skilled migrant route. It is built for expats comparing offers, sponsors and visa paths in the Netherlands.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                ["30+ threshold", "EUR 5,942", "gross per month excl. holiday allowance"],
                                ["Under-30 threshold", "EUR 4,357", "gross per month excl. holiday allowance"],
                                ["Reduced criterion", "EUR 3,122", "for qualifying recent-graduate routes"],
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
                            What this solves
                        </p>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p>It turns IND tables into a direct go or no-go salary screen.</p>
                            <p>It shows the difference between normal and reduced salary routes.</p>
                            <p>It reminds you that salary alone is not enough; sponsor status still matters.</p>
                        </div>
                    </aside>
                </section>

                <section className="mb-12">
                    <KennismigrantSalaryTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Core checks beyond salary
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Your employer normally needs to be a recognised sponsor.</li>
                            <li>Your salary must meet the threshold excluding holiday allowance.</li>
                            <li>The reduced criterion only applies to specific routes such as orientation year graduates.</li>
                            <li>The salary still needs to be market-conform for the role.</li>
                        </ul>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            When this is useful
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>You are comparing multiple Dutch offers.</li>
                            <li>You want to know whether a sponsor discussion is worth pursuing.</li>
                            <li>You are deciding between the highly skilled migrant route and the EU Blue Card route.</li>
                            <li>You are updating your CV and job title for Dutch applications.</li>
                        </ul>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Best next tools for expats applying in the Netherlands"
                    description="Salary eligibility is only one part of the move. The next questions are usually route comparison, Dutch job title fit and how to shape your CV for the local market."
                    tools={[
                        {
                            href: "/tools/zoekjaar-checker",
                            title: "Zoekjaar checker",
                            description: "Check whether you still fit the orientation year route behind the reduced salary criterion.",
                            badge: "Expat",
                        },
                        {
                            href: "/tools/eu-blue-card-checker",
                            title: "EU Blue Card checker",
                            description: "Compare the Blue Card route with the highly skilled migrant route using current 2026 thresholds.",
                            badge: "Expat",
                        },
                        {
                            href: "/tools/job-title-translator",
                            title: "Job title translator NL-EN",
                            description: "Translate your current title into a recruiter-friendly Dutch or English version.",
                            badge: "Expat",
                        },
                        {
                            href: "/editor",
                            title: "Build your CV",
                            description: "Turn the route check into an application-ready CV in the editor.",
                            badge: "CV",
                        },
                    ]}
                />

                <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                        CV next step
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                        From salary route to Dutch CV preparation
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
                        Once the salary route looks viable, the next bottleneck is usually a Netherlands-ready CV, not the threshold itself. Use these pages to move straight into the right format and template.
                    </p>
                    <SectionIntentLinks links={migrationCvIntentLinks} locale="en" />
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
                            <a href="https://ind.nl/en/residence-permits/work/highly-skilled-migrant" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                IND - Highly skilled migrant
                            </a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}
