import { z } from "zod";
import { cvSchema, defaultCV, type CVData } from "@/lib/cv";

export const personalCvLibrarySortSchema = z.enum([
  "updated_desc",
  "created_desc",
  "created_asc",
  "title_asc",
]);

export type PersonalCvLibrarySort = z.infer<typeof personalCvLibrarySortSchema>;

export const personalCvLibraryQuerySchema = z.object({
  query: z.string().trim().max(100).default(""),
  sort: personalCvLibrarySortSchema.default("updated_desc"),
  cursor: z.string().trim().max(2_048).optional(),
}).strict();

export type PersonalCvLibraryQuery = z.infer<typeof personalCvLibraryQuerySchema> & { limit: 12 };

export type PersonalCvLibraryItem = {
  id: string;
  title: string;
  templateId: string;
  colorThemeId: string;
  previewData: CVData;
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
};

export type PersonalCvLibraryResult =
  | {
    ok: true;
    items: PersonalCvLibraryItem[];
    nextCursor: string | null;
    totalCount: number;
    query: string;
    sort: PersonalCvLibrarySort;
  }
  | {
    ok: false;
    code: "AUTH_REQUIRED" | "VALIDATION_ERROR" | "INVALID_CURSOR" | "LOAD_FAILED";
    message: string;
  };

function clipped(value: string, maximum: number): string {
  return value.trim().slice(0, maximum);
}

export function buildPersonalCvPreview(value: unknown): CVData {
  const parsed = cvSchema.safeParse(value);
  if (!parsed.success) return defaultCV;
  const data = parsed.data;
  return {
    ...defaultCV,
    personal: {
      ...defaultCV.personal,
      name: clipped(data.personal.name, 120),
      title: clipped(data.personal.title, 160),
      resumeLanguage: data.personal.resumeLanguage,
      location: clipped(data.personal.location, 100),
      summary: clipped(data.personal.summary, 500),
    },
    experience: data.experience.slice(0, 2).map((item) => ({
      role: clipped(item.role, 120),
      company: clipped(item.company, 120),
      location: clipped(item.location, 80),
      start: clipped(item.start, 40),
      end: clipped(item.end, 40),
      description: clipped(item.description, 280),
      highlights: item.highlights.slice(0, 3).map((highlight) => clipped(highlight, 160)),
    })),
    education: data.education.slice(0, 1).map((item) => ({
      degree: clipped(item.degree, 120),
      school: clipped(item.school, 120),
      location: clipped(item.location, 80),
      start: clipped(item.start, 40),
      end: clipped(item.end, 40),
      description: clipped(item.description, 180),
    })),
    skills: data.skills.slice(0, 8).map((item) => ({ name: clipped(item.name, 80), level: item.level })),
    languages: data.languages.slice(0, 4).map((item) => ({ name: clipped(item.name, 80), level: item.level })),
  };
}
