'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='dialog-overlay'
      className={cn(
        'fixed inset-0 z-[100] bg-foreground/45 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {}) {
  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot='dialog-content'
        className={cn(
          'fixed top-[50%] left-[50%] z-[100] w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-xl',
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  showCloseButton = true,
  onClose,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      data-slot='dialog-header'
      className={cn(
        'flex items-center justify-between border-b border-border bg-card px-6 py-5',
        className
      )}
      {...props}
    >
      <div className={cn('flex flex-col gap-2', showCloseButton && 'flex-1')}>
        {children}
      </div>
      {showCloseButton && (
        <DialogClose
          className='rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
          onClick={onClose}
        >
          <XIcon className='h-5 w-5' />
          <span className='sr-only'>Close</span>
        </DialogClose>
      )}
    </div>
  );
}

function DialogBody({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-body'
      className={cn(
        'no-scrollbar -mx-4 max-h-[70vh] overflow-y-auto px-10 py-8 space-y-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-footer'
      className={cn(
        'flex justify-end gap-3 border-t border-border bg-card px-6 py-5',
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={cn('text-xl font-bold text-foreground', className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot='dialog-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
