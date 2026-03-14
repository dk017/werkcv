from __future__ import annotations

import html
import json
import re
from datetime import UTC, datetime
from pathlib import Path
from typing import Iterable

from common import RAW_DIR, ROOT_DIR, slugify
from schema import LanguageHint, NormalizedJob, Provider

NORMALIZED_DIR = ROOT_DIR / "data" / "jobs" / "normalized"
NORMALIZED_PATH = NORMALIZED_DIR / "jobs.json"
NL_CITY_MAP = {
    "amsterdam": "Amsterdam",
    "rotterdam": "Rotterdam",
    "den haag": "The Hague",
    "the hague": "The Hague",
    "utrecht": "Utrecht",
    "eindhoven": "Eindhoven",
    "groningen": "Groningen",
    "tilburg": "Tilburg",
    "haarlem": "Haarlem",
    "leiden": "Leiden",
    "delft": "Delft",
    "breda": "Breda",
    "nijmegen": "Nijmegen",
    "maastricht": "Maastricht",
    "almere": "Almere",
    "hoofddorp": "Hoofddorp",
    "hilversum": "Hilversum",
    "veldhoven": "Veldhoven",
    "veghel": "Veghel",
}


def strip_html(value: str | None) -> str:
    if not value:
        return ""
    without_tags = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(without_tags)).strip()


def flatten_text(parts: Iterable[str | None]) -> str:
    return " ".join(part.strip() for part in parts if part and part.strip()).strip()


def infer_language_hint(text: str) -> LanguageHint:
    lowered = text.lower()
    english_markers = (
        "english",
        "working language",
        "international team",
        "fluent in english",
        "business english",
    )
    dutch_markers = (
        "nederlands",
        "dutch required",
        "vloeiend nederlands",
        "goede beheersing van de nederlandse taal",
    )

    has_english = any(marker in lowered for marker in english_markers)
    has_dutch = any(marker in lowered for marker in dutch_markers)

    if has_english and has_dutch:
        return "mixed"
    if has_english:
        return "english"
    if has_dutch:
        return "dutch"
    return "unknown"


def infer_dutch_required(text: str) -> bool | None:
    lowered = text.lower()
    strong_no = (
        "no dutch required",
        "dutch is not required",
        "without dutch",
        "english speaking environment",
        "english-speaking environment",
        "english only",
        "business language is english",
    )
    strong_yes = (
        "dutch required",
        "must speak dutch",
        "nederlands vereist",
        "vloeiend nederlands",
        "dutch speaking",
        "dutch speaker",
        "fluent dutch",
        "native dutch",
    )
    if any(marker in lowered for marker in strong_no):
        return False
    if any(marker in lowered for marker in strong_yes):
        return True
    return None


def infer_visa_hint(text: str) -> bool | None:
    lowered = text.lower()
    if any(
        marker in lowered
        for marker in (
            "visa sponsorship",
            "sponsorship available",
            "relocation support",
            "highly skilled migrant",
            "kennismigrant",
        )
    ):
        return True
    return None


def infer_remote_mode(location_raw: str, text: str) -> str | None:
    lowered = f"{location_raw} {text}".lower()
    if "hybrid" in lowered:
        return "hybrid"
    if "remote" in lowered or "work from home" in lowered:
        return "remote"
    if location_raw.strip():
        return "onsite"
    return None


def infer_city_from_location(location_raw: str) -> str | None:
    lowered = location_raw.lower()
    for marker, canonical in NL_CITY_MAP.items():
        if marker in lowered:
            return canonical
    return None


def infer_country_code(location_raw: str, city: str | None) -> str | None:
    lowered = location_raw.lower()
    if "netherlands" in lowered or "nederland" in lowered or city:
        return "NL"
    return None


def apply_source_language_fallback(
    language_hint: LanguageHint,
    *,
    english_fit: str,
    country_code: str | None,
    dutch_required: bool | None,
) -> LanguageHint:
    if language_hint != "unknown":
        return language_hint
    if country_code == "NL" and english_fit == "high" and dutch_required is not True:
        return "english"
    return language_hint


def cluster_tags_for_job(job: NormalizedJob) -> list[str]:
    tags: list[str] = []
    if job.city:
        tags.append(f"city_{slugify(job.city)}")
    if job.country_code == "NL":
        tags.append("country_nl")
    if job.language_hint in {"english", "mixed"}:
        tags.append("english_possible")
    if job.dutch_required is False:
        tags.append("without_dutch")
    if job.visa_hint:
        tags.append("visa_possible")
    return sorted(set(tags))


