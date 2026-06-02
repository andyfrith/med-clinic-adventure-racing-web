import { AppHeader } from '@/components/layout/app-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type PlaceholderPageProps = {
  title: string;
  description: string;
  role: string;
};

/**
 * Shared placeholder content for Phase 0 role routes.
 */
export function PlaceholderPage({ title, description, role }: PlaceholderPageProps) {
  return (
    <>
      <AppHeader title={title} description={description} />
      <Card>
        <CardHeader>
          <CardTitle>{role} workspace</CardTitle>
          <CardDescription>
            Static placeholder for Phase 0. Authentication, queue, and visit flows
            arrive in later phases.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          <p>Use the sidebar to preview other role shells and the kiosk display.</p>
        </CardContent>
      </Card>
    </>
  );
}
