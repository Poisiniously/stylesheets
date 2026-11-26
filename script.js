const stylesheet = document.querySelector("#theme-stylesheet");
const themeSelect = document.querySelector("#theme-select");
const activeTheme = document.querySelector("#active-theme");
const form = document.querySelector(".demo-form");
const feedback = document.querySelector("#form-feedback");

const themeNames = {
  amber: "Amber",
  arctic: "Arctic",
  cherry: "Cherry",
  coffee: "Coffee",
  cyberpunk: "Cyberpunk",
  forest: "Forest",
  graphite: "Graphite",
  lavender: "Lavender",
  minimal: "Minimal",
  mint: "Mint",
  modern: "Modern",
  ocean: "Ocean",
  retro: "Retro",
  rose: "Rose",
  sakura: "Sakura",
  slate: "Slate",
  sunset: "Sunset",
  terminal: "Terminal",
  terracotta: "Terracotta",
  violet: "Violet"
};

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

let savedTheme = "modern";
try {
  savedTheme = localStorage.getItem("stylesheet-playground-theme") || "modern";
} catch {
  // Use the default theme when browser storage is unavailable.
}
applyTheme(savedTheme);

themeSelect.addEventListener("change", (event) => applyTheme(event.target.value));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "Demo submitted — no data was sent.";
});