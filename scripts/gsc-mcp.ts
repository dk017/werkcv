import "dotenv/config";

import { createSign } from "node:crypto";
import { readFileSync } from "node:fs";

import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

const DEFAULT_SITE_URL = "https://werkcv.nl/";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const SEARCH_CONSOLE_API_BASE = "https://www.googleapis.com/webmasters/v3";
const URL_INSPECTION_API_URL = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";

const dimensions = ["date", "query", "page", "country", "device", "searchAppearance"] as const;
const operators = [
  "equals",
  "contains",
  "notContains",
  "notEquals",
  "includingRegex",
  "excludingRegex",
] as const;

type GoogleServiceAccount = {
  client_email: string;
  private_key: string;
};

type GscRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

type SearchAnalyticsResponse = {
  rows?: GscRow[];
  responseAggregationType?: string;
  metadata?: Record<string, unknown>;
};

type SiteEntry = {
  siteUrl?: string;
  permissionLevel?: string;
};

type CachedToken = {
  accessToken: string;
  expiresAt: number;
};

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO date in YYYY-MM-DD format.");

const siteUrlSchema = z.string().min(1).refine(
  (value) => value.startsWith("sc-domain:") || URL.canParse(value),
  "Use a Search Console property URL or sc-domain:example.com.",
);

const filterSchema = z.object({
  dimension: z.enum(dimensions),
  operator: z.enum(operators).default("equals"),
  expression: z.string().min(1).max(4096),
});

const searchAnalyticsSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  dimensions: z.array(z.enum(dimensions)).min(1).max(4).optional(),
  filters: z.array(filterSchema).max(10).optional(),
  rowLimit: z.number().int().min(1).max(1000).optional(),
  startRow: z.number().int().min(0).max(100000).optional(),
  siteUrl: siteUrlSchema.optional(),
});

const inspectUrlSchema = z.object({
  inspectionUrl: z.string().url(),
  siteUrl: siteUrlSchema.optional(),
  languageCode: z.string().min(2).max(35).default("en-US"),
});

let cachedToken: CachedToken | undefined;

function base64Url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function readServiceAccount(): GoogleServiceAccount {
  const jsonBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  if (jsonBase64) {
    return normalizeServiceAccount(
      JSON.parse(Buffer.from(jsonBase64, "base64").toString("utf8")) as GoogleServiceAccount,
    );
  }

  const jsonRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (jsonRaw) {
    return normalizeServiceAccount(JSON.parse(jsonRaw) as GoogleServiceAccount);
  }

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credentialsPath) {
    try {
      return normalizeServiceAccount(JSON.parse(readFileSync(credentialsPath, "utf8")) as GoogleServiceAccount);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") {
        throw new Error(`GOOGLE_APPLICATION_CREDENTIALS file not found: ${credentialsPath}`);
      }
      throw error;
    }
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (clientEmail && privateKey) {
    return normalizeServiceAccount({ client_email: clientEmail, private_key: privateKey });
  }

  throw new Error(
    "Missing Google service-account credentials. Set GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_SERVICE_ACCOUNT_JSON_BASE64, or GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.",
  );
}

function normalizeServiceAccount(account: GoogleServiceAccount): GoogleServiceAccount {
  if (!account.client_email || !account.private_key) {
    throw new Error("Google service-account credentials must include client_email and private_key.");
  }

  return {
    client_email: account.client_email,
    private_key: account.private_key.replace(/\\n/g, "\n"),
  };
}

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 60) {
    return cachedToken.accessToken;
  }

  const account = readServiceAccount();
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: account.client_email,
      scope: GOOGLE_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsignedJwt = `${header}.${claim}`;
  const signature = createSign("RSA-SHA256").update(unsignedJwt).sign(account.private_key);
  const assertion = `${unsignedJwt}.${base64Url(signature)}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const body = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !body.access_token) {
    throw new Error(`Google token request failed: ${body.error || response.status} ${body.error_description || ""}`.trim());
  }

  cachedToken = {
    accessToken: body.access_token,
    expiresAt: now + (body.expires_in || 3600),
  };
  return body.access_token;
}

function configuredSiteUrl(): string {
  return process.env.GSC_SITE_URL?.trim() || DEFAULT_SITE_URL;
}

function assertConfiguredSite(siteUrl?: string): string {
  const configured = configuredSiteUrl();
  if (siteUrl && siteUrl !== configured) {
    throw new Error(
      `This local MCP is restricted to ${configured}. Change GSC_SITE_URL deliberately if you need another property.`,
    );
  }
  return configured;
}

function assertUrlBelongsToSite(inspectionUrl: string, siteUrl: string): void {
  const target = new URL(inspectionUrl);

  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase();
    if (target.hostname !== domain && !target.hostname.endsWith(`.${domain}`)) {
      throw new Error(`The inspected URL must be under the configured property ${siteUrl}.`);
    }
    return;
  }

  const property = new URL(siteUrl);

  if (target.origin !== property.origin || !target.pathname.startsWith(property.pathname)) {
    throw new Error(`The inspected URL must be under the configured property ${siteUrl}.`);
  }
}

async function googleJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const token = await getAccessToken();
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Google API request failed (${response.status}): ${responseText.slice(0, 600)}`);
  }

  return JSON.parse(responseText) as T;
}

