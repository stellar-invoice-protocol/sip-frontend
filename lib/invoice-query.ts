import type { Invoice } from '../types/invoice';
import type { InvoiceQuery } from '../types/invoice-query';

const STATUS_ORDER: Invoice['status'][] = [
  'Created',
  'PartiallyPaid',
  'Paid',
  'Overdue',
  'Cancelled',
];

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

function compareDates(left: string, right: string): number {
  return new Date(left).getTime() - new Date(right).getTime();
}

export function compareInvoices(
  left: Invoice,
  right: Invoice,
  sortBy: InvoiceQuery['sortBy'],
  direction: InvoiceQuery['direction'] = 'asc',
): number {
  const multiplier = direction === 'asc' ? 1 : -1;
  let result = 0;

  if (sortBy === 'dueDate') result = compareDates(left.dueDate, right.dueDate);
  if (sortBy === 'createdAt') result = compareDates(left.createdAt, right.createdAt);
  if (sortBy === 'amount') {
    result = Number.parseFloat(left.amount) - Number.parseFloat(right.amount);
  }
  if (sortBy === 'status') {
    result = STATUS_ORDER.indexOf(left.status) - STATUS_ORDER.indexOf(right.status);
  }

  return result === 0
    ? left.id.localeCompare(right.id)
    : result * multiplier;
}

export function queryInvoices(
  invoices: Invoice[],
  query: InvoiceQuery,
  address?: string | null,
): Invoice[] {
  return [...invoices]
    .filter((invoice) => matchesInvoiceSearch(invoice, query.search))
    .filter((invoice) => matchesInvoiceStatus(invoice, query.status))
    .filter((invoice) => matchesInvoiceRole(invoice, query.role, address))
    .sort((left, right) =>
      compareInvoices(left, right, query.sortBy, query.direction),
    );
}
