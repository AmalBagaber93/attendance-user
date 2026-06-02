'use client';

import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMedia } from 'react-use';

type ResponsiveDialogProps = {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
};

export function ResponsiveDialog({
  trigger,
  children,
  title,
  description,
  actions,
  className,
  open,
  dismissible = true,
  onOpenChange,
}: ResponsiveDialogProps) {
  const [o, setOpen] = React.useState(false);
  const isDesktop = useMedia('(min-width: 768px)', true);

  React.useEffect(() => {
    if (open !== undefined) {
      setOpen(open);
    }
  }, [open]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );

  if (isDesktop) {
    return (
      <Dialog
        open={o}
        onOpenChange={open => {
          if (dismissible) {
            handleOpenChange(open);
          }
        }}
      >
        {trigger && (
          <DialogTrigger asChild suppressHydrationWarning>
            {trigger}
          </DialogTrigger>
        )}
        <DialogContent className={className}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          {actions && <DialogFooter>{actions}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={o} onOpenChange={handleOpenChange} dismissible={dismissible}>
      <DrawerTrigger asChild suppressHydrationWarning>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className={className}>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children && children}
        {actions && <DrawerFooter>{actions}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}
