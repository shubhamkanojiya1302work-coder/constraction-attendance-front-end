# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Frontend for a construction-site attendance app ("FieldSite"). The backend is a sibling project at `../constraction-attendance-backend` (separate repo). Nothing is wired to the backend yet: `LoginForm` just logs the form values, and the attendance pages read mock data from `src/data/attendanceData.js` (shaped like the future API responses, so swapping in live data should only touch the pages).

There are three screens:
- **Login** (`/`).
- **FieldSite** (`/fieldsite`, `pages/FieldSite.jsx`): the **labour/worker** view of their own attendance (shift status, daily punches, weekly timesheet).
- **SiteDesk** (`/sitedesk`, `pages/SiteDesk.jsx`): the **admin/supervisor** dashboard (stats, weekly ledger, hours chart, punch inspector, CSV export).

FieldSite and SiteDesk are separate pages for different users. Keep them in separate files, and make each page work on both desktop and mobile with Tailwind breakpoints (`lg` = 1024px is the desktop switch), not by rendering a different component per screen size.

## Commands

Package manager is **Yarn 4** (`.yarnrc.yml`, `nodeLinker: node-modules`). Use `yarn`, not npm.

- `yarn dev`: Vite dev server. The port comes from `VITE_PORT` in `.env` and defaults to 5173.
- `yarn build` / `yarn preview`: production build to `dist/` / serve it.
- `yarn format` / `yarn format:check`: Prettier (config in `.prettierrc.json`: 2 spaces, double quotes, semicolons). VS Code formats on save and paste via `.vscode/settings.json`.
- `yarn lint`: oxlint (config in `.oxlintrc.json`: react + oxc plugins, `rules-of-hooks` is an error).

There's no test framework, and the project is plain JS/JSX with no TypeScript.

## Stack and structure

- React 19 + Vite 8 (`@vitejs/plugin-react`), with `lucide-react` for icons.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin. There's no `tailwind.config.js` or PostCSS config. Tailwind is enabled by `@import "tailwindcss";` in `src/index.css`, which also holds the few custom global classes (e.g. `.login-background`). Styling is otherwise done with utility classes inline in JSX. The brand colour is the arbitrary value `#965000` (hover `#794000`).
- `src/main.jsx` → `App.jsx` → `pages/` (route-level screens) → `components/`. There's no router yet: `App` picks the page from `window.location.pathname`.
- `src/components/` is grouped by where a component is used:
  - `layout/`: shared page chrome (`Sidebar`, `Topbar`, `AppBar`, `BottomNav`). These take their menu `items` (`[{ id, label, icon }]`) as props from the page, so any page can reuse them. Put new reusable nav/header/footer pieces here, not in a page-specific folder. The pattern is `Sidebar` (or `AppBar` tabs) from `lg` up and `BottomNav` below `lg`, with the same items.
  - `ui/`: small generic building blocks (`Card`, `Avatar`).
  - `fieldsite/` and `sitedesk/`: sections used by only that one page.
  - `LoginForm.jsx` sits directly in `components/`.
- `src/utils/`: plain helpers (e.g. `exportCsv.js`).
- Components get their data through props. Only the pages import from `src/data/`.
- Env vars: `.env` defines `VITE_PORT` and `VITE_API_URL` (backend base URL, read via `import.meta.env.VITE_API_URL`).

## Environment gotchas (Windows + OneDrive)

The repo is in a OneDrive-synced folder, which has corrupted `node_modules` installs before.
- If Tailwind utilities are missing from the output CSS (only the custom classes show up) and a `WASI is an experimental feature` warning appears, the native `@tailwindcss/oxide-win32-x64-msvc` package was partly installed. Fix it by deleting `node_modules` and running `yarn install` again.
- `yarn lint` may fail with "Cannot find native binding" because Windows Application Control (Smart App Control) blocks `oxlint.win32-x64-msvc.node`. This is a Windows setting, not a project bug, and it doesn't affect dev or build.

## git commit

so if I ask you to commit any changes to github then there I should only be the auther of that commit donot include your self there.

## Pushing to dev and PRs

Whenever I ask you to push code to `dev`, also open a pull request from `dev` into `main` right after the push. If an open PR from `dev` already exists, don't open a second one: the push updates it, so just share its link. Don't add any Claude/AI attribution to the PR title or description.

- The GitHub CLI isn't on PATH. In Bash, run it as `"/c/Program Files/GitHub CLI/gh.exe"`.
- Check for an existing PR first: `gh pr list --head dev --base main --state open`.

## Access provision

you should always look in tho this file dont seek out of this folder your work is to manage the file inside this folder