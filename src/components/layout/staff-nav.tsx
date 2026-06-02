'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  LayoutDashboard,
  Monitor,
  Stethoscope,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const staffNav = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/clinician', label: 'Clinician', icon: Stethoscope },
  { href: '/doctor', label: 'Doctor', icon: Activity },
  { href: '/ops', label: 'Ops / Admin', icon: Users },
  { href: '/racer', label: 'Racer', icon: User },
  { href: '/kiosk', label: 'Kiosk', icon: Monitor },
] as const satisfies ReadonlyArray<{
  href: string;
  label: string;
  icon: LucideIcon;
}>;

type StaffNavListProps = {
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
};

/**
 * Shared staff navigation links for desktop sidebar and mobile sheet.
 */
export function StaffNavList({ onNavigate, className, linkClassName }: StaffNavListProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col gap-1', className)} aria-label="Staff navigation">
      {staffNav.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              'flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'hover:bg-sidebar-accent/60',
              linkClassName,
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

type StaffNavBrandProps = {
  className?: string;
};

/** Sidebar / sheet header branding block. */
export function StaffNavBrand({ className }: StaffNavBrandProps) {
  return (
    <div className={cn('border-sidebar-border border-b px-4 py-5', className)}>
      <p className="text-sm font-semibold tracking-tight">Adventure Racing</p>
      <p className="text-muted-foreground text-xs">Med Clinic</p>
      <Badge variant="secondary" className="mt-2">
        Phase 0
      </Badge>
    </div>
  );
}
