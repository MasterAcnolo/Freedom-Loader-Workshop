import { setThemeValue, getThemeValue, setBackgroundImage, removeBackgroundImage, getTheme, resetTheme } from './theme.js';
import { applyThemeToPreview } from './preview.js';

function update(path, value) {
  setThemeValue(path, value);
  applyThemeToPreview();
}

function colorField(label, path, subLabel) {
  const id = `cf-${path.replace(/\./g, "-")}`;
  const val = getThemeValue(path) || "#000000";
  return `
    <div class="field">
      <span class="field-label">${label}${subLabel ? `<br><span class="field-label-sub">${subLabel}</span>` : ""}</span>
      <div class="color-field">
        <div class="pickr-trigger" id="${id}-pickr" data-path="${path}" data-value="${val}"></div>
        <input type="text" class="color-hex-input" id="${id}-hex" value="${val}" data-path="${path}" maxlength="25" placeholder="#000000">
      </div>
    </div>`;
}

function textField(label, path, placeholder) {
  const val = getThemeValue(path) || "";
  return `
    <div class="field">
      <span class="field-label">${label}</span>
      <input type="text" value="${val}" data-path="${path}" placeholder="${placeholder || ""}">
    </div>`;
}

function selectField(label, path, options) {
  const val = getThemeValue(path) || options[0].value;
  const opts = options.map(o => `<option value="${o.value}"${o.value === val ? " selected" : ""}>${o.label}</option>`).join("");
  return `
    <div class="field">
      <span class="field-label">${label}</span>
      <select data-path="${path}">${opts}</select>
    </div>`;
}

function section(title, color, content) {
  return `
    <div class="section-block">
      <div class="section-header">
        <div class="section-header-left">
          <div class="section-dot" style="background:${color}"></div>
          <span class="section-title">${title}</span>
        </div>
        <svg class="section-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="section-body">${content}</div>
    </div>`;
}

function buildMetaPanel() {
  return `
    ${section("Theme Info", "#888", `
      ${textField("Name", "meta.name", "My Theme")}
      ${textField("Author", "meta.author", "Your name")}
      ${textField("Subtitle", "meta.subtitle", "A tagline for your theme")}
      ${textField("Version", "meta.version", "1.0.0")}
    `)}
    ${section("Background Image", "#666", `
      <div class="image-upload-zone" id="bg-upload-zone">
        <input type="file" id="bg-image-input" accept="image/jpeg,image/png,image/webp,image/gif,image/avif">
        <img class="image-preview-thumb" id="bg-preview-thumb" alt="Background preview">
        <svg class="image-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <div class="image-upload-text">Click to upload background image</div>
        <div class="image-upload-sub">JPG, PNG, WebP, GIF, AVIF — max 10 MB</div>
        <button class="image-remove-btn" id="bg-remove-btn">Remove image</button>
      </div>
      <div class="fields-grid-3">
        ${selectField("Size", "style.background.size", [
          {value:"cover",label:"Cover"},{value:"contain",label:"Contain"},
          {value:"100% 100%",label:"Stretch"},{value:"auto",label:"Auto"}
        ])}
        ${selectField("Position", "style.background.position", [
          {value:"center",label:"Center"},{value:"top",label:"Top"},
          {value:"bottom",label:"Bottom"},{value:"left center",label:"Left"},
          {value:"right center",label:"Right"},{value:"70% center",label:"70% X"}
        ])}
        ${selectField("Attachment", "style.background.attachment", [
          {value:"fixed",label:"Fixed"},{value:"scroll",label:"Scroll"},{value:"local",label:"Local"}
        ])}
      </div>
    `)}
  `;
}

function buildColorsPanel() {
  return `
    ${section("General", "#2196f3", `
      ${colorField("Background", "style.colors.background")}
      <div class="fields-grid">
        ${colorField("Text", "style.colors.text.default")}
        ${colorField("Subtitle", "style.colors.text.subtitle")}
      </div>
      ${colorField("Audio Only Label", "style.colors.text.audioOnly")}
    `)}
    ${section("Form", "#4caf50", `
      ${colorField("Form Background", "style.form.background")}
      <div class="subsection-label">Input</div>
      <div class="fields-grid">
        ${colorField("Background", "style.form.input.background")}
        ${colorField("Border", "style.form.input.border")}
        ${colorField("Border Focus", "style.form.input.borderFocus")}
        ${colorField("Text", "style.form.input.text")}
      </div>
      ${colorField("Placeholder", "style.form.input.placeholder")}
      <div class="subsection-label">Button</div>
      <div class="fields-grid">
        ${colorField("Background", "style.form.button.background")}
        ${colorField("Text", "style.form.button.text")}
        ${colorField("Hover", "style.form.button.hover")}
        ${colorField("Paste Icon", "style.form.pasteButtonIcon")}
      </div>
    `)}
    ${section("Checkbox", "#ff9800", `
      <div class="fields-grid">
        ${colorField("Unchecked", "style.checkbox.background.unchecked")}
        ${colorField("Checked", "style.checkbox.background.checked")}
        ${colorField("Checkmark", "style.checkbox.checkmarkBorder")}
        ${colorField("Pulse", "style.checkbox.pulse")}
      </div>
    `)}
    ${section("Progress & Status", "#9c27b0", `
      ${colorField("Download Status", "style.download.status")}
      <div class="fields-grid">
        ${colorField("Bar Background", "style.progressBar.background")}
        ${colorField("Bar Fill", "style.progressBar.fill")}
      </div>
    `)}
    ${section("Video Info", "#e91e63", `
      ${colorField("Background", "style.videoInfo.background")}
      <div class="fields-grid">
        ${colorField("Text", "style.videoInfo.text")}
        ${colorField("Heading", "style.videoInfo.heading")}
        ${colorField("List", "style.videoInfo.list")}
        ${colorField("Strong", "style.videoInfo.strong")}
        ${colorField("Link", "style.videoInfo.link")}
        ${colorField("Link Hover", "style.videoInfo.linkHover")}
      </div>
      ${colorField("Playlist Cards", "style.playlist.background")}
    `)}
    ${section("Settings Panel", "#607d8b", `
      <div class="fields-grid">
        ${colorField("Button BG", "style.settings.button.background")}
        ${colorField("Button Text", "style.settings.button.text")}
        ${colorField("Modal BG", "style.settings.background.modal")}
        ${colorField("Section BG", "style.settings.background.section")}
        ${colorField("Text", "style.settings.text")}
        ${colorField("Subtitle", "style.settings.subtitle")}
      </div>
      <div class="subsection-label">Open Theme Button</div>
      <div class="fields-grid">
        ${colorField("Background", "style.settings.openThemeButton.background")}
        ${colorField("Text", "style.settings.openThemeButton.text")}
      </div>
      <div class="subsection-label">Open JSON Button</div>
      <div class="fields-grid">
        ${colorField("Background", "style.settings.openJsonButton.background")}
        ${colorField("Text", "style.settings.openJsonButton.text")}
      </div>
    `)}
  `;
}