def job_to_payload(job: NormalizedJob) -> dict[str, object]:
    return {
        "provider": job.provider,
        "externalId": job.external_id,
        "companySlug": job.company_slug,
        "companyName": job.company_name,
        "title": job.title,
        "locationRaw": job.location_raw,
        "city": job.city,
        "countryCode": job.country_code,
        "remoteMode": job.remote_mode,
        "employmentType": job.employment_type,
        "languageHint": job.language_hint,
        "dutchRequired": job.dutch_required,
        "visaHint": job.visa_hint,
        "descriptionText": job.description_text,
        "applyUrl": job.apply_url,
        "postedAt": job.posted_at,
        "sourceUrl": job.source_url,
        "keywords": job.keywords,
        "clusterTags": job.cluster_tags,
    }


def normalize_greenhouse(payload: object, source: dict[str, object]) -> list[NormalizedJob]:
    jobs = payload.get("jobs", []) if isinstance(payload, dict) else []
    normalized: list[NormalizedJob] = []

    for job in jobs:
        if not isinstance(job, dict):
            continue
        location = job.get("location") or {}
        location_raw = ""
        if isinstance(location, dict):
            location_raw = str(location.get("name") or "")
        description_text = strip_html(str(job.get("content") or ""))
        inferred_city = infer_city_from_location(location_raw)
        combined_text = flatten_text((location_raw, description_text, str(job.get("title") or "")))
        country_code = infer_country_code(location_raw, inferred_city)
        dutch_required = infer_dutch_required(combined_text)
        language_hint = infer_language_hint(description_text)
        if language_hint == "unknown" and str(job.get("language") or "").lower() == "en":
            language_hint = "english"
        language_hint = apply_source_language_fallback(
            language_hint,
            english_fit=str(source.get("english_fit") or ""),
            country_code=country_code,
            dutch_required=dutch_required,
        )

        normalized_job = NormalizedJob(
            provider="greenhouse",
            external_id=str(job.get("id") or ""),
            company_slug=slugify(str(source.get("company_name") or "")),
            company_name=str(source.get("company_name") or ""),
            title=str(job.get("title") or ""),
            location_raw=location_raw,
            city=inferred_city,
            country_code=country_code,
            remote_mode=infer_remote_mode(location_raw, description_text),
            employment_type=None,
            language_hint=language_hint,
            dutch_required=dutch_required,
            visa_hint=infer_visa_hint(combined_text),
            description_text=description_text,
            apply_url=str(job.get("absolute_url") or job.get("url") or ""),
            posted_at=str(job.get("updated_at") or "") or None,
            source_url=str(job.get("absolute_url") or job.get("url") or ""),
            keywords=[],
            cluster_tags=[],
        )
        normalized_job.cluster_tags = cluster_tags_for_job(normalized_job)
        normalized.append(normalized_job)

    return normalized


def normalize_lever(payload: object, source: dict[str, object]) -> list[NormalizedJob]:
    jobs = payload if isinstance(payload, list) else []
    normalized: list[NormalizedJob] = []

    for job in jobs:
        if not isinstance(job, dict):
            continue
        categories = job.get("categories") or {}
        location_raw = str(categories.get("location") or job.get("categoriesText") or "")
        description_text = flatten_text(
            (
                strip_html(str(job.get("description") or "")),
                strip_html(str(job.get("descriptionPlain") or "")),
                strip_html(str(job.get("additionalPlain") or "")),
            )
        )
        inferred_city = infer_city_from_location(location_raw)
        combined_text = flatten_text((location_raw, description_text, str(job.get("text") or "")))
        apply_url = str(job.get("hostedUrl") or job.get("applyUrl") or "")
        country_code = infer_country_code(location_raw, inferred_city)
        dutch_required = infer_dutch_required(combined_text)
        language_hint = apply_source_language_fallback(
            infer_language_hint(description_text),
            english_fit=str(source.get("english_fit") or ""),
            country_code=country_code,
            dutch_required=dutch_required,
        )

        normalized_job = NormalizedJob(
            provider="lever",
            external_id=str(job.get("id") or ""),
            company_slug=slugify(str(source.get("company_name") or "")),
            company_name=str(source.get("company_name") or ""),
            title=str(job.get("text") or job.get("title") or ""),
            location_raw=location_raw,
            city=inferred_city,
            country_code=country_code,
            remote_mode=infer_remote_mode(location_raw, description_text),
            employment_type=str(categories.get("commitment") or "") or None,
            language_hint=language_hint,
            dutch_required=dutch_required,
            visa_hint=infer_visa_hint(combined_text),
            description_text=description_text,
            apply_url=apply_url,
            posted_at=str(job.get("createdAt") or "") or None,
            source_url=apply_url,
            keywords=[],
            cluster_tags=[],
        )
        normalized_job.cluster_tags = cluster_tags_for_job(normalized_job)
        normalized.append(normalized_job)

    return normalized


