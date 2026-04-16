'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Receipt, 
  Settings, 
  LogOut,
  Zap,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Manage Complaints", href: "/admin/complaints", icon: MessageSquare },
  { name: "Manage Users", href: "/admin/users", icon: Users },
  { name: "Billing Management", href: "/admin/billing", icon: Receipt },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
  { name: "Admin Profile", href: "/admin/profile", icon: UserCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="rounded-full bg-primary/20 p-2 text-primary shadow-[0_0_10px_hsl(var(--primary))]">
          <Zap className="h-6 w-6" />
        </div>
        <span className="font-bold text-xl text-white tracking-tight">VoltAdmin</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "group-hover:text-primary transition-colors")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => router.push('/')}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
