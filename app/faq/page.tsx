import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { productFaqGroups, productFaqItems } from "@/lib/product-faq";
import {
    cvDownloadPrice,
    siteAggregateRating,
    siteName,
    siteUrl,
} from "@/lib/site-content";

const pageUrl = `${siteUrl}/faq`;

export const metadata: Metadata = {
    title: "WerkCV FAQ: account, upload, betaling en privacy",
    description: `Feitelijke antwoorden over WerkCV: e-mailcode, CV-upload, automatisch opslaan, eenmalig ${cvDownloadPrice.display} betalen, PDF-download, privacy en ondersteuning.`,
    keywords: [
        "cv maken vragen",
        "cv builder faq",
        "cv downloaden hulp",
        "ATS cv uitleg",
        "cv template vragen",
        "werkcv hulp",
    ],
    alternates: {
        canonical: pageUrl,
    },
};

const comparisonGuides = [
    {
        href: "/cv-gids/welke-cv-builder-past-bij-jou-in-nederland",
        title: "Welke CV builder past bij jou?",
        body: "Gebruik deze keuzehulp als je niet alleen vragen hebt over WerkCV, maar ook wilt vergelijken met andere CV-tools.",
    },
    {
        href: "/cv-gids/beste-cv-builder-zonder-abonnement",
        title: "Beste CV builder zonder abonnement",
        body: "Handig als je vooral prijsmodel, eenmalig betalen en abonnementsverschillen wilt afwegen.",
    },
    {
        href: "/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures",
        title: "ATS-vriendelijke CV builder",
        body: "Voor als je wilt begrijpen wat ATS-vriendelijk echt betekent zonder in marketingtaal te blijven hangen.",
    },
    {
        href: "/cv-gids/canva-vs-cv-builder-voor-sollicitaties",
        title: "Canva vs CV builder",
        body: "Gebruik deze gids als je twijfelt tussen een designtool en een rustiger sollicitatiedocument.",
    },
    {
        href: "/cv-nl-opzeggen",
        title: "CV.nl opzeggen",
        body: "Handig als je juist zoekt naar een abonnements-exit en daarna een alternatief zonder maandelijkse verlenging wilt vergelijken.",
    },
    {
        href: "/cvmaker-opzeggen",
        title: "CVMaker opzeggen",
        body: "Gebruik deze pagina als je CVMaker wilt stoppen en daarna een eenvoudiger prijsmodel wilt afwegen.",
    },
    {
        href: "/cvster-opzeggen",
        title: "CVster opzeggen",
        body: "Handig als je uit een proef- of premiummodel wilt stappen en daarna zonder abonnement wilt vergelijken.",
    },
    {
        href: "/cv-gids/werkcv-vs-cvwizard",
        title: "WerkCV vs CVwizard",
        body: "Vergelijk een compacte builder zonder abonnement met een groter sollicitatieplatform met briefbuilder en vacatures.",
    },
    {
        href: "/cv-gids/werkcv-vs-europass",
        title: "WerkCV vs Europass",
        body: "Handig als je twijfelt tussen een Nederlandse builderflow en een gratis Europees standaardprofiel.",
    },
];

export default function FAQPage() {
    const softwareApplicationJsonLd = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: siteName,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: siteUrl,
            inLanguage: "nl-NL",
            offers: {
                "@type": "Offer",
                price: cvDownloadPrice.value,
                priceCurrency: cvDownloadPrice.currency,
                availability: "https://schema.org/InStock",
                url: `${siteUrl}/prijzen`,
            },
            ...(siteAggregateRating ? {
                aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: siteAggregateRating.ratingValue,
                reviewCount: siteAggregateRating.reviewCount,
                bestRating: siteAggregateRating.bestRating ?? 5,
                worstRating: siteAggregateRating.worstRating ?? 1,
                },
            } : {}),
        };

    return (
        <div className="min-h-screen bg-[#FFFEF0]">
            {/* Header */}
            <header className="relative z-10 border-b-4 border-black bg-white">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-black text-2xl tracking-tight text-black">
                            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
                        </span>
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-bold text-black bg-yellow-400 px-3 py-1 border-2 border-black hover:bg-yellow-300 transition-colors"
                    >
                        CV Maken
                    </Link>
                </div>
            </header>

            <FAQJsonLd
                questions={productFaqItems.map((item) => ({
                    question: item.question,
                    answer: item.answer,
                }))}
            />

            <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                        WerkCV helpcentrum
                    </p>
                    <h1 className="mt-3 text-4xl font-black text-black">Veelgestelde vragen</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-700">
                        Duidelijke antwoorden over inloggen, uploaden, opslaan, betalen,
                        downloaden en privacy. Voor algemeen CV-advies verwijzen we naar de
                        inhoudelijke gids die het onderwerp volledig behandelt.
                    </p>
                </div>

                <nav aria-label="FAQ-categorieën" className="mb-12 flex flex-wrap justify-center gap-2">
                    {productFaqGroups.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className="border-2 border-black bg-white px-3 py-2 text-sm font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-200"
                        >
                            {section.title}
                        </a>
                    ))}
                </nav>

                <div className="space-y-10">
                    {productFaqGroups.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <h2 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                                <span className="bg-yellow-400 px-2 py-1 border-2 border-black -rotate-1">
                                    {section.title}
                                </span>
                            </h2>
                            <p className="mb-5 text-sm font-medium leading-relaxed text-slate-600">
                                {section.description}
                            </p>
                            <div className="space-y-3">
                                {section.questions.map((faq) => (
                                    <details key={faq.id} className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
                                        <summary className="p-4 font-black text-black cursor-pointer flex items-center justify-between text-sm sm:text-base">
                                            <span className="pr-4">{faq.question}</span>
                                            <span className="text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                        </summary>
                                        <div className="border-t-2 border-black px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-gray-700">
                                            <p>{faq.answer}</p>
                                            {faq.href && faq.linkLabel ? (
                                                <Link
                                                    href={faq.href}
                                                    className="mt-3 inline-flex font-black text-emerald-800 underline decoration-2 underline-offset-4 hover:text-emerald-950"
                                                >
                                                    {faq.linkLabel}
                                                </Link>
                                            ) : null}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <section className="mt-14">
                    <h2 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                        <span className="bg-yellow-400 px-2 py-1 border-2 border-black -rotate-1">
                            Vergelijkingsgidsen
                        </span>
                    </h2>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed mb-5">
                        Nog aan het twijfelen tussen WerkCV en andere routes? Gebruik deze pagina&apos;s als je keuze eerder gaat over tooltype, prijsmodel of ATS-aanpak dan over een losse productvraag.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                        {comparisonGuides.map((guide) => (
                            <Link
                                key={guide.href}
                                href={guide.href}
                                className="block bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 transition-colors"
                            >
                                <p className="text-sm font-black text-black">{guide.title}</p>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-gray-700">{guide.body}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-yellow-400 border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-black mb-3">Nog vragen?</h2>
                        <p className="font-medium text-black mb-6">
                            Werkt iets technisch niet of staat je productvraag er niet tussen?
                            Stuur ons dan een kort bericht.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                className="inline-block border-4 border-black bg-white px-8 py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-colors hover:bg-yellow-100"
                            >
                                Contact opnemen
                            </Link>
                            <Link
                                href="/templates"
                                className="inline-block border-4 border-black bg-black px-8 py-3 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-colors hover:bg-gray-800"
                            >
                                Bekijk templates
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
            />

            <Footer />
        </div>
    );
}