def normalize_generic(provider: Provider, payload: object, source: dict[str, object]) -> list[NormalizedJob]:
    records: list[dict[str, object]] = []
    if isinstance(payload, dict):
        for key in ("jobs", "jobPostings", "results"):
            value = payload.get(key)
            if isinstance(value, list):
                records = [item for item in value if isinstance(item, dict)]
                break

    normalized: list[NormalizedJob] = []
    for job in records:
        title = str(job.get("title") or job.get("name") or "")
        location_raw = str(job.get("location") or job.get("locationName") or "")
        description_text = flatten_text(
            (
                strip_html(str(job.get("description") or "")),
                strip_html(str(job.get("descriptionHtml") or "")),
                strip_html(str(job.get("content") or "")),
            )
        )
        inferred_city = infer_city_from_location(location_raw)
        combined_text = flatten_text((title, location_raw, description_text))
        apply_url = str(job.get("applyUrl") or job.get("url") or job.get("jobUrl") or "")
        country_code = infer_country_code(location_raw, inferred_city)
        dutch_required = infer_dutch_required(combined_text)
        language_hint = apply_source_language_fallback(
            infer_language_hint(description_text),
            english_fit=str(source.get("english_fit") or ""),
            country_code=country_code,
            dutch_required=dutch_required,
        )

        normalized_job = NormalizedJob(
            provider=provider,
            external_id=str(job.get("id") or job.get("jobId") or ""),
            company_slug=slugify(str(source.get("company_name") or "")),
            company_name=str(source.get("company_name") or ""),
            title=title,
            location_raw=location_raw,
            city=inferred_city,
            country_code=country_code,
            remote_mode=infer_remote_mode(location_raw, description_text),
            employment_type=str(job.get("employmentType") or "") or None,
            language_hint=language_hint,
            dutch_required=dutch_required,
            visa_hint=infer_visa_hint(combined_text),
            description_text=description_text,
            apply_url=apply_url,
            posted_at=str(job.get("postedAt") or "") or None,
            source_url=apply_url,
            keywords=[],
            cluster_tags=[],
        )
        normalized_job.cluster_tags = cluster_tags_for_job(normalized_job)
        normalized.append(normalized_job)

    return normalized


def normalize_snapshot(snapshot_path: Path) -> list[NormalizedJob]:
    raw = json.loads(snapshot_path.read_text(encoding="utf-8"))
    provider = raw.get("provider")
    source = raw.get("source", {})
    payload = raw.get("payload")

    if provider == "greenhouse":
        return normalize_greenhouse(payload, source)
    if provider == "lever":
        return normalize_lever(payload, source)
    if provider in {"ashby", "workable"}:
        return normalize_generic(provider, payload, source)
    return []


def main() -> None:
    jobs: list[dict[str, object]] = []

    if not RAW_DIR.exists():
        print(f"no raw jobs directory found at {RAW_DIR}")
        return

    for snapshot_path in sorted(RAW_DIR.rglob("*.json")):
        normalized_jobs = normalize_snapshot(snapshot_path)
        jobs.extend(job_to_payload(job) for job in normalized_jobs if job.external_id and job.title)

    NORMALIZED_DIR.mkdir(parents=True, exist_ok=True)
    NORMALIZED_PATH.write_text(
        json.dumps(
            {
                "generatedAt": datetime.now(UTC).isoformat(),
                "jobs": jobs,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"normalized jobs saved -> {NORMALIZED_PATH} ({len(jobs)} jobs)")


if __name__ == "__main__":
    main()

