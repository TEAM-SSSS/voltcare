'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff, Zap } from 'lucide-react';

function VoltCareLogo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="rounded-full bg-primary/20 p-3 text-primary shadow-[0_0_15px_hsl(var(--primary))]">
        <Zap className="h-8 w-8" />
      </div>
      <h1 className="font-headline text-4xl font-bold text-white">
        VoltCare
      </h1>
    </div>
  );
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation for step 1 here
    setStep(2);
  };
  
  const handlePrevStep = () => {
    setStep(1);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/30 backdrop-blur-lg border-white/10">
        <CardHeader className="text-center">
          <VoltCareLogo />
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            {step === 1 ? 'Start by entering your details.' : 'Almost there! Choose a username.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email or Phone</Label>
                <Input id="email" placeholder="you@example.com" required />
              </div>
              <div className="relative space-y-2">
                <Label htmlFor="password">Create Password</Label>
                <Input id="password" type={showPassword ? 'text' : 'password'} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-[2.3rem] text-muted-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative space-y-2">
                <Label htmlFor="repeat-password">Repeat Password</Label>
                <Input id="repeat-password" type={showRepeatPassword ? 'text' : 'password'} required />
                <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="absolute right-2 top-[2.3rem] text-muted-foreground">
                  {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button type="submit" className="w-full font-bold">Next</Button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-4">
                <Button variant="ghost" size="sm" onClick={handlePrevStep} className="flex items-center gap-2 text-muted-foreground -ml-2">
                    <ArrowLeft size={16}/> Back
                </Button>
              <div className="space-y-2">
                <Label htmlFor="username">Create Username</Label>
                <Input id="username" placeholder="johndoe123" required />
              </div>
              <Button type="submit" className="w-full font-bold text-lg h-12 bg-primary/90 hover:bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary))] transition-shadow duration-300">Create Account</Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link href="/" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
