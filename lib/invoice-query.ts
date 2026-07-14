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

export function countActiveInvoiceFilters(query: InvoiceQuery): number {
  return Number(Boolean(query.search.trim()))
    + Number(query.status !== DEFAULT_INVOICE_QUERY.status)
    + Number(query.role !== DEFAULT_INVOICE_QUERY.role);
}

export function formatInvoiceResultCount(visible: number, total: number): string {
  if (visible === total) {
    return total + ' invoice' + (total === 1 ? '' : 's');
  }

  return visible + ' of ' + total + ' invoices';
}

export function serializeInvoiceQuery(query: InvoiceQuery): string {
  const params = new URLSearchParams();

  if (query.search.trim()) params.set('q', query.search.trim());
  if (query.status !== 'all') params.set('status', query.status);
  if (query.role !== 'all') params.set('role', query.role);
  if (query.sortBy !== DEFAULT_INVOICE_QUERY.sortBy) params.set('sort', query.sortBy);
  if (query.direction !== DEFAULT_INVOICE_QUERY.direction) {
    params.set('direction', query.direction);
  }

  return params.toString();
}

export function parseInvoiceQuery(params: URLSearchParams): InvoiceQuery {
  const status = params.get('status');
  const role = params.get('role');
  const sortBy = params.get('sort');
  const direction = params.get('direction');

  return {
    search: params.get('q') ?? '',
    status: STATUS_ORDER.includes(status as Invoice['status'])
      ? status as Invoice['status']
      : 'all',
    role: role === 'issuer' || role === 'payer' ? role : 'all',
    sortBy: sortBy === 'createdAt' || sortBy === 'amount' || sortBy === 'status'
      ? sortBy
      : 'dueDate',
    direction: direction === 'desc' ? 'desc' : 'asc',
  };
}
