from __future__ import annotations

import argparse
from urllib.error import HTTPError, URLError

from common import fetch_json, load_sources, write_raw_snapshot


def build_api_urls(source_key: str, api_url: str) -> list[str]:
    if api_url:
        return [api_url]
    if source_key:
        return [
            f"https://api.eu.lever.co/v0/postings/{source_key}?mode=json",
            f"https://api.lever.co/v0/postings/{source_key}?mode=json",
        ]
    return []


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch raw Lever jobs for verified sources.")
    parser.add_argument("--status", nargs="+", default=["verified", "pilot"])
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--source-id", dest="source_ids", nargs="+", default=[])
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    sources = load_sources(provider="lever", statuses=args.status, source_ids=args.source_ids)
    if args.limit > 0:
        sources = sources[: args.limit]

    fetched = 0
    skipped = 0
    failed = 0

    for source in sources:
        api_urls = build_api_urls(source.source_key, source.api_url)
        if not api_urls:
            skipped += 1
            print(f"skip {source.company_name}: no source_key/api_url")
            continue

        if args.dry_run:
            print(f"dry-run {source.company_name}: {' | '.join(api_urls)}")
            continue

        payload = None
        used_url = None
        for candidate_url in api_urls:
            try:
                payload = fetch_json(candidate_url)
                used_url = candidate_url
                break
            except (HTTPError, URLError) as error:
                print(f"retry {source.company_name}: {candidate_url} -> {error}")
                continue

        if payload is None or used_url is None:
            failed += 1
            print(f"failed {source.company_name}: no working Lever endpoint")
            continue

        output_path = write_raw_snapshot("lever", source, used_url, payload)
        fetched += 1
        print(f"saved {source.company_name} -> {output_path}")

    print(f"lever complete: fetched={fetched} skipped={skipped} failed={failed}")


if __name__ == "__main__":
    main()

