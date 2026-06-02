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
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const staffNav = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/clinician', label: 'Clinician', icon: Stethoscope },
  { href: '/doctor', label: 'Doctor', icon: Activity },
  { href: '/ops', label: 'Ops / Admin', icon: Users },
  { href: '/racer', label: 'Racer', icon: User },
  { href: '/kiosk', label: 'Kiosk', icon: Monitor },
] as const;

/**
 * Staff navigation sidebar for desktop ops and tablet clinician layouts.
 */
export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-sidebar text-sidebar-foreground flex h-full w-56 shrink-0 flex-col border-r md:w-64">
      <div className="border-sidebar-border border-b px-4 py-5">
        <p className="text-sm font-semibold tracking-tight">Adventure Racing</p>
        <p className="text-muted-foreground text-xs">Med Clinic</p>
        <Badge variant="secondary" className="mt-2">
          Phase 0
        </Badge>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Staff navigation">
        {staffNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'hover:bg-sidebar-accent/60',
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
