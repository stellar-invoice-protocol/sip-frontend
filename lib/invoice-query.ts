import type { Invoice } from '../types/invoice';
import type { InvoiceQuery } from '../types/invoice-query';

export const DEFAULT_INVOICE_QUERY: InvoiceQuery = {
  search: '',
  status: 'all',
  role: 'all',
  sortBy: 'dueDate',
  direction: 'asc',
};

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function matchesInvoiceSearch(invoice: Invoice, search: string): boolean {
  const term = normalize(search);

  if (!term) return true;

  return [
    invoice.id,
    invoice.issuer,
    invoice.payer,
    invoice.currency,
    invoice.description ?? '',
  ]
    .some((value) => normalize(value).includes(term));
}

export function matchesInvoiceStatus(
  invoice: Invoice,
  status: InvoiceQuery['status'],
): boolean {
  return status === 'all' || invoice.status === status;
}

export function matchesInvoiceRole(
  invoice: Invoice,
  role: InvoiceQuery['role'],
  address?: string | null,
): boolean {
  if (role === 'all') return true;
  if (!address) return false;

  return normalize(invoice[role]) === normalize(address);
}
