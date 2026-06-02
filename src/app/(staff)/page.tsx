import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { AppHeader } from '@/components/layout/app-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const roleLinks = [
  { href: '/clinician', title: 'Clinician', blurb: 'Tablet workflow for onsite care.' },
  { href: '/doctor', title: 'Doctor', blurb: 'Desktop review and clearance.' },
  { href: '/ops', title: 'Ops / Admin', blurb: 'Events, staff, and clinic setup.' },
  { href: '/racer', title: 'Racer', blurb: 'Self-service check-in stub.' },
  {
    href: '/kiosk',
    title: 'Kiosk / Waiting area',
    blurb: 'Large-format queue display.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <AppHeader
        title="Adventure Racing Med Clinic"
        description="Phase 0 foundation — placeholder shells for all v1 roles. No authentication or live data yet."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {roleLinks.map(({ href, title, blurb }) => (
          <Card key={href}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{blurb}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'min-h-11 w-full justify-center sm:w-auto',
                )}
              >
                Open
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
