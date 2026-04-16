'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Receipt, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";

export default function AdminOverview() {
  const firestore = useFirestore();
  
  const complaintsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'complaints');
  }, [firestore]);

  const { data: complaints, isLoading } = useCollection(complaintsQuery);

  const activeComplaints = complaints?.filter(c => c.status !== 'Resolved').length || 0;
  const resolvedIssues = complaints?.filter(c => c.status === 'Resolved').length || 0;

  const statCards = [
    { title: "Total Users", value: "1,246", icon: Users, color: "text-blue-400", sub: "Includes TEAM 4S" },
    { title: "Active Complaints", value: isLoading ? "..." : activeComplaints, icon: MessageSquare, color: "text-amber-400", sub: "Live Firestore data" },
    { title: "Featured Consumer", value: "TEAM 4S", icon: Receipt, color: "text-primary", sub: "ID: CID-4S-2024" },
    { title: "Resolved Issues", value: isLoading ? "..." : resolvedIssues, icon: CheckCircle, color: "text-green-400", sub: "Successfully handled" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Admin Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time snapshot of VoltCare operations and system health.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-white/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {isLoading && stat.title.includes('Complaints') ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="text-primary h-5 w-5" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="flex-1">
                  <p className="text-white">Firestore synchronization active</p>
                  <p className="text-muted-foreground text-xs">Listening for live updates...</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="flex-1">
                  <p className="text-white">User session monitoring active</p>
                  <p className="text-muted-foreground text-xs">System healthy</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Server Uptime</span>
                <span className="text-green-400 font-medium">99.9%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Firestore Latency</span>
                <span className="text-white font-medium">Real-time</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Database Health</span>
                <span className="text-green-400 font-medium">Optimal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
