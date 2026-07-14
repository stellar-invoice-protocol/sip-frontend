import type { InvoiceStatus } from './invoice';

export type InvoiceRole = 'all' | 'issuer' | 'payer';

export type InvoiceSortField = 'dueDate' | 'createdAt' | 'amount' | 'status';

export type SortDirection = 'asc' | 'desc';

export interface InvoiceQuery {
  search: string;
  status: InvoiceStatus | 'all';
  role: InvoiceRole;
  sortBy: InvoiceSortField;
  direction: SortDirection;
}
