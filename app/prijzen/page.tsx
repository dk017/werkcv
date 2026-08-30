import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import {
    consumerCvPricingFactsById,
    formatPricingCheckedAtNl,
    toConsumerCvPricingView,
} from "@/lib/commercial/consumer-cv-pricing";
import { cvDownloadPrice } from "@/lib/site-content";

export const revalidate = 86400;

export const metadata: Metadata = {
    title: `CV maken kosten: ${cvDownloadPrice.display} per PDF, eenmalig betalen | WerkCV`,
    description: `Wat kost een CV maken? Bij WerkCV bouw je gratis en betaal je eenmalig ${cvDownloadPrice.display} bij PDF-download. Geen proefabonnement, maandkosten of automatische verlenging.`,
    keywords: [
        "cv maken kosten",
        "cv maker prijs",
        "cv downloaden prijs",
        "cv maken betaald",
        "cv maken eenmalig betalen",
        "cv betalen per download",
        "cv.nl kosten",
        "goedkoop cv maken",
        "cv builder kosten",
        "professioneel cv prijs",
        "cv pdf kosten",
        "cv zonder abonnement",
        "eenmalig betalen cv",
    ],
    alternates: {
        canonical: "https://werkcv.nl/prijzen",
        languages: {
            "nl": "https://werkcv.nl/prijzen",
            "nl-NL": "https://werkcv.nl/prijzen",
            "en-NL": "https://werkcv.nl/en/pricing",
            "en": "https://werkcv.nl/en/pricing",
            "x-default": "https://werkcv.nl/prijzen",
        },
    },
};

const pricingTrustPoints = [
    "Volledig voorbeeld vóór betaling",
    `Eenmalig ${cvDownloadPrice.display} inclusief btw`,
    "Geen abonnement",
    "Zelfde betaalde CV later opnieuw downloaden",
] as const;

const cvNlPricing = toConsumerCvPricingView(consumerCvPricingFactsById.cv_nl, new Date());

const pricingIntentCards = [
    {
        title: "CV maken betaald zonder maandabonnement",
        body: "Deze zoekterm gaat meestal niet over duur, maar over duidelijk. Mensen willen weten wat een CV kost, wanneer ze betalen en of er daarna nog maandkosten of verlengingen volgen.",
        href: "/goedkoopste-cv-maker-nederland",
        label: "Vergelijk betaalde routes",
    },
    {
        title: "CV betalen per download in plaats van per maand",
        body: "Bij WerkCV zit de betaling op de definitieve PDF-download van het CV dat je wilt versturen. Je start gratis, bouwt je inhoud op, vergelijkt templates en betaalt pas wanneer je die versie echt wilt downloaden.",
        href: "/cv-maken-zonder-abonnement",
        label: "Lees hoe eenmalig betalen werkt",
    },
] as const;

const pricingFaqs = [
    {
        question: "Wat kost WerkCV precies?",
        answer: `Je bouwt en bekijkt je CV gratis. De eerste PDF-download van een afzonderlijk CV kost eenmalig ${cvDownloadPrice.display} inclusief btw. Er ontstaat geen abonnement en er wordt niets automatisch verlengd.`,
    },
    {
        question: `Wat krijg ik voor ${cvDownloadPrice.display}?`,
        answer: "Je krijgt de definitieve PDF van dat CV. Het betaalde CV blijft in je account staan, zodat je later de inhoud, het template en de kleur kunt aanpassen en hetzelfde document opnieuw kunt downloaden zonder opnieuw te betalen.",
    },
    {
        question: "Kan ik eerst het volledige CV bekijken?",
        answer: "Ja. Je kunt de inhoud, pagina-indeling, het template en de accentkleur in de volledige voorbeeldweergave controleren voordat je de betaalstap opent.",
    },
    {
        question: "Wanneer betaal ik opnieuw?",
        answer: "Je betaalt niet opnieuw voor latere wijzigingen en downloads van hetzelfde betaalde CV. Maak je een nieuw CV als afzonderlijk document en wil je daarvan een PDF downloaden, dan geldt daarvoor een nieuwe eenmalige betaling.",
    },
    {
        question: "Welke betaalmethoden krijg ik te zien?",
        answer: "De standaard CV-download wordt afgerekend via Dodo Payments. Voor daarvoor geschikte Nederlandse checkouts is iDEAL beschikbaar. Andere getoonde methoden kunnen verschillen per land, apparaat, bank en betaalprovider.",
    },
    {
        question: "Is een eenmalige CV-download goedkoper dan een abonnement?",
        answer: "Voor iemand die één CV nodig heeft en geen doorlopende carrièresuite zoekt, kan een eenmalige betaling goedkoper zijn dan een proefperiode die maandelijks verlengt. Vergelijk altijd de actuele PDF-prijs, verlengingsvoorwaarden en functies van iedere aanbieder.",
    },
    {
        question: "Kan ik WerkCV volledig gratis gebruiken?",
        answer: `Je kunt gratis bouwen en beoordelen, maar de definitieve WerkCV-PDF is niet gratis: die kost eenmalig ${cvDownloadPrice.display} inclusief btw per afzonderlijk CV. Wie een volledig gratis bestand nodig heeft, kan Word, Google Docs of Europass gebruiken en de opmaak zelf beheren.`,
    },
] as const;

