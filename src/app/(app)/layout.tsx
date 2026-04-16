'use client';
import type { PropsWithChildren } from 'react';
import BottomNav from '@/components/shared/bottom-nav';
import { DashboardHeader } from '@/components/shared/dashboard-header';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  // Only show the bottom navigation bar on main routes defined in navLinks
  const isMainTab = navLinks.some(link => link.href === pathname);

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <main className={cn("flex-1 overflow-y-auto", isMainTab && "pb-24")}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
