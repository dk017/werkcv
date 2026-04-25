import type { Metadata } from "next";
import Link from "next/link";
import { getCV } from "@/app/actions";
import { getEditorPathForLanguage } from "@/lib/editor-path";
import { getResumeLanguage, ResumeLanguage } from "@/lib/resume-language";

export const metadata: Metadata = {
    title: "Betaling Geslaagd - WerkCV",
    description: "Je betaling is geslaagd. Download nu je professionele CV als PDF.",
    robots: { index: false, follow: false },
};

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ cvId?: string; lang?: string }>;
}) {
    const { cvId, lang } = await searchParams;
    let uiLanguage: ResumeLanguage | null = lang === "en" || lang === "nl" ? lang : null;

    if (!uiLanguage && cvId) {
        const cv = await getCV(cvId);
        uiLanguage = getResumeLanguage(cv);
    }

    const resolvedLanguage = uiLanguage ?? "nl";
    const tr = (dutch: string, english: string) => (resolvedLanguage === "en" ? english : dutch);
    const editorPath = cvId ? getEditorPathForLanguage(resolvedLanguage, cvId) : "/";

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
                    {tr("Betaling geslaagd!", "Payment successful!")}
                </h1>

                <p className="text-gray-600 mb-8">
                    {tr(
                        "Bedankt voor je aankoop. Je kunt nu je CV downloaden als PDF.",
                        "Thanks for your purchase. You can now download your CV as a PDF."
                    )}
                </p>

                <div className="space-y-4">
                    {cvId && (
                        <a
                            href={`/api/pdf?cvId=${cvId}`}
                            className="block w-full bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full font-bold text-sm shadow-md transition"
                        >
                            {tr("Download PDF", "Download PDF")}
                        </a>
                    )}

                    <Link
                        href={editorPath}
                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold text-sm transition"
                    >
                        {tr("Terug naar editor", "Back to editor")}
                    </Link>
                </div>

                <p className="text-xs text-gray-400 mt-8">
                    {tr(
                        "Je kunt je CV altijd opnieuw downloaden door terug te gaan naar de editor.",
                        "You can always download your CV again by going back to the editor."
                    )}
                </p>
            </div>
        </div>
    );
}
