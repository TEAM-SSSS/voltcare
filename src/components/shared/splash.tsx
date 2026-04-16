'use client';

import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // Splash screen for 2.5s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="rounded-full bg-primary/20 p-4 text-primary shadow-[0_0_25px_hsl(var(--primary))]">
          <Zap className="h-12 w-12" />
        </div>
      </div>
       <h1 className="font-headline text-5xl font-bold text-white">
          VoltCare
        </h1>
    </div>
  );
}
