#!/usr/bin/env python3
"""Generate a sorted JSON manifest of CSS files in the stylesheets directory."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STYLESHEETS_DIR = ROOT / "stylesheets"
OUTPUT_FILE = ROOT / "stylesheets.json"


def main() -> None:
    if not STYLESHEETS_DIR.is_dir():
        raise SystemExit(f"Stylesheet directory not found: {STYLESHEETS_DIR}")

    filenames = sorted(
        (path.name for path in STYLESHEETS_DIR.iterdir()
         if path.is_file() and path.suffix.lower() == ".css"),
        key=str.casefold,
    )

    if not filenames:
        raise SystemExit("No CSS stylesheets found; refusing to generate an empty manifest.")

    OUTPUT_FILE.write_text(
        json.dumps(filenames, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Generated {OUTPUT_FILE.name} with {len(filenames)} stylesheets.")


if __name__ == "__main__":
    main()
