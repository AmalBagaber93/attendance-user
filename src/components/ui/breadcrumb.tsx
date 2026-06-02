'use client';

import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label='Breadcrumb'
      className={cn('flex items-center flex-wrap gap-y-1 text-sm', className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className='flex items-center gap-1'>
            {item.href ? (
              <Link
                href={item.href}
                className='rounded px-1 py-0.5 font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                className='px-1 py-0.5 font-semibold text-foreground'
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight
                className='mx-0.5 size-3.5 shrink-0 text-muted-foreground/50'
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
