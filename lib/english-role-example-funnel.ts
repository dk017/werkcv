import {
  normalizeEnglishRoleExampleSlug,
  parseEnglishRoleExampleStartSource,
  englishRoleExamplePath,
  roleSlugFromEnglishRoleExamplePath,
  type EnglishRoleExampleEntryMethod,
  type EnglishRoleExampleSlug,
} from "./english-role-examples";

export type RoleExampleDocument = {
  id: string;
  userId: string | null;
  startSource: string | null;
  meaningful?: boolean;
  createdAt: Date;
};

export type RoleExampleEvent = {
  id?: string;
  cvId: string | null;
  event: string;
  createdAt: Date;
  path?: string | null;
  properties?: Record<string, unknown> | null;
};

export type RoleExamplePaidOrder = {
  cvId: string | null;
  paidAt: Date | null;
  amountCents?: number | null;
};

export type RoleExampleSignup = {
  userId: string;
  roleSlug: EnglishRoleExampleSlug;
};

export type EnglishRoleExampleDeviceType = "mobile" | "tablet" | "desktop" | "bot" | "unknown";

export type EnglishRoleExampleDeviceBreakdown = {
  deviceType: EnglishRoleExampleDeviceType;
  visitors: number;
  rolePageSessions: number;
  exampleStarts: number;
  uploadStarts: number;
};

export type EnglishRoleExampleFunnelRow = {
  roleSlug: EnglishRoleExampleSlug;
  landingPagePath: string;
  visitors: number;
  rolePageSessions: number;
  exampleStarts: number;
  uploadStarts: number;
  signups: number;
  created: number;
  meaningful: number;
  ready: number;
  preview: number;
  checkout: number;
  paid: number;
  paidOrders: number;
  revenueCents: number;
  meaningfulRate: number | null;
  readyRate: number | null;
  previewRate: number | null;
  checkoutRate: number | null;
  paidRate: number | null;
  deviceBreakdown: EnglishRoleExampleDeviceBreakdown[];
};

function percentage(value: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return Math.round((value / denominator) * 1000) / 10;
}

function stageForEvent(event: string): "ready" | "preview" | "checkout" | null {
  if (event === "ready_to_download_viewed") return "ready";
  if (event === "full_preview_opened") return "preview";
  if (event === "checkout_start" || event === "checkout_started") return "checkout";
  return null;
}

function sourceRoleForEvent(event: RoleExampleEvent): EnglishRoleExampleSlug | null {
  const explicitRole = normalizeEnglishRoleExampleSlug(event.properties?.roleSlug);
  if (explicitRole) return explicitRole;
  return roleSlugFromEnglishRoleExamplePath(event.path);
}

function entryMethodForEvent(event: RoleExampleEvent): EnglishRoleExampleEntryMethod | null {
  if (event.properties?.entryMethod === "upload") return "upload";
  if (event.properties?.entryMethod === "example") return "example";
  const parsed = parseEnglishRoleExampleStartSource(event.properties?.entryPoint);
  return parsed?.entryMethod || null;
}

function deviceTypeForEvent(event: RoleExampleEvent): EnglishRoleExampleDeviceType {
  const value = event.properties?.deviceType;
  return value === "mobile" || value === "tablet" || value === "desktop" || value === "bot"
    ? value
    : "unknown";
}

