import { createHash } from "node:crypto";
import { siteBaseUrl } from "@/lib/ai-discovery";
import { MCP_SERVER_INFO } from "./server";

// Discovery documents for the remote MCP server (/api/mcp).
// Server Card: github.com/modelcontextprotocol/experimental-ext-server-card (schema.ts, docs/discovery.md).
// AI Catalog: github.com/Agent-Card/ai-catalog (specification/ai-catalog.md).
export const MCP_ENDPOINT_URL = `${siteBaseUrl}/api/mcp`;
export const SERVER_CARD_URL = `${MCP_ENDPOINT_URL}/server-card`;
export const SERVER_CARD_MEDIA_TYPE = "application/mcp-server-card+json";
export const AI_CATALOG_MEDIA_TYPE = "application/ai-catalog+json";

export const SERVER_CARD = {
  $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
  name: "nl.werkcv/cv-check",
  version: MCP_SERVER_INFO.version,
  description: "Checks a CV against Dutch hiring conventions and compares it with a vacancy.",
  title: "WerkCV",
  websiteUrl: siteBaseUrl,
  icons: [{ src: `${siteBaseUrl}/icon`, mimeType: "image/png", sizes: ["32x32"] }],
  remotes: [{ type: "streamable-http", url: MCP_ENDPOINT_URL, supportedProtocolVersions: ["2025-06-18"] }],
} as const;

export const AI_CATALOG = {
  specVersion: "1.0",
  host: { displayName: "WerkCV", identifier: "werkcv.nl", documentationUrl: `${siteBaseUrl}/llms.txt` },
  entries: [
    {
      identifier: "urn:air:werkcv.nl:mcp:cv-check",
      type: SERVER_CARD_MEDIA_TYPE,
      url: SERVER_CARD_URL,
      tags: ["cv", "resume", "netherlands", "vacancy-match"],
    },
  ],
} as const;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type, If-None-Match",
  "Access-Control-Expose-Headers": "ETag",
};

// JSON with the CORS, cache and ETag headers the Server Card discovery doc asks for; 404 while the MCP server is off.
// The spec media type goes to clients that ask for it, plain application/json to everyone else (older scanners check for it).
export function discoveryResponse(request: Request, document: object, mediaType: string): Response {
  if (process.env.MCP_ENABLED !== "true") return new Response("Not found", { status: 404 });
  const body = JSON.stringify(document, null, 2);
  const etag = `"${createHash("sha256").update(body).digest("hex").slice(0, 16)}"`;
  const headers = { ...CORS_HEADERS, "Cache-Control": "public, max-age=3600", ETag: etag, Vary: "Accept" };
  if (request.headers.get("if-none-match") === etag) return new Response(null, { status: 304, headers });
  const contentType = request.headers.get("accept")?.includes(mediaType) ? mediaType : "application/json";
  return new Response(body, { headers: { ...headers, "Content-Type": `${contentType}; charset=utf-8` } });
}

export function discoveryPreflight(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
