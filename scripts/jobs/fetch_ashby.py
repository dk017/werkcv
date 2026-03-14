from __future__ import annotations

import argparse

from common import fetch_json, load_sources, write_raw_snapshot


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fetch raw Ashby jobs for verified sources. Requires api_url per source."
    )
    parser.add_argument("--status", nargs="+", default=["verified", "pilot"])
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    sources = load_sources(provider="ashby", statuses=args.status)
    if args.limit > 0:
        sources = sources[: args.limit]

    fetched = 0
    skipped = 0

    for source in sources:
        if not source.api_url:
            skipped += 1
            print(f"skip {source.company_name}: add api_url after verifying Ashby endpoint")
            continue

        if args.dry_run:
            print(f"dry-run {source.company_name}: {source.api_url}")
            continue

        payload = fetch_json(source.api_url)
        output_path = write_raw_snapshot("ashby", source, source.api_url, payload)
        fetched += 1
        print(f"saved {source.company_name} -> {output_path}")

    print(f"ashby complete: fetched={fetched} skipped={skipped}")


if __name__ == "__main__":
    main()
