from __future__ import annotations

import argparse

from common import fetch_json, load_sources, write_raw_snapshot


def build_api_url(source_key: str, api_url: str) -> str | None:
    if api_url:
        return api_url
    if source_key:
        return f"https://boards-api.greenhouse.io/v1/boards/{source_key}/jobs?content=true"
    return None


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch raw Greenhouse jobs for verified sources.")
    parser.add_argument("--status", nargs="+", default=["verified", "pilot"])
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--source-id", dest="source_ids", nargs="+", default=[])
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    sources = load_sources(provider="greenhouse", statuses=args.status, source_ids=args.source_ids)
    if args.limit > 0:
        sources = sources[: args.limit]

    fetched = 0
    skipped = 0

    for source in sources:
        api_url = build_api_url(source.source_key, source.api_url)
        if not api_url:
            skipped += 1
            print(f"skip {source.company_name}: no source_key/api_url")
            continue

        if args.dry_run:
            print(f"dry-run {source.company_name}: {api_url}")
            continue

        payload = fetch_json(api_url)
        output_path = write_raw_snapshot("greenhouse", source, api_url, payload)
        fetched += 1
        print(f"saved {source.company_name} -> {output_path}")

    print(f"greenhouse complete: fetched={fetched} skipped={skipped}")


if __name__ == "__main__":
    main()

