from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path

from common import ROOT_DIR

DERIVED_DIR = ROOT_DIR / "data" / "jobs" / "derived"
ENGLISH_NL_PATH = DERIVED_DIR / "english-speaking-jobs-netherlands.json"
JOB_PAGES_PATH = DERIVED_DIR / "job-pages.json"
CSV_PATH = DERIVED_DIR / "english-speaking-jobs-netherlands.csv"
REPORT_PATH = DERIVED_DIR / "jobs-review.md"


def load_json(path: Path) -> dict[str, object]:
    if not path.exists():
        raise FileNotFoundError(f"missing file: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    english_payload = load_json(ENGLISH_NL_PATH)
    jobs = english_payload.get("jobs", [])
    page_payload = load_json(JOB_PAGES_PATH)
    pages = page_payload.get("pages", [])

    page_path_by_key: dict[tuple[str, str], str] = {}
    for page in pages:
        normalized_job = page.get("normalizedJob", {})
        key = (
            str(normalized_job.get("companyName") or ""),
            str(normalized_job.get("externalId") or ""),
        )
        page_path_by_key[key] = str(page.get("jobPath") or "")

    CSV_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CSV_PATH.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "companyName",
                "title",
                "locationRaw",
                "city",
                "countryCode",
                "languageHint",
                "roleFamily",
                "seniority",
                "visaHint",
                "applyUrl",
                "jobPath",
            ],
        )
        writer.writeheader()
        for job in jobs:
            key = (str(job.get("companyName") or ""), str(job.get("externalId") or ""))
            writer.writerow(
                {
                    "companyName": job.get("companyName"),
                    "title": job.get("title"),
                    "locationRaw": job.get("locationRaw"),
                    "city": job.get("city"),
                    "countryCode": job.get("countryCode"),
                    "languageHint": job.get("languageHint"),
                    "roleFamily": job.get("roleFamily"),
                    "seniority": job.get("seniority"),
                    "visaHint": job.get("visaHint"),
                    "applyUrl": job.get("applyUrl"),
                    "jobPath": page_path_by_key.get(key, ""),
                }
            )

    company_counts = Counter(str(job.get("companyName") or "") for job in jobs)
    lines = [
        "# Jobs Review",
        "",
        f"- English-speaking NL jobs: `{len(jobs)}`",
        f"- Job page payloads: `{len(pages)}`",
        "",
        "## Companies",
        "",
    ]
    for company, count in company_counts.most_common():
        lines.append(f"- {company}: `{count}`")

    lines.extend(
        [
            "",
            "## Sample Jobs",
            "",
        ]
    )
    for job in jobs[:25]:
        key = (str(job.get("companyName") or ""), str(job.get("externalId") or ""))
        lines.append(
            "- "
            + " | ".join(
                [
                    str(job.get("companyName") or ""),
                    str(job.get("title") or ""),
                    str(job.get("locationRaw") or ""),
                    str(job.get("roleFamily") or ""),
                    str(job.get("seniority") or ""),
                    page_path_by_key.get(key, ""),
                ]
            )
        )

    REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"csv saved -> {CSV_PATH}")
    print(f"report saved -> {REPORT_PATH}")


if __name__ == "__main__":
    main()
