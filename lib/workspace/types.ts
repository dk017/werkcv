export type WorkspaceKind = "personal" | "matchpack";

export type MatchPackWorkspaceState =
  | "active"
  | "pending"
  | "paused"
  | "expired"
  | "needs_sync";

export type MatchPackWorkspaceRole = "owner" | "editor" | "reviewer" | "viewer";

export type WorkspaceEntitlements = {
  /** False when this identity maps to more than one usable MatchPack workspace. */
  switcherEligible: boolean;
  personal: {
    available: true;
    href: "/mijn-cvs";
  };
  matchpack: null | {
    available: true;
    href: "/agency/account";
    companyName: string | null;
    state: MatchPackWorkspaceState;
    role: MatchPackWorkspaceRole;
    canCreate: boolean;
  };
};

export type CvWorkspace =
  | { kind: "personal"; ownerUserId: string }
  | {
      kind: "matchpack";
      agencySubscriptionId: string;
      ownerUserId: string;
    };

export type RouteWorkspaceContext =
  | "personal_public"
  | "personal_app"
  | "matchpack_marketing"
  | "matchpack_app"
  | "document_derived"
  | "auth_derived"
  | "private_external"
  | "embedded"
  | "admin"
  | "none";
