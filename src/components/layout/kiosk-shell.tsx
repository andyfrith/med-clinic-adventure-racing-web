type KioskShellProps = {
  children: React.ReactNode;
};

/**
 * Waiting-area kiosk shell: full width, high contrast, minimal chrome.
 */
export function KioskShell({ children }: KioskShellProps) {
  return (
    <div className="bg-background text-foreground min-h-svh w-full">
      <div className="mx-auto flex min-h-svh w-full max-w-[1920px] flex-col px-6 py-8 md:px-12 md:py-10">
        {children}
      </div>
    </div>
  );
}
