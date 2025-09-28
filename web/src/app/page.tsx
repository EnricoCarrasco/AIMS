import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FOUNDATION_CHECKLIST = [
  {
    title: 'Next.js foundation',
    description:
      'App Router project scaffolded with TypeScript, Tailwind CSS v4, and opinionated linting/formatting baselines.',
    status: 'complete' as const,
  },
  {
    title: 'Supabase connectivity',
    description:
      'Environment variables, server/browser clients, and local CLI bootstrap in place to connect to the data layer.',
    status: 'in-progress' as const,
  },
  {
    title: 'Shared UI primitives',
    description:
      'shadcn/ui configured with core components for consistent navigation, inputs, and actions.',
    status: 'in-progress' as const,
  },
];

const STATUS_STYLES: Record<(typeof FOUNDATION_CHECKLIST)[number]['status'], string> = {
  complete: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
  'in-progress': 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
};

function StatusBadge({ status }: { status: (typeof FOUNDATION_CHECKLIST)[number]['status'] }) {
  const label = status === 'complete' ? 'Complete' : 'In progress';

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {label}
    </span>
  );
}

export default function HomePage() {
  return (
    <AppShell>
      <section id="foundation-overview" className="space-y-8">
        <PageHeader
          title="Phase 1 - Foundation & Environment"
          description="Baseline the web application so the team can move directly into data modeling and feature delivery with dependable tooling, Supabase connectivity, and coherent UI primitives."
        />

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]" id="tooling-checklist">
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Foundation checklist</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/docs/environment-setup">View setup notes</Link>
                </Button>
              </div>
              <ul className="space-y-4">
                {FOUNDATION_CHECKLIST.map((item) => (
                  <li key={item.title} className="rounded-lg border bg-background/60 p-4 shadow-xs">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-base font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div id="environment-setup" className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Environment variables</h2>
                <Button size="sm" asChild>
                  <Link href="/docs/environment-setup#environment-variables">Review</Link>
                </Button>
              </div>
              <div className="space-y-4 text-sm">
                <p className="text-muted-foreground">
                  Copy these keys into <code>.env.local</code> using the values from your Supabase
                  project. The application guards and logs missing values in development.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="supabase-url">NEXT_PUBLIC_SUPABASE_URL</Label>
                    <Input id="supabase-url" value="https://your-project-id.supabase.co" readOnly />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="supabase-anon">NEXT_PUBLIC_SUPABASE_ANON_KEY</Label>
                    <Input id="supabase-anon" value="supabase-anon-key" readOnly type="password" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="supabase-service">SUPABASE_SERVICE_ROLE_KEY</Label>
                    <Input
                      id="supabase-service"
                      value="service-role-key"
                      readOnly
                      type="password"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="supabase-redirect">SUPABASE_REDIRECT_URL</Label>
                    <Input
                      id="supabase-redirect"
                      value="http://localhost:3000/auth/callback"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Quick links</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://nextjs.org/docs/app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Next.js App Router docs
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://ui.shadcn.com/docs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    shadcn/ui installation
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Supabase Next.js quickstart
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Next up</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Define database schema migrations and wire CRUD flows for employees and facilities
                using the Supabase clients configured in this foundation.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
