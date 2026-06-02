'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { arSA, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import { useMedia } from 'react-use';
import { FormControl } from './form';
import { CalendarIcon, XIcon } from 'lucide-react';
import { Input } from './input';

export interface DatePickerProps extends Omit<
  React.ComponentProps<typeof Calendar>,
  'selected' | 'onSelect' | 'mode'
> {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  isDisabled?: boolean;
  error?: boolean;
  containerClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  asFormControl?: boolean;
  clearable?: boolean;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = 'Select date',
  isDisabled = false,
  error = false,
  className,
  containerClassName,
  startIcon,
  endIcon,
  asFormControl = false,
  clearable = true,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const isDesktop = useMedia('(min-width: 768px)', true);

  const Wrapper = asFormControl ? FormControl : React.Fragment;

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange?.(selectedDate);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateChange?.(undefined);
  };

  const triggerContent = date
    ? format(date, 'PPP', { locale: locale === 'ar' ? arSA : enUS })
    : '';

  if (isDesktop) {
    return (
      <div className={cn('relative', containerClassName)}>
        <Popover open={open} onOpenChange={setOpen} modal>
          <Wrapper>
            <PopoverTrigger
              disabled={isDisabled}
              className={cn('w-full', className)}
            >
              <Input
                readOnly
                value={triggerContent as string}
                placeholder={placeholder}
                error={error}
                startIcon={startIcon}
                endIcon={
                  <div
                    className={cn(
                      'gap-1 absolute inset-y-0 flex items-center px-3 ltr:right-0 rtl:left-0 space-x-2 rtl:space-x-reverse',
                      error ? 'text-destructive' : 'text-muted-foreground'
                    )}
                  >
                    {clearable && date && (
                      <button
                        type='button'
                        onClick={handleClear}
                        className='p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground'
                      >
                        <XIcon size={16} />
                      </button>
                    )}
                    {endIcon ? (
                      <span className='pointer-events-none'>{endIcon}</span>
                    ) : (
                      <CalendarIcon size={16} className='pointer-events-none' />
                    )}
                  </div>
                }
              />
            </PopoverTrigger>
          </Wrapper>
          <PopoverContent className='w-auto p-0 min-w-fit' align='start'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={handleDateSelect}
              captionLayout='dropdown'
              showOutsideDays={false}
              {...calendarProps}
            />
          </PopoverContent>
        </Popover>
        {}
      </div>
    );
  }

  return (
    <div className={cn('relative', containerClassName)}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className='w-full'>
          <Input
            readOnly
            value={triggerContent as string}
            placeholder={placeholder}
            error={error}
            startIcon={startIcon}
            endIcon={
              <div
                className={cn(
                  'gap-1 absolute inset-y-0 flex items-center px-3 ltr:right-0 rtl:left-0 space-x-2 rtl:space-x-reverse',
                  error ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                {clearable && date && (
                  <button
                    type='button'
                    onClick={handleClear}
                    className='p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground'
                  >
                    <XIcon size={16} />
                  </button>
                )}
                {endIcon ? (
                  <span className='pointer-events-none'>{endIcon}</span>
                ) : (
                  <CalendarIcon size={16} className='pointer-events-none' />
                )}
              </div>
            }
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerDescription />
          <DrawerTitle />
          <div className='mt-4'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              captionLayout='dropdown'
              showOutsideDays={false}
              className='mx-auto [--cell-size:clamp(0px,calc(100vw/7.5),52px)]'
              {...calendarProps}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
