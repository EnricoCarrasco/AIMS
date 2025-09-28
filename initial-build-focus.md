# Initial Build Focus Guide

## Current Context
- Active Git branch: `pkapnidis`
- Goal: Deliver the first usable slice of the shift scheduling web app described in `PRD.md`.

## Step-by-Step Implementation Plan

### 1. Foundation & Environment (Day 0-1)
1. Scaffold the Next.js project with TypeScript, shadcn/ui, Supabase client, and lint/test tooling.
2. Configure Supabase project connection (env vars, client setup, auth placeholder) and verify local Supabase access.
3. Establish shared UI primitives (layout shell, navigation sidebar/topbar, typography, button/input components).

### 2. Data Model & Supabase Schema (Day 1-2)
1. Define core tables: `employees`, `facilities`, `facility_shift_templates`, `shift_requirements`, `employee_availability`.
2. Add basic seed data scripts or Supabase SQL migrations.
3. Implement row-level security stubs to prepare for multi-tenant support (even if single-company for MVP).

### 3. Employee & Facility Management (Day 3-5)
1. Build CRUD pages/modals for employees (name, role, skills, availability summary, max hours).
2. Build CRUD for facilities and default shift templates (operating hours, role requirements).
3. Add validation and optimistic UI updates, backed by Supabase real-time subscriptions (optional for v1).

### 4. Schedule Builder Skeleton (Day 5-8)
1. Create dashboard view with multi-tab layout: Facility view, Employee view.
2. Implement static grid representing a single week of shifts with coverage summary per slot.
3. Wire grid to Supabase data (read-only at first) and surface coverage indicators (e.g., required vs. assigned count).

### 5. Basic Assignment Workflow (Day 8-10)
1. Enable manual assignment of employees to shift slots (drag-drop or form-based edit overlay).
2. Persist assignments in Supabase (`shift_assignments` table) and refresh UI state.
3. Provide inline validation feedback for obvious conflicts (double-booking, availability mismatch).

### 6. Compliance Engine v0 (Day 10-12)
1. Implement server-side checks for hard rules: single shift per day, rest period, weekly hour caps.
2. Expose validation API that returns warnings/errors consumed by the dashboard.
3. Display violations in the UI (badges/tooltips) and block persist if severe (e.g., rest period breach).

### 7. Release Prep (Day 12-14)
1. Add minimal onboarding flow: placeholder license key field, Supabase Auth stub.
2. Create initial CI pipeline (lint, type-check, unit tests) and deployment configuration for Vercel.
3. Produce demo data set and script to showcase end-to-end flow.

## Immediate Next Actions
- Confirm project scaffolding approach (Next.js app dir vs pages dir) and create the repo baseline.
- Spin up Supabase project and document credentials handling in `.env.example`.
- Draft entity-relationship diagram to align data model before coding UI.
