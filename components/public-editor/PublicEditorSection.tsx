"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import Editor from "@/app/editor/editor";
import { defaultCV, type CVData } from "@/lib/cv";
import { getDefaultThemeId } from "@/lib/templates/registry";
import {
    getPublicDraftHydrationKey,
    readPublicDraft,
    type PublicDraftSnapshot,
    type PublicEditorFlow,
} from "@/lib/public-cv-draft";
import { track } from "@/lib/analytics";
import type { UiLanguage } from "@/lib/ui-language";

type PublicEditorSectionProps = {
    locale: UiLanguage;
    flow?: PublicEditorFlow;
    source: string;
    className?: string;
    /** "cv_check": opened from a CV-check fix, with copy about improving the checked CV. */
    variant?: "home" | "cv_check";
    /** Load the CV the visitor just checked (see lib/cv-check/handoff.ts) into the editor. */
    importCheckedCv?: boolean;
};

function createEmptyData(locale: UiLanguage): CVData {
    return {
        ...defaultCV,
        personal: {
            ...defaultCV.personal,
            resumeLanguage: locale,
        },
    };
}

export default function PublicEditorSection({
    locale,
    flow = "consumer",
    source,
    className = "",
    variant = "home",
    importCheckedCv = false,
}: PublicEditorSectionProps) {
    const isCvCheck = variant === "cv_check" && flow === "consumer";
    const draftKey = useSyncExternalStore(
        () => () => undefined,
        () => getPublicDraftHydrationKey(source),
        () => "",
    );
    const draftId = draftKey ? draftKey.split("|", 1)[0] : null;
    const snapshot = useMemo<PublicDraftSnapshot | null>(() => {
        if (!draftId) return null;
        const storedSnapshot = readPublicDraft(draftId);
        return storedSnapshot?.source === source ? storedSnapshot : null;
    }, [draftId, source]);

    useEffect(() => {
        track("public_editor_viewed", {
            location: source,
            uiLanguage: locale,
            flow,
        });
    }, [flow, locale, source]);

    const handlePublicDownloadRequest = async () => {
        if (!draftId) return;

        track("public_editor_claim_started", {
            location: source,
            uiLanguage: locale,
            flow,
        });

        const claimParams = new URLSearchParams({
            draftId,
            flow,
            intent: "download",
        });
        const claimPath = `/editor/claim?${claimParams.toString()}`;
        const loginParams = new URLSearchParams({ next: claimPath });
        if (locale === "en") loginParams.set("locale", "en");
        window.location.assign(`/login?${loginParams.toString()}`);
    };

    const templateId = snapshot?.templateId || "professional";
    const colorThemeId = snapshot?.colorThemeId || getDefaultThemeId(templateId);
    const initialData = snapshot?.data || createEmptyData(locale);

    return (
        <section id="public-editor" className={`bg-[#f3faf8] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${className}`}>
            <div className="mx-auto max-w-[1500px]">
                <div className="mx-auto mb-7 max-w-3xl text-center">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                        {flow === "agency"
                            ? locale === "en" ? "Agency workspace preview" : "Agency-workspace preview"
                            : isCvCheck
                                ? locale === "en" ? "After your CV check" : "Na je CV-check"
                                : locale === "en" ? "Try the editor" : "Probeer de editor"}
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                        {flow === "agency"
                            ? locale === "en" ? "Create a client-ready CV before you sign up" : "Maak alvast een klantklaar CV"
                            : isCvCheck
                                ? locale === "en" ? "Improve your CV, no account needed" : "Verbeter je cv, zonder account"
                                : locale === "en" ? "Build your CV directly in the WerkCV editor" : "Bouw je CV direct in de WerkCV-editor"}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                        {flow === "agency"
                            ? locale === "en"
                                ? "Use the same fields and live preview as the product. Your draft stays in this browser until you choose to continue."
                                : "Gebruik dezelfde velden en live preview als in het product. Je concept blijft in deze browser tot je verdergaat."
                            : isCvCheck
                                ? locale === "en"
                                    ? "We load the CV you checked into the editor. Fix the points from your report and see the result live. You only sign in when you want to download."
                                    : "We zetten het cv dat je liet checken in de editor. Verbeter de punten uit je rapport en zie het resultaat direct. Je meldt je pas aan als je wilt downloaden."
                            : locale === "en"
                                ? "Start without an account. Type your details or upload an existing PDF/DOCX, then sign in only when you want to continue to your download."
                                : "Begin zonder account. Vul je gegevens in of upload een bestaande PDF/DOCX. Meld je pas aan wanneer je wilt doorgaan naar je download."}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-600">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">{locale === "en" ? "No account to start" : "Geen account nodig om te starten"}</span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">{locale === "en" ? "Private browser draft" : "Privé browserconcept"}</span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">{locale === "en" ? "Live PDF preview" : "Live PDF-preview"}</span>
                    </div>
                </div>

                {draftId ? (
                    <Editor
                        initialData={initialData}
                        id={draftId}
                        initialTemplateId={templateId}
                        initialColorThemeId={colorThemeId}
                        accountEmail=""
                        uiLanguage={locale}
                        agencyRouteLocked={flow === "agency"}
                        mode="public"
                        publicDraftId={draftId}
                        publicFlow={flow}
                        publicSource={source}
                        onPublicDownloadRequest={handlePublicDownloadRequest}
                        publicImportCheckedCv={importCheckedCv}
                    />
                ) : (
                    <div className="flex min-h-[760px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-500">
                        {locale === "en" ? "Preparing the editor…" : "De editor wordt voorbereid…"}
                    </div>
                )}
            </div>
        </section>
    );
}
