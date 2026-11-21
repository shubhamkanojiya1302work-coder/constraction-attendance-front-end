# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Frontend for a construction-site attendance app ("FieldSite"). The backend is a sibling project at `../constraction-attendance-backend` (separate repo). Nothing is wired to the backend yet: `LoginForm` just logs the form values, and the attendance pages read mock data from `src/data/attendanceData.js` (shaped like the future API responses, so swapping in live data should only touch the pages).

There are two apps and five pages (routes in `App.jsx`):
- **Login** (`/`).
- **FieldSite** (`/fieldsite`, `pages/FieldSite.jsx`): the **labour/worker** view. It has three tabs, switched with React state (no URL change):
  - **Check-In** (the default): greeting card, "You are at the site" geofence banner, selfie check-in, shift timing and today's status tiles, site code and QR scan card, safety reminder, and a call-supervisor link. The **Start Check-In** button opens the **Site Check-In modal** (`fieldsite/CheckInModal`) straight away. The modal has a 4-digit site access code (`fieldsite/AccessCodeInput`), GPS and shift-time tiles, a selfie row with Take Selfie / Retake, and Confirm/Cancel. The selfie button uses a hidden `<input type="file" accept="image/*" capture="user">`, so phones open the front camera. Confirm only enables once the code matches and a selfie has been taken. Everything is still local: the code is compared against `checkIn.accessCode` in the mock data (this must move to the backend), the GPS zone and face-match % are mock values, nothing is uploaded, and the QR scan buttons do nothing.
  - **Attendance**: shift status, daily punches, approval and weekly timesheet for the selected day.
  - **My Log**: no screen of its own yet, so it shows the Attendance content.
- **SiteDesk**: the **admin/supervisor** app. It's **three separate pages** with their own URLs. Keep them as separate page files; don't merge them back into one page that swaps views.
  - `/sitedesk` is `pages/sitedesk/LiveAttendancePage.jsx`.
  - `/sitedesk/records` is `pages/sitedesk/RecordsPage.jsx`.
  - `/sitedesk/sites` is `pages/sitedesk/SitesPage.jsx`.
  - Each page is thin: it wraps its view in `sitedesk/SiteDeskLayout` with `active="<nav id>"` and passes in mock data. `SiteDeskLayout` is `layout/DashboardLayout` plus the SiteDesk nav (`siteDeskNav`, each item has a `path`), and the sidebar and bottom tabs `navigate()` between the pages.
  - To add a SiteDesk page: write a `sitedesk/<Name>View` component that takes its data as props, a `pages/sitedesk/<Name>Page.jsx`, an entry in `siteDeskNav`, and a route in `App.jsx`.
  - **Live Attendance** (the default): review banner, three summary cards (`sitedesk/SummaryCard`), trade chips with a name/phone search (`sitedesk/TradeFilter`), the worker roster (`sitedesk/WorkerRow`), and `ui/Pagination` (5 per page). Mock data is `liveRoster`. "Review N Items" switches to a "Needs Review" filter (late or unverified). Refresh and View Details are placeholders.
  - **All Records**: "Daily Attendance Records". It has a header with a date button and Export to Excel (`sitedesk/RecordsHeader`), a site + status filter (All / Present / Half Day / Missing Out, `sitedesk/RecordsFilter`), a payroll-ready stat (`sitedesk/PayrollStatCard`), the roster table (`sitedesk/RosterTable`, 6 per page), and a detail panel for the selected row (`sitedesk/RecordDetail`: face scans, duration, location, verification, Edit Hours / Approve). Per-status labels and pill tones live in `sitedesk/recordStyles.js`. Mock data is `dailyRecords`. Export downloads a CSV (via `downloadCsv` in `utils/exportCsv.js`, with a BOM so Excel reads it as UTF-8). Approve only lasts for the session, and can't be used on a record with no check-out. The date picker, site picker and Edit Hours are placeholders.
  - **Sites** (`sitedesk/SitesView`, `data` = `sitesDirectory`): the "Construction Sites" directory.
    - The page has a heading with **Add New Site**, All / Active Projects / Completed tabs with a name/code/address search, a list of `sitedesk/SiteCard`s, and the selected site's `sitedesk/PerimeterPanel`. The panel shows a geofence picture (`GeofencePreview`, schematic and not to scale), a radius control (`RadiusSlider`, 50–500 m with presets), coordinates, shift rules, assigned supervisors, and Save & Broadcast Perimeter.
    - **Add New Site** and **Edit Site** open `sitedesk/SiteFormModal`. It's one scrolling form in four sections (Project Info, Shift Window, Geofence Zone, Supervisors). The numbered bar jumps to a section, "+ Assign" opens it at Supervisors, and it validates on submit (required fields, shift end after start, lat/lng range, at least one supervisor, no duplicate project code). "Use my location" fills lat/lng from the browser.
    - Shared helpers (kind → icon, radius limits and presets, `to12h`) are in `sitedesk/siteFormat.js`.
    - New sites, edits and radius changes only last for the session (local state in `SitesView`). Its `onSaveSite`, `onSaveRadius`, `onTestKiosk` and `onViewLog` props are where the API calls go; the page doesn't pass them yet.
  - In both views, filtering, search and paging run in the browser over the loaded list, and counts come from that list. With a real API they should move to the server.
  - The older single-worker timesheet dashboard (`sitedesk/ProfileCard`, `StatsRow`, `StatCard`, `LedgerTable`, `ShiftRow`, `DistributionChart`, `SignOffNotice`, `PunchInspector`, `CorrectionHelp`, `exportShiftsCsv`, plus `payPeriods`/`weeklyStats`/`weekShifts` data) isn't used on any page now.

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
- `src/main.jsx` → `App.jsx` → `pages/` (route-level screens) → `components/`. There's no router library: `App` looks the path up in its `routes` map (exact match, and unknown paths show Login). It re-renders through `hooks/usePath`. Move between pages with `navigate("/path")` from `utils/navigation.js`, which uses `history.pushState` without a reload, so Back/Forward work. Don't use `<a href>` or `window.location` for in-app links.
- `src/components/` is grouped by where a component is used:
  - `layout/`: shared page chrome (`Sidebar`, `Topbar`, `AppBar`, `BottomNav`). These take their menu `items` (`[{ id, label, icon }]`) as props from the page, so any page can reuse them. Put new reusable nav/header/footer pieces here, not in a page-specific folder. The pattern is `Sidebar` (or `AppBar` tabs) from `lg` up and `BottomNav` below `lg`, with the same items. `BottomNav` is fixed to the bottom and pads for the phone's safe area, so pages that use it need about `pb-28`/`pb-32` on `main` below `lg`.
    - `DashboardLayout` is the full desktop-first page frame (Sidebar + Topbar + `main` + BottomNav, with the right padding). Use it for any admin/supervisor page instead of wiring those pieces by hand. Props: `brand`, `navItems`, `activeNav`, `onNavigate`, `siteName`, `user`, `children`.
  - `ui/`: small generic building blocks. Reuse these before writing new markup for the same thing:
    - `Card`: the white rounded panel.
    - `Avatar`: photo or initials. Props: `size`, `rounded`, `tone`, `letters`. Pair it with `initialTone(name)` for the coloured single-letter circles.
    - `StatusPill`: the rounded label with a dot. `tone` is `success`, `warning`, `danger` or `neutral`.
    - `PageHeading`: eyebrow, h1, subtitle and right-side actions.
    - `SegmentedTabs`: tabs in a tinted bar.
    - `FilterChips`: brand-filled pill filters.
    - `SearchInput`.
    - `Pagination`: Previous / numbers with "…" / Next, 1-based.
    - `TextField`: a labelled input on a tinted background with an optional icon. Use `as="select"` for a dropdown and `error` for a red message underneath.
    - `Modal`: a bottom sheet on phones and a centred card from `sm` up. It closes on Escape, the X button or a backdrop click, and locks page scroll. Props: `title` (can be a node), `description`, `icon`, `size` (`md` or `lg`), `accent` (gradient top bar), and `footer` (pinned while the body scrolls). Render it conditionally (`{x && <Modal open …>}`) so its contents reset each time it opens.
    - `SegmentedTabs` options can also take a `dotClass`, and `SearchInput` has `variant="tinted"` for use inside white cards.
  - `fieldsite/` and `sitedesk/`: sections used by only that one page. Before adding a near-copy of a section, check whether the existing one can take a prop instead. For example, `fieldsite/WorkerCard` takes optional `title`, `status`, `site` and `siteIcon`, so the Check-In greeting and the Attendance header share one component.
  - `LoginForm.jsx` sits directly in `components/`.