function initPickrs(container) {
  container.querySelectorAll(".pickr-trigger[data-path]").forEach(trigger => {
    const path = trigger.dataset.path;
    const val = trigger.dataset.value || "#000000";

    const pickr = Pickr.create({
      el: trigger,
      theme: "nano",
      default: val,
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          save: true,
        }
      }
    });

    pickr.on("save", (color) => {
      if (!color) return;
      const hexa = color.toHEXA().toString();
      const rgba = color.toRGBA().toString(0);
      const hasAlpha = color.toRGBA()[3] < 1;
      const finalVal = hasAlpha ? rgba : hexa;

      const hexInput = document.getElementById(`cf-${path.replace(/\./g, "-")}-hex`);
      if (hexInput) hexInput.value = finalVal;

      update(path, finalVal);
      pickr.hide();
    });

    pickr.on("change", (color) => {
      if (!color) return;
      const hexa = color.toHEXA().toString();
      const rgba = color.toRGBA().toString(0);
      const hasAlpha = color.toRGBA()[3] < 1;
      const finalVal = hasAlpha ? rgba : hexa;

      const hexInput = document.getElementById(`cf-${path.replace(/\./g, "-")}-hex`);
      if (hexInput) hexInput.value = finalVal;

      update(path, finalVal);
    });
  });
}

function wireInputs(container) {
  container.querySelectorAll("input[data-path], select[data-path], textarea[data-path]").forEach(el => {
    if (el.classList.contains("color-hex-input")) {
        el.addEventListener("input", () => {
          const path = el.dataset.path;
          const val = el.value.trim();
          if (/^#[0-9a-fA-F]{3,8}$/.test(val) || /^rgba?\(/.test(val)) {
            update(path, val);
          }
        });
      } else if (el.type !== "file") {
        el.addEventListener("input", () => update(el.dataset.path, el.value));
      }
  });
}

function wireImageUpload() {
  const input = document.getElementById("bg-image-input");
  const thumb = document.getElementById("bg-preview-thumb");
  const removeBtn = document.getElementById("bg-remove-btn");
  const zone = document.getElementById("bg-upload-zone");

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Image too large (max 10 MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setBackgroundImage(e.target.result, file);
      thumb.src = e.target.result;
      thumb.classList.add("visible");
      removeBtn.classList.add("visible");
      zone.classList.add("has-image");
      applyThemeToPreview();
    };
    reader.readAsDataURL(file);
  });

  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeBackgroundImage();
    thumb.src = "";
    thumb.classList.remove("visible");
    removeBtn.classList.remove("visible");
    zone.classList.remove("has-image");
    input.value = "";
    applyThemeToPreview();
  });
}

function wireSections() {
  document.querySelectorAll(".section-header").forEach(header => {
    header.addEventListener("click", () => {
      header.closest(".section-block").classList.toggle("open");
    });
  });
  document.querySelectorAll(".section-block").forEach((b, i) => {
    if (i === 0) b.classList.add("open");
  });
}

function wireTabs() {
  document.querySelectorAll(".panel-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      document.querySelectorAll(".panel-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".panel-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`tab-${target}`).classList.add("active");
    });
  });
}

function initEditor() {
  document.getElementById("tab-meta").innerHTML = buildMetaPanel();
  document.getElementById("tab-colors").innerHTML = buildColorsPanel();

  wireInputs(document.getElementById("tab-meta"));
  wireInputs(document.getElementById("tab-colors"));
    initPickrs(document.getElementById("tab-meta"));
  initPickrs(document.getElementById("tab-colors")); 
  wireImageUpload();
  wireSections();
  wireTabs();
}

export { initEditor };
