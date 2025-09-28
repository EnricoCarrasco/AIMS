# Environment Setup Guide

Phase 1 focuses on bootstrapping the developer experience for the shift scheduling MVP. Follow the steps below to get the project running locally.

## 1. Install Toolchain

- Node.js 22 LTS (or use the .nvmrc once the team sets a version pin).
- npm 10+ (ships with Node 22).
- Supabase CLI
  px supabase --help (installed automatically through
  pm install).

## 2. Install Dependencies

`ash
npm install
`

## 3. Configure Environment Variables

Copy the example file and fill in credentials from the Supabase dashboard.

`ash
cp .env.example .env.local
`

| Key                           | Description                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| NEXT_PUBLIC_SUPABASE_URL      | Project URL from Supabase (https://xyzcompany.supabase.co).                         |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Public anon key used in the browser.                                                |
| SUPABASE_SERVICE_ROLE_KEY     | Service role key for server-side actions (keep secret).                             |
| SUPABASE_REDIRECT_URL         | URL used for auth callbacks during local dev (http://localhost:3000/auth/callback). |

## 4. Start Supabase Locally (optional)

Run the full Supabase stack locally if you prefer not to target a hosted project:

`ash
npx supabase start
`

Stop the stack with
px supabase stop. Migrations and seeds live under the supabase/ directory.

## 5. Run the Web App

`ash
npm run dev
`
Navigate to http://localhost:3000 and confirm the Foundation dashboard loads.

## 6. Quality Gates

- pm run lint � Next.js lint rules + Prettier alignment.
- pm run format � Format all supported file types.
- pm run typecheck � TypeScript in --noEmit mode.
- pm run test � Vitest + React Testing Library smoke tests (add spec files under src/**tests**).

## 7. Recommended VS Code Extensions

The .vscode/extensions.json file suggests installing ESLint, Prettier, and the Supabase (Deno) toolchain for edge functions.

## 8. Next Steps

- Capture schema migrations using supabase db diff once tables are defined.
- Add seed scripts for the Hotel Macedonia Pallas and Saint Loukas scenarios.
- Wire CI to run lint, ypecheck, and est prior to deployment to Vercel.
