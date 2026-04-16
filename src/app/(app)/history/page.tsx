'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { statusMap } from '@/lib/data';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

function StatusBadge({ status }: { status: keyof typeof statusMap }) {
  const statusInfo = statusMap[status] || statusMap['Submitted'];
  const Icon = statusInfo.icon;
  return (
    <Badge variant="outline" className={cn("gap-1.5 pl-2 text-xs", statusInfo.color, statusInfo.bgColor, `border-[${statusInfo.color}]/30`)}>
      <Icon className={cn("h-3.5 w-3.5", { 'animate-spin': status === 'In Progress' })} />
      {status}
    </Badge>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();

  const userComplaintsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'users', user.uid, 'complaints'), orderBy('submittedAt', 'desc'));
  }, [firestore, user]);

  const { data: complaints, isLoading } = useCollection(userComplaintsQuery);

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

      <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">Complaint History</h1>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your history...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints && complaints.length > 0 ? (
            complaints.map(complaint => (
              <Card key={complaint.id} className="bg-black/20 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{complaint.category || complaint.problemCategory}</CardTitle>
                      <CardDescription>ID: {complaint.id} &bull; {complaint.date || new Date(complaint.submittedAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <StatusBadge status={complaint.status as any} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Address: {complaint.address || complaint.localityAddress}</p>
                </CardContent>
              </Card>
            ))
          ) : (
             <p className="text-center text-muted-foreground mt-8">No complaints found in your records.</p>
          )}
        </div>
      )}
    </div>
  );
}
