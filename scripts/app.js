import { applyThemeToPreview, initPreviewZoom } from './preview.js';
import { initEditor, resetChangesFlag } from './editor.js';
import { downloadThemeZip } from './export.js';

function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  
  // Check localStorage first, then fall back to system preference
  const savedTheme = localStorage.getItem("themeMode");
  let dark = savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;

  function apply() {
    root.setAttribute("data-theme", dark ? "dark" : "light");
    btn.title = dark ? "Switch to light mode" : "Switch to dark mode";
    btn.querySelector(".icon-sun").style.display = dark ? "none" : "block";
    btn.querySelector(".icon-moon").style.display = dark ? "block" : "none";
    // Persist theme choice
    localStorage.setItem("themeMode", dark ? "dark" : "light");
  }

  btn.addEventListener("click", () => { dark = !dark; apply(); });
  apply();
}

function initResetBtn() {
  document.getElementById("reset-btn").addEventListener("click", () => {
    if (!confirm("Reset theme to default values?")) return;
    import('./theme.js').then(({ resetTheme }) => {
      resetTheme();
      initEditor();
      applyThemeToPreview();
      resetChangesFlag();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initEditor();
  applyThemeToPreview();
  initPreviewZoom();
  initResetBtn();

  document.getElementById("export-btn").addEventListener("click", downloadThemeZip);

  document.body.classList.add("ready");
});
