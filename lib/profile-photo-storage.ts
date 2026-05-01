import { promises as fs } from "fs";
import path from "path";

export type StoredProfilePhotoImage = {
  id: string;
  filename: string;
  kind: "generated" | "refined";
  style: string;
  createdAt: string;
  refinement?: string;
};

const defaultStorageRoot = path.join(process.cwd(), "local", "profile-photos");
const mountedStorageRoot = path.join(process.cwd(), "storage", "profile-photos");

function getStorageRoots(): string[] {
  return Array.from(
    new Set(
      [
        process.env.PROFILE_PHOTO_STORAGE_DIR,
        defaultStorageRoot,
        mountedStorageRoot,
      ].filter((root): root is string => Boolean(root))
    )
  );
}

function safeSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 120);
}

export function getProfilePhotoStoragePath(userId: string, projectId: string, filename: string): string {
  return path.join(getStorageRoots()[0], safeSegment(userId), safeSegment(projectId), safeSegment(filename));
}

export async function saveProfilePhotoImage(params: {
  userId: string;
  projectId: string;
  imageId: string;
  base64: string;
}): Promise<string> {
  const directory = path.join(getStorageRoots()[0], safeSegment(params.userId), safeSegment(params.projectId));
  await fs.mkdir(directory, { recursive: true });

  const filename = `${safeSegment(params.imageId)}.jpg`;
  await fs.writeFile(path.join(directory, filename), Buffer.from(params.base64, "base64"));
  return filename;
}

export async function readProfilePhotoImage(params: {
  userId: string;
  projectId: string;
  filename: string;
}): Promise<Buffer> {
  const relativeSegments = [
    safeSegment(params.userId),
    safeSegment(params.projectId),
    safeSegment(params.filename),
  ];

  for (const root of getStorageRoots()) {
    try {
      return await fs.readFile(path.join(root, ...relativeSegments));
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? error.code : null;
      if (code !== "ENOENT") {
        throw error;
      }
    }
  }

  return fs.readFile(path.join(getStorageRoots()[0], ...relativeSegments));
}
