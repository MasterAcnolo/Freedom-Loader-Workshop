# Freedom Loader — Theme Workshop

> Interactive theme creator for [Freedom Loader](https://github.com/MasterAcnolo/Freedom-Loader)

## What it does

- Live preview of Freedom Loader UI as you edit
- Color pickers for every CSS variable
- Background image upload (JPG, PNG, WebP, GIF, AVIF — max 10 MB)
- Background size / position / attachment controls
- Meta fields (name, author, subtitle, version)
- Export as `.zip` containing your `.theme.json` + image

## Usage

Open `index.html` in a browser — no build step, no server needed.

Or visit the GitHub Pages deployment.

## Installing your theme

1. Export your `.zip` from the Workshop
2. Drop it in the `theme/` folder of your Freedom Loader installation
3. Restart the app — your theme appears in the settings panel

## Project structure

```
Freedom-Loader-Workshop/
├── index.html
├── styles/
│   ├── styles.css
│   ├── variables.css
│   ├── layout/
│   │   ├── topbar.css
│   │   ├── workspace.css
│   │   └── panel.css
│   └── components/
│       ├── inputs.css
│       └── preview.css
└── scripts/
    ├── app.js        — entry point
    ├── theme.js      — theme state
    ├── preview.js    — applies theme to preview
    ├── editor.js     — builds editor UI
    └── export.js     — generates ZIP
```

## Theme format

See [template.theme.json](https://github.com/MasterAcnolo/Freedom-Loader/blob/main/theme/template.theme.json) for the full spec.
