# Work Journal

A mobile-first, minimalist time-tracking planner built with **React + TypeScript + Vite**.

## Project structure

```text
src/
  components/    # Reusable UI pieces (composer, rows, nav, headers)
  views/         # Day / Reports / Settings screens
  hooks/         # Local storage and reminder timer hooks
  lib/           # Date utilities + persistence/CRUD helpers
  styles/        # Global Muji-inspired planner styling
  types/         # TypeScript interfaces and app-level types
  data/          # Seeded example data
```

## Where the main logic lives

- `src/App.tsx`
  - App shell and section navigation
  - Activity lifecycle (start/stop/update/delete)
  - Settings list management wiring
- `src/lib/storage.ts`
  - localStorage load/save
  - activity/list helper operations for CRUD-like updates
- `src/hooks/useActivityTimer.ts`
  - Running-activity reminder logic (hourly prompt + reset)
- `src/views/ReportsView.tsx`
  - Monthly aggregation and grouped summaries

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL (typically `http://localhost:5173`).

## What can be added next

- Real CSV/PDF export implementation behind the existing export button.
- Search and quick filters in Day and Reports views.
- Keyboard shortcuts for even faster activity logging.
- Backup/import flow for data portability.
