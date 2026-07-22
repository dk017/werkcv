import Link from "next/link";
import type { UiLanguage } from "@/lib/ui-language";

const mainLinks = [
    { href: "/cv-maken", label: "CV maken" },
    { href: "/templates", label: "Templates" },
    { href: "/cv-voorbeelden", label: "CV Voorbeelden" },
    { href: "/cv-tips", label: "CV Tips" },
    { href: "/tools", label: "Gratis Tools" },
    { href: "/cv-gids", label: "CV Gidsen" },
    { href: "/agency", label: "Agency" },
    { href: "/partners", label: "Partners" },
    { href: "/for-coaches", label: "Voor Coaches" },
    { href: "/en", label: "English Guides" },
    { href: "/en/guides", label: "Expat Guides" },
    { href: "/prijzen", label: "Prijzen" },
    { href: "/faq", label: "FAQ" },
    { href: "/over-ons", label: "Over Ons" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

const toolLinks = [
    { href: "/tools/netto-bruto-calculator", label: "Netto-bruto" },
    { href: "/tools/salaris-calculator", label: "Salaris check" },
    { href: "/salaris", label: "Salaris per beroep" },
    { href: "/tools/transitievergoeding-berekenen", label: "Transitievergoeding" },
    { href: "/tools/vakantiegeld-berekenen", label: "Vakantiegeld" },
    { href: "/tools/uurloon-calculator", label: "Uurloon" },
    { href: "/tools/minimumloon-checker", label: "Minimumloon" },
    { href: "/tools/ww-recht-checker", label: "WW-recht" },
    { href: "/tools/cv-samenvatting-generator", label: "CV samenvatting" },
];

const cvIntentLinks = [
    { href: "/cv-maken-zonder-abonnement", label: "CV maken zonder abonnement" },
    { href: "/gratis-cv-maken", label: "Gratis CV maken" },
    { href: "/cv-aanmaken", label: "CV aanmaken" },
    { href: "/cv-maken-template", label: "CV maken template" },
    { href: "/cv-maken-student", label: "CV maken student" },
    { href: "/stage-cv-maken", label: "Stage CV maken" },
    { href: "/cv-maken-16-jarige", label: "CV maken 16-jarige" },
    { href: "/cv-maken-pdf", label: "CV maken PDF" },
    { href: "/cv-maken-in-word", label: "CV maken in Word" },
];

const legalLinks = [
    { href: "/privacy", label: "Privacybeleid" },
    { href: "/voorwaarden", label: "Algemene Voorwaarden" },
];

const englishMainLinks = [
    { href: "/en/templates", label: "CV Templates" },
    { href: "/en/dutch-cv-examples", label: "CV Examples" },
    { href: "/en/guides", label: "Netherlands CV Guides" },
    { href: "/en/resume-optimizer-netherlands", label: "Resume Optimizer" },
    { href: "/en/profile-photo", label: "Profile Photo" },
    { href: "/en/motivation-letter-netherlands", label: "Motivation Letter" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

const englishToolLinks = [
    { href: "/tools/kennismigrant-salary-checker", label: "Highly Skilled Migrant Salary" },
    { href: "/tools/zoekjaar-checker", label: "Orientation Year Checker" },
    { href: "/tools/eu-blue-card-checker", label: "EU Blue Card Checker" },
    { href: "/tools/netto-bruto-calculator", label: "Net to Gross Calculator" },
];

const englishCvLinks = [
    { href: "/en", label: "Build a Netherlands CV" },
    { href: "/en/dutch-cv-template", label: "Dutch CV Template in English" },
    { href: "/en/guides/cv-format-netherlands-english", label: "Netherlands CV Format" },
    { href: "/en/cv-netherlands-without-dutch-language", label: "CV Without Dutch" },
    { href: "/en/expat-cv-netherlands", label: "Expat CV Guide" },
];

const englishLegalLinks = [
    { href: "/en/privacy", label: "Privacy" },
    { href: "/en/terms", label: "Terms" },
];

export default function Footer({ uiLanguage = "nl" }: { uiLanguage?: UiLanguage }) {
    const isEnglish = uiLanguage === "en";
    const navigationLinks = isEnglish ? englishMainLinks : mainLinks;
    const popularToolLinks = isEnglish ? englishToolLinks : toolLinks;
    const popularCvLinks = isEnglish ? englishCvLinks : cvIntentLinks;
    const footerLegalLinks = isEnglish ? englishLegalLinks : legalLinks;

    return (
        <footer className="relative z-10 border-t-4 border-black bg-white mt-20">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_1.1fr_1fr_1fr] gap-8">
                    <div>
                        <Link href={isEnglish ? "/en" : "/"} className="inline-block font-black text-xl tracking-tight text-black mb-3">
                            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
                        </Link>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {isEnglish
                                ? "English CV guidance, templates, and practical tools for working in the Netherlands."
                                : "CV-builder, sollicitatiehulp en praktische tools voor werken in Nederland."}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                            {isEnglish ? "Navigation" : "Navigatie"}
                        </p>
                        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-black">
                            {navigationLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-yellow-600 transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                            {isEnglish ? "Popular tools" : "Populaire tools"}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-black">
                            {popularToolLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-teal-700 transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                            {isEnglish ? "Popular CV pages" : "Populaire CV Pagina's"}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-black">
                            {popularCvLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-yellow-600 transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-600 text-center md:text-left">
                        &copy; {new Date().getFullYear()} WerkCV.nl | {isEnglish
                            ? "Build a professional CV for jobs in the Netherlands"
                            : "Maak een professioneel CV dat opvalt"}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-black">
                        {footerLegalLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-yellow-600 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