const pricingCardFeatures = [
    "Onbeperkt je CV bewerken",
    "13+ professionele templates",
    "12 kleurthema's per template",
    "ATS-vriendelijk PDF formaat",
    "Direct downloaden na betaling",
    "Later opnieuw downloaden zonder extra betaling",
    "Template en kleur later nog aanpassen",
    "Geen abonnement of verborgen kosten",
    "CV blijft opgeslagen voor later",
] as const;

// Keep this date in sync with the currently advertised price period.
const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "WerkCV - Professioneel CV Downloaden",
    "description": "Maak een professioneel, ATS-vriendelijk CV en download als PDF. Na betaling kun je hetzelfde CV later opnieuw downloaden.",
    "url": "https://werkcv.nl/prijzen",
    "image": [
        "https://werkcv.nl/opengraph-image",
    ],
    "brand": {
        "@type": "Brand",
        "name": "WerkCV.nl",
    },
    "sku": "cv-download",
    "offers": {
        "@type": "Offer",
        "url": "https://werkcv.nl/prijzen",
        "price": cvDownloadPrice.value,
        "priceCurrency": cvDownloadPrice.currency,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": { "@id": "https://werkcv.nl/#organization" },
        "shippingDetails": {
            "@type": "OfferShippingDetails",
            "doesNotShip": true,
        },
        "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "NL",
            "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
            "merchantReturnLink": "https://werkcv.nl/voorwaarden",
        },
    },
};

const pricingBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "WerkCV",
            "item": "https://werkcv.nl/",
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Prijzen",
            "item": "https://werkcv.nl/prijzen",
        },
    ],
};

const comparisonLinks = [
    { href: "/cv-maken-zonder-abonnement", label: "CV zonder abonnement" },
    { href: "/beste-cv-maker-nederland", label: "Beste CV maker NL" },
    { href: "/cv-gids/welke-cv-builder-past-bij-jou-in-nederland", label: "Welke CV builder past bij jou?" },
    { href: "/cv-gids/beste-cv-builder-zonder-abonnement", label: "Beste zonder abonnement" },
    { href: "/cv-gids/werkcv-vs-cvmaker", label: "CVMaker alternatief" },
    { href: "/alternatief-voor-cv-nl", label: "CV.nl alternatief" },
    { href: "/cv-gids/werkcv-vs-cvwizard", label: "WerkCV vs CVwizard" },
    { href: "/cv-nl-opzeggen", label: "CV.nl opzeggen" },
    { href: "/cvmaker-opzeggen", label: "CVMaker opzeggen" },
    { href: "/alternatief-voor-cvster", label: "CVster alternatief" },
    { href: "/cv-gids/werkcv-vs-livecareer", label: "LiveCareer alternatief" },
    { href: "/cvster-opzeggen", label: "CVster opzeggen" },
    { href: "/livecareer-opzeggen", label: "LiveCareer opzeggen" },
    { href: "/cv-gids/werkcv-vs-europass", label: "WerkCV vs Europass" },
    { href: "/cv-gids/werkcv-vs-resumaker", label: "WerkCV vs Resumaker" },
    { href: "/cv-gids/werkcv-vs-maakeencv", label: "WerkCV vs maakeencv.nl" },
    { href: "/cv-gids/canva-vs-cv-builder-voor-sollicitaties", label: "Canva vs CV builder" },
] as const;

