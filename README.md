# RepairDocs CCM

A searchable library of repair instructions for device technicians. Pick a device model, narrow it down by component or symptom, and get the required action for each job type plus the matching fault codes.

**Live demo:** `https://<your-username>.github.io/<repo-name>/`

## Features

- Three-step search (model → component → symptom) with autocomplete that narrows as you go
- Quick list sidebar with hover preview
- Expandable instruction cards: photo, notes, job type / required action, system / fault code
- Admin mode to add, edit and delete instructions (photos included)
- Dark and light glass themes, remembered per browser
- Data saved in the browser (`localStorage`), seeded with demo instructions

Demo admin password: `repair2024`. It only gates the editing UI; front-end code is public, so this is not real security.

## Tech

React 18 · Vite · plain CSS with custom properties · Font Awesome

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build locally
```

## Project structure

```
├── index.html                  page shell, fonts, theme pre-load
├── public/favicon.svg
├── .github/workflows/deploy.yml  auto-deploy to GitHub Pages
└── src/
    ├── main.jsx                entry point
    ├── App.jsx                 state, search logic, layout
    ├── config.js               admin password, storage keys
    ├── components/
    │   ├── Header.jsx
    │   ├── Sidebar.jsx
    │   ├── SearchPanel.jsx
    │   ├── AutoInput.jsx
    │   ├── InstructionList.jsx
    │   ├── InstructionCard.jsx
    │   ├── EditModal.jsx
    │   ├── LoginModal.jsx
    │   ├── Tags.jsx
    │   └── Toast.jsx
    ├── data/
    │   ├── demo.js             seed instructions
    │   └── categories.js       categories, job types, actions, colours
    ├── lib/
    │   ├── storage.js          safe localStorage wrapper
    │   └── utils.js            ids, dates, helpers
    └── styles/
        ├── index.css           imports everything in order
        ├── theme.css           colour tokens (dark + light)
        ├── base.css            reset, background, layout
        ├── ui.css              buttons, inputs, tags, tables
        ├── header.css
        ├── search.css
        ├── instruction-card.css
        ├── sidebar.css
        └── modal.css
```

To change the look, edit the variables in `src/styles/theme.css`.

## Deploy

Pushing to `main` builds and publishes the site automatically. One-time setup on GitHub: **Settings → Pages → Source: GitHub Actions**.
