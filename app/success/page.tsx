import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Betaling Geslaagd - WerkCV.nl",
    description: "Je betaling is geslaagd. Download nu je professionele CV als PDF.",
    robots: { index: false, follow: false },
};

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ cvId?: string }>;
}) {
    const { cvId } = await searchParams;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Betaling geslaagd!
                </h1>

                <p className="text-gray-600 mb-8">
                    Bedankt voor je aankoop. Je kunt nu je CV downloaden als PDF.
                </p>

                <div className="space-y-4">
                    {cvId && (
                        <a
                            href={`/api/pdf?cvId=${cvId}`}
                            className="block w-full bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full font-bold text-sm shadow-md transition"
                        >
                            Download PDF
                        </a>
                    )}

                    <Link
                        href={cvId ? `/editor?id=${encodeURIComponent(cvId)}` : "/"}
                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold text-sm transition"
                    >
                        Terug naar editor
                    </Link>
                </div>

                <p className="text-xs text-gray-400 mt-8">
                    Je kunt je CV altijd opnieuw downloaden door terug te gaan naar de editor.
                </p>
            </div>
        </div>
    );
}
