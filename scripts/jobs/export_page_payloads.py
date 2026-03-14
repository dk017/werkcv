from __future__ import annotations

import json
from datetime import UTC, datetime

from common import ROOT_DIR, slugify

NORMALIZED_PATH = ROOT_DIR / "data" / "jobs" / "normalized" / "jobs.json"
DERIVED_DIR = ROOT_DIR / "data" / "jobs" / "derived"
EXPORT_PATH = DERIVED_DIR / "job-pages.json"


def pick_cta(job: dict[str, object]) -> tuple[str, str]:
    if job.get("languageHint") == "english":
        return ("/en/dutch-cv-template", "Build a Dutch CV in English")
    if job.get("dutchRequired") is False:
        return ("/engels-cv-template", "Start with an English CV template")
    return ("/tools/ats-cv-checker", "Check your CV for ATS issues")


def is_publishable(job: dict[str, object]) -> bool:
    return job.get("countryCode") == "NL" or bool(job.get("city"))


def load_jobs() -> list[dict[str, object]]:
    if not NORMALIZED_PATH.exists():
        return []
    payload = json.loads(NORMALIZED_PATH.read_text(encoding="utf-8"))
    return payload.get("jobs", [])


def main() -> None:
    jobs = [job for job in load_jobs() if is_publishable(job)]
    DERIVED_DIR.mkdir(parents=True, exist_ok=True)

    page_payloads: list[dict[str, object]] = []
    for job in jobs:
        title = str(job.get("title") or "")
        company_slug = str(job.get("companySlug") or "")
        external_id = str(job.get("externalId") or "")
        slug = f"{slugify(title)}-{external_id}" if external_id else slugify(title)
        cta_href, cta_label = pick_cta(job)
        page_payloads.append(
            {
                "slug": slug,
                "jobPath": f"/jobs/{company_slug}/{slug}",
                "normalizedJob": job,
                "relatedClusters": list(job.get("clusterTags") or []),
                "primaryCtaHref": cta_href,
                "primaryCtaLabel": cta_label,
            }
        )

    EXPORT_PATH.write_text(
        json.dumps(
            {
                "generatedAt": datetime.now(UTC).isoformat(),
                "pages": page_payloads,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"page payloads saved -> {EXPORT_PATH} ({len(page_payloads)} pages)")


if __name__ == "__main__":
    main()
