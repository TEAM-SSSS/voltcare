'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Zap, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFirebase, useUser } from "@/firebase";
import { doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useState } from "react";

const problemCategories = [
  "Frequent power cuts",
  "Long power outages",
  "Voltage fluctuation",
  "Faulty or non-working meters",
  "Damaged electric wires",
  "Transformer failure",
  "Street lights not working",
];

const wardNumbers = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

export default function NewComplaintPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore } = useFirebase();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "Authentication required", description: "Please log in to file a complaint." });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const town = formData.get('town') as string;
    const wardNumber = formData.get('wardNumber') as string;
    const address = formData.get('address') as string;
    const problemCategory = formData.get('problemCategory') as string;

    const complaintId = `C-${Math.floor(Math.random() * 90000) + 10000}`;
    const timestamp = new Date().toISOString();

    const complaintData = {
      id: complaintId,
      userId: user.uid,
      utilityType: 'Electricity',
      town: town,
      wardNumber: parseInt(wardNumber),
      localityAddress: address,
      problemCategory: problemCategory,
      status: 'Submitted',
      submittedAt: timestamp,
      updatedAt: timestamp,
      category: problemCategory, // For UI compatibility
      date: timestamp.split('T')[0], // For UI compatibility
      address: `${address}, Ward ${wardNumber}, ${town.charAt(0).toUpperCase() + town.slice(1)}` // For UI compatibility
    };

    // Dual-write pattern: Admin collection and User subcollection
    const adminRef = doc(firestore, 'complaints', complaintId);
    const userRef = doc(firestore, 'users', user.uid, 'complaints', complaintId);

    try {
      setDocumentNonBlocking(adminRef, complaintData, { merge: true });
      setDocumentNonBlocking(userRef, complaintData, { merge: true });

      toast({
        title: "Complaint Submitted!",
        description: "Your electricity complaint has been registered successfully.",
      });
      
      router.push('/history');
    } catch (error) {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not register your complaint. Please try again.",
      });
    }
  };

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

      <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">File a New Complaint</h1>
      
      <Card className="max-w-2xl mx-auto bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-primary h-5 w-5" />
            <CardTitle>Electricity Complaint Details</CardTitle>
          </div>
          <CardDescription>Please provide all the necessary details about the electricity issue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset className="space-y-4 rounded-lg border border-white/10 p-4 bg-white/5">
              <legend className="-ml-1 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Location Details</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="town">Town</Label>
                  <Select name="town" defaultValue="baripada" required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baripada">Baripada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ward-number">Ward Number</Label>
                  <Select name="wardNumber" required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select Ward No." />
                    </SelectTrigger>
                    <SelectContent>
                      {wardNumbers.map(ward => <SelectItem key={ward} value={ward}>{ward}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Locality / Affected Address</Label>
                <Textarea id="address" name="address" placeholder="e.g., Near City Hospital, Murgabadi" className="bg-background/50" required />
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="problem-category">Problem Category</Label>
              <Select name="problemCategory" required>
                <SelectTrigger className="bg-white/5">
                  <SelectValue placeholder="Select the type of problem" />
                </SelectTrigger>
                <SelectContent>
                  {problemCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full font-bold text-lg h-12 shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Complaint'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
