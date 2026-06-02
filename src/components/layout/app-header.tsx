import { Separator } from '@/components/ui/separator';

type AppHeaderProps = {
  title: string;
  description?: string;
};

/**
 * Page header for staff-facing routes.
 */
export function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <header className="space-y-1 pb-6">
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
      {description ? (
        <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
          {description}
        </p>
      ) : null}
      <Separator className="mt-4" />
    </header>
  );
}
