import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  className?: string;
};

function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {description ? (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}

export { PageHeader };
