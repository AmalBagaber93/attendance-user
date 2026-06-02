'use client';

import React from 'react';
import { Label } from './label';
import { cn } from '@/lib/utils';
import TextFieldError, { TextFieldErrorProps } from './text-field-error';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Info } from 'lucide-react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: TextFieldErrorProps;
  children: React.ReactNode;
  className?: string;
  id?: string;
  fieldInInfo?: string;
}

export function FormField({
  label,
  required,
  error,
  children,
  className,
  id,
  fieldInInfo,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <Label htmlFor={id} className='text-sm font-medium'>
          {label}
          {required && <span className='text-destructive ml-0.5'>*</span>}
          {fieldInInfo && (
            <Tooltip>
              <TooltipTrigger className='ml-1'>
                <Info size={12} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{fieldInInfo}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </Label>
      )}
      {children}
      {error && (
        <p className='text-sm text-destructive' role='alert'>
          <TextFieldError>{error}</TextFieldError>
        </p>
      )}
    </div>
  );
}
