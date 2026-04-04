import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SalarisOnderhandelingTool from './SalarisOnderhandelingTool';

export const metadata: Metadata = {
    title: 'Salaris onderhandeling script generator | WerkCV',
    description: 'Genereer een persoonlijk salarisonderhandelingsscript met AI. Inclusief reacties op lage aanbiedingen, bezwaren en salarisonderhandeling in sollicitatiegesprekken.',
    keywords: ['salaris onderhandelen', 'salarisverhoging vragen', 'onderhandeling script', 'salaris negotiation'],
};

export default function SalarisOnderhandelingPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <header className="border-b-4 border-black bg-white">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="font-black text-2xl tracking-tight text-black">
                        Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
                    </Link>
                    <Link href="/tools" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                        ← Alle tools
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#4ECDC4]/15 p-2 border-2 border-black">
                            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wide bg-[#4ECDC4]/20 text-teal-700 px-2 py-0.5 rounded-full border border-teal-300">AI</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Salaris Onderhandeling Script Generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je situatie in en ontvang een persoonlijk onderhandelingsscript — inclusief e-mail, argumenten en hoe je omgaat met bezwaren.
                    </p>
                    <p className="mt-3 text-sm font-bold text-slate-700">
                        Liever eerst je range scherper krijgen?{" "}
                        <Link href="/cv-tips/salarisverwachting-bepalen" className="underline decoration-2 underline-offset-2 text-slate-900">
                            Bepaal je salarisverwachting
                        </Link>
                        {" "}of{" "}
                        <Link href="/cv-tips/salaris-bespreken-sollicitatie" className="underline decoration-2 underline-offset-2 text-slate-900">
                            bereid je salarisgesprek voor
                        </Link>
                        {" "}of{" "}
                        <Link href="/cv-tips/gewenst-salaris-invullen" className="underline decoration-2 underline-offset-2 text-slate-900">
                            vul een salarisveld slimmer in
                        </Link>
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { stat: '60%', label: 'van Nederlanders vraagt nooit om salarisverhoging' },
                        { stat: '€3.400', label: 'gemiddeld verlies per jaar bij niet onderhandelen' },
                        { stat: '70%', label: 'van werkgevers verwacht onderhandeling' },
                    ].map(({ stat, label }) => (
                        <div key={stat} className="bg-white border-2 border-black p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-xl font-black text-slate-900">{stat}</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
                    <SalarisOnderhandelingTool />
                </div>

                <section className="mt-8 rounded-2xl border-2 border-slate-200 bg-white p-5">
                    <h2 className="text-lg font-black text-slate-900">Meer salarishulp</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Gebruik deze routes als je nog niet bij het onderhandelingsscript bent, maar eerst je range, netto effect of formulierantwoord wilt aanscherpen.
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {[
                            ["/cv-tips/salarisverwachting-bepalen", "Salarisverwachting bepalen", "Onderbouw eerst je range met marktdata, timing en scripts."],
                            ["/cv-tips/salaris-bespreken-sollicitatie", "Salaris bespreken", "Voor recruiter-calls, interviewvragen en te lage budgetten."],
                            ["/cv-tips/gewenst-salaris-invullen", "Gewenst salaris invullen", "Voor verplichte salarisvelden in formulieren en ATS-portals."],
                            ["/tools/netto-bruto-calculator", "Netto bruto calculator", "Controleer wat een bruto aanbod maandelijks echt betekent."],
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
            </div>

            <Footer />
        </div>
    );
}
