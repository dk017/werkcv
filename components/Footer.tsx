import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-10 border-t-4 border-black bg-white mt-20">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="font-black text-xl tracking-tight text-black">
                            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-black">
                        <Link href="/templates" className="hover:text-yellow-600 transition-colors">
                            Templates
                        </Link>
                        <Link href="/cv-voorbeelden" className="hover:text-yellow-600 transition-colors">
                            CV Voorbeelden
                        </Link>
                        <Link href="/cv-tips" className="hover:text-yellow-600 transition-colors">
                            CV Tips
                        </Link>
                        <Link href="/cv-gids" className="hover:text-yellow-600 transition-colors">
                            CV Gidsen
                        </Link>
                        <Link href="/en" className="hover:text-yellow-600 transition-colors">
                            English Guides
                        </Link>
                        <Link href="/en/guides" className="hover:text-yellow-600 transition-colors">
                            Expat Guides
                        </Link>
                        <Link href="/prijzen" className="hover:text-yellow-600 transition-colors">
                            Prijzen
                        </Link>
                        <Link href="/faq" className="hover:text-yellow-600 transition-colors">
                            FAQ
                        </Link>
                        <Link href="/over-ons" className="hover:text-yellow-600 transition-colors">
                            Over Ons
                        </Link>
                        <Link href="/privacy" className="hover:text-yellow-600 transition-colors">
                            Privacybeleid
                        </Link>
                        <Link href="/voorwaarden" className="hover:text-yellow-600 transition-colors">
                            Algemene Voorwaarden
                        </Link>
                    </nav>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-gray-200 text-center">
                    <p className="text-sm font-medium text-gray-600">
                        &copy; {new Date().getFullYear()} WerkCV.nl &bull; Maak een professioneel CV dat opvalt
                    </p>
                </div>
            </div>
        </footer>
    );
}
