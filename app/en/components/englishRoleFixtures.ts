import type { CVData } from "@/lib/cv";

type RoleFixtureInput = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  current: {
    role: string;
    company: string;
    location: string;
    start: string;
    highlights: string[];
  };
  previous: {
    role: string;
    company: string;
    location: string;
    start: string;
    end: string;
    highlights: string[];
  };
  education: {
    degree: string;
    school: string;
    location: string;
    start: string;
    end: string;
    description: string;
  };
  skills: string[];
  properties: string[];
  courses?: { name: string; institution: string; year: string }[];
  languages?: { name: string; level: "Native" | "Fluent" | "Good" | "Basic" }[];
};

/**
 * Creates complete, fictional content for public previews. Every page passes
 * different role evidence into this helper; no real candidate data is used.
 */
export function makeEnglishRoleExampleCV(input: RoleFixtureInput): CVData {
  return {
    personal: {
      name: input.name,
      title: input.title,
      resumeLanguage: "en",
      email: input.email,
      phone: input.phone,
      location: input.location,
      address: "",
      postalCode: "",
      summary: input.summary,
      birthDate: "",
      birthPlace: "",
      nationality: "",
      driversLicense: "B",
      gender: "",
      maritalStatus: "",
      linkedIn: "",
      github: "",
      website: "",
      photo: "",
    },
    experience: [
      { ...input.current, end: "Present", description: "" },
      { ...input.previous, description: "" },
    ],
    education: [input.education],
    skills: input.skills.map((name, index) => ({ name, level: index < 4 ? 5 : 4 })),
    languages: input.languages || [
      { name: "English", level: "Fluent" },
      { name: "Dutch", level: "Basic" },
    ],
    internships: [],
    interests: [],
    properties: input.properties,
    courses: input.courses || [],
    awards: [],
    references: [],
    sideActivities: [],
    customSections: [],
  };
}
