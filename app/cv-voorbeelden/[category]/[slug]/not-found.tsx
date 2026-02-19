import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#FFFEF9] flex items-center justify-center">
            <div className="max-w-lg mx-auto px-6 py-16 text-center">
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <span className="inline-block bg-[#FF6B6B] text-white text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
                        404
                    </span>
                    <h1 className="text-4xl font-black mb-4 text-gray-900">
                        Pagina niet gevonden
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Dit CV voorbeeld bestaat niet of is verplaatst.
                        Bekijk onze andere voorbeelden of maak direct je eigen CV.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/cv-voorbeelden"
                            className="inline-block bg-[#FF6B6B] text-white font-bold px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Alle voorbeelden
                        </Link>
                        <Link
                            href="/"
                            className="inline-block bg-white text-black font-bold px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
