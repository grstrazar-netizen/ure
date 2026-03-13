# Flowtime — Freelancer OS PWA (MVP foundation)

React + TypeScript + Tailwind CSS + shadcn-style UI primitives + lucide icons.

## 1) Product architecture

### Product layers
- **Experience layer (mobile-first):** Dashboard, Tasks, Time, Invoices, Proposals, Reports, Settings.
- **Domain layer:** task planning, time logs, invoicing, proposal pipeline, earnings snapshots.
- **Data layer:** local-first DTOs now, API-ready repositories later.
- **Platform layer:** PWA-first runtime, architecture prepared for Tauri shell later.

### MVP boundaries
Included now:
- Dashboard overview
- Time tracker daily log shell
- Invoice and proposal management placeholders with clear action paths
- Reports and settings scaffolding

Deferred:
- deep accounting logic
- contract module
- external integrations

## 2) Screen map (mobile-first)

- `/dashboard`
  - Today focus + Eisenhower matrix
  - Money waiting / received
  - Proposal pipeline
  - Slovenia tax reserve indicator
- `/tasks`
  - quick capture + frog task
- `/time`
  - start/stop/voice + daily log
- `/invoices`
  - draft, sent, paid, overdue
- `/proposals`
  - sent/pending/accepted/rejected + follow-up
- `/reports`
  - yearly earnings and client/time summaries
- `/settings`
  - profile, plan, reminders

Current scaffold exposes these via section switching in one app shell for rapid iteration.

## 3) Mobile dashboard wireframe structure

1. **Header:** app identity + calm context text.
2. **Today focus card:** hardest meaningful task (“Eat the Frog”).
3. **Eisenhower matrix card:** four quadrants, scannable.
4. **Pipeline metric cards:**
   - money waiting
   - money received
   - proposal pipeline
   - tax reserve estimate (Slovenia direction)
5. **Bottom navigation:** thumb-friendly quick section access.

## 4) MVP component list

- `Button` (shadcn-style variants with CVA)
- `Card`
- `MobileNav`
- `DashboardScreen`
- `TasksScreen`
- `TimeScreen`
- `InvoiceScreen`
- `ProposalScreen`
- `ReportsScreen`
- `SettingsScreen`

## 5) Data model proposal (scalable)

```ts
User { id, name, locale, currency, taxProfile }
Client { id, name, contact, status }
Project { id, clientId, name, hourlyRate, active }
Task { id, clientId?, projectId?, title, urgency, importance, dueDate, status, frog }
TimeEntry { id, clientId, projectId?, taskId?, startedAt, endedAt, minutes, billable, note, source }
Proposal { id, clientId, title, amountEstimate, status, sentAt, expiresAt, followUpAt }
Invoice { id, clientId, number, status, issuedAt, dueAt, subtotal, tax, total, paidAt? }
InvoiceLine { id, invoiceId, type, description, qty, unitPrice, sourceTimeEntryIds[] }
Reminder { id, kind, targetId, dueAt, done }
YearlySummary { year, paidTotal, unpaidTotal, proposalConversion, taxReserveEstimate }
```

## 6) Step-by-step development plan

1. **Foundation:** app shell, design tokens, mobile navigation, section scaffolds.
2. **Dashboard v1:** static metrics + reusable stat card patterns.
3. **Time v1:** running timer state + manual entry + client/task assignment.
4. **Invoice v1:** convert tracked time to draft invoice lines.
5. **Proposal v1:** create/send/follow-up statuses.
6. **Reports v1:** yearly totals, unpaid/paid, export-ready views.
7. **PWA hardening:** manifest, service worker, offline essentials.
8. **Tauri readiness:** isolate domain/data layer and platform APIs.

---

## Run locally

```bash
npm install
npm run dev
```

If your environment blocks npm registry access, keep the code scaffold and run in an unrestricted network.
