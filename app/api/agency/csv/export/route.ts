import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canExportAgencyWork, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { stringifyCsv } from "@/lib/agency-csv";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const user = await getCurrentUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.ownerUserId) return NextResponse.json({ error: "An active Agency subscription is required." }, { status: 409 });
  if (!canExportAgencyWork(access)) return NextResponse.json({ error: "Your agency role cannot export data.", code: "ROLE_FORBIDDEN" }, { status: 403 });

  const packs = await prisma.agencyMatchPack.findMany({
    where: { userId: access.ownerUserId },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, vacancyTitle: true, status: true, analysis: true, clientOutcome: true, approvedAt: true, createdAt: true, updatedAt: true },
  });
  const csv = stringifyCsv(
    ["id", "title", "vacancyTitle", "status", "score", "clientOutcome", "approvedAt", "createdAt", "updatedAt"],
    packs.map((pack) => {
      const analysis = pack.analysis && typeof pack.analysis === "object" && !Array.isArray(pack.analysis)
        ? pack.analysis as { result?: { score?: number } }
        : {};
      return {
        id: pack.id,
        title: pack.title,
        vacancyTitle: pack.vacancyTitle || "",
        status: pack.status,
        score: analysis.result?.score ?? "",
        clientOutcome: pack.clientOutcome,
        approvedAt: pack.approvedAt?.toISOString() || "",
        createdAt: pack.createdAt.toISOString(),
        updatedAt: pack.updatedAt.toISOString(),
      };
    }),
  );
  return new NextResponse(`\ufeff${csv}`, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="werkcv-matchpacks-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
