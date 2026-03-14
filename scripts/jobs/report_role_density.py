from __future__ import annotations

import json
from collections import Counter, defaultdict
from datetime import UTC, datetime
from pathlib import Path

from common import ROOT_DIR

NORMALIZED_PATH = ROOT_DIR / "data" / "jobs" / "normalized" / "jobs.json"
REPORT_PATH = ROOT_DIR / "data" / "jobs" / "derived" / "jobs-role-density.md"
JSON_REPORT_PATH = ROOT_DIR / "data" / "jobs" / "derived" / "jobs-role-density.json"
ROLE_PAGE_THRESHOLD_JOBS = 15
ROLE_PAGE_THRESHOLD_COMPANIES = 5
STARTER_PAGE_THRESHOLD_JOBS = 15
STARTER_PAGE_THRESHOLD_COMPANIES = 5
EARLY_CAREER_STAGES = {"internship", "graduate", "junior"}

ROLE_ROUTE_MAP = {
    "sales": "/jobs/english-speaking-sales-jobs-netherlands",
    "marketing": "/jobs/english-speaking-marketing-jobs-netherlands",
    "finance_accounting": "/jobs/english-speaking-finance-jobs-netherlands",
    "customer_support": "/jobs/english-speaking-customer-support-jobs-netherlands",
    "operations": "/jobs/english-speaking-operations-jobs-netherlands",
    "engineering": "/jobs/english-speaking-engineering-jobs-netherlands",
}

ROLE_LABELS = {
    "engineering": "Engineering",
    "data": "Data / AI",
    "product_design": "Product / Design",
    "sales": "Sales",
    "marketing": "Marketing",
    "customer_support": "Customer Support",
    "customer_success": "Customer Success",
    "operations": "Operations",
    "finance_accounting": "Finance / Accounting",
    "hr_people": "HR / People",
    "legal_compliance": "Legal / Compliance",
    "admin_office": "Admin / Office",
    "logistics_supply_chain": "Logistics / Supply Chain",
    "general_business": "Business",
    "unknown": "Unknown",
}

SENIORITY_LABELS = {
    "internship": "Internship",
    "graduate": "Graduate",
    "junior": "Junior",
    "mid": "Mid-level",
    "senior": "Senior",
    "lead": "Lead",
    "manager": "Manager",
    "director": "Director",
    "executive": "Executive",
    "unknown": "Unknown",
}


def load_jobs() -> list[dict[str, object]]:
    if not NORMALIZED_PATH.exists():
        return []
    payload = json.loads(NORMALIZED_PATH.read_text(encoding="utf-8"))
    return payload.get("jobs", [])


def is_nl_relevant(job: dict[str, object]) -> bool:
    if job.get("countryCode") == "NL":
        return True
    return bool(job.get("city"))


def is_english_friendly(job: dict[str, object]) -> bool:
    if not is_nl_relevant(job):
        return False
    if job.get("dutchRequired") is True:
        return False
    return job.get("languageHint") in {"english", "mixed"} or job.get("dutchRequired") is False


def companies_for_jobs(jobs: list[dict[str, object]]) -> int:
    return len({str(job.get("companySlug") or "") for job in jobs if job.get("companySlug")})


