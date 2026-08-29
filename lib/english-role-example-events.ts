import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { parseEnglishRoleExampleStartSource } from "@/lib/english-role-examples";

type RecordEnglishRoleExampleCvCreatedInput = {
  cvId: string;
  templateId: string;
  startSource: string | null | undefined;
  uiLanguage: "nl" | "en";
};

/**
 * Records a role-example CV creation as a durable, content-free event. The
 * CVDocument remains the source of truth; this event is only a convenient
 * stage marker for diagnostics and is deliberately idempotent.
 */
export async function recordEnglishRoleExampleCvCreated({
  cvId,
  templateId,
  startSource,
  uiLanguage,
}: RecordEnglishRoleExampleCvCreatedInput): Promise<void> {
  const parsed = parseEnglishRoleExampleStartSource(startSource);
  if (!parsed) return;

  try {
    await prisma.analyticsEvent.upsert({
      where: { dedupeKey: `cv_created:${cvId}` },
      create: {
        event: "cv_created",
        dedupeKey: `cv_created:${cvId}`,
        cvId,
        properties: {
          templateId,
          uiLanguage,
          roleSlug: parsed.roleSlug,
          entryMethod: parsed.entryMethod,
          startSource: `en_role_example_${parsed.roleSlug}${parsed.entryMethod === "upload" ? "_upload" : ""}`,
        } as Prisma.InputJsonValue,
      },
      update: {},
    });
  } catch (error) {
    // Analytics must never block CV creation or redirect behaviour.
    console.error("english_role_example_cv_created_event_failed", error);
  }
}
