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

const storageRoot = process.env.PROFILE_PHOTO_STORAGE_DIR || path.join(process.cwd(), "local", "profile-photos");

function safeSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 120);
}

export function getProfilePhotoStoragePath(userId: string, projectId: string, filename: string): string {
  return path.join(storageRoot, safeSegment(userId), safeSegment(projectId), safeSegment(filename));
}

export async function saveProfilePhotoImage(params: {
  userId: string;
  projectId: string;
  imageId: string;
  base64: string;
}): Promise<string> {
  const directory = path.join(storageRoot, safeSegment(params.userId), safeSegment(params.projectId));
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
  return fs.readFile(getProfilePhotoStoragePath(params.userId, params.projectId, params.filename));
}
