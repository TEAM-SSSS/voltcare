'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Zap, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('user');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      // Initialize a default profile if it doesn't exist
      if (!localStorage.getItem('user_profile')) {
        localStorage.setItem('user_profile', JSON.stringify({
          name: 'Shree Moh',
          username: 'shreemoh',
          email: 'shreemoh@example.com',
          phone: '+91 12345 67889',
          consumerId: '987654321',
          avatar: '',
        }));
      }

      // In this prototype, we use anonymous sign-in to satisfy Firestore rules
      initiateAnonymousSignIn(auth);
      
      // Delay slightly to allow auth state to propagate
      setTimeout(() => {
        if (activeTab === 'admin') {
          router.push('/admin');
        } else {
          router.push('/home');
        }
      }, 500);
    } catch (error: any) {
      setIsLoggingIn(false);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: error.message || "Failed to sign in."
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-black/30 backdrop-blur-lg border-white/10">
        <CardHeader className="text-center">
          <VoltCareLogo />
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Login to manage your electricity services</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-id">Username / Email / Phone</Label>
                  <Input id="login-id" type="text" placeholder="username or email" required />
                </div>
                <div className="relative space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-primary/80 hover:text-primary">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-[2.3rem] text-muted-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <Button 
                  disabled={isLoggingIn}
                  type="submit" 
                  className="w-full font-bold text-lg h-12 bg-primary/90 hover:bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary))] transition-shadow duration-300"
                >
                  {isLoggingIn ? <Loader2 className="animate-spin" /> : 'Login'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="admin">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-id">Admin Username / ID</Label>
                  <Input id="admin-id" placeholder="admin_user" required />
                </div>
                 <div className="relative space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-password">Password</Label>
                     <Link href="#" className="text-xs text-primary/80 hover:text-primary">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                   <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-[2.3rem] text-muted-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                 <Button 
                    disabled={isLoggingIn}
                    type="submit" 
                    className="w-full font-bold text-lg h-12 bg-primary/90 hover:bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary))] transition-shadow duration-300"
                  >
                  {isLoggingIn ? <Loader2 className="animate-spin" /> : 'Login'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="mt-6 text-center text-sm">
            Don’t have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
