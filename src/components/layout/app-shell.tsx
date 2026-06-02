import { AppSidebar } from '@/components/layout/app-sidebar';

type AppShellProps = {
  children: React.ReactNode;
};

/**
 * Responsive staff shell: sidebar + main content (desktop ops, tablet clinician).
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-svh">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">{children}</main>
    </div>
  );
}
