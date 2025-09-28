import { type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NAVIGATION = [
  {
    title: 'Phase 1',
    items: [
      { label: 'Foundation Overview', href: '#foundation-overview' },
      { label: 'Environment Setup', href: '#environment-setup' },
      { label: 'Tooling Checklist', href: '#tooling-checklist' },
    ],
  },
] as const;

function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden border-r bg-muted/40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex h-16 items-center border-b px-6 text-lg font-semibold">
          Build Planner
        </div>
        <nav className="flex-1 space-y-6 px-6 py-6 text-sm">
          {NAVIGATION.map((section) => (
            <div key={section.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                        'text-muted-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-3 border-b bg-background px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex size-8 items-center justify-center rounded bg-primary/10 text-sm text-primary">
              A
            </span>
            <span>AIMS Shift Scheduler</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="https://nextjs.org/docs/app" target="_blank" rel="noreferrer">
                Next.js Docs
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"
                target="_blank"
                rel="noreferrer"
              >
                Supabase Guide
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="https://ui.shadcn.com/docs" target="_blank" rel="noreferrer">
                shadcn/ui Docs
              </Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12">{children}</main>
      </div>
    </div>
  );
}

export { AppShell };
