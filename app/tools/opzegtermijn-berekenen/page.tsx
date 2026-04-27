import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import OpzegtermijnTool from "./OpzegtermijnTool";

export const metadata: Metadata = {
    title: "Opzegtermijn Berekenen - Gratis Tool | WerkCV",
    description: "Bereken snel je wettelijke opzegtermijn op basis van je dienstjaren en contracttype. Gebaseerd op artikel 7:672 Burgerlijk Wetboek.",
    keywords: [
        "opzegtermijn berekenen",
        "opzegtermijn werknemer",
        "opzegtermijn werkgever",
        "wettelijke opzegtermijn",
        "opzegtermijn dienstjaren",
        "arbeidscontract opzegging",
    ],
};

export default function OpzegtermijnPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            {/* Header */}
            <header className="border-b-4 border-black bg-white">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-black text-2xl tracking-tight text-black">
                            Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
                        </span>
                    </Link>
                    <Link href="/tools" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                        ← Alle tools
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <span className="inline-block text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-4">
                        Gratis tool
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Opzegtermijn berekenen
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je dienstjaren en contracttype in en zie direct wat de wettelijke opzegtermijn is — voor jou én je werkgever.
                    </p>
                </div>

                <OpzegtermijnTool />

                <div className="mt-10">
                    <p className="text-sm text-slate-500 mb-4 text-center">
                        Regel niet alleen je opzegging, maar ook wat er financieel omheen zit.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href="/baan-wisselen"
                            className="bg-[#FFF4D6] text-slate-900 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            <p className="text-xs font-black uppercase tracking-wide text-amber-700 mb-1">
                                Overstappen
                            </p>
                            <p className="font-black text-lg mb-2">Bekijk baan wisselen</p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Gebruik de checklist als je naast je termijn ook ontslagbrief, motivatiebrief en cv wilt plannen.
                            </p>
                        </Link>
                        <Link
                            href="/tools/opzeggingsbrief-generator"
                            className="bg-black text-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] transition-all"
                        >
                            <p className="text-xs font-black uppercase tracking-wide text-slate-300 mb-1">
                                Volgende stap
                            </p>
                            <p className="font-black text-lg mb-2">Genereer je opzeggingsbrief</p>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Maak direct een nette brief die je kunt versturen of kopieren.
                            </p>
                        </Link>
                        <Link
                            href="/tools/transitievergoeding-berekenen"
                            className="bg-white text-slate-900 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-1">
                                NL wetgeving
                            </p>
                            <p className="font-black text-lg mb-2">Bereken je transitievergoeding</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Check of er bij ontslag of niet-verlenging ook een vergoeding hoort.
                            </p>
                        </Link>
                    </div>
                </div>

                <RelatedToolsSection
                    title="Meer tools rond contracteinde"
                    description="Opzegtermijn is vaak alleen de eerste check. Daarna volgen aanzegvergoeding, WW en eventuele transitievergoeding."
                    tools={[
                        {
                            href: "/tools/aanzegvergoeding-checker",
                            title: "Aanzegvergoeding checker",
                            description: "Controleer of je tijdelijk contract te laat of niet correct is aangezegd.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/ww-recht-checker",
                            title: "WW recht checker",
                            description: "Check de basisvoorwaarden voor WW na einde dienstverband.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/ww-duur-checker",
                            title: "WW duur checker",
                            description: "Schat hoe lang je WW kan duren als je recht hebt.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/transitievergoeding-berekenen",
                            title: "Transitievergoeding berekenen",
                            description: "Bekijk of er naast de opzegtermijn ook een vergoeding hoort.",
                            badge: "NL wetgeving",
                        },
                    ]}
                />
            </div>

            <Footer />
        </div>
    );
}