- `src/hooks/`: shared React hooks. `usePagination(items, pageSize)` returns `{ page, setPage, pageCount, visible }` and keeps the page in range when the list shrinks. Call `setPage(1)` when a filter changes.
- `src/utils/`: plain helpers (e.g. `exportCsv.js` with `downloadCsv(rows, filename)`).
- Components get their data through props. Only the pages import from `src/data/`.
- Env vars: `.env` defines `VITE_PORT` and `VITE_API_URL` (backend base URL, read via `import.meta.env.VITE_API_URL`).

## Deployment (GitHub Pages)

The site is published at `https://shubhamkanojiya1302work-coder.github.io/constraction-attendance-front-end/` by `.github/workflows/deploy.yml`. On every push to `main`, the workflow runs `yarn build`, copies `dist/index.html` to `dist/404.html`, and deploys `dist/`. The repo's Pages source must be set to **GitHub Actions**, not "Deploy from a branch", which would serve the raw source and show a blank page.

- `vite.config.js` sets `base` to `/constraction-attendance-front-end/` for builds only, so `yarn dev` stays at `/`. If the repo is renamed, update `PAGES_BASE` there.
- `utils/navigation.js` adds and strips `import.meta.env.BASE_URL`, so routes and `navigate()` calls use plain app paths (`/sitedesk/records`). Never hardcode the repo folder anywhere else.
- Deep links like `/fieldsite` or `/sitedesk/sites` work because GitHub serves `404.html` (a copy of the app) for paths with no file. They still return HTTP 404, which browsers show normally.
- `package.json` pins `"packageManager": "yarn@4.18.1"` so CI's corepack uses Yarn 4. Keep it in sync if Yarn is upgraded.

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