async function listSites(): Promise<SiteEntry[]> {
  const response = await googleJson<{ siteEntry?: SiteEntry[] }>(`${SEARCH_CONSOLE_API_BASE}/sites`);
  return (response.siteEntry || []).map((site) => ({
    siteUrl: site.siteUrl,
    permissionLevel: site.permissionLevel,
  }));
}

async function querySearchAnalytics(input: z.infer<typeof searchAnalyticsSchema>): Promise<SearchAnalyticsResponse> {
  const siteUrl = assertConfiguredSite(input.siteUrl);
  const body = {
    startDate: input.startDate,
    endDate: input.endDate,
    dimensions: input.dimensions || ["query", "page"],
    type: "web",
    rowLimit: input.rowLimit || 1000,
    startRow: input.startRow || 0,
    ...(input.filters?.length
      ? {
          dimensionFilterGroups: [
            {
              groupType: "and",
              filters: input.filters.map((filter) => ({
                dimension: filter.dimension,
                operator: filter.operator,
                expression: filter.expression,
              })),
            },
          ],
        }
      : {}),
  };

  return googleJson<SearchAnalyticsResponse>(
    `${SEARCH_CONSOLE_API_BASE}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

async function inspectUrl(input: z.infer<typeof inspectUrlSchema>): Promise<unknown> {
  const siteUrl = assertConfiguredSite(input.siteUrl);
  assertUrlBelongsToSite(input.inspectionUrl, siteUrl);

  return googleJson(URL_INSPECTION_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inspectionUrl: input.inspectionUrl,
      siteUrl,
      languageCode: input.languageCode,
    }),
  });
}

function textResult(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
  };
}

function buildServer(): McpServer {
  const server = new McpServer(
    {
      name: "werkcv-search-console",
      version: "0.1.0",
    },
    {
      instructions:
        "This server is read-only and restricted to the configured WerkCV Google Search Console property. Use stable, complete date ranges. Search Console query/page results are directional and may omit anonymized or low-volume rows.",
    },
  );

  server.registerTool(
    "gsc_list_sites",
    {
      title: "List Search Console properties",
      description: "List the Google Search Console properties available to the configured service account. Read-only.",
      inputSchema: z.object({}),
    },
    async () => textResult({ configuredSiteUrl: configuredSiteUrl(), sites: await listSites() }),
  );

  server.registerTool(
    "gsc_search_analytics",
    {
      title: "Query Search Console performance",
      description:
        "Query clicks, impressions, CTR, and average position for the configured WerkCV property. Supports query/page combinations, filters, and pagination. Results are not guaranteed to contain every Search Console row.",
      inputSchema: searchAnalyticsSchema,
    },
    async (input) => {
      const siteUrl = assertConfiguredSite(input.siteUrl);
      const response = await querySearchAnalytics(input);
      return textResult({
        siteUrl,
        startDate: input.startDate,
        endDate: input.endDate,
        dimensions: input.dimensions || ["query", "page"],
        rowLimit: input.rowLimit || 1000,
        startRow: input.startRow || 0,
        ...response,
      });
    },
  );

  server.registerTool(
    "gsc_inspect_url",
    {
      title: "Inspect an indexed URL",
      description:
        "Read Google's indexed-version status for a URL under the configured WerkCV property. This does not run a live URL test and does not change Search Console.",
      inputSchema: inspectUrlSchema,
    },
    async (input) =>
      textResult({
        siteUrl: assertConfiguredSite(input.siteUrl),
        inspection: await inspectUrl(input),
      }),
  );

  return server;
}

const handle = serveStdio(buildServer, {
  onerror: (error) => console.error("WerkCV Search Console MCP error:", error),
});

process.on("SIGINT", async () => {
  await handle.close();
  process.exit(0);
});
