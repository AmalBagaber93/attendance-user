'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';

import {
  Combobox as ComboboxRoot,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import { cn } from '@/lib/utils';

const comboboxSelectTriggerVariants = cva(
  'border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-12 w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        outline: 'border bg-transparent dark:bg-input/30 dark:hover:bg-input/50',
        filled: 'border-none bg-background-secondary hover:bg-background-secondary',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  }
);

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
  [key: string]: any;
};

export interface ComboboxSelectProps {
  options: ComboboxOption[];
  value?: ComboboxOption | null;
  onValueChange?: (value: ComboboxOption | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  searchFilter?: (option: any, search: string) => boolean;
  renderItem?: (option: ComboboxOption) => React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  clearable?: boolean;
  showTrigger?: boolean;
  variant?: 'filled' | 'outline';
  inputClassName?: string;
  contentClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  className?: string;
}

export function ComboboxSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select option',
  searchPlaceholder,
  emptyMessage,
  searchFilter,
  renderItem,
  disabled = false,
  loading = false,
  error = false,
  clearable = true,
  showTrigger = true,
  variant = 'outline',
  inputClassName,
  contentClassName,
  listClassName,
  itemClassName,
  className,
  ...triggerProps
}: ComboboxSelectProps) {
  const t = useTranslations('Common');

  const filter = React.useCallback(
    (option: ComboboxOption, search: string) => {
      const normalizedSearch = search.toLowerCase();
      if (!normalizedSearch) return true;

      if (searchFilter) {
        return searchFilter(option, normalizedSearch);
      }

      return (
        option.label.toLowerCase().includes(normalizedSearch) ||
        option.value.toLowerCase().includes(normalizedSearch)
      );
    },
    [searchFilter]
  );

  return (
    <ComboboxRoot
      items={options}
      value={value ?? null}
      onValueChange={onValueChange}
      disabled={disabled || loading}
      modal
      filter={filter}
      isItemEqualToValue={(itemValue, selectedValue) => {
        if (selectedValue == null) return false;
        if (itemValue == null) return false;
        return itemValue.value === selectedValue.value;
      }}
      itemToStringLabel={itemValue => itemValue.label}
      itemToStringValue={itemValue => itemValue.value}
    >
      <div className={cn('relative w-full', className)}>
        <ComboboxTrigger
          className={cn(
            comboboxSelectTriggerVariants({ variant }),
            clearable && value ? 'pr-20' : 'pr-10',
            inputClassName
          )}
          disabled={disabled || loading}
          aria-invalid={error || undefined}
          {...triggerProps}
        >
          <ComboboxValue placeholder={placeholder} />
          {showTrigger ? null : <span className='sr-only'>Open options</span>}
        </ComboboxTrigger>

        {clearable && value ? (
          <ComboboxClear
            className='absolute top-1/2 right-9 -translate-y-1/2'
            aria-label='Clear selection'
            disabled={disabled || loading}
          />
        ) : null}
      </div>

      <ComboboxContent className={cn('p-0 bg-white w-fit', contentClassName)}>
        {/* <ComboboxInput
          showTrigger={false}
          showClear={false}
          placeholder={searchPlaceholder || t('search')}
          disabled={disabled || loading}
        /> */}

        {loading ? (
          <div className='p-4 text-center text-muted-foreground'>Loading...</div>
        ) : (
          <>
            <ComboboxEmpty>{emptyMessage || t('no_results_found')}</ComboboxEmpty>
            <ComboboxList className={listClassName}>
              {(option: ComboboxOption) => (
                <ComboboxItem
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                  className={cn(itemClassName, 'hover:bg-mauve-100')}

                >
                  {renderItem ? renderItem(option) : option.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </>
        )}
      </ComboboxContent>
    </ComboboxRoot>
  );
}
