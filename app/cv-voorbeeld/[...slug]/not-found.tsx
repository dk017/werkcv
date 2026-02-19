import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#FFFEF9] flex items-center justify-center p-6">
            <div className="max-w-lg text-center">
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-6xl font-black mb-4">404</h1>
                    <h2 className="text-2xl font-bold mb-4">
                        CV Voorbeeld niet gevonden
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Deze pagina bestaat niet of is verplaatst. Bekijk onze andere CV voorbeelden.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/cv-voorbeeld"
                            className="inline-block bg-[#FF6B6B] text-white font-bold px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Alle CV voorbeelden
                        </Link>
                        <Link
                            href="/"
                            className="inline-block bg-white text-black font-bold px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Naar home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
