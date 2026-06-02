'use client';

import * as React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMedia } from 'react-use';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { FormControl } from './form';
import { useTranslations } from 'next-intl';
import { useLenisDropdown } from '@/hooks/use-lenis-dropdown';
import { Input } from './input';

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
  [key: string]: any;
};

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: ComboboxOption | null;
  onValueChange?: (value: ComboboxOption | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  buttonClassName?: string;
  triggerContent?: React.ReactNode;
  renderValue?: (value: ComboboxOption) => React.ReactNode;
  renderItem?: (option: ComboboxOption) => React.ReactNode;
  searchFilter?: (option: any, search: string) => boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  commandMobileClassName?: string;
  commandDesktopClassName?: string;
  showChevronIcon?: boolean;
  asFormControl?: boolean;
  clearable?: boolean;
  variant?: 'filled' | 'outline';
  inputClassName?: string;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select option',
  searchPlaceholder,
  emptyMessage,
  className,
  buttonClassName,
  triggerContent,
  renderValue,
  renderItem,
  searchFilter,
  disabled = false,
  loading = false,
  error = false,
  commandMobileClassName,
  commandDesktopClassName,
  asFormControl = false,
  clearable = true,
  variant,
  inputClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMedia('(min-width: 768px)', true);

  // Handle Lenis smooth scrolling conflicts
  useLenisDropdown(open);

  const Wrapper = asFormControl ? FormControl : React.Fragment;

  const handleSelect = (selectedValue: string) => {
    const selectedOption = options.find(
      option => option.value === selectedValue
    );
    onValueChange?.(selectedOption || null);
    setOpen(false);
  };

  const displayContent = value
    ? renderValue
      ? renderValue(value)
      : value.label
    : '';

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(null);
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <Wrapper>
          <PopoverTrigger
            suppressHydrationWarning
            className={cn(buttonClassName)}
            disabled={disabled || loading}
          >
            <Input
              readOnly
              value={displayContent as string}
              placeholder={placeholder}
              error={error}
              variant={variant}
              endIcon={
                <>
                  {clearable && value && (
                    <button
                      type='button'
                      onMouseDown={event => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onClick={handleClear}
                      className='p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground'
                    >
                      <XIcon size={16} />
                    </button>
                  )}
                  {<ChevronDownIcon size={16} />}
                </>
              }
              className={inputClassName}
            />
          </PopoverTrigger>
        </Wrapper>
        <PopoverContent className={cn('w-full p-0', className)} align='start'>
          <ComboboxList
            options={options}
            onSelect={handleSelect}
            searchPlaceholder={searchPlaceholder}
            emptyMessage={emptyMessage}
            loading={loading}
            searchFilter={searchFilter}
            renderItem={renderItem}
            commandClassName={commandDesktopClassName}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className='w-full'>
        <Input
          readOnly
          value={displayContent as string}
          placeholder={placeholder}
          error={error}
          endIcon={
            clearable &&
            value && (
              <button
                type='button'
                onMouseDown={event => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onClick={handleClear}
                className='p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground'
              >
                <XIcon size={16} />
              </button>
            )
          }
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerDescription />
        <DrawerTitle />
        <div className='mt-4'>
          <ComboboxList
            options={options}
            onSelect={handleSelect}
            searchPlaceholder={searchPlaceholder}
            emptyMessage={emptyMessage}
            loading={loading}
            searchFilter={searchFilter}
            renderItem={renderItem}
            commandClassName={commandMobileClassName}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface ComboboxListProps {
  options: ComboboxOption[];
  onSelect: (value: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  searchFilter?: (option: ComboboxOption, search: string) => boolean;
  renderItem?: (option: ComboboxOption) => React.ReactNode;
  commandClassName?: string;
}

function ComboboxList({
  options,
  onSelect,
  searchPlaceholder,
  emptyMessage,
  loading = false,
  searchFilter,
  renderItem,
  commandClassName,
}: ComboboxListProps) {
  const t = useTranslations('Common');

  const commandFilter = React.useMemo(() => {
    if (!searchFilter) return undefined;

    return (value: string, search: string) => {
      const option = options.find(opt => opt.value === value);
      if (!option) return 0;
      return searchFilter(option, search) ? 1 : 0;
    };
  }, [options, searchFilter]);

  return (
    <Command filter={commandFilter}>
      <CommandInput
        className='text-base'
        placeholder={searchPlaceholder || t('search')}
      />
      <CommandList className={commandClassName}>
        <CommandEmpty>{emptyMessage || t('no_results_found')}</CommandEmpty>
        <CommandGroup>
          {loading ? (
            <div className='p-4 text-center text-muted-foreground'>
              Loading...
            </div>
          ) : (
            options.map(option => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={onSelect}
                disabled={option.disabled}
                className={cn(
                  'text-base',
                  option.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {renderItem ? renderItem(option) : option.label}
              </CommandItem>
            ))
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
