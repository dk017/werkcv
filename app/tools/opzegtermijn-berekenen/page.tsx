import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import OpzegtermijnTool from "./OpzegtermijnTool";

export const metadata: Metadata = {
    title: "Opzegtermijn Berekenen - Gratis Tool | WerkCV.nl",
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

                {/* Cross-link */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 mb-3">Klaar om op te zeggen?</p>
                    <Link
                        href="/tools/opzeggingsbrief-generator"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all"
                    >
                        Genereer je opzeggingsbrief →
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}
