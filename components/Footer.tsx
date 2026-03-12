import Link from "next/link";

const mainLinks = [
    { href: "/templates", label: "Templates" },
    { href: "/cv-voorbeelden", label: "CV Voorbeelden" },
    { href: "/cv-tips", label: "CV Tips" },
    { href: "/tools", label: "Gratis Tools" },
    { href: "/cv-gids", label: "CV Gidsen" },
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
    { href: "/tools/transitievergoeding-berekenen", label: "Transitievergoeding" },
    { href: "/tools/vakantiegeld-berekenen", label: "Vakantiegeld" },
    { href: "/tools/uurloon-calculator", label: "Uurloon" },
    { href: "/tools/minimumloon-checker", label: "Minimumloon" },
    { href: "/tools/ww-recht-checker", label: "WW-recht" },
    { href: "/tools/zoekjaar-checker", label: "Zoekjaar" },
    { href: "/tools/cv-samenvatting-generator", label: "CV samenvatting" },
];

const legalLinks = [
    { href: "/privacy", label: "Privacybeleid" },
    { href: "/voorwaarden", label: "Algemene Voorwaarden" },
];

export default function Footer() {
    return (
        <footer className="relative z-10 border-t-4 border-black bg-white mt-20">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-8">
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
