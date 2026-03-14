from __future__ import annotations

import csv
import json
import re
import urllib.request
from datetime import UTC, datetime
from pathlib import Path
from typing import Iterable

from schema import JobSource

ROOT_DIR = Path(__file__).resolve().parents[2]
SOURCES_PATH = ROOT_DIR / "data" / "jobs" / "company_sources.seed.csv"
RAW_DIR = ROOT_DIR / "data" / "jobs" / "raw"


def slugify(value: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower())
    return cleaned.strip("-") or "unknown"


def load_sources(
    provider: str | None = None,
    statuses: Iterable[str] = ("verified", "pilot"),
) -> list[JobSource]:
    allowed_statuses = {status.strip() for status in statuses if status.strip()}
    sources: list[JobSource] = []

    with SOURCES_PATH.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            if provider and row["provider"] != provider:
                continue
            if allowed_statuses and row["status"] not in allowed_statuses:
                continue
            sources.append(JobSource(**row))

    return sources


def fetch_json(url: str) -> object:
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": "WerkCV Jobs Fetcher/0.1",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = response.read().decode("utf-8")
    return json.loads(payload)


def write_raw_snapshot(provider: str, source: JobSource, api_url: str, payload: object) -> Path:
    output_dir = RAW_DIR / provider
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{slugify(source.company_name)}.json"

    wrapper = {
        "fetchedAt": datetime.now(UTC).isoformat(),
        "provider": provider,
        "apiUrl": api_url,
        "source": source.to_dict(),
        "payload": payload,
    }

    with output_path.open("w", encoding="utf-8") as handle:
        json.dump(wrapper, handle, ensure_ascii=False, indent=2)

    return output_path
