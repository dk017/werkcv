import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { readProfilePhotoImage, StoredProfilePhotoImage } from "@/lib/profile-photo-storage";

export const runtime = "nodejs";

function parseImages(value: Prisma.JsonValue | null | undefined): StoredProfilePhotoImage[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is StoredProfilePhotoImage => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const record = item as Record<string, unknown>;
    return typeof record.id === "string" && typeof record.filename === "string";
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ imageId: string }> }
) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  }

  const { imageId } = await context.params;
  const projectId = request.nextUrl.searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "projectId ontbreekt" }, { status: 400 });
  }

  const project = await prisma.profilePhotoProject.findFirst({
    where: {
      id: projectId,
      userId: user.id,
      status: "paid",
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  }

  const image = parseImages(project.images as Prisma.JsonValue | null).find((item) => item.id === imageId);

  if (!image) {
    return NextResponse.json({ error: "Afbeelding niet gevonden" }, { status: 404 });
  }

  try {
    const buffer = await readProfilePhotoImage({
      userId: user.id,
      projectId: project.id,
      filename: image.filename,
    });

    return new NextResponse(new Blob([new Uint8Array(buffer)], { type: "image/jpeg" }), {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `inline; filename="werkcv-profielfoto-${image.id}.jpg"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Afbeelding niet gevonden" }, { status: 404 });
  }
}
