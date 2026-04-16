'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function AdminComplaintsPage() {
  const [search, setSearch] = useState("");
  const firestore = useFirestore();

  const complaintsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'complaints'), orderBy('submittedAt', 'desc'));
  }, [firestore]);

  const { data: complaints, isLoading } = useCollection(complaintsQuery);

  const filtered = complaints?.filter(c => 
    c.id.toLowerCase().includes(search.toLowerCase()) || 
    c.category?.toLowerCase().includes(search.toLowerCase()) ||
    c.address?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Complaints</h1>
          <p className="text-muted-foreground">Live tracking of electricity service complaints from Firestore.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10 bg-white/5 border-white/10" 
              placeholder="Search ID, issue, address..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
        </div>
      </div>

      <Card className="bg-black/20 backdrop-blur-lg border-white/10 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Fetching live complaints...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="w-[120px]">Ticket ID</TableHead>
                <TableHead>Problem Category</TableHead>
                <TableHead>Location / Address</TableHead>
                <TableHead>Date Filed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-mono text-xs text-white">{c.id}</TableCell>
                  <TableCell className="text-white font-medium">{c.category || c.problemCategory}</TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">{c.address || c.localityAddress}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{c.date || new Date(c.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px] px-2 py-0",
                        c.status === 'Resolved' ? "border-green-500/50 text-green-400 bg-green-500/10" :
                        c.status === 'In Progress' ? "border-amber-500/50 text-amber-400 bg-amber-500/10" :
                        "border-primary/50 text-primary bg-primary/10"
                      )}
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="hover:bg-white/10 text-xs">Update Status</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No matching complaints found in the database.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
