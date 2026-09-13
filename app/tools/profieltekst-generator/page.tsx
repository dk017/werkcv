import type { Metadata } from "next";
import Link from "next/link";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import ProfieltekstTool from "./ProfieltekstTool";

export const metadata: Metadata = {
    title: "Profieltekst Generator - Schrijf je CV Profiel | WerkCV",
    description: "Genereer een sterke profieltekst voor je CV met AI. Vul je functie en competenties in en krijg direct een professioneel persoonlijk profiel.",
    keywords: [
        "profieltekst generator",
        "cv profiel schrijven",
        "persoonlijk profiel cv",
        "profieltekst cv",
        "cv samenvatting",
        "cv introductie",
    ],
    alternates: { canonical: "/tools/profieltekst-generator", languages: { nl: "/tools/profieltekst-generator", en: "/en/profile-summary-generator" } },
};

export default function ProfieltekstGeneratorPage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "WerkCV profieltekst generator",
                description: "Gratis Nederlandse CV-profieltekst generator met duidelijke controle over de feiten.",
                url: "https://werkcv.nl/tools/profieltekst-generator",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
            }} />
            <main className="wk-page-shell py-10 sm:py-16">
                <section className="rounded-[2rem] border border-[var(--wk-line)] bg-[var(--wk-paper)] p-6 shadow-[var(--wk-shadow-soft)] sm:p-10">
                    <p className="wk-eyebrow">AI-tool — gratis</p>
                    <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Schrijf een profieltekst die meteen duidelijk maakt wat je zoekt.</h1>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">Vul je huidige functie, doelrol en echte sterke punten in. Je krijgt een korte profieltekst voor bovenaan je CV. Controleer alle feiten voordat je hem gebruikt.</p>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">Gebruik geen contactgegevens of vertrouwelijke werkgeversinformatie. De tool helpt met formuleren en verifieert geen identiteit, dienstverband of waarheid.</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-[var(--wk-ink-muted)]">
                        <Link href="/profieltekst-cv-voorbeelden" className="underline underline-offset-4">Bekijk voorbeelden</Link>
                        <Link href="/cv-samenvatting-voorbeelden" className="underline underline-offset-4">CV-samenvattingen</Link>
                        <Link href="/tools/linkedin-naar-cv" className="underline underline-offset-4">LinkedIn naar CV</Link>
                    </div>
                </section>

                <section className="mt-8 max-w-3xl" aria-label="Profieltekst generator">
                    <ProfieltekstTool />
                </section>

                <section className="mt-12 grid gap-5 md:grid-cols-2">
                    <article className="wk-card"><p className="wk-eyebrow">Waar let je op?</p><h2 id="profile-tool-title" className="mt-3 text-2xl font-semibold">Een goede profieltekst is specifiek en eerlijk.</h2><p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">Noem de professionele richting, twee of drie sterke punten en de bijdrage die je kunt onderbouwen. Houd het bij vier of vijf zinnen en pas het aan de vacature aan.</p></article>
                    <article className="wk-card"><p className="wk-eyebrow">Controleer voor gebruik</p><ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[var(--wk-ink-muted)]"><li>Begin niet met “Ik”.</li><li>Controleer elke datum, naam, tool en verantwoordelijkheid.</li><li>Verwijder claims die niet in je eigen CV staan.</li><li>Bekijk het volledige CV en de PDF vóór verzending.</li></ul></article>
                </section>

                <ToolToCvCTA
                    toolName="profieltekst-generator"
                    title="Gebruik deze profieltekst in je CV"
                    description="Plaats je profieltekst in een nette Nederlandse CV-template en controleer het einddocument."
                    primaryLabel="Maak CV met deze profieltekst"
                    primaryHref="/editor?template=professional&startSource=profile_text_generator"
                    secondaryHref="/templates?startSource=profile_text_template_compare"
                    secondaryLabel="Vergelijk templates"
                    intent="cv_content"
                    resultState="profile_text_page_cta"
                />
            </main>
        </>
    );
}