function pathForEvent(event: RoleExampleEvent): string | null {
  if (typeof event.path !== "string" || !event.path.startsWith("/")) return null;
  return event.path.split(/[?#]/, 1)[0] || null;
}

function addRoleMap<T>(map: Map<EnglishRoleExampleSlug, T>, roleSlug: EnglishRoleExampleSlug, value: T): void {
  if (!map.has(roleSlug)) map.set(roleSlug, value);
}

/**
 * Aggregates unique users, never raw emails or event payloads. The input is
 * deliberately plain so the same definition can be used in tests and in the
 * private admin report.
 */
export function aggregateEnglishRoleExampleFunnel(
  documents: RoleExampleDocument[],
  events: RoleExampleEvent[],
  paidOrders: RoleExamplePaidOrder[],
  signups: RoleExampleSignup[] = [],
  includedRoleSlugs: EnglishRoleExampleSlug[] = [],
): EnglishRoleExampleFunnelRow[] {
  const roleByCv = new Map<string, EnglishRoleExampleSlug>();
  const documentById = new Map<string, RoleExampleDocument>();
  const usersByRole = new Map<EnglishRoleExampleSlug, Set<string>>();
  const stageUsers = new Map<EnglishRoleExampleSlug, Record<"ready" | "preview" | "checkout" | "paid", Set<string>>>();
  const visitorsByRole = new Map<EnglishRoleExampleSlug, Set<string>>();
  const sessionsByRole = new Map<EnglishRoleExampleSlug, Set<string>>();
  const exampleStartsByRole = new Map<EnglishRoleExampleSlug, Set<string>>();
  const uploadStartsByRole = new Map<EnglishRoleExampleSlug, Set<string>>();
  const signupsByRole = new Map<EnglishRoleExampleSlug, Set<string>>();
  const meaningfulUsersByRole = new Map<EnglishRoleExampleSlug, Set<string>>();
  const landingPathsByRole = new Map<EnglishRoleExampleSlug, Set<string>>();
  const deviceVisitorsByRole = new Map<EnglishRoleExampleSlug, Map<EnglishRoleExampleDeviceType, Set<string>>>();
  const deviceSessionsByRole = new Map<EnglishRoleExampleSlug, Map<EnglishRoleExampleDeviceType, Set<string>>>();
  const deviceExampleStartsByRole = new Map<EnglishRoleExampleSlug, Map<EnglishRoleExampleDeviceType, Set<string>>>();
  const deviceUploadStartsByRole = new Map<EnglishRoleExampleSlug, Map<EnglishRoleExampleDeviceType, Set<string>>>();
  const paidOrdersByRole = new Map<EnglishRoleExampleSlug, number>();
  const revenueByRole = new Map<EnglishRoleExampleSlug, number>();
  const includedRoles = new Set(includedRoleSlugs);

  const ensureRole = (roleSlug: EnglishRoleExampleSlug) => {
    addRoleMap(usersByRole, roleSlug, new Set<string>());
    addRoleMap(stageUsers, roleSlug, {
      ready: new Set<string>(),
      preview: new Set<string>(),
      checkout: new Set<string>(),
      paid: new Set<string>(),
    });
    addRoleMap(visitorsByRole, roleSlug, new Set<string>());
    addRoleMap(sessionsByRole, roleSlug, new Set<string>());
    addRoleMap(exampleStartsByRole, roleSlug, new Set<string>());
    addRoleMap(uploadStartsByRole, roleSlug, new Set<string>());
    addRoleMap(signupsByRole, roleSlug, new Set<string>());
    addRoleMap(meaningfulUsersByRole, roleSlug, new Set<string>());
    addRoleMap(landingPathsByRole, roleSlug, new Set<string>());
    addRoleMap(deviceVisitorsByRole, roleSlug, new Map());
    addRoleMap(deviceSessionsByRole, roleSlug, new Map());
    addRoleMap(deviceExampleStartsByRole, roleSlug, new Map());
    addRoleMap(deviceUploadStartsByRole, roleSlug, new Map());
    if (!paidOrdersByRole.has(roleSlug)) paidOrdersByRole.set(roleSlug, 0);
    if (!revenueByRole.has(roleSlug)) revenueByRole.set(roleSlug, 0);
  };

  for (const roleSlug of includedRoleSlugs) ensureRole(roleSlug);

  for (const document of documents) {
    const parsed = parseEnglishRoleExampleStartSource(document.startSource);
    if (!parsed) continue;
    if (includedRoles.size > 0 && !includedRoles.has(parsed.roleSlug)) continue;
    ensureRole(parsed.roleSlug);
    roleByCv.set(document.id, parsed.roleSlug);
    documentById.set(document.id, document);
    if (document.userId) {
      usersByRole.get(parsed.roleSlug)?.add(document.userId);
      if (document.meaningful) meaningfulUsersByRole.get(parsed.roleSlug)?.add(document.userId);
    }
  }

  events.forEach((event, index) => {
    const cvRole = event.cvId ? roleByCv.get(event.cvId) : null;
    const explicitRole = sourceRoleForEvent(event);
    const roleSlug = cvRole || explicitRole;
    if (roleSlug && includedRoles.size > 0 && !includedRoles.has(roleSlug)) return;
    if (roleSlug) ensureRole(roleSlug);
    if (!roleSlug) return;

    const visitorId = typeof event.properties?.visitorId === "string" ? event.properties.visitorId : null;
    const sessionId = typeof event.properties?.sessionId === "string" ? event.properties.sessionId : null;
    const deviceType = deviceTypeForEvent(event);
    const eventPath = pathForEvent(event);
    if (eventPath && event.event === "page_view") landingPathsByRole.get(roleSlug)?.add(eventPath);
    if (event.event === "page_view") {
      if (visitorId) {
        visitorsByRole.get(roleSlug)?.add(visitorId);
        const byDevice = deviceVisitorsByRole.get(roleSlug)!;
        if (!byDevice.has(deviceType)) byDevice.set(deviceType, new Set<string>());
        byDevice.get(deviceType)?.add(visitorId);
      }
      if (sessionId) {
        sessionsByRole.get(roleSlug)?.add(sessionId);
        const byDevice = deviceSessionsByRole.get(roleSlug)!;
        if (!byDevice.has(deviceType)) byDevice.set(deviceType, new Set<string>());
        byDevice.get(deviceType)?.add(sessionId);
      }
    }
    if (event.event === "start_cv" || event.event === "landing_cta_click") {
      const method = entryMethodForEvent(event);
      const eventKey = visitorId || event.id || `${event.createdAt.toISOString()}-${index}`;
      if (method === "upload") {
        uploadStartsByRole.get(roleSlug)?.add(eventKey);
        const byDevice = deviceUploadStartsByRole.get(roleSlug)!;
        if (!byDevice.has(deviceType)) byDevice.set(deviceType, new Set<string>());
        byDevice.get(deviceType)?.add(eventKey);
      }
      if (method === "example") {
        exampleStartsByRole.get(roleSlug)?.add(eventKey);
        const byDevice = deviceExampleStartsByRole.get(roleSlug)!;
        if (!byDevice.has(deviceType)) byDevice.set(deviceType, new Set<string>());
        byDevice.get(deviceType)?.add(eventKey);
      }
    }

    if (!event.cvId) return;
    const stage = stageForEvent(event.event);
    if (!stage) return;
    // A missing user on the source document is intentionally not counted in a
    // certified unique-user funnel.
    const document = documentById.get(event.cvId);
    if (!document?.userId) return;
    stageUsers.get(roleSlug)?.[stage].add(document.userId);
  });

  for (const signup of signups) {
    ensureRole(signup.roleSlug);
    signupsByRole.get(signup.roleSlug)?.add(signup.userId);
  }

  for (const order of paidOrders) {
    if (!order.cvId || !order.paidAt) continue;
    const roleSlug = roleByCv.get(order.cvId);
    if (!roleSlug) continue;
    const document = documentById.get(order.cvId);
    if (!document?.userId) continue;
    stageUsers.get(roleSlug)?.paid.add(document.userId);
    paidOrdersByRole.set(roleSlug, (paidOrdersByRole.get(roleSlug) || 0) + 1);
    revenueByRole.set(roleSlug, (revenueByRole.get(roleSlug) || 0) + Math.max(0, order.amountCents || 0));
  }

  return [...new Set([...usersByRole.keys(), ...visitorsByRole.keys(), ...signupsByRole.keys()])]
    .sort((left, right) => left.localeCompare(right))
    .map((roleSlug) => {
      const createdUsers = usersByRole.get(roleSlug) || new Set<string>();
      const stages = stageUsers.get(roleSlug)!;
      const created = createdUsers.size;
      const ready = stages.ready.size;
      const preview = stages.preview.size;
      const checkout = stages.checkout.size;
      const paid = stages.paid.size;
      return {
        roleSlug,
        landingPagePath: [...(landingPathsByRole.get(roleSlug) || [])].sort()[0] || englishRoleExamplePath(roleSlug) || "",
        visitors: visitorsByRole.get(roleSlug)?.size || 0,
        rolePageSessions: sessionsByRole.get(roleSlug)?.size || 0,
        exampleStarts: exampleStartsByRole.get(roleSlug)?.size || 0,
        uploadStarts: uploadStartsByRole.get(roleSlug)?.size || 0,
        signups: signupsByRole.get(roleSlug)?.size || 0,
        created,
        meaningful: meaningfulUsersByRole.get(roleSlug)?.size || 0,
        ready,
        preview,
        checkout,
        paid,
        paidOrders: paidOrdersByRole.get(roleSlug) || 0,
        revenueCents: revenueByRole.get(roleSlug) || 0,
        meaningfulRate: percentage(meaningfulUsersByRole.get(roleSlug)?.size || 0, created),
        readyRate: percentage(ready, created),
        previewRate: percentage(preview, created),
        checkoutRate: percentage(checkout, created),
        paidRate: percentage(paid, created),
        deviceBreakdown: (["mobile", "tablet", "desktop", "bot", "unknown"] as const)
          .map((deviceType) => ({
            deviceType,
            visitors: deviceVisitorsByRole.get(roleSlug)?.get(deviceType)?.size || 0,
            rolePageSessions: deviceSessionsByRole.get(roleSlug)?.get(deviceType)?.size || 0,
            exampleStarts: deviceExampleStartsByRole.get(roleSlug)?.get(deviceType)?.size || 0,
            uploadStarts: deviceUploadStartsByRole.get(roleSlug)?.get(deviceType)?.size || 0,
          }))
          .filter((breakdown) => breakdown.visitors || breakdown.rolePageSessions || breakdown.exampleStarts || breakdown.uploadStarts),
      };
    });
}
