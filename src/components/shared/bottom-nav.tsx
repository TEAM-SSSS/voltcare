'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/data';

export default function BottomNav() {
  const pathname = usePathname();

  // Only render the bottom nav if the current route is one of the main tabs
  const isMainTab = navLinks.some(link => link.href === pathname);
  
  if (!isMainTab) {
    return null;
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t border-white/10 bg-black/30 backdrop-blur-lg">
      <nav className="flex h-full items-center justify-around">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
