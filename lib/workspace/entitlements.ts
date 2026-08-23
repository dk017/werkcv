import { prisma } from "@/lib/prisma";
import { isAgencySubscriptionInPaidPeriod } from "@/lib/agency-plan";
import type {
  MatchPackWorkspaceRole,
  MatchPackWorkspaceState,
  WorkspaceEntitlements,
} from "@/lib/workspace/types";

type SubscriptionSummary = {
  id: string;
  userId: string;
  status: string;
  companyName: string | null;
  retentionPolicySetAt: Date | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
};

type ActiveMembershipSummary = {
  role: string;
  subscription: SubscriptionSummary;
};

export function selectMatchPackEntitlement(
  directSubscription: SubscriptionSummary | null,
  activeMemberships: ActiveMembershipSummary[],
): { subscription: SubscriptionSummary | null; role: MatchPackWorkspaceRole; switcherEligible: boolean } {
  const workspaceIds = new Set(activeMemberships.map((membership) => membership.subscription.id));
  if (directSubscription) workspaceIds.add(directSubscription.id);

  if (workspaceIds.size > 1) {
    return {
      subscription: directSubscription,
      role: directSubscription ? "owner" : "viewer",
      switcherEligible: false,
    };
  }
  if (directSubscription) return { subscription: directSubscription, role: "owner", switcherEligible: true };

  const membership = activeMemberships[0];
  return {
    subscription: membership?.subscription || null,
    role: normaliseRole(membership?.role),
    switcherEligible: true,
  };
}

export function isWorkspaceSwitcherEnabled(entitlements: Pick<WorkspaceEntitlements, "switcherEligible">): boolean {
  return process.env.WORKSPACE_SWITCHER_ENABLED === "true" && entitlements.switcherEligible;
}

function subscriptionState(subscription: SubscriptionSummary): MatchPackWorkspaceState {
  const status = subscription.status.trim().toLowerCase();
  if (status === "pending") return "pending";
  if (isAgencySubscriptionInPaidPeriod(subscription, new Date())) return "active";
  if (status === "expired" || status === "cancelled" || status === "canceled") return "expired";
  return "paused";
}

function normaliseRole(value: string | null | undefined): MatchPackWorkspaceRole {
  return value === "owner" || value === "editor" || value === "reviewer" || value === "viewer"
    ? value
    : "viewer";
}

/**
 * Read-only navigation summary. This deliberately does not call the operational
 * Agency access helper because that helper may create a usage period or accept
 * an invitation as a side effect.
 */
export async function getWorkspaceEntitlementsForUser(userId: string): Promise<WorkspaceEntitlements> {
  const directSubscription = await prisma.agencySubscription.findUnique({
    where: { userId },
    select: {
      id: true,
      userId: true,
      status: true,
      companyName: true,
      retentionPolicySetAt: true,
      currentPeriodStart: true,
      currentPeriodEnd: true,
      cancelAtPeriodEnd: true,
      canceledAt: true,
    },
  });

  const member = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  const activeMemberships = member
    ? await prisma.agencyTeamMember.findMany({
        where: {
          OR: [{ userId }, { email: member.email }],
          status: "active",
        },
        orderBy: { createdAt: "desc" },
        select: {
          role: true,
          subscription: {
            select: {
              id: true,
              userId: true,
              status: true,
              companyName: true,
              retentionPolicySetAt: true,
              currentPeriodStart: true,
              currentPeriodEnd: true,
              cancelAtPeriodEnd: true,
              canceledAt: true,
            },
          },
        },
      })
    : [];
  const { subscription, role, switcherEligible } = selectMatchPackEntitlement(directSubscription, activeMemberships);

  return {
    switcherEligible,
    personal: { available: true, href: "/mijn-cvs" },
    matchpack: subscription
      ? {
          available: true,
          href: "/agency/account",
          companyName: subscription.companyName,
          state: subscriptionState(subscription),
          role,
          canCreate: role === "owner" || role === "editor"
            ? subscriptionState(subscription) === "active"
            : false,
        }
      : null,
  };
}
