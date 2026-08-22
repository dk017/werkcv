"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { getPublicDraftHydrationKey, readPublicDraft } from "@/lib/public-cv-draft";

type AgencyDraftResumeProps = {
    canCreate: boolean;
};

export default function AgencyDraftResume({ canCreate }: AgencyDraftResumeProps) {
    const draftKey = useSyncExternalStore(
        () => () => undefined,
        () => getPublicDraftHydrationKey("public_editor_agency"),
        () => "",
    );
    const draftId = draftKey ? draftKey.split("|", 1)[0] : null;
    const hasDraft = useMemo(() => {
        const snapshot = draftId ? readPublicDraft(draftId) : null;
        return Boolean(snapshot?.flow === "agency" && snapshot.source === "public_editor_agency");
    }, [draftId]);

    if (!hasDraft || !canCreate) return null;

    if (!draftId) return null;

    return (
        <section className="wk-agency-panel wk-agency-panel-success">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">Je browserconcept is bewaard</p>
            <h2 className="mt-2 text-2xl font-black">Ga verder met je klant-CV</h2>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                Je kunt het concept nu opslaan in je Agency-account. Daarna telt het als één CV uit deze maandperiode.
            </p>
            <Link
                href={`/editor/claim?draftId=${encodeURIComponent(draftId)}&flow=agency`}
                className="mt-5 inline-flex border-2 border-slate-900 bg-emerald-300 px-4 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
            >
                Concept opslaan in Agency-account →
            </Link>
        </section>
    );
}
