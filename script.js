const stylesheet = document.querySelector("#theme-stylesheet");
const themeSelect = document.querySelector("#theme-select");
const activeTheme = document.querySelector("#active-theme");
const form = document.querySelector(".demo-form");
const feedback = document.querySelector("#form-feedback");

const STYLESHEET_DIRECTORY_API =
  "https://api.github.com/repos/Poisiniously/stylesheets/contents/stylesheets?ref=main";

// Used only if GitHub's API is unavailable, such as when the site is offline.
const fallbackThemes = [
  "amber", "arctic", "cherry", "coffee", "cyberpunk",
  "forest", "graphite", "lavender", "minimal", "mint",
  "modern", "ocean", "retro", "rose", "sakura",
  "slate", "sunset", "terminal", "terracotta", "violet"
];

let themeNames = Object.create(null);

function getThemeName(filename) {
  const slug = filename.slice(0, -4);
  return slug
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function populateThemeSelect(filenames) {
  themeNames = Object.create(null);
  themeSelect.replaceChildren();

  filenames
    .filter((filename) => filename.toLowerCase().endsWith(".css"))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .forEach((filename) => {
      const theme = filename.slice(0, -4);
      const name = getThemeName(filename);
      themeNames[theme] = name;

      const option = document.createElement("option");
      option.value = theme;
      option.textContent = name;
      themeSelect.append(option);
    });
}

async function discoverStylesheets() {
  try {
    const response = await fetch(STYLESHEET_DIRECTORY_API, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const files = await response.json();
    if (!Array.isArray(files)) {
      throw new Error("Unexpected stylesheet directory response");
    }

    const cssFiles = files
      .filter((file) => file.type === "file" && file.name.toLowerCase().endsWith(".css"))
      .map((file) => file.name);

    if (cssFiles.length === 0) {
      throw new Error("No CSS files were found in the stylesheets directory");
    }

    populateThemeSelect(cssFiles);
  } catch (error) {
    console.warn("Could not discover stylesheets from GitHub. Using fallback list.", error);
    populateThemeSelect(fallbackThemes.map((theme) => `${theme}.css`));
  }

}

function applyTheme(theme) {
  if (!Object.hasOwn(themeNames, theme)) return;

  stylesheet.href = `stylesheets/${theme}.css`;
  document.documentElement.dataset.theme = theme;
  themeSelect.value = theme;
  activeTheme.textContent = themeNames[theme];

  try {
    localStorage.setItem("stylesheet-playground-theme", theme);
  } catch {
    // The preview still works when browser storage is unavailable.
  }
}

async function initializeThemes() {
  // Populate a usable list immediately; refresh it from GitHub in the background.
  populateThemeSelect(fallbackThemes.map((theme) => `${theme}.css`));
  const firstTheme = Object.hasOwn(themeNames, "modern") ? "modern" : Object.keys(themeNames)[0];
  if (firstTheme) applyTheme(firstTheme);

  await discoverStylesheets();

  let savedTheme = "modern";
  try {
    savedTheme = localStorage.getItem("stylesheet-playground-theme") || "modern";
  } catch {
    // Use the default theme when browser storage is unavailable.
  }

  const initialTheme = Object.hasOwn(themeNames, savedTheme)
    ? savedTheme
    : Object.hasOwn(themeNames, "modern")
      ? "modern"
      : Object.keys(themeNames)[0];

  if (initialTheme) applyTheme(initialTheme);
}

themeSelect.addEventListener("change", (event) => {
  applyTheme(event.target.value);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "Demo submitted — no data was sent.";
});

initializeThemes();
