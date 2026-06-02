import { AppSidebar } from '@/components/layout/app-sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';

type AppShellProps = {
  children: React.ReactNode;
};

/**
 * Responsive staff shell: drawer nav below lg, persistent sidebar at lg+.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <header className="bg-background sticky top-0 z-40 flex items-center gap-3 border-b px-4 py-3 lg:hidden">
        <MobileNav />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight">
            Adventure Racing Med Clinic
          </p>
          <p className="text-muted-foreground truncate text-xs">Staff workspace</p>
        </div>
      </header>
      <div className="flex min-h-0 min-w-0 flex-1">
        <AppSidebar />
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
