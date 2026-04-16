
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

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

      <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle>Customer Support</CardTitle>
            <CardDescription>Reach out to our 24/7 helpline.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase">Toll-Free Helpline</p>
                <p className="text-lg font-bold">1800-123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase">Email Address</p>
                <p className="text-lg font-bold">support@voltcare.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle>Main Office</CardTitle>
            <CardDescription>Our regional headquarters details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase">Address</p>
                <p className="text-sm">EHT (O&M) Division, Baripada<br />Mayurbhanj, Odisha - 757001</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase">Working Hours</p>
                <p className="text-sm font-medium">Monday - Saturday<br />10:00 AM - 05:30 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
