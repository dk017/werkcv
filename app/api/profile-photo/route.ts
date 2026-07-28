import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { toFile } from "openai/uploads";
import openai from "@/lib/openai-client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CV_PROFILE_PHOTO_BUNDLE_PRODUCT } from "@/lib/polar";
import { claimProfilePhotoBundle, hasAvailableProfilePhotoBundle } from "@/lib/profile-photo-entitlements";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { saveProfilePhotoImage, StoredProfilePhotoImage } from "@/lib/profile-photo-storage";
import {
  buildProfilePhotoPrompt,
  profilePhotoClothingPreferences,
  profilePhotoExpressionPreferences,
  type ProfilePhotoClothingPreference,
  type ProfilePhotoExpressionPreference,
} from "@/lib/profile-photo-prompt";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const MAX_FILES = 4;
const MAX_TOTAL_SIZE = 24 * 1024 * 1024;
const MAX_REFINEMENT_LENGTH = 300;
const MAX_REFINEMENTS = 2;
const MAX_GENERATIONS = 1;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function sanitizeFileName(name: string): string {
  const cleanName = name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80);
  return cleanName || "profile-photo.jpg";
}

function imageUrl(projectId: string, imageId: string): string {
  return `/api/profile-photo/images/${encodeURIComponent(imageId)}?projectId=${encodeURIComponent(projectId)}`;
}

function parseImages(value: Prisma.JsonValue | null | undefined): StoredProfilePhotoImage[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is StoredProfilePhotoImage => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const record = item as Record<string, unknown>;
    return typeof record.id === "string" && typeof record.filename === "string";
  });
}

function serializeImages(projectId: string, images: StoredProfilePhotoImage[]) {
  return images.map((image) => ({
    id: image.id,
    url: imageUrl(projectId, image.id),
    kind: image.kind,
    style: image.style,
    createdAt: image.createdAt,
  }));
}

function buildRefinementPrompt(instruction: string): string {
  const safeInstruction = instruction.trim().slice(0, MAX_REFINEMENT_LENGTH);

  return [
    "Edit this generated professional portrait based on the user's refinement request.",
    `User request: "${safeInstruction}"`,
    "Keep the same overall portrait style, professional quality, lighting quality, crop, composition, and photorealistic look from the input image.",
    "Preserve the exact facial identity, face shape, age, skin tone, eye appearance, hairstyle, clothing, expression, mouth position, teeth visibility, and realistic skin texture unless the user directly requests a change to that specific attribute.",
    "Apply only the requested change. Do not re-style the image from scratch.",
    "If the user request conflicts with a professional CV, LinkedIn, or job-application profile photo, adapt it into the closest recruiter-safe professional version.",
    "Maintain a front-facing portrait, direct eye contact, chest-up crop, high-resolution photorealistic look, and clean professional presentation.",
    "Do not change ethnicity, age, face structure, body type, or identity. Do not add logos, text, watermarks, fantasy styling, face-covering props, offensive elements, or unrealistic filters.",
  ].join(" ");
}

function getFilesFromFormData(formData: FormData): File[] {
  const photos = formData.getAll("photos").filter((item): item is File => item instanceof File);
  const legacyPhoto = formData.get("photo");

  if (photos.length > 0) {
    return photos;
  }

  return legacyPhoto instanceof File ? [legacyPhoto] : [];
}

function getSafeErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Onbekende fout";
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return NextResponse.json({ authenticated: false }, { status: 401 });

  const projectId = request.nextUrl.searchParams.get("projectId");
  let project = projectId
    ? await prisma.profilePhotoProject.findFirst({ where: { id: projectId, userId: user.id } })
    : await prisma.profilePhotoProject.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

  if (project && project.status !== "paid") {
    const claim = await claimProfilePhotoBundle(user.email, project.id);
    if (claim.claimed) {
      project = await prisma.profilePhotoProject.findFirst({ where: { id: project.id, userId: user.id } });
    }
  }

  let bundleIncluded = await hasAvailableProfilePhotoBundle(user.email);
  if (project?.orderId) {
    const order = await prisma.order.findUnique({
      where: { id: project.orderId },
      select: { product: true },
    });
    bundleIncluded = bundleIncluded || order?.product === CV_PROFILE_PHOTO_BUNDLE_PRODUCT;
  }

  if (!project) {
    return NextResponse.json({
      authenticated: true,
      user: { email: user.email },
      bundleIncluded,
      project: null,
    });
  }

  const images = parseImages(project.images as Prisma.JsonValue | null);

  return NextResponse.json({
    authenticated: true,
    user: { email: user.email },
    bundleIncluded,
    project: {
      id: project.id,
      status: project.status,
      style: project.style,
      generationCount: project.generationCount,
      refinementCount: project.refinementCount,
      refinementsRemaining: Math.max(0, MAX_REFINEMENTS - project.refinementCount),
      maxRefinements: MAX_REFINEMENTS,
      images: serializeImages(project.id, images),
    },
  });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Log eerst in om je AI-profielfoto te maken." }, { status: 401 });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`${user.id}:${ip}`, {
    bucket: "profile-photo",
    maxRequests: 4,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Je hebt de tijdelijke limiet bereikt. Probeer het later opnieuw." },
      { status: 429 }
    );
  }

  try {
    let formData: FormData;

    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Upload eerst een geldige foto." },
        { status: 400 }
      );
    }

    const projectId = String(formData.get("projectId") ?? "").trim();
    const mode = String(formData.get("mode") ?? "generate");
    const photos = getFilesFromFormData(formData);
    const style = String(formData.get("style") ?? "executive");
    const clothingPreference = String(
      formData.get("clothingPreference") ?? "keep"
    ) as ProfilePhotoClothingPreference;
    const expressionPreference = String(
      formData.get("expressionPreference") ?? "keep"
    ) as ProfilePhotoExpressionPreference;
    const refinement = String(formData.get("refinement") ?? "").trim();

    let project = projectId
      ? await prisma.profilePhotoProject.findFirst({
          where: { id: projectId, userId: user.id },
        })
      : await prisma.profilePhotoProject.create({
          data: {
            userId: user.id,
            status: "draft",
            attribution: (user.attribution || undefined) as Prisma.InputJsonValue | undefined,
          },
        });

    if (!project) {
      return NextResponse.json(
        { error: "Project niet gevonden. Vernieuw de pagina en probeer opnieuw." },
        { status: 404 }
      );
    }

    if (project.status !== "paid") {
      const claim = await claimProfilePhotoBundle(user.email, project.id);
      if (claim.claimed) {
        const claimedProject = await prisma.profilePhotoProject.findFirst({
          where: { id: project.id, userId: user.id },
        });
        if (claimedProject) {
          project = claimedProject;
        }
      }
    }

    if (mode !== "generate" && mode !== "refine") {
      return NextResponse.json(
        { error: "Onbekende bewerkingsmodus." },
        { status: 400 }
      );
    }

    if (
      mode === "generate" &&
      (!profilePhotoClothingPreferences.has(clothingPreference) ||
        !profilePhotoExpressionPreferences.has(expressionPreference))
    ) {
      return NextResponse.json(
        { error: "Kies geldige voorkeuren voor kleding en gezichtsuitdrukking." },
        { status: 400 }
      );
    }

    if (mode === "generate" && project.generationCount >= MAX_GENERATIONS) {
      return NextResponse.json(
        { error: "Je eerste set profielfoto's is al gemaakt. Gebruik verfijnen voor kleine aanpassingen." },
        { status: 403 }
      );
    }

    if (mode === "refine" && project.refinementCount >= MAX_REFINEMENTS) {
      return NextResponse.json(
        { error: "Je hebt de 2 inbegrepen verfijningen gebruikt." },
        { status: 403 }
      );
    }

    if (photos.length === 0) {
      return NextResponse.json(
        { error: mode === "refine" ? "Kies eerst een gegenereerde foto om te verfijnen." : "Upload eerst minimaal één foto van jezelf." },
        { status: 400 }
      );
    }

    if (mode === "refine" && photos.length !== 1) {
      return NextResponse.json(
        { error: "Kies precies één gegenereerde foto om te verfijnen." },
        { status: 400 }
      );
    }

    if (mode === "generate" && photos.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Upload maximaal ${MAX_FILES} foto's.` },
        { status: 400 }
      );
    }

    if (mode === "refine" && refinement.length < 3) {
      return NextResponse.json(
        { error: "Beschrijf kort wat je wilt aanpassen." },
        { status: 400 }
      );
    }

    if (refinement.length > MAX_REFINEMENT_LENGTH) {
      return NextResponse.json(
        { error: `Maak je aanpassing korter dan ${MAX_REFINEMENT_LENGTH} tekens.` },
        { status: 400 }
      );
    }

    const totalSize = photos.reduce((sum, photo) => sum + photo.size, 0);

    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        { error: "Je foto's zijn samen te groot. Upload maximaal 24 MB totaal." },
        { status: 400 }
      );
    }

    const invalidType = photos.find((photo) => !ALLOWED_TYPES.has(photo.type));

    if (invalidType) {
      return NextResponse.json(
        { error: "Gebruik alleen JPG, PNG of WebP-afbeeldingen." },
        { status: 400 }
      );
    }

    const oversizedPhoto = photos.find((photo) => photo.size > MAX_FILE_SIZE);

    if (oversizedPhoto) {
      return NextResponse.json(
        { error: "Eén van je foto's is te groot. Upload maximaal 8 MB per foto." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY ontbreekt. Voeg deze lokaal toe om de profielfoto-generator te testen." },
        { status: 503 }
      );
    }

    const uploadables = await Promise.all(
      photos.map(async (photo) => {
        const buffer = Buffer.from(await photo.arrayBuffer());
        return toFile(buffer, sanitizeFileName(photo.name), {
          type: photo.type,
        });
      })
    );

    const response = await openai.images.edit({
      model: "gpt-image-2",
      image: uploadables.length === 1 ? uploadables[0] : uploadables,
      prompt:
        mode === "refine"
          ? buildRefinementPrompt(refinement)
          : buildProfilePhotoPrompt(style, clothingPreference, expressionPreference),
      n: mode === "refine" ? 2 : 4,
      size: "1024x1024",
      quality: "medium",
      output_format: "jpeg",
      background: "opaque",
    });

    const batchId = `${mode}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const generatedImages = (response.data ?? [])
      .map((image, index) => ({
        id: `profile-photo-${batchId}-${index + 1}`,
        base64: image.b64_json,
      }))
      .filter((image): image is { id: string; base64: string } => Boolean(image.base64));

    if (generatedImages.length === 0) {
      return NextResponse.json(
        { error: "Er is geen afbeelding gegenereerd. Probeer een duidelijkere foto." },
        { status: 502 }
      );
    }

    const storedImages = await Promise.all(
      generatedImages.map(async (image) => {
        const filename = await saveProfilePhotoImage({
          userId: user.id,
          projectId: project.id,
          imageId: image.id,
          base64: image.base64,
        });

        return {
          id: image.id,
          filename,
          kind: mode === "refine" ? "refined" : "generated",
          style,
          createdAt: new Date().toISOString(),
          refinement: mode === "refine" ? refinement : undefined,
        } satisfies StoredProfilePhotoImage;
      })
    );

    const existingImages = parseImages(project.images as Prisma.JsonValue | null);
    const nextImages = [...storedImages, ...existingImages];
    const nextRefinementCount = project.refinementCount + (mode === "refine" ? 1 : 0);
    const nextGenerationCount = project.generationCount + (mode === "generate" ? 1 : 0);

    const updatedProject = await prisma.profilePhotoProject.update({
      where: { id: project.id },
      data: {
        style,
        sourceImageCount: mode === "generate" ? photos.length : project.sourceImageCount,
        generationCount: nextGenerationCount,
        refinementCount: nextRefinementCount,
        images: nextImages as unknown as Prisma.InputJsonValue,
      },
    });

    await prisma.analyticsEvent.create({
      data: {
        event: mode === "refine" ? "profile_photo_refined" : "profile_photo_generated",
        path: "/profielfoto-cv-maken",
        properties: {
          projectId: project.id,
          style,
          ...(mode === "generate"
            ? { clothingPreference, expressionPreference }
            : {}),
          imagesGenerated: storedImages.length,
          refinementCount: nextRefinementCount,
          generationCount: nextGenerationCount,
        } as Prisma.InputJsonValue,
        attribution: (user.attribution || undefined) as Prisma.InputJsonValue | undefined,
      },
    });

    return NextResponse.json({
      images: serializeImages(project.id, storedImages),
      project: {
        id: project.id,
        status: updatedProject.status,
        generationCount: nextGenerationCount,
        refinementCount: nextRefinementCount,
        refinementsRemaining: Math.max(0, MAX_REFINEMENTS - nextRefinementCount),
        maxRefinements: MAX_REFINEMENTS,
        images: serializeImages(project.id, nextImages),
      },
    });
  } catch (error) {
    console.error("[profile-photo] generation failed", error);
    const debugMessage = process.env.NODE_ENV !== "production" || process.env.PROFILE_PHOTO_DEBUG_ERRORS === "true"
      ? ` Technische fout: ${getSafeErrorMessage(error)}`
      : "";

    return NextResponse.json(
      { error: `De profielfoto kon niet worden gemaakt. Probeer later opnieuw.${debugMessage}` },
      { status: 500 }
    );
  }
}
