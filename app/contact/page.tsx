import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Contact | WerkCV.nl',
    description: 'Neem contact op met WerkCV.nl. Heb je een vraag of feedback? We helpen je graag.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            {/* Hero */}
            <section className="border-b-4 border-black bg-white">
                <div className="max-w-3xl mx-auto px-6 py-16">
                    <h1 className="text-5xl font-black mb-4">Contact</h1>
                    <p className="text-xl text-gray-600">
                        Heb je een vraag, feedback of een probleem? We horen het graag.
                    </p>
                </div>
            </section>

            {/* Contact cards */}
            <section className="max-w-3xl mx-auto px-6 py-16 space-y-6">

                {/* Email */}
                <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-[#4ECDC4] border-2 border-black flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-black mb-1">E-mail</h2>
                            <p className="text-gray-600 mb-3 text-sm">Voor vragen, feedback en support.</p>
                            <a
                                href="mailto:contact@werkcv.nl"
                                className="inline-block font-bold text-lg border-b-2 border-black hover:text-[#4ECDC4] hover:border-[#4ECDC4] transition-colors"
                            >
                                contact@werkcv.nl
                            </a>
                        </div>
                    </div>
                </div>

                {/* X / Twitter */}
                <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.904-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-black mb-1">X (Twitter)</h2>
                            <p className="text-gray-600 mb-3 text-sm">Volg ons voor updates en CV tips.</p>
                            <a
                                href="https://x.com/dk_r017"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block font-bold text-lg border-b-2 border-black hover:text-[#4ECDC4] hover:border-[#4ECDC4] transition-colors"
                            >
                                @dk_r017
                            </a>
                        </div>
                    </div>
                </div>

                {/* Response time note */}
                <p className="text-sm text-gray-500 text-center pt-2">
                    We reageren doorgaans binnen 1–2 werkdagen.
                </p>

                {/* CTA */}
                <div className="text-center pt-4">
                    <Link
                        href="/faq"
                        className="inline-block bg-[#4ECDC4] text-black font-bold px-8 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        Bekijk ook onze FAQ →
                    </Link>
                </div>
            </section>
        </main>
    );
}
