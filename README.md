# Stylesheet Playground

A small collection of reusable CSS themes with a live HTML showcase.

## Project structure

- `index.html` — the showcase page with typography, buttons, cards, badges, lists, progress bars and form controls.
- `script.js` — switches the active stylesheet and remembers the selected theme in local storage.
- `stylesheets/` — standalone theme files:
  - `modern.css`
  - `cyberpunk.css`
  - `minimal.css`
  - `retro.css`
  - `ocean.css`
  - `forest.css`
  - `rose.css`
  - `sunset.css`
  - `lavender.css`
  - `mint.css`
  - `amber.css`
  - `slate.css`
  - `arctic.css`
  - `cherry.css`
  - `coffee.css`
  - `graphite.css`
  - `sakura.css`
  - `terminal.css`
  - `terracotta.css`
  - `violet.css`

## Automatic theme discovery

The theme selector reads the contents of the `stylesheets/` folder from the GitHub repository through the GitHub Contents API. Every `.css` file in that folder is added to the dropdown automatically and sorted alphabetically.

To add a theme, add a CSS file to `stylesheets/` (for example, `my-theme.css`). It will appear in the selector after the site is refreshed and the GitHub Pages deployment is updated. Internet access is required for live discovery; a built-in fallback list is used if the API is unavailable.

## Run locally

Open `index.html` in a browser. No build tools or dependencies are required. An internet connection is only needed for the optional Google Fonts used by some themes.

## Add a stylesheet

1. Add a new CSS file in `stylesheets/`.
2. Add an option to the stylesheet selector in `index.html`.
3. Add its key and display name to `themeNames` in `script.js`.

Each stylesheet should style the shared class names in the showcase so that all components remain functional across themes.