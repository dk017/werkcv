import type { CVData } from "@/lib/cv";

export const PENDING_EXAMPLE_CV_STORAGE_KEY = "werkcv_pending_example_cv_v1";

export type PendingExampleCV = {
  templateId: string;
  colorThemeId: string;
  sampleCV?: CVData;
  /**
   * Kept as a string because new public entry points are allowlisted at the
   * server boundary. Older pending records remain readable after releases.
   */
  startSource: string;
};
