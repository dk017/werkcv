import { prisma } from "@/lib/prisma";
import { getAgencyDocumentAccessForUser, canDeleteAgencyDraft, canDeleteApprovedAgencyWork, canEditAgencyDraft, canExportAgencyWork } from "@/lib/agency-access";
import { isAgencyCvStartSource } from "@/lib/agency-access";
import type { CvWorkspace, MatchPackWorkspaceRole } from "@/lib/workspace/types";

export type CvDocumentAction =
  | "read"
  | "edit_content"
  | "edit_design"
  | "delete"
  | "personal_checkout"
  | "personal_download"
  | "agency_export";

export type CvAuthorizationCode =
  | "AUTH_REQUIRED"
  | "CV_NOT_FOUND"
  | "CV_WORKSPACE_FORBIDDEN"
  | "ROLE_FORBIDDEN"
  | "MATCHPACK_SNAPSHOT_LOCKED"
  | "PERSONAL_CHECKOUT_REQUIRED"
  | "WORKSPACE_MIGRATION_REQUIRED";

export class CvAuthorizationError extends Error {
  readonly code: CvAuthorizationCode;

  constructor(code: CvAuthorizationCode, message?: string) {
    super(message || code);
    this.name = "CvAuthorizationError";
    this.code = code;
  }
}

type AuthorisedDocument = NonNullable<Awaited<ReturnType<typeof loadDocument>>> & {
  workspace: CvWorkspace;
  role: MatchPackWorkspaceRole | null;
};

async function loadDocument(id: string) {
  return prisma.cVDocument.findUnique({
    where: { id },
    include: { matchPack: { select: { id: true, status: true, approvedAt: true, userId: true } } },
  });
}

function legacyMarkedAsAgency(document: { startSource: string | null; sourceCluster: string | null }): boolean {
  return isAgencyCvStartSource(document.startSource, document.sourceCluster);
}

function isApproved(document: { matchPack: { approvedAt: Date | null; status: string } | null }): boolean {
  return Boolean(document.matchPack?.approvedAt || document.matchPack?.status === "approved");
}

function canReadRole(role: MatchPackWorkspaceRole): boolean {
  return role === "owner" || role === "editor" || role === "reviewer" || role === "viewer";
}

export async function authorizeCvDocument(
  actorUserId: string,
  id: string,
  action: CvDocumentAction,
): Promise<AuthorisedDocument> {
  const document = await loadDocument(id);
  if (!document) throw new CvAuthorizationError("CV_NOT_FOUND");

  if (!document.agencySubscriptionId) {
    if (legacyMarkedAsAgency(document)) {
      throw new CvAuthorizationError("WORKSPACE_MIGRATION_REQUIRED", "This CV is awaiting workspace classification.");
    }
    if (document.userId !== actorUserId) throw new CvAuthorizationError("CV_NOT_FOUND");
    if (action === "agency_export") throw new CvAuthorizationError("CV_WORKSPACE_FORBIDDEN");
    if (action === "personal_checkout" || action === "personal_download") {
      return { ...document, workspace: { kind: "personal", ownerUserId: actorUserId }, role: null };
    }
    return { ...document, workspace: { kind: "personal", ownerUserId: actorUserId }, role: null };
  }

  let access;
  try {
    access = await getAgencyDocumentAccessForUser(actorUserId, document.agencySubscriptionId);
  } catch {
    throw new CvAuthorizationError("CV_WORKSPACE_FORBIDDEN");
  }
  if (!access.subscription || access.subscription.id !== document.agencySubscriptionId || !canReadRole(access.role)) {
    throw new CvAuthorizationError("CV_WORKSPACE_FORBIDDEN");
  }

  const role = access.role;
  const approved = isApproved(document);
  if (action === "personal_checkout" || action === "personal_download") {
    throw new CvAuthorizationError("CV_WORKSPACE_FORBIDDEN");
  }
  if (action === "agency_export" && (access.state !== "active" || !canExportAgencyWork(access))) {
    throw new CvAuthorizationError("ROLE_FORBIDDEN");
  }
  if (action === "edit_content" && (!canEditAgencyDraft(access) || approved)) {
    throw new CvAuthorizationError(approved ? "MATCHPACK_SNAPSHOT_LOCKED" : "ROLE_FORBIDDEN");
  }
  if (action === "edit_design" && (!canEditAgencyDraft(access) || approved)) {
    throw new CvAuthorizationError(approved ? "MATCHPACK_SNAPSHOT_LOCKED" : "ROLE_FORBIDDEN");
  }
  if (action === "delete") {
    const allowed = approved ? canDeleteApprovedAgencyWork(access) : canDeleteAgencyDraft(access);
    if (!allowed) throw new CvAuthorizationError("ROLE_FORBIDDEN");
  }

  return {
    ...document,
    workspace: {
      kind: "matchpack",
      agencySubscriptionId: document.agencySubscriptionId,
      ownerUserId: access.ownerUserId || document.userId || actorUserId,
    },
    role,
  };
}
