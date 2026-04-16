'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bills as initialBills, Bill } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FileDown, ReceiptText, ArrowLeft, CreditCard, Smartphone, Landmark, CheckCircle2, Printer, Download, Zap, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Dialog"; // Corrected relative import path if needed, but standard shadcn is usually from components/ui
// Re-importing Dialog from local components/ui/dialog for safety
import {
  Dialog as UIDialog,
  DialogContent as UIDialogContent,
  DialogDescription as UIDialogDescription,
  DialogHeader as UIDialogHeader,
  DialogTitle as UIDialogTitle,
  DialogFooter as UIDialogFooter,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';

const statusStyles: { [key: string]: string } = {
  Paid: 'bg-green-500/20 text-green-400 border-green-500/30',
  Pending: 'bg-accent/20 text-accent border-accent/30 animate-pulse',
  Failed: 'bg-destructive/20 text-destructive border-destructive/30',
};

export default function PayBillsPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [localBills, setLocalBills] = useState<Bill[]>(initialBills);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: 'Shree Moh', email: 'shreemoh@example.com', phone: '+91 12345 67889' });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user_profile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserProfile(parsed);
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
  }, []);

  const filteredBills = localBills.filter(bill => {
    const statusMatch = statusFilter === 'all' || bill.status.toLowerCase() === statusFilter;
    return statusMatch;
  });

  const handlePayNow = (bill: Bill) => {
    setSelectedBill(bill);
    setIsPayDialogOpen(true);
  };

  const handleViewReceipt = (bill: Bill) => {
    setSelectedBill(bill);
    setIsReceiptDialogOpen(true);
  };

  const handleViewDetails = (bill: Bill) => {
    setSelectedBill(bill);
    setIsDetailsDialogOpen(true);
  };

  const confirmPayment = () => {
    if (!selectedBill) return;

    // Simulate payment success by updating local state
    const updatedBills = localBills.map(b => 
      b.id === selectedBill.id 
        ? { 
            ...b, 
            status: 'Paid' as const,
            transactionId: `TXN${Math.floor(Math.random() * 90000000) + 10000000}`,
            paymentDate: new Date().toLocaleString(),
            paymentMethod: 'UPI (Simulation)',
            receiptNumber: `RCPT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
          } 
        : b
    );
    
    setLocalBills(updatedBills);
    setIsPayDialogOpen(false);
    
    toast({
      title: "Payment Successful!",
      description: `Transaction ID: ${updatedBills.find(b => b.id === selectedBill.id)?.transactionId}`,
    });
  };

  const handlePrint = () => {
    window.print();
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

      <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">Electricity Bill Payments</h1>

      <Card className="mb-6 bg-black/20 backdrop-blur-lg border-white/10">
        <CardContent className="p-4">
          <div className="max-w-xs mx-auto sm:mx-0">
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Filter by Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredBills.length > 0 ? (
          filteredBills.map(bill => (
            <Card key={bill.id} className={cn('bg-black/20 backdrop-blur-lg border-l-4', bill.status === 'Pending' ? 'border-accent' : bill.status === 'Paid' ? 'border-green-500' : 'border-transparent')}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2"><ReceiptText size={20} className="text-primary"/> Electricity Bill</CardTitle>
                    <CardDescription>Consumer No: {bill.consumerNumber}</CardDescription>
                  </div>
                  <Badge className={cn('text-xs', statusStyles[bill.status])}>{bill.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-bold text-xl text-white">₹{bill.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-semibold">{bill.dueDate}</p>
                  </div>
                   <div>
                    <p className="text-muted-foreground">Billing Period</p>
                    <p>{bill.period}</p>
                  </div>
                   <div>
                    <p className="text-muted-foreground">Department</p>
                    <p className="text-xs truncate">{bill.department}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {bill.status === 'Pending' && (
                    <Button onClick={() => handlePayNow(bill)} className="flex-1 bg-primary/90 hover:bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)] font-bold">Pay Now</Button>
                  )}
                  {bill.status === 'Paid' && (
                     <Button onClick={() => handleViewReceipt(bill)} variant="outline" className="flex-1 gap-2">
                      <FileDown size={16} />
                      View Receipt
                    </Button>
                  )}
                  <Button variant="ghost" className="flex-1 gap-2" onClick={() => handleViewDetails(bill)}>
                    <Info size={16} /> Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground mt-8">No electricity bills match the current filter.</p>
        )}
      </div>

      {/* Bill Details Dialog */}
      <UIDialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <UIDialogContent className="bg-card border-white/10 max-w-md">
          <UIDialogHeader>
            <UIDialogTitle className="text-xl flex items-center gap-2">
              Bill Statement Details
            </UIDialogTitle>
            <UIDialogDescription>
              Detailed breakdown for {selectedBill?.period} electricity usage.
            </UIDialogDescription>
          </UIDialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Meter Number</p>
                <p className="text-white font-medium">{selectedBill?.meterNumber || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Tariff Rate</p>
                <p className="text-white font-medium">₹{selectedBill?.tariffRate?.toFixed(2)} / unit</p>
              </div>
            </div>

            <Separator className="bg-white/5" />

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-primary uppercase">Consumption Reading</h4>
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Previous</p>
                  <p className="text-sm font-bold text-white">{selectedBill?.prevReading || 0} kWh</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Current</p>
                  <p className="text-sm font-bold text-white">{selectedBill?.currReading || 0} kWh</p>
                </div>
                <div className="col-span-2 pt-1 border-t border-white/10 mt-1 flex justify-between items-center">
                   <p className="text-[10px] text-muted-foreground uppercase">Total Consumed</p>
                   <p className="text-sm font-bold text-primary">{selectedBill?.unitsConsumed || 0} Units</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-primary uppercase">Charges Breakdown</h4>
              <div className="space-y-1.5 px-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Energy Charges</span>
                  <span className="text-white">₹{((selectedBill?.unitsConsumed || 0) * (selectedBill?.tariffRate || 0)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Fixed Charges</span>
                  <span className="text-white">₹{selectedBill?.fixedCharges?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Taxes & Duties</span>
                  <span className="text-white">₹{selectedBill?.taxes?.toFixed(2) || '0.00'}</span>
                </div>
                {selectedBill?.subsidy && selectedBill.subsidy > 0 && (
                  <div className="flex justify-between text-xs text-green-400">
                    <span>Govt. Subsidy (-)</span>
                    <span>₹{selectedBill.subsidy.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="bg-white/5 my-1" />
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-primary">Net Amount Payable</span>
                  <span className="text-primary">₹{selectedBill?.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <UIDialogFooter>
            <Button variant="outline" className="w-full" onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
            {selectedBill?.status === 'Pending' && (
              <Button onClick={() => { setIsDetailsDialogOpen(false); handlePayNow(selectedBill); }} className="w-full bg-primary text-primary-foreground font-bold">Pay This Bill</Button>
            )}
          </UIDialogFooter>
        </UIDialogContent>
      </UIDialog>

      {/* Payment Step Dialog */}
      <UIDialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
        <UIDialogContent className="bg-card border-white/10 max-w-md">
          <UIDialogHeader>
            <UIDialogTitle className="text-xl flex items-center gap-2">
              How to Transact
            </UIDialogTitle>
            <UIDialogDescription>
              Follow these simple steps to complete your electricity bill payment securely.
            </UIDialogDescription>
          </UIDialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">1</div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Select Payment Method</p>
                <p className="text-xs text-muted-foreground">Choose from UPI, Debit/Credit Cards, or Net Banking on the next screen.</p>
                <div className="flex gap-3 mt-2 text-muted-foreground">
                   <Smartphone size={16} />
                   <CreditCard size={16} />
                   <Landmark size={16} />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">2</div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Authorize Transaction</p>
                <p className="text-xs text-muted-foreground">Enter your secure PIN or OTP provided by your bank to verify the amount: <span className="text-white font-bold">₹{selectedBill?.amount.toFixed(2)}</span></p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">3</div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Confirmation & Receipt</p>
                <p className="text-xs text-muted-foreground">Once successful, you will receive a transaction ID and can download your payment receipt immediately.</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-3 rounded-md flex items-start gap-3">
              <CheckCircle2 size={18} className="text-primary mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-tight">
                Your transaction is protected by 256-bit encryption. Do not refresh or close the page while the payment is processing.
              </p>
            </div>
          </div>

          <UIDialogFooter>
            <Button variant="ghost" onClick={() => setIsPayDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmPayment} className="bg-primary text-primary-foreground font-bold">Proceed to Payment</Button>
          </UIDialogFooter>
        </UIDialogContent>
      </UIDialog>

      {/* Bill Receipt Dialog */}
      <UIDialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <UIDialogContent className="max-w-2xl bg-card border-white/10 overflow-y-auto max-h-[90vh]">
          <UIDialogHeader>
            <div className="flex justify-between items-center pr-8">
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <UIDialogTitle className="text-2xl font-bold">E-Receipt</UIDialogTitle>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">Payment Successful</Badge>
            </div>
            <UIDialogDescription className="text-xs pt-1">Receipt Number: {selectedBill?.receiptNumber || 'N/A'}</UIDialogDescription>
          </UIDialogHeader>

          <div id="receipt-content" className="space-y-6 py-4">
            {/* User Details */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Consumer Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-lg">
                <div>
                  <p className="text-muted-foreground text-xs">Name</p>
                  <p className="font-semibold text-white">{userProfile.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Consumer ID</p>
                  <p className="font-semibold text-white">{selectedBill?.consumerNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Mobile Number</p>
                  <p className="font-semibold text-white">{userProfile.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Email Address</p>
                  <p className="font-semibold text-white truncate">{userProfile.email}</p>
                </div>
              </div>
            </section>

            {/* Bill Info */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Billing Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm bg-white/5 p-4 rounded-lg">
                <div>
                  <p className="text-muted-foreground text-xs">Bill ID</p>
                  <p className="text-white">{selectedBill?.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Billing Period</p>
                  <p className="text-white">{selectedBill?.period}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Units Consumed</p>
                  <p className="text-white font-bold">{selectedBill?.unitsConsumed || 0} kWh</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Tariff Rate</p>
                  <p className="text-white">₹{selectedBill?.tariffRate?.toFixed(2) || '0.00'} / unit</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Due Date</p>
                  <p className="text-white">{selectedBill?.dueDate}</p>
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Payment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-lg border border-primary/20">
                <div>
                  <p className="text-muted-foreground text-xs">Transaction ID</p>
                  <p className="text-white font-mono">{selectedBill?.transactionId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Date & Time</p>
                  <p className="text-white">{selectedBill?.paymentDate || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Payment Method</p>
                  <p className="text-white">{selectedBill?.paymentMethod || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p className="text-green-400 font-bold">SUCCESS</p>
                </div>
              </div>
            </section>

            {/* Calculation */}
            <section className="space-y-2 pt-2 px-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal Amount</span>
                <span className="text-white font-medium">₹{((selectedBill?.amount || 0) - (selectedBill?.taxes || 0) - (selectedBill?.lateFee || 0)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes & Surcharge</span>
                <span className="text-white font-medium">₹{selectedBill?.taxes?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Late Payment Fee</span>
                <span className="text-white font-medium">₹{selectedBill?.lateFee?.toFixed(2) || '0.00'}</span>
              </div>
              <Separator className="bg-white/10 my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-primary">Total Amount Paid</span>
                <span className="text-primary">₹{selectedBill?.amount?.toFixed(2) || '0.00'}</span>
              </div>
            </section>

            <div className="flex items-center gap-2 justify-center text-[10px] text-muted-foreground italic pt-4">
              <CheckCircle2 size={12} className="text-green-500" />
              This is a computer-generated receipt and does not require a physical signature.
            </div>
          </div>

          <UIDialogFooter className="gap-2 sm:gap-0 mt-4 border-t border-white/10 pt-4">
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
              <Printer size={16} /> Print
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground font-bold" onClick={() => toast({ title: "Generating PDF", description: "Your receipt download will start shortly." })}>
              <Download size={16} /> Download PDF
            </Button>
          </UIDialogFooter>
        </UIDialogContent>
      </UIDialog>
    </div>
  );
}
