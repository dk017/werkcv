import type { CVData } from "@/lib/cv";
import { cvSchema } from "@/lib/cv";
import { normalizeStartSource } from "@/lib/start-source";
import { getTemplateConfig } from "@/lib/templates/registry";

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
  pagePath?: string;
  uiLanguage?: "nl" | "en";
};

function normalizeInternalPagePath(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (!/^\/[a-z0-9/-]{1,199}$/.test(value) || value.startsWith("//")) return undefined;
  return value;
}

export function parsePendingExampleCV(value: unknown): PendingExampleCV | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.templateId !== "string") return null;
  const template = getTemplateConfig(candidate.templateId);
  if (template.id !== candidate.templateId) return null;
  if (typeof candidate.colorThemeId !== "string") return null;
  if (!template.colorThemes.some((theme) => theme.id === candidate.colorThemeId)) return null;
  const startSource = normalizeStartSource(candidate.startSource);
  if (!startSource || startSource !== candidate.startSource) return null;
  if (!/^[a-z0-9:_-]{1,160}$/i.test(startSource)) return null;

  const sampleResult = candidate.sampleCV === undefined
    ? null
    : cvSchema.safeParse(candidate.sampleCV);
  if (sampleResult && !sampleResult.success) return null;

  return {
    templateId: template.id,
    colorThemeId: candidate.colorThemeId,
    startSource,
    ...(sampleResult?.success ? { sampleCV: sampleResult.data } : {}),
    ...(normalizeInternalPagePath(candidate.pagePath)
      ? { pagePath: normalizeInternalPagePath(candidate.pagePath) }
      : {}),
    ...(candidate.uiLanguage === "en" || candidate.uiLanguage === "nl"
      ? { uiLanguage: candidate.uiLanguage }
      : {}),
  };
}
