import Link from 'next/link';
import { ArrowRight, ClipboardCheck, Search } from 'lucide-react';

import { AppHeader } from '@/components/layout/app-header';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Racer self-service stub: single column, large tap targets for phone use.
 */
export default function RacerPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <AppHeader
        title="Racer"
        description="Self-service stub for racer check-in and status (Phase 2+)."
      />
      <Card>
        <CardHeader>
          <CardTitle>Check in</CardTitle>
          <CardDescription>
            Search by bib or name to open a visit — coming in Phase 2.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button className="min-h-11 w-full justify-start gap-3 text-base" disabled>
            <Search className="size-5 shrink-0" aria-hidden />
            Find my bib
          </Button>
          <Button
            variant="outline"
            className="min-h-11 w-full justify-start gap-3 text-base"
            disabled
          >
            <ClipboardCheck className="size-5 shrink-0" aria-hidden />
            I already checked in
          </Button>
        </CardContent>
      </Card>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'min-h-11 w-full justify-center text-base',
        )}
      >
        Back to staff home
        <ArrowRight className="size-5" aria-hidden />
      </Link>
    </div>
  );
}
