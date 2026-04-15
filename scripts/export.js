import { exportThemeJson, getBackgroundImageFile } from './theme.js';
import { resetChangesFlag } from './editor.js';

async function downloadThemeZip() {
  const theme = exportThemeJson();
  const imageFile = getBackgroundImageFile();

  const themeName = theme.meta.name
    ? theme.meta.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    : "my-theme";

  const jsonString = JSON.stringify(theme, null, 2);
  const jsonBlob = new Blob([jsonString], { type: "application/json" });

  if (typeof JSZip === "undefined") {
    console.error("JSZip not loaded");
    return;
  }

  const zip = new JSZip();
  zip.file(`${themeName}.theme.json`, jsonBlob);

  if (imageFile) {
    const ext = imageFile.name.split(".").pop().toLowerCase();
    const allowedExts = ["jpg", "jpeg", "png", "webp", "gif", "avif"];
    if (allowedExts.includes(ext)) {
      zip.file(`cover.${ext}`, imageFile);
    }
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${themeName}.zip`;
  a.click();
  URL.revokeObjectURL(url);

  resetChangesFlag();
}

export { downloadThemeZip };
