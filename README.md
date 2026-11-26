# Stylesheet Playground

A small collection of reusable CSS themes with a live HTML showcase.

## Project structure

- `index.html` — the showcase page with typography, buttons, cards, badges, lists, progress bars and form controls.
- `script.js` — switches the active stylesheet and remembers the selected theme in local storage.
- `build.py` — scans the `stylesheets/` directory and generates `stylesheets.json`.
- `stylesheets.json` — generated manifest of available CSS themes.
- `stylesheets/` — standalone theme files.

## Automatic theme discovery

The build script scans the `stylesheets/` directory for every `.css` file and writes the sorted filenames to `stylesheets.json`. The website reads that manifest; it does not call the GitHub API.

The GitHub Actions workflow runs the build script whenever changes are pushed to `main`, then deploys the generated site to GitHub Pages. Add a new CSS file to `stylesheets/` and push it — no HTML or JavaScript edits are needed.

### Run the build locally

Requires Python 3. Run:

```bash
python build.py
```

This regenerates `stylesheets.json`. Then open the site through a local web server (for example, `python -m http.server 8000`) and visit `http://localhost:8000`.

## GitHub Pages setup

In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow in `.github/workflows/pages.yml` handles subsequent deployments.

## Add a stylesheet

1. Add a `.css` file inside `stylesheets/`.
2. Run `python build.py` locally, or simply push the new file and let GitHub Actions regenerate the manifest and deploy the site.

Each stylesheet should style the shared class names in the showcase so that all components remain functional across themes.
