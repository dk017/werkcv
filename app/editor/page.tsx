import { redirect } from "next/navigation";
import CvUnavailable from "@/components/CvUnavailable";
import { getCVWithSettings } from "../actions";
import { getCurrentUser } from "@/lib/auth";
import Editor from "./editor";
import { createEditorDraft } from "@/lib/editor-drafts";
import { cookies } from "next/headers";
import { normalizeStartSource, PENDING_START_SOURCE_COOKIE, readEncodedStartSource } from "@/lib/start-source";
import { isAgencyAccessError } from "@/lib/agency-access";
import { getWorkspaceEntitlementsForUser, isWorkspaceSwitcherEnabled } from "@/lib/workspace/entitlements";
import { normalizeEditorFocus } from "@/lib/editor-focus";
import { consumerAiEnabled } from "@/lib/consumer-ai-availability";
import { isAppV2Active } from "@/lib/app-v2";
import PublicEditorSection from "@/components/public-editor/PublicEditorSection";
import { BUILD_FIRST_COOKIE, BUILD_FIRST_SPLIT_ACTIVE, isBuildFirstEligible, parseBuildFirstArm } from "@/lib/build-first";
import { recordBuildFirstEntry } from "@/lib/build-first-server";
import { shouldResumeLatestCv } from "@/lib/editor-resume";
import { findRecentCvToResume } from "@/lib/editor-resume-server";
import { normalizeEditorStep, resolveInitialStep } from "@/lib/editor-steps";
import { isCvEmpty } from "@/lib/cv-empty";
import { jobVacancyForCv } from "@/lib/app-jobs/service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeTemplateId(value: string | string[] | undefined): string | null {
    const template = Array.isArray(value) ? value[0] : value;
    return typeof template === "string" && template.length > 0 ? template : null;
}

function isUploadRequested(value: string | string[] | undefined): boolean {
    const upload = Array.isArray(value) ? value[0] : value;
    return upload === "1";
}

