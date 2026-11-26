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

## Run locally

Open `index.html` in a browser. No build tools or dependencies are required. An internet connection is only needed for the optional Google Fonts used by some themes.

## Add a stylesheet

1. Add a new CSS file in `stylesheets/`.
2. Add an option to the stylesheet selector in `index.html`.
3. Add its key and display name to `themeNames` in `script.js`.

Each stylesheet should style the shared class names in the showcase so that all components remain functional across themes.