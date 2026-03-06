# Task Track

A simple phone-first web app for:

- Recording daily tasks
- Planning future tasks
- Generating a monthly report of completed tasks

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## How monthly report works

- Mark tasks as **Done**.
- A completion date is saved automatically.
- Choose a month in the **Monthly Report** section.
- The app lists all tasks completed in that month.

All data is stored in browser `localStorage`.
