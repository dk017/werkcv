import type { CVData } from "@/lib/cv";

export const PENDING_EXAMPLE_CV_STORAGE_KEY = "werkcv_pending_example_cv_v1";

export type PendingExampleCV = {
  templateId: string;
  colorThemeId: string;
  sampleCV?: CVData;
  startSource: "example_page" | "example_blank_template" | "english_example_page";
};
