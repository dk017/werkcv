import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SollicitatiebriefTool from "./SollicitatiebriefTool";

export const metadata: Metadata = {
    title: "Sollicitatiebrief Generator - Gratis AI Sollicitatiebrief | WerkCV",
    description: "Schrijf in seconden een persoonlijke sollicitatiebrief met AI. Vul je motivatie in en ontvang een professionele, op maat gemaakte brief.",
    keywords: [
        "sollicitatiebrief schrijven",
        "sollicitatiebrief generator",
        "motivatiebrief",
        "sollicitatiebrief ai",
        "gratis sollicitatiebrief",
        "motivatiebrief generator",
    ],
};

export default function SollicitatiebriefGeneratorPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
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

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <span className="inline-block text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-4">
                        AI tool — Gratis
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Sollicitatiebrief generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je doelrol en motivatie in — onze AI schrijft binnen 30 seconden een professionele sollicitatiebrief die je direct kunt gebruiken.
                    </p>
                    <p className="mt-3 text-sm font-bold text-slate-700">
                        Liever eerst inspiratie?{" "}
                        <Link href="/sollicitatiebrief-maken" className="underline decoration-2 underline-offset-2 text-slate-900">
                            Bekijk de centrale briefhub
                        </Link>
                        {" "}of{" "}
                        <Link href="/sollicitatiebrief-voorbeeld" className="underline decoration-2 underline-offset-2 text-slate-900">
                            Bekijk sollicitatiebrief voorbeelden
                        </Link>
                        {" "}of{" "}
                        <Link href="/motivatiebrief-schrijven" className="underline decoration-2 underline-offset-2 text-slate-900">
                            motivatiebrief schrijven
                        </Link>
                        {" "}of{" "}
                        <Link href="/sollicitatiebrief-beginnen" className="underline decoration-2 underline-offset-2 text-slate-900">
                            sollicitatiebrief beginnen
                        </Link>
                        {" "}of{" "}
                        <Link href="/motivatiebrief-zonder-werkervaring" className="underline decoration-2 underline-offset-2 text-slate-900">
                            motivatiebrief zonder werkervaring
                        </Link>
                        {" "}of{" "}
                        <Link href="/open-sollicitatie-brief" className="underline decoration-2 underline-offset-2 text-slate-900">
                            open sollicitatie schrijven
                        </Link>
                        {" "}of{" "}
                        <Link href="/sollicitatiebrief-in-engels" className="underline decoration-2 underline-offset-2 text-slate-900">
                            sollicitatiebrief in engels
                        </Link>
                    </p>
                </div>

                <SollicitatiebriefTool />

                <section className="mt-8 rounded-2xl border-2 border-slate-200 bg-white p-5">
                    <h2 className="text-lg font-black text-slate-900">Meer briefhulp</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Gebruik deze gidsen als je niet vastloopt op de hele brief, maar op een specifiek onderdeel zoals de opening, een starteraanpak of een open sollicitatie.
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["/sollicitatiebrief-maken", "Briefhub", "Start hier als je nog moet kiezen tussen workflow, voorbeelden en specialistische routes."],
                            ["/sollicitatiebrief-beginnen", "Sterke openingszinnen", "Voor als je eerste alinea vlak of generiek voelt."],
                            ["/motivatiebrief-zonder-werkervaring", "Zonder werkervaring", "Gebruik studie, stage en projecten als geloofwaardig bewijs."],
                            ["/open-sollicitatie-brief", "Open sollicitatie", "Schrijf een gerichte brief zonder bestaande vacature."],
                        ].map(([href, title, body]) => (
                            <Link
                                key={href}
                                href={href}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-300 hover:bg-slate-100"
                            >
                                <p className="text-sm font-black text-slate-900">{title}</p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-600">{body}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Wat maakt een goede sollicitatiebrief?</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Een sterke sollicitatiebrief is geen herhaling van je CV. Het is een persoonlijk verhaal dat uitlegt waarom jij de juiste persoon bent voor díeze specifieke rol bij díet specifieke bedrijf.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-black text-slate-900 text-sm mb-3">Structuur van een sterke sollicitatiebrief</h3>
                        <ol className="space-y-2">
                            {[
                                ['Opening', 'Pakkende zin die direct je motivatie laat zien — geen "Hierbij solliciteer ik".'],
                                ['Meerwaarde', 'Wat breng jij mee? Noem 1-2 concrete prestaties of vaardigheden die aansluiten op de vacature.'],
                                ['Fit met het bedrijf', 'Laat zien dat je het bedrijf kent. Koppel hun missie aan jouw motivatie.'],
                                ['Afsluiting', 'Nodig uit voor een gesprek. Zelfverzekerd en concreet.'],
                            ].map(([stap, uitleg], i) => (
                                <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4ECDC4] border border-teal-400 flex items-center justify-center text-[10px] font-black text-slate-900">{i + 1}</span>
                                    <span><strong className="text-slate-900">{stap}:</strong> {uitleg}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
