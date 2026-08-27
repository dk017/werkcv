import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { authorizeCvDocument } from "@/lib/workspace/cv-authorization";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required", code: "AUTH_REQUIRED" },
      { status: 401, headers: noStoreHeaders },
    );
  }

  const cvId = request.nextUrl.searchParams.get("cvId")?.trim();
  if (!cvId) {
    return NextResponse.json(
      { error: "cvId is required", code: "CV_ID_REQUIRED" },
      { status: 400, headers: noStoreHeaders },
    );
  }

  try {
    const cv = await authorizeCvDocument(user.id, cvId, "read");
    if (cv.workspace.kind !== "personal") throw new Error("not-personal");
  } catch {
    return NextResponse.json(
      { error: "CV not found", code: "CV_NOT_FOUND" },
      { status: 404, headers: noStoreHeaders },
    );
  }

  const order = await prisma.order.findFirst({
    where: { cvId, paidAt: { not: null } },
    orderBy: { paidAt: "desc" },
    select: {
      id: true,
      product: true,
      amountCents: true,
      currency: true,
    },
  });

  return NextResponse.json(
    {
      paid: Boolean(order),
      order,
    },
    { headers: noStoreHeaders },
  );
}
