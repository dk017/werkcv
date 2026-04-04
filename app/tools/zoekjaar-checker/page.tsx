import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import ZoekjaarCheckerTool from "./ZoekjaarCheckerTool";

const faqItems = [
    {
        question: "How long after graduation can I still apply for the Dutch orientation year?",
        answer: "The IND generally requires the application to be filed within 3 years after your graduation, doctorate or qualifying research end date.",
    },
    {
        question: "How long is the orientation year permit valid?",
        answer: "The orientation year residence permit is valid for 1 year and is not extended as another orientation year permit on the same basis.",
    },
    {
        question: "Can I work freely during the orientation year?",
        answer: "Yes. During the orientation year you can work freely in the Netherlands and the employer does not need a separate TWV work permit.",
    },
    {
        question: "Can I use a foreign degree for the orientation year?",
        answer: "Yes, but only if the foreign university meets the IND ranking rules and you can also provide the required Nuffic credential evaluation and accepted language proof.",
    },
];

const orientationCvIntentLinks = [
    {
        href: "/en/dutch-cv-template",
        label: "Use a Dutch CV template",
        description: "Start with a template that fits Dutch recruiters while you prepare orientation-year applications.",
    },
    {
        href: "/en/netherlands-cv-format",
        label: "Review the Netherlands CV format",
        description: "Check the local structure before applying to employers during your search year.",
    },
    {
        href: "/en/guides/translate-resume-to-dutch-format",
        label: "Convert your existing resume",
        description: "Useful if you already have an English CV and need a Dutch-market version quickly.",
    },
    {
        href: "/editor",
        label: "Build your Dutch CV in the editor",
        description: "Turn your route planning into an application-ready CV without leaving WerkCV.",
    },
];

export const metadata: Metadata = {
    title: "Zoekjaar Checker Netherlands 2026 | WerkCV",
    description: "Check whether you still fit the Dutch orientation year (zoekjaar) route in 2026. Covers the IND 3-year window, foreign university rules, research basis and repeat-use limits.",
    keywords: [
        "zoekjaar checker netherlands",
        "orientation year netherlands 2026",
        "orientation year highly educated persons",
        "ind zoekjaar requirements",
        "zoekjaar foreign degree netherlands",
    ],
};

export default function ZoekjaarCheckerPage() {
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
                        { label: "Zoekjaar checker", href: "/tools/zoekjaar-checker" },
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
                            Zoekjaar checker
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Check whether you still fit the Dutch orientation year route after graduation, a PhD or research in the Netherlands. This screen follows the current IND basis rules so you can quickly see whether the 3-year window and documentary conditions still line up.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                ["Application window", "3 years", "from graduation, doctorate or research end date"],
                                ["Permit duration", "1 year", "orientation year permits are not extended"],
                                ["Work access", "Free to work", "no separate TWV work permit needed"],
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
                            <p>The orientation year gives graduates and researchers room to stay and work in the Netherlands for up to a year.</p>
                            <p>It also connects directly to the reduced salary criterion in the highly skilled migrant route if your next work application is filed in time.</p>
                            <p>Most mistakes happen on timing, foreign-degree evidence, or the second-orientation-year rule.</p>
                        </div>
                    </aside>
                </section>

                <section className="mb-12">
                    <ZoekjaarCheckerTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Qualification bases the IND recognises
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Accredited Dutch bachelor or master degrees.</li>
                            <li>Dutch post-master or Master of Advanced Studies routes of at least 10 months.</li>
                            <li>Erasmus Mundus Joint Masters and certain Dutch public-policy study routes.</li>
                            <li>Qualifying Dutch scientific research or a foreign master, post-master or PhD from a designated university.</li>
                        </ul>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            What usually causes a no
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>The 3-year application window has already expired.</li>
                            <li>You already used an orientation year on the same study, doctorate or research basis.</li>
                            <li>A foreign university does not meet the IND top-200 rule on the graduation date.</li>
                            <li>The application lacks Nuffic evaluation, accepted language proof or the correct research-permit basis.</li>
                        </ul>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Best next tools after the zoekjaar check"
                    description="Most expats use the orientation year to compare sponsor routes, salary thresholds and how to localize their CV for Dutch hiring."
                    tools={[
                        {
                            href: "/tools/kennismigrant-salary-checker",
                            title: "Highly skilled migrant salary checker",
                            description: "Check whether the reduced salary criterion could fit your next work route.",
                            badge: "Expat",
                        },
                        {
                            href: "/tools/eu-blue-card-checker",
                            title: "EU Blue Card checker",
                            description: "Compare the orientation year path with the Dutch Blue Card route.",
                            badge: "Expat",
                        },
                        {
                            href: "/tools/job-title-translator",
                            title: "Job title translator NL-EN",
                            description: "Translate your title into recruiter-friendly Dutch or English phrasing.",
                            badge: "Expat",
                        },
                        {
                            href: "/editor",
                            title: "Build your Dutch CV",
                            description: "Turn route planning into an application-ready CV in the editor.",
                            badge: "CV",
                        },
                    ]}
                />

                <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                        CV next step
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                        From orientation-year check to Dutch CV action
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
                        After the zoekjaar check, the practical next step is usually getting your CV aligned with Dutch formatting, wording and recruiter expectations while you still have route flexibility.
                    </p>
                    <SectionIntentLinks links={orientationCvIntentLinks} locale="en" />
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
                            <a href="https://ind.nl/en/residence-permits/work/residence-permit-for-orientation-year-highly-educated-persons" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                IND - Residence permit for orientation year highly educated persons
                            </a>
                        </li>
                        <li>
                            <a href="https://ind.nl/en/required-amounts-income-requirements" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                IND - Required amounts and income requirements
                            </a>
                        </li>
                        <li>
                            <a href="https://ind.nl/en/recognised-sponsor/public-register-educational-institutions" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                IND - Designated foreign educational institutions
                            </a>
                        </li>
                        <li>
                            <a href="https://www.idw.nl/en/credential-evaluation/apply-for-credential-evaluation.html" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                IDW / Nuffic - Apply for credential evaluation
                            </a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}