def main() -> None:
    jobs = load_jobs()
    nl_jobs = [job for job in jobs if is_nl_relevant(job)]
    english_jobs = [job for job in nl_jobs if is_english_friendly(job)]
    starter_jobs = [job for job in english_jobs if str(job.get("seniority") or "unknown") in EARLY_CAREER_STAGES]

    role_counts = Counter(str(job.get("roleFamily") or "unknown") for job in english_jobs)
    seniority_counts = Counter(str(job.get("seniority") or "unknown") for job in english_jobs)
    role_company_sets: dict[str, set[str]] = defaultdict(set)
    role_jobs: dict[str, list[dict[str, object]]] = defaultdict(list)
    for job in english_jobs:
        role = str(job.get("roleFamily") or "unknown")
        company_slug = str(job.get("companySlug") or "")
        if company_slug:
            role_company_sets[role].add(company_slug)
        role_jobs[role].append(job)

    role_seniority_counts: dict[str, Counter[str]] = defaultdict(Counter)
    for job in english_jobs:
        role = str(job.get("roleFamily") or "unknown")
        seniority = str(job.get("seniority") or "unknown")
        role_seniority_counts[role][seniority] += 1

    publishable_roles = []
    for role, count in role_counts.items():
        if role == "unknown":
            continue
        company_count = len(role_company_sets[role])
        if count >= ROLE_PAGE_THRESHOLD_JOBS and company_count >= ROLE_PAGE_THRESHOLD_COMPANIES:
            publishable_roles.append(
                {
                    "roleFamily": role,
                    "roleLabel": ROLE_LABELS.get(role, role),
                    "jobCount": count,
                    "companyCount": company_count,
                    "path": ROLE_ROUTE_MAP.get(role, f"/jobs/english-speaking-{role.replace('_', '-')}-jobs-netherlands"),
                }
            )

    starter_summary = {
        "jobCount": len(starter_jobs),
        "companyCount": companies_for_jobs(starter_jobs),
        "meetsThreshold": len(starter_jobs) >= STARTER_PAGE_THRESHOLD_JOBS and companies_for_jobs(starter_jobs) >= STARTER_PAGE_THRESHOLD_COMPANIES,
        "path": "/jobs/starter-jobs-netherlands",
    }

    lines = [
        "# Jobs Role Density",
        "",
        f"Generated: `{datetime.now(UTC).isoformat()}`",
        "",
        "## Totals",
        "",
        f"- NL-relevant jobs: `{len(nl_jobs)}`",
        f"- English-friendly NL jobs: `{len(english_jobs)}`",
        f"- Starter-friendly English/NL jobs: `{len(starter_jobs)}`",
        f"- Starter-friendly companies: `{starter_summary['companyCount']}`",
        "",
        "## Publishable Role Pages",
        "",
    ]

    if publishable_roles:
        for item in sorted(publishable_roles, key=lambda row: (-row["jobCount"], row["roleLabel"])):
            lines.append(
                f"- {item['roleLabel']}: `{item['jobCount']}` jobs / `{item['companyCount']}` companies -> `{item['path']}`"
            )
    else:
        lines.append("- No role-family page currently meets the `15 jobs / 5 companies` threshold.")

    lines.extend(
        [
            "",
            "## Starter Page",
            "",
            f"- Starter jobs route: `{starter_summary['path']}`",
            f"- Jobs: `{starter_summary['jobCount']}`",
            f"- Companies: `{starter_summary['companyCount']}`",
            f"- Meets threshold: `{str(starter_summary['meetsThreshold']).lower()}`",
            "",
            "## Role Family Counts",
            "",
        ]
    )

    for role, count in role_counts.most_common():
        lines.append(
            f"- {ROLE_LABELS.get(role, role)}: `{count}` jobs / `{len(role_company_sets.get(role, set()))}` companies"
        )

    lines.extend([
        "",
        "## Seniority Counts",
        "",
    ])

    for seniority, count in seniority_counts.most_common():
        lines.append(f"- {SENIORITY_LABELS.get(seniority, seniority)}: `{count}`")

    lines.extend([
        "",
        "## Role x Seniority",
        "",
    ])

    for role, counts in sorted(role_seniority_counts.items(), key=lambda item: (-role_counts[item[0]], item[0])):
        if role == "unknown":
            continue
        parts = [
            f"{SENIORITY_LABELS.get(seniority, seniority)} `{count}`"
            for seniority, count in counts.most_common()
            if count > 0 and seniority != "unknown"
        ]
        if not parts:
            parts = ["No clear seniority signals yet"]
        lines.append(f"- {ROLE_LABELS.get(role, role)}: " + ", ".join(parts))

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")
    JSON_REPORT_PATH.write_text(
        json.dumps(
            {
                "generatedAt": datetime.now(UTC).isoformat(),
                "totals": {
                    "nlRelevantJobs": len(nl_jobs),
                    "englishFriendlyJobs": len(english_jobs),
                    "starterJobs": len(starter_jobs),
                    "starterCompanies": starter_summary["companyCount"],
                },
                "publishableRoles": publishable_roles,
                "starterSummary": starter_summary,
                "roleCounts": dict(role_counts),
                "seniorityCounts": dict(seniority_counts),
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"role density report saved -> {REPORT_PATH}")
    print(f"role density json saved -> {JSON_REPORT_PATH}")


if __name__ == "__main__":
    main()
