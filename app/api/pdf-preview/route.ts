import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { cvSchema } from "@/lib/cv";
import { generatePDF } from "@/lib/pdf";
import { renderPdfPreviewImages } from "@/lib/pdf-preview-images";
import { prisma } from "@/lib/prisma";
import { getDefaultThemeId, templateRegistry } from "@/lib/templates/registry";

export const runtime = "nodejs";

const MAX_PREVIEW_PAYLOAD_CHARS = 1_000_000;

function previewJson(payload: unknown, init?: ResponseInit) {
  return NextResponse.json(payload, {
    ...init,
    headers: {
      "Cache-Control": "private, no-store",
      ...(init?.headers || {}),
    },
  });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    return previewJson(
      { error: "Authentication required", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const cvId = typeof body?.cvId === "string" ? body.cvId : "";
  const templateId = typeof body?.templateId === "string" ? body.templateId : "";
  const colorThemeId = typeof body?.colorThemeId === "string" ? body.colorThemeId : "";

  if (!cvId || !templateId || !body?.data) {
    return previewJson({ error: "Invalid preview request" }, { status: 400 });
  }

  if (JSON.stringify(body.data).length > MAX_PREVIEW_PAYLOAD_CHARS) {
    return previewJson({ error: "Preview data is too large" }, { status: 413 });
  }

  const ownsCv = await prisma.cVDocument.findFirst({
    where: { id: cvId, userId: user.id, agencySubscriptionId: null },
    select: { id: true },
  });
  if (!ownsCv) {
    return previewJson({ error: "CV not found" }, { status: 404 });
  }

  const parsed = cvSchema.safeParse(body.data);
  if (!parsed.success) {
    return previewJson({ error: "Invalid CV data" }, { status: 400 });
  }

  const safeTemplateId = Object.hasOwn(templateRegistry, templateId)
    ? templateId
    : "professional";
  const safeThemeId = colorThemeId || getDefaultThemeId(safeTemplateId);
  const pdf = await generatePDF(parsed.data, safeTemplateId, safeThemeId);
  const pages = await renderPdfPreviewImages(pdf);

  return previewJson(
    { pages },
    {
    },
  );
}