export default async function EditorPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string; template?: string; new?: string; resumed?: string; startSource?: string; upload?: string; workspace?: string; focus?: string; downloadIntent?: string; stap?: string; step?: string }>;
}) {
    const { id, template, new: forceNewParam, resumed, startSource, upload, workspace, focus, downloadIntent, stap, step } = await searchParams;
    const user = await getCurrentUser();
    const templateId = normalizeTemplateId(template);
    const uploadRequested = isUploadRequested(upload);
    const resolvedFocus = normalizeEditorFocus(focus);
    const cookieStore = await cookies();
    const resolvedStartSource =
        normalizeStartSource(startSource) ||
        readEncodedStartSource(cookieStore.get(PENDING_START_SOURCE_COOKIE)?.value) ||
        "editor_direct";

    if (!user) {
        // Build-first split (lib/build-first.ts): half of the eligible visitors build without an account
        // and log in at download; the other half keep the login page first. Both arms are recorded.
        const buildFirstArm = BUILD_FIRST_SPLIT_ACTIVE ? parseBuildFirstArm(cookieStore.get(BUILD_FIRST_COOKIE)?.value) : null;
        if (buildFirstArm && isBuildFirstEligible({ id, workspace, startSource: resolvedStartSource }) && (await isAppV2Active())) {
            await recordBuildFirstEntry({ arm: buildFirstArm, startSource: resolvedStartSource, locale: "nl" });
            if (buildFirstArm === "on") {
                return (
                    <main>
                        <PublicEditorSection
                            locale="nl"
                            source="public_editor_build_first_nl"
                            variant="editor"
                            stepsLayout
                            startSource={resolvedStartSource}
                            initialTemplateId={templateId || undefined}
                            openUploader={uploadRequested}
                        />
                    </main>
                );
            }
        }
        const nextParams = new URLSearchParams();
        if (id) nextParams.set("id", id);
        nextParams.set("template", templateId || "professional");
        nextParams.set("startSource", resolvedStartSource);
        if (resolvedFocus) nextParams.set("focus", resolvedFocus);
        if (uploadRequested) nextParams.set("upload", "1");
        if (downloadIntent === "1") nextParams.set("downloadIntent", "1");
        const requestedStep = normalizeEditorStep(stap ?? step);
        if (requestedStep) nextParams.set("stap", requestedStep);
        if (workspace === "agency") nextParams.set("workspace", "agency");
        const next = `/editor?${nextParams.toString()}`;
        redirect(`/login?next=${encodeURIComponent(next)}`);
    }

    // A content-page "Start je CV" while already working on a CV continues that CV (lib/editor-resume.ts).
    if (!id && shouldResumeLatestCv({ startSource: resolvedStartSource, uploadRequested, workspace, forceNew: forceNewParam === "1" })) {
        const latestCvId = await findRecentCvToResume(user.id);
        if (latestCvId) {
            const resumeParams = new URLSearchParams({ id: latestCvId, startSource: resolvedStartSource, resumed: "1" });
            if (resolvedFocus) resumeParams.set("focus", resolvedFocus);
            if (downloadIntent === "1") resumeParams.set("downloadIntent", "1");
            redirect(`/editor?${resumeParams.toString()}`);
        }
    }

    if (!id) {
        const draftTemplateId = templateId || "professional";

        let cvId: string;
        try {
            cvId = await createEditorDraft({
                templateId: draftTemplateId,
                uiLanguage: "nl",
                startSource: resolvedStartSource,
                workspace: workspace === "agency" ? "agency" : "consumer",
            });
        } catch (error) {
            if (isAgencyAccessError(error)) {
                redirect(`/agency/account?error=${encodeURIComponent(error.code)}`);
            }
            throw error;
        }
        const editorParams = new URLSearchParams({
            id: cvId,
            template: draftTemplateId,
            startSource: resolvedStartSource,
        });
        if (resolvedFocus) editorParams.set("focus", resolvedFocus);
        if (uploadRequested) editorParams.set("upload", "1");
        if (downloadIntent === "1") editorParams.set("downloadIntent", "1");
        redirect(`/editor?${editorParams.toString()}`);
    }

    const cv = await getCVWithSettings(id);

    if (!cv) {
        return <CvUnavailable locale="nl" />;
    }

    const workspaceEntitlements = await getWorkspaceEntitlementsForUser(user.id);
    const useSteps = cv.workspaceContext?.kind !== "matchpack" && !cv.agencyRouteLocked && await isAppV2Active();
    const initialStep = resolveInitialStep({
        step: stap ?? step,
        focus: resolvedFocus,
        uploadRequested,
        data: cv.data,
        isEmpty: isCvEmpty(cv.data),
    });
    return (
        <Editor
            layoutVariant={useSteps ? "steps" : "classic"}
            initialStep={initialStep}
            initialTargetVacancy={useSteps ? await jobVacancyForCv(user.id, id) : ""}
            key={id}
            initialContentVersion={cv.contentVersion}
            aiReviewEnabled={consumerAiEnabled() && !cv.agencyRouteLocked}
            initialData={cv.data}
            id={id}
            initialTemplateId={cv.templateId}
      initialColorThemeId={cv.colorThemeId}
      accountEmail={user.email}
      uiLanguage="nl"
      resumedNewCvHref={resumed === "1" ? `/editor?${new URLSearchParams({ template: "professional", startSource: resolvedStartSource, new: "1" }).toString()}` : undefined}
      agencyRouteLocked={cv.agencyRouteLocked}
      workspaceContext={cv.workspaceContext}
      downloadIncluded={cv.downloadIncluded}
      jobPassOffered={cv.jobPassOffered}
      workspaceEntitlements={workspaceEntitlements}
      workspaceSwitcherEnabled={isWorkspaceSwitcherEnabled(workspaceEntitlements)}
    />
    );
}
