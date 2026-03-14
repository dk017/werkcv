from __future__ import annotations

import json
from datetime import UTC, datetime

from common import ROOT_DIR

NORMALIZED_PATH = ROOT_DIR / "data" / "jobs" / "normalized" / "jobs.json"
DERIVED_DIR = ROOT_DIR / "data" / "jobs" / "derived"

CLUSTERS = {
    "english-speaking-jobs-netherlands": {
        "title": "English-speaking jobs in the Netherlands",
        "description": "Curated jobs in the Netherlands where English appears to be accepted or the team is international.",
    },
    "jobs-in-netherlands-without-dutch": {
        "title": "Jobs in the Netherlands without Dutch",
        "description": "Curated jobs in the Netherlands where Dutch does not appear to be required.",
    },
    "engelstalige-vacatures-nederland": {
        "title": "Engelstalige vacatures in Nederland",
        "description": "Vacatures in Nederland waarbij Engels waarschijnlijk volstaat of het team internationaal werkt.",
    },
    "visa-sponsorship-jobs-netherlands": {
        "title": "Visa sponsorship jobs in the Netherlands",
        "description": "Jobs where visa sponsorship or relocation support appears to be available.",
    },
}


def load_jobs() -> list[dict[str, object]]:
    if not NORMALIZED_PATH.exists():
        return []
    payload = json.loads(NORMALIZED_PATH.read_text(encoding="utf-8"))
    return payload.get("jobs", [])


def is_nl_job(job: dict[str, object]) -> bool:
    return job.get("countryCode") == "NL" or bool(job.get("city"))


def english_speaking(job: dict[str, object]) -> bool:
    return is_nl_job(job) and job.get("languageHint") in {"english", "mixed"}


def without_dutch(job: dict[str, object]) -> bool:
    return is_nl_job(job) and job.get("dutchRequired") is False


def visa_possible(job: dict[str, object]) -> bool:
    return is_nl_job(job) and job.get("visaHint") is True


def write_cluster(cluster_key: str, jobs: list[dict[str, object]]) -> None:
    meta = CLUSTERS[cluster_key]
    output_path = DERIVED_DIR / f"{cluster_key}.json"
    payload = {
        "clusterKey": cluster_key,
        "title": meta["title"],
        "description": meta["description"],
        "updatedAt": datetime.now(UTC).isoformat(),
        "jobs": jobs,
    }
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"cluster saved -> {output_path} ({len(jobs)} jobs)")


def main() -> None:
    jobs = load_jobs()
    DERIVED_DIR.mkdir(parents=True, exist_ok=True)

    english_jobs = [job for job in jobs if english_speaking(job)]
    without_dutch_jobs = [job for job in jobs if without_dutch(job)]
    visa_jobs = [job for job in jobs if visa_possible(job)]

    write_cluster("english-speaking-jobs-netherlands", english_jobs)
    write_cluster("jobs-in-netherlands-without-dutch", without_dutch_jobs)
    write_cluster("engelstalige-vacatures-nederland", english_jobs)
    write_cluster("visa-sponsorship-jobs-netherlands", visa_jobs)


if __name__ == "__main__":
    main()
