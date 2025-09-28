# AIMS Shift Scheduling � Web

Phase 1 delivers the Foundation & Environment slice for the workforce scheduling MVP. The goal is to give the team a production-ready scaffold with consistent tooling, Supabase integration hooks, and baseline UI primitives.

## Tech Stack

- [Next.js 15 App Router](https://nextjs.org/docs/app)
- React 19 + TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com/docs) component primitives
- Supabase client SDK + CLI (supabase/ directory)
- ESLint (flat config) + Prettier + Husky/lint-staged
- Vitest + React Testing Library

## Quickstart

`ash
npm install
cp .env.example .env.local # fill with Supabase project credentials
npm run dev
`
Visit [http://localhost:3000](http://localhost:3000) to view the Foundation dashboard and quick links to documentation.

### Quality Gates

`ash
npm run lint        # next lint (extends core-web-vitals)
npm run format      # prettier write
npm run typecheck   # typescript --noEmit
npm run test        # vitest + RTL
`

## Supabase Workflow

- Initialize local stack:
  px supabase start
- Apply migrations / seeds from supabase/
- Use the helpers in src/lib/supabase/ for server and browser access (createSupabaseServerClient, createSupabaseBrowserClient).
- Health check endpoint: GET /api/health returns Supabase configuration status.

## UI Foundations

- Layout shell: src/components/layout/app-shell.tsx
- Typography helpers: src/components/typography/page-header.tsx
- Core inputs/buttons from shadcn/ui under src/components/ui/

## Documentation

- docs/environment-setup.md � End-to-end environment/bootstrap checklist.
- Root project documents: ../PRD.md, ../initial-build-focus.md, ../data-model-blueprint.md.

## Next Steps

1. Define Supabase schema migrations aligned with the data model blueprint.
2. Scaffold employee & facility CRUD screens using the established component primitives.
3. Integrate compliance and scheduling logic iteratively, adding targeted Vitest coverage per module.
