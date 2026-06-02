'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer inline-flex size-5 shrink-0 items-center justify-center rounded border border-input bg-background text-primary shadow-xs outline-none transition-[background-color,border-color,box-shadow,transform] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current'
      >
        <CheckIcon className='size-4' strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
