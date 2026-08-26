import { createHash } from "node:crypto";

/** Database idempotency key for one authenticated claim of a public draft. */
export function getPublicCvClaimKey(
  ownerUserId: string,
  agencySubscriptionId: string | null,
  draftId: string,
): string {
  return createHash("sha256")
    .update(`${ownerUserId}:${agencySubscriptionId || "personal"}:${draftId}`)
    .digest("hex");
}
