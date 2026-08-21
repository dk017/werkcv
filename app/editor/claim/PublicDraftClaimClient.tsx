"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCheckoutURL } from "@/app/actions";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import { clearPublicDraft, readPublicDraft, type PublicEditorFlow } from "@/lib/public-cv-draft";
import { getEditorPathForCv } from "@/lib/editor-path";
import { track } from "@/lib/analytics";

type PublicDraftClaimClientProps = {
    draftId: string;
    flow: PublicEditorFlow;
    intent: "download" | "resume";
};

type ClaimState =
    | { status: "loading"; phase: "claim" | "checkout"; uiLanguage: "nl" | "en" }
    | { status: "error"; code: string; message: string; uiLanguage: "nl" | "en" }
    | { status: "success"; uiLanguage: "nl" | "en" };

function getErrorMessage(code: string, uiLanguage: "nl" | "en"): string {
    const messages = {
        nl: {
            AGENCY_PLAN_REQUIRED: "Je hebt een actieve Agency-billing tier nodig om een klant-CV op te slaan.",
            AGENCY_PLAN_PENDING: "Je Agency-billing tier wordt nog geactiveerd. Open je agency-account om de status te controleren.",
            AGENCY_QUOTA_REACHED: "De gedeelde Agency-limiet van 50 slots voor deze maand is bereikt.",
            DRAFT_TOO_LARGE: "Dit concept is te groot om veilig over te zetten. Verwijder eventueel de foto en probeer opnieuw.",
            default: "We konden je concept niet opslaan. Probeer het opnieuw.",
        },
        en: {
            AGENCY_PLAN_REQUIRED: "You need an active Agency billing tier to save a client CV.",
            AGENCY_PLAN_PENDING: "Your Agency billing tier is still being activated. Open your agency account to check the status.",
            AGENCY_QUOTA_REACHED: "The shared Agency allowance of 50 slots has been reached.",
            DRAFT_TOO_LARGE: "This draft is too large to transfer safely. Remove the photo and try again.",
            default: "We could not save your draft. Please try again.",
        },
    } as const;

    return messages[uiLanguage][code as keyof typeof messages[typeof uiLanguage]] || messages[uiLanguage].default;
}

export default function PublicDraftClaimClient({ draftId, flow, intent }: PublicDraftClaimClientProps) {
    const [state, setState] = useState<ClaimState>({ status: "loading", phase: "claim", uiLanguage: "nl" });
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        let cancelled = false;

        const claimDraft = async () => {
            const snapshot = readPublicDraft(draftId);
            const uiLanguage = snapshot?.uiLanguage || "nl";

            if (!cancelled) {
                setState({ status: "loading", phase: "claim", uiLanguage });
            }

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
                const result = await response.json().catch(() => null) as {
                    cvId?: string;
                    code?: string;
                    completionScore?: number;
                    isReady?: boolean;
                } | null;

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

                track("public_editor_claim_completed", {
                    location: snapshot.source,
                    uiLanguage: snapshot.uiLanguage,
                    flow,
                    cvId: result.cvId,
                });

                const editorPath = getEditorPathForCv(snapshot.data, result.cvId);
                const editorParams = new URLSearchParams({ publicClaimed: "1" });
                if (intent === "download") editorParams.set("downloadIntent", "1");
                const nextPath = `${editorPath}${editorPath.includes("?") ? "&" : "?"}${editorParams.toString()}`;
                const completionScore = typeof result.completionScore === "number"
                    ? Math.max(0, Math.min(100, Math.round(result.completionScore)))
                    : 0;
                const shouldStartCheckout = flow === "consumer" && intent === "download" && result.isReady === true;

                if (shouldStartCheckout) {
                    if (!cancelled) {
                        setState({ status: "loading", phase: "checkout", uiLanguage: snapshot.uiLanguage });
                    }
                    track("public_editor_post_login_routed", {
                        cvId: result.cvId,
                        uiLanguage: snapshot.uiLanguage,
                        destination: "checkout",
                        completionScore,
                        reason: "ready_download_intent",
                    });
                    track("checkout_start", {
                        cvId: result.cvId,
                        product: "cv-download",
                        source: "public_editor_post_login",
                    });

                    try {
                        const checkout = await getCheckoutURL(result.cvId, undefined, [], "cv-download");
                        if (checkout.ok) {
                            track("checkout_started", {
                                cvId: result.cvId,
                                product: "cv-download",
                                source: "public_editor_post_login",
                            });
                            clearPublicDraft(draftId);
                            window.location.assign(checkout.url);
                            return;
                        }

                        track("checkout_failed", {
                            cvId: result.cvId,
                            product: "cv-download",
                            source: "public_editor_post_login",
                            reason: checkout.reason || checkout.code,
                        });
                    } catch {
                        track("checkout_failed", {
                            cvId: result.cvId,
                            product: "cv-download",
                            source: "public_editor_post_login",
                            reason: "network_error",
                        });
                    }

                    track("public_editor_post_login_routed", {
                        cvId: result.cvId,
                        uiLanguage: snapshot.uiLanguage,
                        destination: "editor",
                        completionScore,
                        reason: "checkout_failed",
                    });
                    clearPublicDraft(draftId);
                    window.location.assign(nextPath);
                    return;
                }

                if (flow === "consumer") {
                    track("public_editor_post_login_routed", {
                        cvId: result.cvId,
                        uiLanguage: snapshot.uiLanguage,
                        destination: "editor",
                        completionScore,
                        reason: intent === "download" ? "incomplete" : "resume_without_download_intent",
                    });
                }
                clearPublicDraft(draftId);
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
    }, [draftId, flow, intent]);

    if (state.status === "loading") {
        const isEnglish = state.uiLanguage === "en";
        const isPreparingCheckout = state.phase === "checkout";
        return (
            <div className="mx-auto max-w-xl border-2 border-slate-900 bg-white p-8 text-center shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">WerkCV</p>
                <h1 className="mt-3 text-3xl font-black">
                    {isPreparingCheckout
                        ? isEnglish ? "Preparing secure checkout" : "Veilige betaling voorbereiden"
                        : flow === "agency"
                            ? isEnglish ? "Saving your agency CV" : "Agency-CV wordt opgeslagen"
                            : isEnglish ? "Saving your CV" : "Je CV wordt opgeslagen"}
                </h1>
                <p className="mt-3 text-sm font-semibold text-slate-600">
                    {isPreparingCheckout
                        ? isEnglish ? "Your CV is saved. You will continue to payment shortly." : "Je CV is opgeslagen. Je gaat zo verder naar de betaling."
                        : isEnglish ? "One moment. We are moving your browser draft to your account." : "Een moment. We zetten je browserconcept over naar je account."}
                </p>
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
                        label={isEnglish ? "Start MatchPack · Agency €149/month" : "Start MatchPack · Agency €149/maand"}
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
