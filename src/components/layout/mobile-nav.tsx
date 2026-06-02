'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

import { StaffNavBrand, StaffNavList } from '@/components/layout/staff-nav';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

/**
 * Mobile / tablet navigation drawer (Sheet) for staff routes below lg breakpoint.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="size-11 shrink-0"
            aria-label="Open navigation menu"
          />
        }
      >
        <Menu className="size-5" aria-hidden />
      </SheetTrigger>
      <SheetContent side="left" className="bg-sidebar text-sidebar-foreground w-72 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Staff navigation</SheetTitle>
        </SheetHeader>
        <StaffNavBrand />
        <StaffNavList
          className="p-3"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
