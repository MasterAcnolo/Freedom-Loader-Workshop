import { getTheme, getBackgroundImage } from './theme.js';

const VAR_MAP = {
  "style.colors.background":            "--fl-background-color",
  "style.colors.text.default":          "--fl-default-text-color",
  "style.colors.text.subtitle":         "--fl-subtitle-color",
  "style.colors.text.audioOnly":        "--fl-audio-only-label-color",
  "style.form.background":              "--fl-form-bg-color",
  "style.form.input.background":        "--fl-form-input-bg-color",
  "style.form.input.border":            "--fl-form-input-border-color",
  "style.form.input.borderFocus":       "--fl-form-input-border-focus-color",
  "style.form.input.text":              "--fl-form-input-text-color",
  "style.form.input.placeholder":       "--fl-form-input-placeholder-color",
  "style.form.button.background":       "--fl-form-button-bg-color",
  "style.form.button.text":             "--fl-form-button-text-color",
  "style.form.button.hover":            "--fl-form-button-bg-hover-color",
  "style.form.pasteButtonIcon":         "--fl-paste-button-icon-color",
  "style.checkbox.background.unchecked":"--fl-checkbox-unchecked-bg-color",
  "style.checkbox.background.checked":  "--fl-checkbox-checked-bg-color",
  "style.checkbox.checkmarkBorder":     "--fl-checkbox-checkmark-border-color",
  "style.checkbox.pulse":               "--fl-checkbox-pulse-color",
  "style.download.status":              "--fl-download-status-color",
  "style.progressBar.background":       "--fl-progress-bar-bg-color",
  "style.progressBar.fill":             "--fl-progress-bar-fill-color",
  "style.videoInfo.background":         "--fl-video-info-bg-color",
  "style.videoInfo.text":               "--fl-video-info-text-color",
  "style.videoInfo.heading":            "--fl-video-info-heading-color",
  "style.videoInfo.list":               "--fl-video-info-list-color",
  "style.videoInfo.strong":             "--fl-video-info-list-strong-color",
  "style.videoInfo.link":               "--fl-video-info-link-color",
  "style.videoInfo.linkHover":          "--fl-video-info-link-hover-color",
  "style.playlist.background":          "--fl-playlist-background-color",
  "style.settings.button.background":   "--fl-settings-button-bg-color",
  "style.settings.button.text":         "--fl-settings-button-text-color",
  "style.settings.background.modal":    "--fl-settings-modal-bg-color",
  "style.settings.background.section":  "--fl-settings-section-bg-color",
  "style.settings.openThemeButton.background": "--fl-open-theme-btn-bg",
  "style.settings.openThemeButton.text":       "--fl-open-theme-btn-text",
  "style.settings.openJsonButton.background": "--fl-open-json-btn-bg",
  "style.settings.openJsonButton.text":       "--fl-open-json-btn-text",
  "style.settings.text":                "--fl-settings-text-color",
  "style.settings.subtitle":            "--fl-settings-subtitle-color",
};

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, k) => acc?.[k], obj);
}

function applyThemeToPreview() {
  const theme = getTheme();
  const preview = document.getElementById("fl-preview");
  if (!preview) return;

  for (const [path, cssVar] of Object.entries(VAR_MAP)) {
    const value = getNestedValue(theme, path);
    if (value !== undefined && value !== "") {
      preview.style.setProperty(cssVar, value);
    }
  }

  const img = getBackgroundImage();
  if (img) {
    preview.style.backgroundImage = `url('${img}')`;
    preview.style.setProperty("--fl-bg-size", theme.style.background?.size || "cover");
    preview.style.setProperty("--fl-bg-position", theme.style.background?.position || "center");
  } else {
    preview.style.backgroundImage = "";
  }

  const subtitle = preview.querySelector("#fl-subtitle");
  if (subtitle) subtitle.textContent = theme.meta.subtitle || theme.meta.name || "My Theme";
}

function initPreviewZoom() {
  const wrapper = document.getElementById("preview-frame-wrapper");
  const scaleVal = document.getElementById("scale-value");
  let scale = 1;

  function applyScale() {
    wrapper.style.transform = `scale(${scale})`;
    scaleVal.textContent = Math.round(scale * 100) + "%";
  }

  document.getElementById("zoom-in").addEventListener("click", () => {
    scale = Math.min(1.2, scale + 0.1);
    applyScale();
  });
  document.getElementById("zoom-out").addEventListener("click", () => {
    scale = Math.max(0.4, scale - 0.1);
    applyScale();
  });
  document.getElementById("zoom-reset").addEventListener("click", () => {
    scale = 1;
    applyScale();
  });

  applyScale();
}

export { applyThemeToPreview, initPreviewZoom };
