'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, ShieldCheck, Mail, Building, Save, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminProfilePage() {
  const { toast } = useToast();
  const [admin, setAdmin] = useState({
    name: "Volt Admin",
    email: "admin@voltcare.com",
    role: "System Administrator",
    department: "IT Operations & Infrastructure",
    lastLogin: "July 24, 2024 at 10:30 AM"
  });

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Admin profile information has been successfully saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
          <p className="text-muted-foreground">Manage your administrative account details and security preferences.</p>
        </div>
        <Badge variant="outline" className="w-fit border-primary/30 bg-primary/10 text-primary py-1 px-3">
          Root Access Enabled
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10 lg:col-span-1">
          <CardHeader className="items-center text-center">
            <div className="relative mb-4">
              <Avatar className="h-32 w-32 border-4 border-primary/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                  <User size={48} />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-1.5 rounded-full border-4 border-background shadow-lg">
                <ShieldCheck size={20} />
              </div>
            </div>
            <CardTitle className="text-xl">{admin.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-1.5 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {admin.role}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Department</span>
              <span className="text-white font-medium">{admin.department}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Admin Status</span>
              <span className="text-primary font-bold">Active</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Login</span>
              <span className="text-white/60">{admin.lastLogin}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile Information</CardTitle>
            <CardDescription>Update your public-facing admin details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={admin.name} 
                  onChange={(e) => setAdmin({...admin, name: e.target.value})}
                  className="bg-white/5 border-white/10 focus:border-primary/50" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    value={admin.email} 
                    onChange={(e) => setAdmin({...admin, email: e.target.value})}
                    className="pl-10 bg-white/5 border-white/10 focus:border-primary/50" 
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dept">Department</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="dept" 
                    value={admin.department} 
                    onChange={(e) => setAdmin({...admin, department: e.target.value})}
                    className="pl-10 bg-white/5 border-white/10 focus:border-primary/50" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role Designation</Label>
                <Input 
                  id="role" 
                  value={admin.role} 
                  disabled
                  className="bg-white/5 border-white/10 opacity-70 cursor-not-allowed" 
                />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} className="gap-2 font-bold px-8 shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] transition-all">
                <Save size={18} />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
             <Lock className="text-primary h-5 w-5" /> Security & Access
          </CardTitle>
          <CardDescription>Secure your administrative session and account credentials.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
            <div>
              <p className="text-sm font-medium text-white">Change Admin Password</p>
              <p className="text-xs text-muted-foreground">Last changed 45 days ago. Recommended every 90 days.</p>
            </div>
            <Button variant="outline" className="sm:w-auto w-full hover:bg-white/10 transition-colors">Update Password</Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
            <div>
              <p className="text-sm font-medium text-white">Multi-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Required for all root level administrative accounts.</p>
            </div>
            <Button variant="outline" className="sm:w-auto w-full text-primary border-primary/20 bg-primary/5 hover:bg-primary/10">Configure MFA</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
