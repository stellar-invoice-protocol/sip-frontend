export type InvoiceStatus = 'Created' | 'PartiallyPaid' | 'Paid' | 'Overdue' | 'Cancelled';

export interface PaymentRecord {
  id: string;
  timestamp: string;
  amount: string;
  currency: string;
  method: string;
  status: InvoiceStatus;
}

export interface Invoice {
  id: string;
  issuer: string;
  payer: string;
  amount: string;
  currency: string;
  dueDate: string;
  status: InvoiceStatus;
  createdAt: string;
  description?: string;
  history?: PaymentRecord[];
  proof?: string;
}

export interface CreateInvoiceRequest {
  payer: string;
  amount: string;
  currency: string;
  dueDate: string;
  description?: string;
}
