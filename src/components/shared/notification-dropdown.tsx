'use client';
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-white/5">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-card/95 backdrop-blur-md border-white/10">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Bill Generated</p>
            <p className="text-xs text-muted-foreground">Your electricity bill for July is ready.</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Complaint Resolved</p>
            <p className="text-xs text-muted-foreground">Complaint C-72845 has been resolved.</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
