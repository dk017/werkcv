import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { isPublicDraftId, type PublicEditorFlow } from "@/lib/public-cv-draft";
import PublicDraftClaimClient from "./PublicDraftClaimClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PublicDraftClaimPage({
    searchParams,
}: {
    searchParams: Promise<{ draftId?: string; flow?: string; intent?: string }>;
}) {
    const params = await searchParams;
    const draftId = params.draftId || "";
    const flow: PublicEditorFlow = params.flow === "agency" ? "agency" : "consumer";
    const intent = params.intent === "download" ? "download" : "resume";
    const claimParams = new URLSearchParams({ draftId, flow });
    if (intent === "download") claimParams.set("intent", intent);
    const claimPath = `/editor/claim?${claimParams.toString()}`;
    const user = await getCurrentUser();

    if (!user) {
        redirect(`/login?next=${encodeURIComponent(claimPath)}`);
    }

    if (!isPublicDraftId(draftId)) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#FFFEF9] px-4 py-12 text-slate-900">
                <div className="max-w-xl border-2 border-slate-900 bg-white p-8 text-center shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
                    <h1 className="text-3xl font-black">Dit concept kan niet worden gevonden.</h1>
                    <p className="mt-3 text-sm font-semibold text-slate-600">Start opnieuw vanaf de WerkCV-editor.</p>
                    <Link href="/" className="mt-6 inline-flex border-2 border-slate-900 bg-emerald-300 px-4 py-3 text-sm font-black">Terug naar WerkCV</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#FFFEF9] px-4 py-12 text-slate-900">
            <PublicDraftClaimClient draftId={draftId} flow={flow} intent={intent} />
        </main>
    );
}
