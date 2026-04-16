import { LayoutGrid, UserRound, CircleCheck, LoaderCircle, AlertCircle } from 'lucide-react';

export const navLinks = [
  { href: '/home', label: 'Home', icon: LayoutGrid },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

export type Complaint = {
  id: string;
  type: string;
  category: string;
  date: string;
  status: 'Submitted' | 'In Progress' | 'Resolved';
  address: string;
};

export const complaints: Complaint[] = [
  { id: 'C-72845', type: 'Electricity', category: 'Frequent power cuts', date: '2024-07-20', status: 'Resolved', address: 'Ward 15, Baripada' },
  { id: 'C-72811', type: 'Electricity', category: 'Transformer failure', date: '2024-07-18', status: 'In Progress', address: 'Ward 21, Baripada' },
  { id: 'C-72750', type: 'Electricity', category: 'Street lights not working', date: '2024-07-12', status: 'Submitted', address: 'Ward 11, Baripada' },
];

export type Bill = {
  id: string;
  utility: 'Electricity';
  department: string;
  consumerNumber: string;
  period: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Failed';
  // Receipt & Detail details
  unitsConsumed?: number;
  tariffRate?: number;
  transactionId?: string;
  paymentDate?: string;
  paymentMethod?: string;
  lateFee?: number;
  taxes?: number;
  receiptNumber?: string;
  meterNumber?: string;
  prevReading?: number;
  currReading?: number;
  fixedCharges?: number;
  subsidy?: number;
};

export const bills: Bill[] = [
  { 
    id: 'B-1024', 
    utility: 'Electricity', 
    department: 'EHT (O&M) Division, Baripada', 
    consumerNumber: '987654321', 
    period: 'July 2024', 
    amount: 1250.75, 
    dueDate: '2024-08-05', 
    status: 'Pending',
    meterNumber: 'MTR-88291',
    prevReading: 4520,
    currReading: 4765,
    unitsConsumed: 245,
    tariffRate: 4.5,
    fixedCharges: 120.00,
    subsidy: 0,
    taxes: 28.25,
    lateFee: 0
  },
  { 
    id: 'B-1022', 
    utility: 'Electricity', 
    department: 'EHT (O&M) Division, Baripada', 
    consumerNumber: '987654321', 
    period: 'June 2024', 
    amount: 1100.50, 
    dueDate: '2024-07-05', 
    status: 'Paid',
    meterNumber: 'MTR-88291',
    prevReading: 4300,
    currReading: 4520,
    unitsConsumed: 220,
    tariffRate: 4.5,
    fixedCharges: 120.00,
    subsidy: 10.00,
    transactionId: 'TXN82749102',
    paymentDate: '2024-07-02 10:45 AM',
    paymentMethod: 'UPI (GPay)',
    lateFee: 0,
    taxes: 52.40,
    receiptNumber: 'RCPT-2024-7291'
  },
];


export const statusMap = {
  Submitted: { icon: AlertCircle, color: 'text-muted-foreground', bgColor: 'bg-muted/30' },
  'In Progress': { icon: LoaderCircle, color: 'text-accent-foreground', bgColor: 'bg-accent/30' },
  Resolved: { icon: CircleCheck, color: 'text-green-400', bgColor: 'bg-green-400/20' },
};
