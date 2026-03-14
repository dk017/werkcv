from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Literal

SourceStatus = Literal["research", "pilot", "verified"]
Provider = Literal["greenhouse", "lever", "ashby", "workable", "unknown"]
EnglishFit = Literal["high", "medium", "low"]
RemoteMode = Literal["remote", "hybrid", "onsite"]
LanguageHint = Literal["english", "dutch", "mixed", "unknown"]
JobRoleFamily = Literal[
    "engineering",
    "data",
    "product_design",
    "sales",
    "marketing",
    "customer_support",
    "customer_success",
    "operations",
    "finance_accounting",
    "hr_people",
    "legal_compliance",
    "admin_office",
    "logistics_supply_chain",
    "general_business",
    "unknown",
]
JobSeniority = Literal[
    "internship",
    "graduate",
    "junior",
    "mid",
    "senior",
    "lead",
    "manager",
    "director",
    "executive",
    "unknown",
]


@dataclass(slots=True)
class JobSource:
    source_id: str
    status: SourceStatus
    priority: str
    company_name: str
    city: str
    segment: str
    english_fit: EnglishFit
    provider_hint: str
    provider: Provider
    source_key: str
    api_url: str
    careers_url: str
    notes: str

    def is_fetchable(self) -> bool:
        return self.status in {"pilot", "verified"} and self.provider != "unknown"

    def to_dict(self) -> dict[str, str]:
        return asdict(self)


@dataclass(slots=True)
class NormalizedJob:
    provider: Provider
    external_id: str
    company_slug: str
    company_name: str
    title: str
    location_raw: str
    city: str | None = None
    country_code: str | None = None
    remote_mode: RemoteMode | None = None
    employment_type: str | None = None
    language_hint: LanguageHint = "unknown"
    dutch_required: bool | None = None
    visa_hint: bool | None = None
    role_family: JobRoleFamily = "unknown"
    seniority: JobSeniority = "unknown"
    description_text: str = ""
    apply_url: str = ""
    posted_at: str | None = None
    source_url: str = ""
    keywords: list[str] = field(default_factory=list)
    cluster_tags: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, object]:
        return asdict(self)
