import { z } from "zod";

export const contactSubjectValues = [
  "support",
  "bug",
  "feedback",
  "partnership",
  "other",
] as const;

export type ContactSubjectValue = (typeof contactSubjectValues)[number];

export const contactSubjectOptions: Array<{
  value: ContactSubjectValue;
  label: string;
}> = [
  { value: "support", label: "Vraag over WerkCV" },
  { value: "bug", label: "Technisch probleem" },
  { value: "feedback", label: "Feedback" },
  { value: "partnership", label: "Samenwerking" },
  { value: "other", label: "Anders" },
];

export function getContactSubjectLabel(subject: ContactSubjectValue): string {
  return contactSubjectOptions.find((option) => option.value === subject)?.label || "Anders";
}

export const editorFeedbackContextSchema = z.object({
  cvId: z.string().trim().min(1).max(100),
  uiLanguage: z.enum(["nl", "en"]),
  templateId: z.string().trim().min(1).max(100),
  completionScore: z.number().int().min(0).max(100),
  pageCount: z.number().int().min(1).max(100),
  nextStep: z.string().trim().min(1).max(100).nullable(),
});

export const contactPayloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Vul je naam in.")
    .max(100, "Je naam is te lang."),
  email: z
    .string()
    .trim()
    .email("Vul een geldig e-mailadres in.")
    .max(160, "Je e-mailadres is te lang."),
  subject: z.enum(contactSubjectValues, {
    error: () => ({ message: "Kies een onderwerp." }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Beschrijf je vraag of bericht iets uitgebreider.")
    .max(4000, "Je bericht is te lang."),
  website: z.string().trim().max(200).optional().default(""),
  pagePath: z.string().trim().startsWith("/").default("/contact"),
  attribution: z.unknown().optional(),
  editorContext: editorFeedbackContextSchema.optional(),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
export type EditorFeedbackContext = z.infer<typeof editorFeedbackContextSchema>;
