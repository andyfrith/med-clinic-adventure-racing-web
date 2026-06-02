type KioskShellProps = {
  children: React.ReactNode;
};

/**
 * Waiting-area kiosk shell: full width, high contrast, minimal chrome.
 */
export function KioskShell({ children }: KioskShellProps) {
  return (
    <div className="bg-background text-foreground min-h-svh w-full overflow-x-hidden">
      <div className="mx-auto flex min-h-svh w-full max-w-[1920px] flex-col px-[max(1.5rem,env(safe-area-inset-left))] py-[max(2rem,env(safe-area-inset-top))] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[max(2rem,env(safe-area-inset-bottom))] md:px-12 md:py-10">
        {children}
      </div>
    </div>
  );
}
