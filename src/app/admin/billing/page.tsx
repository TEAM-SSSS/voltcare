import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt, Download, Plus, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminBillingPage() {
  const pendingInvoices = [
    { id: "INV-2024-001", user: "Shree Moh", amount: 1250.75, due: "2024-08-05" },
    { id: "INV-2024-002", user: "Anita Roy", amount: 890.50, due: "2024-08-10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Billing Management</h1>
          <p className="text-muted-foreground">Manage invoices, payments, and billing cycles.</p>
        </div>
        <Button className="gap-2 font-bold">
          <Plus size={16} /> Generate Bill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="text-primary h-5 w-5" /> Pending Payments
            </CardTitle>
            <CardDescription>Outstanding consumer bills for current cycle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingInvoices.map((inv) => (
              <div key={inv.id} className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-white">{inv.user}</p>
                  <p className="text-xs text-muted-foreground">{inv.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">₹{inv.amount}</p>
                  <p className="text-[10px] text-primary">Due: {inv.due}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs">View All Pending</Button>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border-white/10 col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <CardDescription>History of successful payments across the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-500/10 text-green-400">
                      <Receipt size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Payment Received - User #9872</p>
                      <p className="text-xs text-muted-foreground">July 22, 2024 &bull; UTR: 82749102</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">+₹1,420.00</p>
                    <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-400 bg-green-500/10">Completed</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
