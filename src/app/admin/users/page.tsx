'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';

export default function AdminUsersPage() {
  const [activeUser, setActiveUser] = useState<any>(null);

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem('user_profile');
      if (stored) {
        setActiveUser(JSON.parse(stored));
      }
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const staticUsers = [
    { id: "U-4S", name: "TEAM 4S", email: "team4s@voltcare.com", consumerId: "CID-4S-2024", joined: "2024-08-01" },
    { id: "U-4921", name: "Amit Verma", email: "amit@example.com", consumerId: "987654322", joined: "2024-02-10" },
    { id: "U-4922", name: "Sita Devi", email: "sita@example.com", consumerId: "987654323", joined: "2024-03-05" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Users</h1>
          <p className="text-muted-foreground">Monitor and manage consumer accounts in real-time.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10 bg-white/5 border-white/10" placeholder="Search users..." />
          </div>
          <Button className="gap-2 bg-primary text-primary-foreground font-bold">
            <UserPlus size={16} /> Add User
          </Button>
        </div>
      </div>

      <Card className="bg-black/20 backdrop-blur-lg border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Consumer ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeUser && (
              <TableRow className="border-white/10 bg-primary/5 hover:bg-primary/10">
                <TableCell className="font-medium text-white">ACTIVE</TableCell>
                <TableCell className="text-white flex items-center gap-2">
                  {activeUser.name} <Badge variant="outline" className="text-[8px] bg-primary/10 text-primary border-primary/20">CURRENT USER</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{activeUser.email}</TableCell>
                <TableCell className="text-muted-foreground">{activeUser.consumerId}</TableCell>
                <TableCell><Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge></TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-white/10">Manage</Button>
                </TableCell>
              </TableRow>
            )}
            {staticUsers.map((u) => (
              <TableRow key={u.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="font-medium text-white">{u.id}</TableCell>
                <TableCell className="text-white">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell className="text-muted-foreground">{u.consumerId}</TableCell>
                <TableCell><Badge variant="outline" className="opacity-50">Offline</Badge></TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-white/10">Edit</Button>
                  <Button variant="ghost" size="sm" className="hover:bg-destructive/20 text-destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
