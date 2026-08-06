"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import { clearPublicDraft, readPublicDraft, type PublicEditorFlow } from "@/lib/public-cv-draft";
import { getEditorPathForCv } from "@/lib/editor-path";
import { track } from "@/lib/analytics";

type PublicDraftClaimClientProps = {
    draftId: string;
    flow: PublicEditorFlow;
};

type ClaimState =
    | { status: "loading" }
    | { status: "error"; code: string; message: string; uiLanguage: "nl" | "en" }
    | { status: "success"; uiLanguage: "nl" | "en" };

function getErrorMessage(code: string, uiLanguage: "nl" | "en"): string {
    const messages = {
        nl: {
            AGENCY_PLAN_REQUIRED: "Je hebt een actief Agency Plan nodig om een klant-CV op te slaan.",
            AGENCY_PLAN_PENDING: "Je Agency Plan wordt nog geactiveerd. Open je agency-account om de status te controleren.",
            AGENCY_QUOTA_REACHED: "De limiet van 50 CV's voor deze maand is bereikt.",
            DRAFT_TOO_LARGE: "Dit concept is te groot om veilig over te zetten. Verwijder eventueel de foto en probeer opnieuw.",
            default: "We konden je concept niet opslaan. Probeer het opnieuw.",
        },
        en: {
            AGENCY_PLAN_REQUIRED: "You need an active Agency Plan to save a client CV.",
            AGENCY_PLAN_PENDING: "Your Agency Plan is still being activated. Open your agency account to check the status.",
            AGENCY_QUOTA_REACHED: "The 50-CV monthly limit has been reached.",
            DRAFT_TOO_LARGE: "This draft is too large to transfer safely. Remove the photo and try again.",
            default: "We could not save your draft. Please try again.",
        },
    } as const;

    return messages[uiLanguage][code as keyof typeof messages[typeof uiLanguage]] || messages[uiLanguage].default;
}

export default function PublicDraftClaimClient({ draftId, flow }: PublicDraftClaimClientProps) {
    const [state, setState] = useState<ClaimState>({ status: "loading" });

    useEffect(() => {
        let cancelled = false;

        const claimDraft = async () => {
            const snapshot = readPublicDraft(draftId);
            const uiLanguage = snapshot?.uiLanguage || "nl";

            if (!snapshot || snapshot.flow !== flow) {
                setState({
                    status: "error",
                    code: "DRAFT_NOT_FOUND",
                    message: uiLanguage === "en"
                        ? "This browser draft is no longer available. Start again from the editor."
                        : "Dit browserconcept is niet meer beschikbaar. Start opnieuw in de editor.",
                    uiLanguage,
                });
                return;
            }

            try {
                const response = await fetch("/api/public/cv/claim", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        draftId,
                        data: snapshot.data,
                        templateId: snapshot.templateId,
                        colorThemeId: snapshot.colorThemeId,
                        flow,
                        uiLanguage: snapshot.uiLanguage,
                        source: snapshot.source,
                    }),
                });
                const result = await response.json().catch(() => null) as { cvId?: string; code?: string } | null;

                if (!response.ok || typeof result?.cvId !== "string") {
                    const code = result?.code || "CLAIM_FAILED";
                    track("public_editor_claim_failed", {
                        location: snapshot.source,
                        uiLanguage: snapshot.uiLanguage,
                        flow,
                        reason: code,
                    });
                    if (!cancelled) {
                        setState({
                            status: "error",
                            code,
                            message: getErrorMessage(code, snapshot.uiLanguage),
                            uiLanguage: snapshot.uiLanguage,
                        });
                    }
                    return;
                }

                clearPublicDraft(draftId);
                track("public_editor_claim_completed", {
                    location: snapshot.source,
                    uiLanguage: snapshot.uiLanguage,
                    flow,
                    cvId: result.cvId,
                });

                const editorPath = getEditorPathForCv(snapshot.data, result.cvId);
                const nextPath = `${editorPath}${editorPath.includes("?") ? "&" : "?"}publicClaimed=1`;
                window.location.assign(nextPath);
            } catch {
                track("public_editor_claim_failed", {
                    location: snapshot?.source || "public_editor",
                    uiLanguage,
                    flow,
                    reason: "network_error",
                });
                if (!cancelled) {
                    setState({
                        status: "error",
                        code: "NETWORK_ERROR",
                        message: uiLanguage === "en"
                            ? "We could not reach WerkCV. Please try again."
                            : "WerkCV kon niet worden bereikt. Probeer het opnieuw.",
                        uiLanguage,
                    });
                }
            }
        };

        void claimDraft();
        return () => {
            cancelled = true;
        };
    }, [draftId, flow]);

    if (state.status === "loading") {
        return (
            <div className="mx-auto max-w-xl border-2 border-slate-900 bg-white p-8 text-center shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">WerkCV</p>
                <h1 className="mt-3 text-3xl font-black">{flow === "agency" ? "Agency-CV wordt opgeslagen" : "Je CV wordt opgeslagen"}</h1>
                <p className="mt-3 text-sm font-semibold text-slate-600">Een moment. We zetten je browserconcept over naar je account.</p>
            </div>
        );
    }

    if (state.status === "success") return null;

    const isEnglish = state.uiLanguage === "en";
    const isAgencyPlanRequired = flow === "agency" && state.code === "AGENCY_PLAN_REQUIRED";

    return (
        <div className="mx-auto max-w-xl border-2 border-slate-900 bg-white p-8 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-rose-700">{isEnglish ? "Action needed" : "Actie nodig"}</p>
            <h1 className="mt-3 text-3xl font-black">{isEnglish ? "Your draft is still safe" : "Je concept is nog veilig"}</h1>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">{state.message}</p>

            {isAgencyPlanRequired ? (
                <div className="mt-6">
                    <AgencyCheckoutButton
                        label={isEnglish ? "Start Agency Plan · €149/month" : "Start Agency Plan · €149/maand"}
                        location="public_editor_claim_agency_required"
                        className="w-full border-2 border-slate-900 bg-yellow-300 px-4 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                    />
                </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="border-2 border-slate-900 bg-emerald-300 px-4 py-3 text-sm font-black"
                >
                    {isEnglish ? "Try again" : "Opnieuw proberen"}
                </button>
                <Link href={flow === "agency" ? "/agency/account" : isEnglish ? "/en" : "/"} className="border-2 border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700">
                    {flow === "agency" ? (isEnglish ? "Open agency account" : "Open agency-account") : (isEnglish ? "Back to WerkCV" : "Terug naar WerkCV")}
                </Link>
            </div>
        </div>
    );
}
