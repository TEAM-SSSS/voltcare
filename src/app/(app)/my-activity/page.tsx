
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { bills, complaints as initialComplaints, statusMap, Complaint } from "@/lib/data";
import { ArrowLeft, Clock, History as HistoryIcon, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function MyActivityPage() {
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user_complaints') || '[]');
      const initialIds = new Set(initialComplaints.map(c => c.id));
      const uniqueStored = stored.filter((c: Complaint) => !initialIds.has(c.id));
      setComplaints([...uniqueStored.reverse(), ...initialComplaints]);
    } catch (e) {
      console.error("Failed to load activity", e);
    }
  }, []);

  const totalComplaints = complaints.length;
  const pendingBills = bills.filter(b => b.status === 'Pending').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => router.push('/home')} 
        className="text-muted-foreground hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>

      <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">My Activity Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="p-4 flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-primary uppercase">Total Complaints</CardTitle>
            <HistoryIcon size={16} className="text-primary" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-white">{totalComplaints}</div>
            <p className="text-[10px] text-muted-foreground">{resolvedComplaints} Resolved</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardHeader className="p-4 flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-orange-400 uppercase">Pending Bills</CardTitle>
            <Zap size={16} className="text-orange-400" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-white">{pendingBills}</div>
            <p className="text-[10px] text-muted-foreground">Action required</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardHeader className="p-4 flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-blue-400 uppercase">Active Status</CardTitle>
            <Clock size={16} className="text-blue-400" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-white">Active</div>
            <p className="text-[10px] text-muted-foreground">System functioning normally</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Recent Updates</h2>
        {complaints.slice(0, 3).map(c => (
          <Card key={c.id} className="bg-black/20 backdrop-blur-lg border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">{c.category}</p>
                <p className="text-[10px] text-muted-foreground">{c.date} • {c.id}</p>
              </div>
              <Badge variant="outline" className={cn("text-[10px]", statusMap[c.status].color, statusMap[c.status].bgColor)}>
                {c.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
        <Button variant="ghost" className="w-full text-xs text-primary" onClick={() => router.push('/history')}>
          View Full History
        </Button>
      </div>
    </div>
  );
}