export default function PrijzenPage() {
    return (
        <main>
            <FAQJsonLd questions={[...pricingFaqs]} />
            <JsonLd data={pricingBreadcrumbJsonLd} />

            <section className="wk-section wk-pricing-hero">
                <div className="wk-container max-w-4xl text-center">
                    <p className="wk-eyebrow justify-center">Eén duidelijke prijs</p>
                    <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-6xl">
                        Maak en bekijk je CV gratis. Download voor{" "}
                        <span className="wk-hero-highlight">{cvDownloadPrice.display}</span>.
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg md:leading-8">
                        Betaal één keer voor de PDF van dit CV. Geen proefperiode, maandkosten of automatische verlenging.
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <TrackedLandingLink
                            href="/editor?template=professional&startSource=nl_pricing_hero"
                            trackingLocation="prijzen:header_primary"
                            trackingLabel="Maak gratis je cv"
                            className="wk-button wk-button-primary"
                        >
                            Maak gratis je CV
                        </TrackedLandingLink>
                        <Link href="#prijs" className="wk-button wk-button-secondary">
                            Bekijk wat je krijgt
                        </Link>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {pricingTrustPoints.map((point) => (
                            <span key={point} className="wk-trust-pill">{point}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section id="prijs" className="wk-section scroll-mt-24 pt-0">
                <div className="wk-container max-w-2xl">
                    <div className="wk-card relative p-8">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="wk-badge wk-badge-warning">MEEST GEKOZEN</span>
                        </div>

                        <div className="pt-2 text-center">
                            <div className="text-5xl font-semibold text-[var(--wk-ink)]">
                                {cvDownloadPrice.display}
                            </div>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--wk-ink-muted)]">
                                Inclusief btw
                            </p>
                            <p className="mt-2 text-lg font-semibold text-[var(--wk-ink)]">Alleen je CV als PDF</p>
                            <p className="mx-auto mt-2 mb-6 max-w-md text-sm leading-6 text-[var(--wk-ink-muted)]">
                                Dit is de standaardroute: gratis bouwen, pas betalen wanneer je jouw definitieve CV wilt downloaden.
                            </p>

                            <ul className="mb-8 space-y-3 text-left">
                                {pricingCardFeatures.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--wk-success-soft)] text-[var(--wk-success)]">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-sm font-medium leading-6 text-[var(--wk-ink)]">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <TrackedLandingLink
                                href="/editor?template=professional&startSource=nl_pricing_card"
                                trackingLocation="prijzen:pricing_card_primary"
                                trackingLabel="Maak gratis je CV"
                                className="wk-button wk-button-primary w-full text-lg"
                            >
                                Start gratis
                            </TrackedLandingLink>
                            <p className="mt-3 text-xs leading-5 text-[var(--wk-ink-muted)]">
                                Afrekenen gebeurt pas wanneer je jouw PDF wilt downloaden.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container max-w-3xl">
                    <div className="wk-card p-6 md:p-8">
                        <p className="wk-eyebrow">Hoe de prijs werkt</p>
                        <h2 className="mt-3 text-2xl font-semibold text-[var(--wk-ink)] md:text-3xl">
                            Eerst bouwen, alleen betalen voor je definitieve download.
                        </h2>
                        <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--wk-ink-muted)] md:text-base">
                            <p>
                                WerkCV kost {cvDownloadPrice.display} per afzonderlijke CV-download. Je betaalt niet voor het kiezen van je template, het schrijven van je inhoud of het controleren van de volledige preview.
                            </p>
                            <p>
                                Er is geen proefabonnement, maandbedrag of automatische verlenging. Latere wijzigingen en downloads van hetzelfde betaalde CV kosten niets extra.
                            </p>
                            <p>
                                Vergelijk je verschillende prijsmodellen? Lees dan hoe{" "}
                                <Link href="/cv-maken-zonder-abonnement" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                                    eenmalig betalen zich verhoudt tot een abonnement
                                </Link>
                                . Bekijk ook de{" "}
                                <Link href="/goedkoopste-cv-maker-nederland" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                                    actuele kostenvergelijking van CV-makers
                                </Link>{" "}
                                en lees{" "}
                                <Link href="/cv-downloaden-zonder-abonnement" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                                    hoe de PDF-download zonder abonnement werkt
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container max-w-4xl">
                    <div className="wk-card p-6 md:p-8">
                        <div className="wk-eyebrow mb-3">
                            <span>Publieke prijscheck</span>
                        </div>
                        <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                            Zoek je op &quot;cv.nl kosten&quot;?
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)] md:text-base">
                            {cvNlPricing.fresh ? (
                                <>Volgens de officiële prijzenpagina van CV.nl geldt {cvNlPricing.displayedInitialPriceTextNl} en {cvNlPricing.displayedRecurringPriceTextNl?.toLowerCase()}, met automatische verlenging. Gecontroleerd op {formatPricingCheckedAtNl(cvNlPricing.checkedAt)}. WerkCV gebruikt een ander model: gratis starten en {cvDownloadPrice.display} eenmalig per CV-download.</>
                            ) : (
                                <>De actuele CV.nl-prijs kon niet recent genoeg onafhankelijk worden geverifieerd. Open de officiële bron voordat je vergelijkt. WerkCV gebruikt een ander model: gratis starten en {cvDownloadPrice.display} eenmalig per CV-download.</>
                            )}
                        </p>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                                    CV.nl
                                </p>
                                <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    <li>&bull; {cvNlPricing.displayedInitialPriceTextNl || "Actuele prijs niet onafhankelijk geverifieerd"}</li>
                                    <li>&bull; {cvNlPricing.displayedRecurringPriceTextNl || "Controleer de officiële bron"}</li>
                                    <li>&bull; {cvNlPricing.renewalTextNl}</li>
                                </ul>
                            </div>
                            <div className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)] p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-primary)]">
                                    WerkCV
                                </p>
                                <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-[var(--wk-ink)]">
                                    <li>&bull; Gratis starten</li>
                                    <li>&bull; {cvDownloadPrice.display} per CV-download</li>
                                    <li>&bull; Geen abonnement of automatische verlenging</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link href="/alternatief-voor-cv-nl" className="wk-button wk-button-secondary wk-button-small">
                                Vergelijk WerkCV met CV.nl
                            </Link>
                            <a
                                href="https://www.cv.nl/pricing"
                                target="_blank"
                                rel="noreferrer"
                                className="wk-button wk-button-quiet wk-button-small"
                            >
                                Open officiële CV.nl prijzen
                            </a>
                        </div>
                        <p className="mt-4 text-xs leading-5 text-[var(--wk-ink-muted)]">
                            Controleer actuele voorwaarden en prijzen altijd zelf op de officiële pricingpagina van CV.nl.
                        </p>
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container max-w-4xl">
                    <div className="grid gap-6 md:grid-cols-2">
                        {pricingIntentCards.map((card) => (
                            <article key={card.title} className="wk-card p-6">
                                <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{card.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    {card.body}
                                </p>
                                <Link href={card.href} className="wk-button wk-button-secondary wk-button-small mt-5">
                                    {card.label}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-8 text-center text-3xl font-semibold text-[var(--wk-ink)]">Waarom WerkCV.nl?</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="wk-card p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--wk-radius-sm)] bg-[var(--wk-surface-subtle)] text-xl font-semibold text-[var(--wk-ink-muted)]">
                                X
                            </div>
                            <h3 className="mb-2 font-semibold text-[var(--wk-ink)]">Abonnementsbuilders</h3>
                            <ul className="space-y-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                <li>&bull; Vaak een lage proefprijs</li>
                                <li>&bull; Daarna mogelijk een maandbedrag</li>
                                <li>&bull; Verlengingsvoorwaarden controleren</li>
                                <li>&bull; Opzeggen kan nodig zijn</li>
                            </ul>
                        </div>
                        <div className="wk-card wk-card-accent relative p-6">
                            <div className="absolute -top-3 right-4">
                                <span className="wk-badge wk-badge-accent">WerkCV.nl</span>
                            </div>
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--wk-radius-sm)] bg-[var(--wk-surface)] text-xl font-semibold text-[var(--wk-primary)]">
                                &hearts;
                            </div>
                            <h3 className="mb-2 font-semibold text-[var(--wk-ink)]">WerkCV.nl</h3>
                            <ul className="space-y-2 text-sm font-medium leading-6 text-[var(--wk-ink)]">
                                <li>&bull; Eenmalig {cvDownloadPrice.display} per CV</li>
                                <li>&bull; Geen abonnement</li>
                                <li>&bull; Later opnieuw bewerken en downloaden</li>
                                <li>&bull; Eerlijk en transparant</li>
                            </ul>
                        </div>
                        <div className="wk-card p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--wk-radius-sm)] bg-[var(--wk-surface-subtle)] text-xl font-semibold text-[var(--wk-ink-muted)]">
                                ?
                            </div>
                            <h3 className="mb-2 font-semibold text-[var(--wk-ink)]">Zelf doen in Word</h3>
                            <ul className="space-y-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                <li>&bull; Uren bezig met opmaak</li>
                                <li>&bull; Zelf opmaak en paginering bewaken</li>
                                <li>&bull; Volledige ontwerpcontrole</li>
                                <li>&bull; Gratis templates zijn beschikbaar</li>
                            </ul>
                        </div>
                    </div>
                    <div className="wk-card mt-6 p-5">
                        <p className="wk-eyebrow mb-2">
                            <span>Vergelijking</span>
                        </p>
                        <p className="text-sm leading-7 text-[var(--wk-ink-muted)] md:text-base">
                            Twijfel je tussen een eenmalige CV-builder en een abonnementsplatform? Bekijk dan onze eerlijke vergelijkingen:
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {comparisonLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="wk-button wk-button-secondary wk-button-small"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container max-w-3xl">
                    <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-8 text-center md:p-10">
                        <h2 className="text-3xl font-semibold text-[var(--wk-primary-contrast)]">
                            Maak en bekijk eerst je volledige CV.
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl leading-7 text-[var(--wk-primary-contrast)]/80">
                            Betaal pas {cvDownloadPrice.display} inclusief btw wanneer je de definitieve PDF wilt downloaden. Geen abonnement.
                        </p>
                        <TrackedLandingLink
                            href="/editor?template=professional&startSource=nl_pricing_bottom"
                            trackingLocation="prijzen:bottom_primary"
                            trackingLabel="Maak je CV gratis"
                            className="wk-button wk-button-accent mt-6"
                        >
                            Maak je CV gratis
                        </TrackedLandingLink>
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-8 text-center text-3xl font-semibold text-[var(--wk-ink)]">Veelgestelde vragen over prijzen</h2>
                    <div className="mx-auto max-w-2xl space-y-4">
                        {pricingFaqs.map((faq) => (
                            <details key={faq.question} className="wk-card group">
                                <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-[var(--wk-ink)]">
                                    {faq.question}
                                    <span className="ml-2 text-xl text-[var(--wk-ink-muted)] transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="border-t border-[var(--wk-border)] px-4 pb-4 pt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* JSON-LD Product Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productJsonLd),
                }}
            />

            <Footer variant="brand" />
            <MobileStickyCta
                text={`Volledig voorbeeld gratis · PDF ${cvDownloadPrice.display}`}
                buttonLabel="Start gratis"
                href="/editor?template=professional&startSource=nl_pricing_sticky"
                trackingLocation="prijzen:sticky_primary"
                trackingLabel="Start gratis"
                variant="brand"
            />
        </main>
    );
}
