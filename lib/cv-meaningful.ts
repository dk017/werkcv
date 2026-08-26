import { CV_BODY_SECTION_IDS, cvSectionHasSubstantiveContent } from "./cv-sections";

/** A summary must be intentional rather than a one-word placeholder. */
export const MEANINGFUL_SUMMARY_MIN_LENGTH = 40;

export type MeaningfulCvSignals = {
    /** A substantive profile summary. Identity/contact fields are not enough. */
    profileSummary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    languages: boolean;
    otherSections: boolean;
};

export type MeaningfulCvState = {
    isMeaningful: boolean;
    signals: MeaningfulCvSignals;
};

function hasText(value: unknown): boolean {
    return typeof value === "string" && value.trim().length > 0;
}

/**
 * Determine whether a CV contains user-authored substance.
 *
 * The editor creates a CVDocument before the first edit, so document
 * existence is intentionally not part of this contract. A name alone is not
 * enough; one substantive section or a real profile summary is required.
 * The function accepts unknown JSON so the same rule can be applied to
 * Prisma JSON values in maintenance/follow-up scripts.
 */
export function getMeaningfulCvState(input: unknown): MeaningfulCvState {
    const data = input && typeof input === "object" && !Array.isArray(input)
        ? input as Record<string, unknown>
        : {};
    const personal = data.personal && typeof data.personal === "object" && !Array.isArray(data.personal)
        ? data.personal as Record<string, unknown>
        : {};

    const profileSummary = hasText(personal.summary)
        && String(personal.summary).trim().length >= MEANINGFUL_SUMMARY_MIN_LENGTH;
    const profileSummarySignal = profileSummary;
    // Keep this classifier in lockstep with editor/PDF presence decisions.
    // The resolver handles blank placeholder objects and every body section.
    const sectionState = Object.fromEntries(
        CV_BODY_SECTION_IDS.map((sectionId) => [
            sectionId,
            cvSectionHasSubstantiveContent(data, sectionId),
        ]),
    ) as Record<(typeof CV_BODY_SECTION_IDS)[number], boolean>;

    const signals = {
        profileSummary: profileSummarySignal,
        experience: sectionState.experience,
        education: sectionState.education,
        skills: sectionState.skills,
        languages: sectionState.languages,
        otherSections: [
            sectionState.internships,
            sectionState.courses,
            sectionState.awards,
            sectionState.interests,
            sectionState.properties,
            sectionState.references,
            sectionState.sideActivities,
            sectionState.customSections,
        ].some(Boolean),
    };

    return {
        isMeaningful: Object.values(signals).some(Boolean),
        signals,
    };
}

export function hasMeaningfulCvContent(input: unknown): boolean {
    return getMeaningfulCvState(input).isMeaningful;
}

export function countMeaningfulCvSignals(signals: MeaningfulCvSignals): number {
    return Object.values(signals).filter(Boolean).length;
}
