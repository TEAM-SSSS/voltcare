'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Edit, LogOut, User, Camera, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name cannot be longer than 50 characters." }),
  username: z.string().min(3, { message: "Username must be at least 3 characters." }).regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  consumerId: z.string().min(5, { message: "Consumer ID must be at least 5 digits." }),
});

const defaultUser = {
  name: 'Shree Moh',
  username: 'shreemoh',
  email: 'shreemoh@example.com',
  phone: '+91 12345 67889',
  consumerId: '987654321',
  avatar: PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl || '',
};

export default function ProfilePage() {
  const [user, setUser] = useState(defaultUser);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user_profile');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    } else {
      localStorage.setItem('user_profile', JSON.stringify(defaultUser));
    }
    setIsLoaded(true);
  }, []);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      phone: user.phone,
      email: user.email,
      consumerId: user.consumerId,
    },
  });

  useEffect(() => {
    if (isLoaded) {
      form.reset({
        name: user.name,
        username: user.username,
        phone: user.phone,
        email: user.email,
        consumerId: user.consumerId,
      });
    }
  }, [user, form, isLoaded]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target?.result as string;
        const updatedUser = { ...user, avatar: newAvatar };
        setUser(updatedUser);
        localStorage.setItem('user_profile', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('profile-updated'));
        toast({ title: "Profile picture updated." });
      };
      reader.readAsDataURL(file);
    }
  };
  
  function onSubmit(data: z.infer<typeof profileFormSchema>) {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user_profile', JSON.stringify(updatedUser));
    window.dispatchEvent(new Event('profile-updated'));
    toast({
      title: "Profile Updated",
      description: "Your personal information has been successfully saved.",
    });
    setOpen(false);
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-10 text-center">
        <p className="text-muted-foreground animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => router.push('/home')} 
        className="text-muted-foreground hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="h-28 w-28 border-4 border-primary shadow-[0_0_15px_hsl(var(--primary))]">
            <AvatarImage src={user.avatar} alt="User avatar" />
            <AvatarFallback>
              <User className="h-12 w-12"/>
            </AvatarFallback>
          </Avatar>
          <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full border-2 border-background" onClick={handleAvatarClick} aria-label="Change profile picture">
            <Camera className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid gap-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Consumer ID</p>
              <p className="text-sm font-medium">{user.consumerId}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Full Name</p>
              <p className="text-sm font-medium">{user.name}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Username</p>
              <p className="text-sm font-medium">@{user.username}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Phone</p>
              <p className="text-sm font-medium">{user.phone}</p>
            </div>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-2">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
          </CardContent>
        </Card>

        <DialogContent className="sm:max-w-[425px] bg-card border-white/10">
           <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal details. Changes will be saved to your account.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
               <FormField
                control={form.control}
                name="consumerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumer ID</FormLabel>
                    <FormControl>
                      <Input placeholder="987654321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                        <Input className="pl-8" placeholder="username" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 XXXXX XXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2 sm:gap-0 mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-lg">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div>
            <Label className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2 block">App Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="or">Odia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Button variant="destructive" className="w-full" onClick={() => router.push('/')}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
