import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canCreateAgencyWork, createAgencyCvDocumentsAtomically, getAgencyAccessForUser, isAgencyAccessError } from "@/lib/agency-access";
import { cvSchema } from "@/lib/cv";
import { AgencyCsvError, cvDataFromCsvRow, parseCsv } from "@/lib/agency-csv";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.ownerUserId) return json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canCreateAgencyWork(access)) return json({ error: "Your agency role cannot import CVs.", code: "ROLE_READ_ONLY" }, 403);
  if (!access.subscription?.retentionPolicySetAt) return json({ error: "Choose and confirm the Agency retention period before importing.", code: "RETENTION_POLICY_REQUIRED" }, 409);

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) return json({ error: "Choose a CSV file.", code: "FILE_REQUIRED" }, 400);
  if (file.size > 2 * 1024 * 1024) return json({ error: "The CSV must be smaller than 2 MB.", code: "FILE_TOO_LARGE" }, 400);
  let rows;
  try {
    rows = parseCsv(await file.text());
  } catch (error) {
    if (error instanceof AgencyCsvError) return json({ error: error.message, code: error.code }, 400);
    return json({ error: "The CSV could not be parsed.", code: "CSV_INVALID" }, 400);
  }
  if (!rows.length) return json({ error: "The CSV contains no data rows.", code: "CSV_EMPTY" }, 400);
  if (rows.length > 100) return json({ error: "Import up to 100 CV rows at a time.", code: "CSV_TOO_LARGE" }, 400);

  const errors: Array<{ row: number; message: string }> = [];
  const documents: Prisma.CVDocumentUncheckedCreateInput[] = [];
  for (const [index, row] of rows.entries()) {
    const parsed = cvSchema.safeParse(cvDataFromCsvRow(row));
    if (!parsed.success) {
      errors.push({ row: index + 2, message: "This row contains invalid CV data." });
      continue;
    }
    const cv = parsed.data;
    if (!cv.personal.name && !cv.personal.title && !cv.personal.summary) {
      errors.push({ row: index + 2, message: "Add at least name, professional title or summary." });
      continue;
    }
    documents.push({
      title: (row.title || cv.personal.name || "Imported CV").slice(0, 160),
      data: cv as unknown as Prisma.InputJsonValue,
      templateId: access.subscription?.templateId || "professional",
      colorThemeId: access.subscription?.colorThemeId || "classic-blue",
      sourceCluster: "agency-csv-import",
      sourceLocale: cv.personal.resumeLanguage || "nl",
      startSource: "agency_plan",
      userId: access.ownerUserId,
    });
  }
  if (errors.length) return json({ success: false, createdCount: 0, createdIds: [], errors }, 400);
  try {
    const created = await createAgencyCvDocumentsAtomically(access.ownerUserId, documents);
    return json({ success: true, createdCount: created.length, createdIds: created.map((document) => document.id), errors: [] });
  } catch (error) {
    if (isAgencyAccessError(error)) return json({ error: error.message, code: error.code, createdCount: 0 }, 409);
    return json({ error: "The import was not saved. No CVs were created.", code: "CSV_IMPORT_FAILED", createdCount: 0 }, 500);
  }
}
