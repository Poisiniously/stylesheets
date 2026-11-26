const stylesheet = document.querySelector("#theme-stylesheet");
const themeSelect = document.querySelector("#theme-select");
const activeTheme = document.querySelector("#active-theme");
const form = document.querySelector(".demo-form");
const feedback = document.querySelector("#form-feedback");

const STYLESHEET_MANIFEST = "stylesheets.json";
const fallbackThemes = [
  "amber", "arctic", "cherry", "coffee", "cyberpunk",
  "forest", "graphite", "lavender", "minimal", "mint",
  "modern", "ocean", "retro", "rose", "sakura",
  "slate", "sunset", "terminal", "terracotta", "violet"
];

let themeNames = Object.create(null);

function getThemeName(filename) {
  return filename
    .replace(/\.css$/i, "")
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function populateThemeSelect(filenames) {
  const selectedTheme = themeSelect.value;
  themeNames = Object.create(null);
  themeSelect.replaceChildren();

  filenames
    .filter((filename) => typeof filename === "string" && filename.toLowerCase().endsWith(".css"))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .forEach((filename) => {
      const theme = filename.replace(/\.css$/i, "");
      const name = getThemeName(filename);
      themeNames[theme] = name;

      const option = document.createElement("option");
      option.value = theme;
      option.textContent = name;
      themeSelect.append(option);
    });

  if (Object.hasOwn(themeNames, selectedTheme)) {
    themeSelect.value = selectedTheme;
  }
}

async function discoverStylesheets() {
  try {
    const response = await fetch(STYLESHEET_MANIFEST, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Stylesheet manifest returned ${response.status}`);
    }

    const filenames = await response.json();
    if (!Array.isArray(filenames) || filenames.length === 0) {
      throw new Error("The stylesheet manifest is empty or invalid");
    }

    const currentTheme = themeSelect.value;
    populateThemeSelect(filenames);
    if (Object.hasOwn(themeNames, currentTheme)) {
      applyTheme(currentTheme);
    }
  } catch (error) {
    console.warn("Could not load stylesheets.json. Keeping the built-in theme list.", error);
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

function initializeThemes() {
  populateThemeSelect(fallbackThemes.map((theme) => `${theme}.css`));

  let savedTheme = "modern";
  try {
    savedTheme = localStorage.getItem("stylesheet-playground-theme") || "modern";
  } catch {
    // Use the default theme when browser storage is unavailable.
  }

  const initialTheme = Object.hasOwn(themeNames, savedTheme) ? savedTheme : "modern";
  applyTheme(initialTheme);

  // The build workflow generates this manifest by scanning stylesheets/.
  void discoverStylesheets();
}

themeSelect.addEventListener("change", (event) => {
  applyTheme(event.target.value);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "Demo submitted — no data was sent.";
});

initializeThemes();
