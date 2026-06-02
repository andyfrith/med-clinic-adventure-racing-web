import { KioskShell } from '@/components/layout/kiosk-shell';

export default function KioskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <KioskShell>{children}</KioskShell>;
}
