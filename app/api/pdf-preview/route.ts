import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { cvSchema } from "@/lib/cv";
import { generatePDF } from "@/lib/pdf";
import { renderPdfPreviewImages } from "@/lib/pdf-preview-images";
import { prisma } from "@/lib/prisma";
import { getDefaultThemeId, templateRegistry } from "@/lib/templates/registry";

export const runtime = "nodejs";

const MAX_PREVIEW_PAYLOAD_CHARS = 1_000_000;

export async function POST(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const cvId = typeof body?.cvId === "string" ? body.cvId : "";
  const templateId = typeof body?.templateId === "string" ? body.templateId : "";
  const colorThemeId = typeof body?.colorThemeId === "string" ? body.colorThemeId : "";

  if (!cvId || !templateId || !body?.data) {
    return NextResponse.json({ error: "Invalid preview request" }, { status: 400 });
  }

  if (JSON.stringify(body.data).length > MAX_PREVIEW_PAYLOAD_CHARS) {
    return NextResponse.json({ error: "Preview data is too large" }, { status: 413 });
  }

  const ownsCv = await prisma.cVDocument.findFirst({
    where: { id: cvId, userId: user.id },
    select: { id: true },
  });
  if (!ownsCv) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  const parsed = cvSchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid CV data" }, { status: 400 });
  }

  const safeTemplateId = Object.hasOwn(templateRegistry, templateId)
    ? templateId
    : "professional";
  const safeThemeId = colorThemeId || getDefaultThemeId(safeTemplateId);
  const pdf = await generatePDF(parsed.data, safeTemplateId, safeThemeId);
  const pages = await renderPdfPreviewImages(pdf);

  return NextResponse.json(
    { pages },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    },
  );
}
