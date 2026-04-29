import Image from "next/image";
import Link from "next/link";

const mainLinks = [
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

const featuredBadges = [
    {
        href: "https://www.betterlaunch.co",
        src: "https://www.betterlaunch.co/badge-dark.svg",
        alt: "Featured on Better Launch",
        width: 170,
        height: 46,
    },
    {
        href: "https://www.scrolllaunch.com/products/werkcv?utm_source=badge&utm_medium=embed&utm_campaign=werkcv&ref=scrolllaunch",
        src: "https://www.scrolllaunch.com/api/badge/werkcv",
        alt: "Featured on ScrollLaunch",
        width: 170,
        height: 37,
    },
    {
        href: "https://neeed.directory/products/werkcv?utm_source=werkcv",
        src: "https://neeed.directory/badges/neeed-badge-light.svg",
        alt: "Featured on neeed.directory",
        width: 139,
        height: 40,
        padded: true,
    },
    {
        href: "https://wired.business",
        src: "https://wired.business/badge0-dark.svg",
        alt: "Featured on Wired Business",
        width: 170,
        height: 46,
    },
    {
        href: "https://postyourstartup.co/startup/werkcv?ref=badge",
        src: "https://postyourstartup.co/api/badge/werkcv?theme=dark",
        alt: "Featured on PostYourStartup",
        width: 170,
        height: 44,
    },
    {
        href: "https://dang.ai/",
        src: "https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png",
        alt: "Dang.ai",
        width: 150,
        height: 54,
    },
];

export default function Footer() {
    return (
        <footer className="relative z-10 border-t-4 border-black bg-white mt-20">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_1.1fr_1fr_1fr] gap-8">
                    <div>
                        <Link href="/" className="inline-block font-black text-xl tracking-tight text-black mb-3">
                            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
                        </Link>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            CV-builder, sollicitatiehulp en praktische tools voor werken in Nederland.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                            Navigatie
                        </p>
                        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-black">
                            {mainLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-yellow-600 transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                            Populaire tools
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-black">
                            {toolLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-teal-700 transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                            Populaire CV Pagina&apos;s
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-black">
                            {cvIntentLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-yellow-600 transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t-2 border-gray-200 pt-5">
                    <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                        Ook genoemd op
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {featuredBadges.map((badge) => (
                            <a
                                key={badge.href}
                                href={badge.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex overflow-hidden rounded-md border-2 border-black bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 ${badge.padded ? "items-center p-2" : ""}`}
                            >
                                <Image
                                    src={badge.src}
                                    alt={badge.alt}
                                    width={badge.width}
                                    height={badge.height}
                                    className={`block h-auto ${badge.width === 139 ? "w-[139px]" : badge.width === 150 ? "w-[150px]" : "w-[170px]"}`}
                                    unoptimized
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-600 text-center md:text-left">
                        &copy; {new Date().getFullYear()} WerkCV.nl | Maak een professioneel CV dat opvalt
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-black">
                        {legalLinks.map((link) => (
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
