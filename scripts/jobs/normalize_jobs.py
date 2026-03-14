from __future__ import annotations

import html
import json
import re
from datetime import UTC, datetime
from pathlib import Path
from typing import Iterable

from common import RAW_DIR, ROOT_DIR, slugify
from schema import JobRoleFamily, JobSeniority, LanguageHint, NormalizedJob, Provider

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
        "dutch language is a requirement",
        "fluency in the dutch language",
        "(dutch)",
        "(dutch speaking)",
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


def has_any(text: str, markers: tuple[str, ...]) -> bool:
    return any(marker in text for marker in markers)


def infer_role_family(title: str, text: str) -> JobRoleFamily:
    title_lower = title.lower()

    if has_any(
        title_lower,
        (
            "accountant",
            "accounting",
            "finance",
            "financial",
            "controller",
            "fp&a",
            "treasury",
            "audit",
            "tax",
            "boekhouder",
            "payroll",
        ),
    ):
        return "finance_accounting"

    if has_any(
        title_lower,
        (
            "sales",
            "account executive",
            "account manager",
            "business development",
            "partnerships",
            "commercial",
            "revenue",
            "sdr",
            "bdr",
            "sales development representative",
        ),
    ):
        return "sales"

    if has_any(
        title_lower,
        (
            "marketing",
            "growth",
            "content",
            "brand",
            "communications",
            "seo",
            "social media",
            "demand generation",
            "campaign",
            "performance marketing",
        ),
    ):
        return "marketing"

    if has_any(
        title_lower,
        (
            "customer support",
            "customer service",
            "support engineer",
            "support specialist",
            "support representative",
            "helpdesk",
            "service desk",
            "customer care",
            "technical support",
        ),
    ):
        return "customer_support"

    if has_any(
        title_lower,
        (
            "customer success",
            "implementation consultant",
            "implementation manager",
            "onboarding",
            "adoption",
            "customer experience manager",
            "client success",
        ),
    ):
        return "customer_success"

    if has_any(
        title_lower,
        (
            "operations",
            "business operations",
            "project coordinator",
            "program manager",
            "office operations",
            "strategy & operations",
            "chief of staff",
            "business analyst",
        ),
    ):
        return "operations"

    if has_any(
        title_lower,
        (
            "logistics",
            "supply chain",
            "procurement",
            "warehouse",
            "inventory",
            "transport",
            "fulfillment",
            "planner",
        ),
    ):
        return "logistics_supply_chain"

    if has_any(
        title_lower,
        (
            "recruiter",
            "talent acquisition",
            "human resources",
            "hr ",
            "people partner",
            "people operations",
            "people ops",
        ),
    ):
        return "hr_people"

    if has_any(
        title_lower,
        (
            "legal",
            "counsel",
            "compliance",
            "privacy",
            "risk",
            "aml",
            "kyc",
            "governance",
        ),
    ):
        return "legal_compliance"

    if has_any(
        title_lower,
        (
            "administrative",
            "administrator",
            "receptionist",
            "office manager",
            "executive assistant",
            "personal assistant",
            "front desk",
            "office assistant",
        ),
    ):
        return "admin_office"

    if has_any(
        title_lower,
        (
            "product manager",
            "product designer",
            "ux",
            "ui",
            "user researcher",
            "service designer",
            "graphic designer",
            "brand designer",
        ),
    ):
        return "product_design"

    if has_any(
        title_lower,
        (
            "data scientist",
            "data analyst",
            "analytics engineer",
            "business intelligence",
            "bi analyst",
            "machine learning",
            "ml engineer",
            "ai engineer",
            "research scientist",
            "data engineer",
        ),
    ):
        return "data"

    if has_any(
        title_lower,
        (
            "software engineer",
            "developer",
            "frontend",
            "backend",
            "full stack",
            "fullstack",
            "devops",
            "site reliability",
            "sre",
            "security engineer",
            "platform engineer",
            "architect",
            "qa engineer",
            "test engineer",
        ),
    ):
        return "engineering"

    if has_any(
        title_lower,
        (
            "consultant",
            "analyst",
            "associate",
            "specialist",
            "coordinator",
        ),
    ):
        return "general_business"

    return "unknown"


