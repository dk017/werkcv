# WerkCV Search Console MCP

This repository includes a local, read-only MCP server for Google Search Console. It is intended for Codex to query WerkCV performance data without sending Search Console access through a hosted connector.

## Tools

- `gsc_list_sites` lists properties available to the configured Google service account.
- `gsc_search_analytics` queries clicks, impressions, CTR, and position by date, query, page, country, device, or search appearance. It supports filters and pagination.
- `gsc_inspect_url` reads Google's indexed-version inspection result for a WerkCV URL.

The server cannot add or remove properties, submit or delete sitemaps, request indexing, or modify the website.

## Credentials

The server uses the existing service-account environment variables:

```text
GSC_SITE_URL=https://werkcv.nl/
GOOGLE_APPLICATION_CREDENTIALS=C:\\secure\\werkcv-google-service-account.json
```

The service account must be granted access to the Search Console property. Keep the JSON file outside the repository and never commit it. The server requests only the read-only Search Console scope.

Live calls remain unavailable until `GOOGLE_APPLICATION_CREDENTIALS` points to a valid file or the JSON/email key variables are configured.

## Run locally

```text
npm run mcp:gsc
```

The command is a stdio server and will wait for an MCP client; it is not a web page or a standalone report command.

## Connect Codex

Add the following to the trusted project-level Codex configuration (`.codex/config.toml`) or add the equivalent stdio server in Codex settings:

```toml
[mcp_servers.werkcv_gsc]
command = "node"
args = ["node_modules/tsx/dist/cli.mjs", "scripts/gsc-mcp.ts"]
```

Start Codex from the repository root after configuring credentials. Verify that the server exposes the three tools, then begin with `gsc_list_sites` before querying performance data.

## Data interpretation

Search Console query/page results are evidence for prioritization, not complete keyword-to-sale attribution. For conversion analysis, combine them with GA4 landing-page data and WerkCV order data. Google may omit anonymized or low-volume rows, and page/query dimensions can return less complete totals than page-level aggregation.
