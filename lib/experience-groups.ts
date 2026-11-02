import type { CVData } from "@/lib/cv";

type ExperienceEntry = Pick<CVData["experience"][number], "company" | "location">;

export type ExperienceGroup = {
    /** Positions in data.experience, in CV order. One index = a normal entry. */
    indexes: number[];
    /** All roles share one location (or none has one): it goes in the company heading. */
    sharedLocation: boolean;
};

function sameText(value: string | undefined): string {
    return (value ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

/**
 * Jobs next to each other at the same company (same name, ignoring case and spacing) show
 * under one company heading, like a promotion on LinkedIn. The data stays one entry per
 * role, so ATS text, CV checks and AI writing see every title with its own dates.
 */
export function groupExperienceByCompany(entries: ExperienceEntry[]): ExperienceGroup[] {
    const groups: ExperienceGroup[] = [];
    entries.forEach((entry, index) => {
        const last = groups.at(-1);
        const company = sameText(entry.company);
        if (last && company && sameText(entries[last.indexes[0]].company) === company) last.indexes.push(index);
        else groups.push({ indexes: [index], sharedLocation: true });
    });
    for (const group of groups) {
        const locations = new Set(group.indexes.map((index) => sameText(entries[index].location)));
        group.sharedLocation = locations.size === 1;
    }
    return groups;
}
