import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPTS_DIR = ROOT / "scripts" / "jobs"


def run(command, *, cwd=ROOT):
    print(f"\n>>> {' '.join(command)}")
    subprocess.run(command, cwd=str(cwd), check=True)


def npm_command():
    return "npm.cmd" if os.name == "nt" else "npm"


def main():
    python_bin = sys.executable
    npm_bin = npm_command()

    run([python_bin, str(SCRIPTS_DIR / "fetch_greenhouse.py")])
    run([python_bin, str(SCRIPTS_DIR / "fetch_lever.py")])
    run([python_bin, str(SCRIPTS_DIR / "fetch_ashby.py")])
    run([python_bin, str(SCRIPTS_DIR / "fetch_workable.py")])
    run([python_bin, str(SCRIPTS_DIR / "normalize_jobs.py")])
    run([python_bin, str(SCRIPTS_DIR / "classify_jobs.py")])
    run([python_bin, str(SCRIPTS_DIR / "export_page_payloads.py")])
    run([npm_bin, "run", "jobs:seed:listings"])
    run([npm_bin, "run", "jobs:import:db"])

    print("\nJobs refresh completed.")


if __name__ == "__main__":
    main()
