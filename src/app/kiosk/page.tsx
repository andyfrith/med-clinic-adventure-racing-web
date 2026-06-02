import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Waiting area | Adventure Racing Med Clinic',
};

/**
 * Read-only waiting-area display: large type, high contrast, minimal chrome.
 */
export default function KioskPage() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      <div className="space-y-4">
        <Badge variant="outline" className="text-base px-3 py-1">
          Waiting area
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          Clinic queue
        </h1>
        <p className="text-muted-foreground max-w-3xl text-2xl md:text-3xl lg:text-4xl">
          Live queue and visit status will appear here during the event.
        </p>
      </div>
      <Separator />
      <section aria-label="Queue placeholder" className="space-y-6">
        <p className="text-3xl font-medium md:text-4xl">Now serving</p>
        <p className="text-6xl font-semibold tabular-nums md:text-8xl">—</p>
        <p className="text-muted-foreground text-2xl md:text-3xl">
          Phase 0 placeholder · connect displays in landscape orientation
        </p>
      </section>
    </div>
  );
}
