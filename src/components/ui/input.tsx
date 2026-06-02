'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
  variant?: 'filled' | 'outline';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      endIcon,
      startIcon,
      error,
      type,
      containerClassName,
      variant = 'outline',
      ...props
    },
    ref
  ) => {
    const [typeState, setTypeState] = React.useState(type);

    const isPassword = type === 'password';

    return (
      <div className={cn('relative h-full', containerClassName)}>
        {startIcon && (
          <div
            className={cn(
              'pointer-events-none absolute inset-y-0 flex items-center ltr:left-0 rtl:right-0',
              error ? 'text-destructive' : 'text-muted-foreground',
              'ps-4'
            )}
          >
            {startIcon}
          </div>
        )}
        <input
          type={typeState}
          className={cn(
            'flex w-full h-12 rounded-lg placeholder:text-sm hover:placeholder:text-accent-foreground border-[1.5px] px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring/50 transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-destructive/40 disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-destructive' : 'border-border',
            startIcon ? 'ltr:pl-11 rtl:pr-11' : 'ltr:pl-3 rtl:pr-3',
            endIcon || isPassword ? 'ltr:pr-10 rtl:pl-10' : 'ltr:pr-3 rtl:pl-3',
            variant === 'filled' && 'bg-background-secondary',
            variant === 'filled' && 'border-none',
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div
            className={cn(
              'absolute inset-y-0 flex items-center px-3 ltr:right-0 rtl:left-0',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {endIcon}
          </div>
        )}
        {isPassword && !endIcon && (
          <button
            type='button'
            aria-label='Toggle password visibility'
            className={cn(
              'pointer-events-auto absolute inset-y-0 flex items-center rounded-md px-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring ltr:right-0 rtl:left-0',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
            onClick={() =>
              setTypeState(typeState === 'password' ? 'text' : 'password')
            }
          >
            {typeState === 'password' ? (
              <IoEye size={20} />
            ) : (
              <IoEyeOff size={20} />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
