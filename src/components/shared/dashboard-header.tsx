'use client';

import { NotificationDropdown } from "./notification-dropdown";
import { UserCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function DashboardHeader() {
  const [profile, setProfile] = useState({ name: "Shree Moh", consumerId: "987654321" });

  useEffect(() => {
    const loadProfile = () => {
      const stored = localStorage.getItem('user_profile');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setProfile({
            name: parsed.name || "Shree Moh",
            consumerId: parsed.consumerId || "987654321",
          });
        } catch (e) {
          console.error("Failed to load header profile", e);
        }
      }
    };

    loadProfile();

    window.addEventListener('storage', loadProfile);
    window.addEventListener('profile-updated', loadProfile);

    return () => {
      window.removeEventListener('storage', loadProfile);
      window.removeEventListener('profile-updated', loadProfile);
    };
  }, []);

  return (
    <header className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-lg sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="relative w-full max-w-sm hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for tickets, bills..."
          className="pl-10 h-9 bg-white/5 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <NotificationDropdown />
        <div className="h-8 w-px bg-white/10 mx-1 md:mx-2" />

        <Button variant="ghost" className="gap-2 px-2 hover:bg-white/5 transition-colors">
          <div className="text-right flex flex-col justify-center">
            <p className="text-[10px] md:text-xs font-bold leading-none text-white">{profile.name}</p>
            <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase mt-1">
              ID: {profile.consumerId}
            </p>
          </div>

          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <UserCircle className="h-5 w-5 text-primary" />
          </div>
        </Button>
      </div>
    </header>
  );
}
