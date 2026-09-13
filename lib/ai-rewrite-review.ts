import type { CVData } from "./cv";
import { defaultCV } from "./cv";

/** Only writing context belongs in a provider request, never contact details or photos. */
export function rewriteContext(data: CVData): CVData {
  return {
    ...defaultCV,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    personal: {
      name: "", title: data.personal.title, summary: data.personal.summary,
      resumeLanguage: data.personal.resumeLanguage, email: "", phone: "", location: "",
      address: "", postalCode: "", birthDate: "", birthPlace: "", nationality: "",
      driversLicense: "", gender: "", maritalStatus: "", linkedIn: "", github: "", website: "", photo: "",
    },
    references: [], sideActivities: [], customSections: [],
  };
}

export function rewriteReviewKey(data: CVData, vacancy: string, role: string): string {
  return JSON.stringify([rewriteContext(data), vacancy, role]);
}

/** Never merge a provider's whole document into the editor. */
export function applyReviewedRewrite(current: CVData, suggestion: CVData): CVData {
  if (current.experience.length !== suggestion.experience.length) throw new Error("INVALID_TARGETS");
  if (new Set(current.experience.map(entry => entry.entryId)).size !== current.experience.length) throw new Error("INVALID_TARGETS");
  return {
    ...current,
    personal: { ...current.personal, summary: suggestion.personal.summary },
    experience: current.experience.map((entry) => {
      const matches = suggestion.experience.filter(proposed => proposed.entryId === entry.entryId);
      if (!entry.entryId || matches.length !== 1) throw new Error("INVALID_TARGETS");
      return { ...entry, description: matches[0].description, highlights: matches[0].highlights };
    }),
  };
}
