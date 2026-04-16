'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2, ReceiptText, History, ArrowRight, PhoneCall, CircleHelp, MessageSquareText, Activity, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';

const mainServices = [
  {
    href: '/new-complaint',
    title: 'File a Complaint',
    description: 'Report an issue with your electricity service or equipment.',
    icon: FilePlus2,
    color: 'text-destructive',
    shadow: 'shadow-destructive/20',
  },
  {
    href: '/bills',
    title: 'Pay Bills',
    description: 'View and pay your outstanding electricity bills securely.',
    icon: ReceiptText,
    color: 'text-primary',
    shadow: 'shadow-primary/20',
  },
  {
    href: '/history',
    title: 'View History',
    description: 'Check your past complaints status records.',
    icon: History,
    color: 'text-accent',
    shadow: 'shadow-accent/20',
  },
];

const subTabs = [
  {
    href: '/contact',
    title: 'Contact Us',
    description: 'Get in touch with support.',
    icon: PhoneCall,
    color: 'text-blue-400',
  },
  {
    href: '/faq',
    title: 'FAQ',
    description: 'Frequently asked questions.',
    icon: CircleHelp,
    color: 'text-green-400',
  },
  {
    href: '/feedback',
    title: 'Feedback',
    description: 'Share your suggestions.',
    icon: MessageSquareText,
    color: 'text-purple-400',
  },
  {
    href: '/my-activity',
    title: 'My Activity',
    description: 'Summary of your actions.',
    icon: Activity,
    color: 'text-orange-400',
  },
];

export default function HomePage() {
  const firestore = useFirestore();
  const { user } = useUser();

  const complaintsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'complaints');
  }, [firestore, user]);

  const { data: userComplaints, isLoading } = useCollection(complaintsQuery);

  const activeComplaints = userComplaints?.filter(c => c.status !== 'Resolved').length || 0;
  const pendingBillsCount = 1; // Simulation: usually 1 bill per cycle

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back!</h1>
        <p className="text-muted-foreground">Manage your electricity service efficiently.</p>
      </header>

      {(activeComplaints > 0 || pendingBillsCount > 0) && (
        <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary/80 flex items-center gap-2">
              <AlertTriangle size={16} /> Live Status
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-6 pb-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{pendingBillsCount}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-tighter">Pending Bills</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white flex items-center gap-2">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : activeComplaints}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-tighter">Active Complaints</span>
            </div>
          </CardContent>
        </Card>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mainServices.map((link) => (
          <Link href={link.href} key={link.href} className="group block hover:translate-y-[-4px] transition-all duration-300">
            <Card className="bg-black/20 backdrop-blur-lg border-white/10 h-full overflow-hidden hover:border-white/20 transition-colors shadow-xl">
              <CardHeader className="pt-6">
                <div className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center ${link.shadow} bg-black/40 border border-white/10`}>
                  <link.icon className={`${link.color} h-6 w-6`} />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{link.title}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[2.5rem] mt-1">{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
                  Access Service
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4 px-1">Support & Utilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
          {subTabs.map((tab) => (
            <Link href={tab.href} key={tab.href} className="group block">
              <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-white/20 transition-all duration-200">
                <CardHeader className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    <tab.icon className={`${tab.color} h-5 w-5`} />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">{tab.title}</CardTitle>
                    <CardDescription className="text-[10px] line-clamp-1">{tab.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
