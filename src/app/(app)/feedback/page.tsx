
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for helping us improve our service.",
    });
    router.push('/home');
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

      <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">Feedback & Grievance</h1>

      <Card className="max-w-2xl mx-auto bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle>Share Your Experience</CardTitle>
          <CardDescription>Your feedback helps us provide better service to everyone.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label>How satisfied are you with our service?</Label>
              <RadioGroup defaultValue="satisfied" className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-satisfied" id="vs" />
                  <Label htmlFor="vs" className="font-normal">Very Satisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="satisfied" id="s" />
                  <Label htmlFor="s" className="font-normal">Satisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neutral" id="n" />
                  <Label htmlFor="n" className="font-normal">Neutral</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dissatisfied" id="d" />
                  <Label htmlFor="d" className="font-normal">Dissatisfied</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Comments or Suggestions</Label>
              <Textarea 
                id="feedback" 
                placeholder="What can we do to improve?" 
                className="min-h-[120px] bg-white/5 border-white/10"
                required
              />
            </div>

            <Button type="submit" className="w-full gap-2">
              <Send size={16} /> Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