def infer_seniority(title: str, employment_type: str | None, role_family: JobRoleFamily) -> JobSeniority:
    lowered_title = title.lower()
    lowered_employment = (employment_type or "").lower()
    combined = f"{lowered_title} {lowered_employment}"

    if has_any(combined, ("intern", "internship", "stage", "stagiair")):
        return "internship"
    if has_any(combined, ("graduate", "new grad", "trainee", "traineeship", "campus", "starter")):
        return "graduate"
    if has_any(combined, ("chief ", " ceo", " cfo", " cmo", " coo", "vp", "vice president", "president")):
        return "executive"
    if has_any(combined, ("director", "head of")):
        return "director"
    if has_any(combined, ("manager", "supervisor")):
        return "manager"
    if has_any(combined, ("lead", "principal", "staff ")):
        return "lead"
    if has_any(combined, ("senior", " sr", "sr.", "expert")):
        return "senior"
    if has_any(combined, ("junior", " jr", "jr.", "entry level")):
        return "junior"

    early_title_markers = ("assistant", "coordinator", "representative")
    if has_any(combined, early_title_markers):
        return "junior"

    if role_family in {"sales", "marketing", "customer_support", "customer_success", "operations", "finance_accounting", "admin_office", "hr_people"} and has_any(
        combined,
        ("associate", "specialist", "analyst"),
    ):
        return "junior"

    return "unknown"


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
    if job.role_family and job.role_family != "unknown":
        tags.append(f"role_{job.role_family}")
    if job.seniority and job.seniority != "unknown":
        tags.append(f"seniority_{job.seniority}")
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
        "roleFamily": job.role_family,
        "seniority": job.seniority,
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
        title = str(job.get("title") or "")
        inferred_city = infer_city_from_location(location_raw)
        combined_text = flatten_text((location_raw, description_text, title))
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
        role_family = infer_role_family(title, combined_text)
        seniority = infer_seniority(title, None, role_family)

        normalized_job = NormalizedJob(
            provider="greenhouse",
            external_id=str(job.get("id") or ""),
            company_slug=slugify(str(source.get("company_name") or "")),
            company_name=str(source.get("company_name") or ""),
            title=title,
            location_raw=location_raw,
            city=inferred_city,
            country_code=country_code,
            remote_mode=infer_remote_mode(location_raw, description_text),
            employment_type=None,
            language_hint=language_hint,
            dutch_required=dutch_required,
            visa_hint=infer_visa_hint(combined_text),
            role_family=role_family,
            seniority=seniority,
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
        title = str(job.get("text") or job.get("title") or "")
        description_text = flatten_text(
            (
                strip_html(str(job.get("description") or "")),
                strip_html(str(job.get("descriptionPlain") or "")),
                strip_html(str(job.get("additionalPlain") or "")),
            )
        )
        inferred_city = infer_city_from_location(location_raw)
        combined_text = flatten_text((location_raw, description_text, title))
        apply_url = str(job.get("hostedUrl") or job.get("applyUrl") or "")
        country_code = infer_country_code(location_raw, inferred_city)
        dutch_required = infer_dutch_required(combined_text)
        language_hint = apply_source_language_fallback(
            infer_language_hint(description_text),
            english_fit=str(source.get("english_fit") or ""),
            country_code=country_code,
            dutch_required=dutch_required,
        )
        employment_type = str(categories.get("commitment") or "") or None
        role_family = infer_role_family(title, combined_text)
        seniority = infer_seniority(title, employment_type, role_family)

        normalized_job = NormalizedJob(
            provider="lever",
            external_id=str(job.get("id") or ""),
            company_slug=slugify(str(source.get("company_name") or "")),
            company_name=str(source.get("company_name") or ""),
            title=title,
            location_raw=location_raw,
            city=inferred_city,
            country_code=country_code,
            remote_mode=infer_remote_mode(location_raw, description_text),
            employment_type=employment_type,
            language_hint=language_hint,
            dutch_required=dutch_required,
            visa_hint=infer_visa_hint(combined_text),
            role_family=role_family,
            seniority=seniority,
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
        employment_type = str(job.get("employmentType") or "") or None
        role_family = infer_role_family(title, combined_text)
        seniority = infer_seniority(title, employment_type, role_family)

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
            employment_type=employment_type,
            language_hint=language_hint,
            dutch_required=dutch_required,
            visa_hint=infer_visa_hint(combined_text),
            role_family=role_family,
            seniority=seniority,
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
