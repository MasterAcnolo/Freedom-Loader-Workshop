const DEFAULT_THEME = {
  meta: {
    name: "My Theme",
    author: "",
    version: "1.0.0",
    formatVersion: "1.0",
    subtitle: "My custom theme"
  },
  style: {
    background: {
      size: "cover",
      position: "center",
      attachment: "fixed"
    },
    colors: {
      background: "#121212",
      text: {
        default: "#e0e0e0",
        subtitle: "#2196f3",
        audioOnly: "#f5f5f5"
      }
    },
    form: {
      background: "#1e1e1e",
      input: {
        background: "#2a2a2a",
        border: "#444444",
        borderFocus: "#2196f3",
        text: "#f5f5f5",
        placeholder: "#888888"
      },
      button: {
        background: "#2196f3",
        text: "#ffffff",
        hover: "#1976d2"
      },
      pasteButtonIcon: "#ffffff"
    },
    checkbox: {
      background: {
        unchecked: "#555555",
        checked: "#2196f3"
      },
      checkmarkBorder: "#ffffff",
      pulse: "rgba(33, 150, 243, 0.5)"
    },
    download: { status: "#2196f3" },
    progressBar: {
      background: "#444444",
      fill: "#2196f3"
    },
    videoInfo: {
      background: "#1a1a1a",
      text: "#e0e0e0",
      heading: "#2196f3",
      list: "#cccccc",
      strong: "#ffffff",
      link: "#2196f3",
      linkHover: "#1976d2"
    },
    playlist: { background: "#303030" },
    settings: {
      button: { background: "#1e1e1e", text: "#e0e0e0" },
      background: { modal: "#1e1e1e", section: "#2a2a2a" },
      openThemeButton: { background: "#2196f3", text: "#ffffff" },
      text: "#e0e0e0",
      subtitle: "#aaaaaa"
    }
  }
};

let currentTheme = JSON.parse(JSON.stringify(DEFAULT_THEME));
let backgroundImageData = null;
let backgroundImageFile = null;

function getTheme() { return currentTheme; }

function setThemeValue(path, value) {
  const keys = path.split(".");
  let obj = currentTheme;
  for (let i = 0; i < keys.length - 1; i++) {
    obj = obj[keys[i]];
  }
  obj[keys[keys.length - 1]] = value;
}

function getThemeValue(path) {
  const keys = path.split(".");
  let obj = currentTheme;
  for (const k of keys) {
    if (obj == null) return undefined;
    obj = obj[k];
  }
  return obj;
}

function setBackgroundImage(dataUrl, file) {
  backgroundImageData = dataUrl;
  backgroundImageFile = file;
}

function removeBackgroundImage() {
  backgroundImageData = null;
  backgroundImageFile = null;
}

function getBackgroundImage() { return backgroundImageData; }
function getBackgroundImageFile() { return backgroundImageFile; }

function resetTheme() {
  currentTheme = JSON.parse(JSON.stringify(DEFAULT_THEME));
  backgroundImageData = null;
  backgroundImageFile = null;
}

function exportThemeJson() {
  return JSON.parse(JSON.stringify(currentTheme));
}

export {
  DEFAULT_THEME,
  getTheme,
  setThemeValue,
  getThemeValue,
  setBackgroundImage,
  removeBackgroundImage,
  getBackgroundImage,
  getBackgroundImageFile,
  resetTheme,
  exportThemeJson
};
