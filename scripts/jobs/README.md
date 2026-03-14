# Jobs Scripts

This folder contains the first scaffold for the jobs-layer ingestion pipeline.

Current scope:

- provider-specific raw fetch scripts
- shared seed-source loading
- shared job schema
- normalization / classification / page-payload scripts
- Postgres seed + import scripts for the public jobs MVP

Important:

- `data/jobs/company_sources.seed.csv` starts as a research file, not a fully verified source list.
- Fetch scripts only run against sources marked `verified` or `pilot`.
- `/jobs-preview` still reads generated JSON for QA.
- The public jobs MVP should move into Postgres via `JobSource`, `Job`, and `JobListingPage`.

## Files

- `schema.py` - shared `JobSource` and `NormalizedJob` data structures
- `common.py` - seed loading, JSON fetch helper, raw snapshot writer
- `fetch_greenhouse.py`
- `fetch_lever.py`
- `fetch_ashby.py`
- `fetch_workable.py`
- `normalize_jobs.py`
- `classify_jobs.py`
- `export_page_payloads.py`
- `seed-listing-pages.ts` - upsert curated `JobListingPage` rows into Postgres
- `import-to-db.ts` - upsert verified ATS jobs into `JobSource` + `Job`
- `../../lib/jobs/types.ts` - TypeScript mirror for the app layer
- `../../lib/jobs/listing-pages.ts` - curated listing-page seeds and filters

## Recommended workflow

1. Verify a small batch of companies from `company_sources.seed.csv`
2. Fill:
   - `provider`
   - `source_key` or `api_url`
   - `status=verified`
3. Run provider fetchers in `--dry-run` mode first
4. Save raw snapshots
5. Normalize raw snapshots into one shared job schema
6. Classify relevant NL + English-speaking clusters
7. Export page-ready payloads for QA
8. Seed curated `JobListingPage` definitions into Postgres
9. Import verified ATS jobs into `JobSource` + `Job`

## Example commands

```bash
python scripts/jobs/fetch_greenhouse.py --dry-run
python scripts/jobs/fetch_lever.py --dry-run
python scripts/jobs/normalize_jobs.py
python scripts/jobs/classify_jobs.py
python scripts/jobs/export_page_payloads.py
npm run jobs:seed:listings
npm run jobs:import:db
```

## Dry-run note

In this sandbox, `tsx` cannot spawn `esbuild`, so local verification used a `tsc -> node` path.
In a normal environment, the npm scripts above are the intended entrypoints.
