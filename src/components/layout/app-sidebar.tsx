import { StaffNavBrand, StaffNavList } from '@/components/layout/staff-nav';

/**
 * Persistent staff sidebar for desktop ops and doctor layouts (lg+).
 */
export function AppSidebar() {
  return (
    <aside className="bg-sidebar text-sidebar-foreground hidden h-full w-56 shrink-0 flex-col border-r lg:flex lg:w-64">
      <StaffNavBrand />
      <StaffNavList className="flex-1 p-3" />
    </aside>
  );
}
