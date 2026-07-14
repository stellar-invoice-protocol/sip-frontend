'use client';

import type { InvoiceQuery } from '../types/invoice-query';
import {
  countActiveInvoiceFilters,
  DEFAULT_INVOICE_QUERY,
  formatInvoiceResultCount,
} from '../lib/invoice-query';

const STATUSES: InvoiceQuery['status'][] = [
  'all',
  'Created',
  'PartiallyPaid',
  'Paid',
  'Overdue',
  'Cancelled',
];

interface InvoiceFiltersProps {
  query: InvoiceQuery;
  onChange: (query: InvoiceQuery) => void;
  visibleCount: number;
  totalCount: number;
}

export function InvoiceFilters({
  query,
  onChange,
  visibleCount,
  totalCount,
}: InvoiceFiltersProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-5">
      <div className="flex items-center gap-3">
        <h3 className="text-base font-semibold text-slate-100">Find invoices</h3>
        {countActiveInvoiceFilters(query) > 0 ? (
          <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-200 ring-1 ring-inset ring-sky-500/30">
            {countActiveInvoiceFilters(query)} active
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-slate-400" aria-live="polite">
        {formatInvoiceResultCount(visibleCount, totalCount)}
      </p>
      <label className="mt-4 block text-sm text-slate-300">
        <span className="mb-2 block">Search</span>
        <input
          type="search"
          value={query.search}
          onChange={(event) => onChange({ ...query, search: event.target.value })}
          placeholder="ID, address, currency, or description"
          className="w-full rounded-2xl border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500"
        />
      </label>
      <label className="mt-4 block text-sm text-slate-300">
        <span className="mb-2 block">Status</span>
        <select
          value={query.status}
          onChange={(event) => onChange({
            ...query,
            status: event.target.value as InvoiceQuery['status'],
          })}
          className="w-full rounded-2xl border-slate-700 bg-slate-950/80 text-slate-100 focus:border-sky-500 focus:ring-sky-500"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status === 'all' ? 'All statuses' : status}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm text-slate-300">
        <span className="mb-2 block">Wallet role</span>
        <select
          value={query.role}
          onChange={(event) => onChange({
            ...query,
            role: event.target.value as InvoiceQuery['role'],
          })}
          className="w-full rounded-2xl border-slate-700 bg-slate-950/80 text-slate-100 focus:border-sky-500 focus:ring-sky-500"
        >
          <option value="all">Issuer or payer</option>
          <option value="issuer">Issued by me</option>
          <option value="payer">Payable by me</option>
        </select>
      </label>
      <label className="mt-4 block text-sm text-slate-300">
        <span className="mb-2 block">Sort by</span>
        <select
          value={query.sortBy}
          onChange={(event) => onChange({
            ...query,
            sortBy: event.target.value as InvoiceQuery['sortBy'],
          })}
          className="w-full rounded-2xl border-slate-700 bg-slate-950/80 text-slate-100 focus:border-sky-500 focus:ring-sky-500"
        >
          <option value="dueDate">Due date</option>
          <option value="createdAt">Created date</option>
          <option value="amount">Amount</option>
          <option value="status">Status</option>
        </select>
      </label>
      <button
        type="button"
        onClick={() => onChange({
          ...query,
          direction: query.direction === 'asc' ? 'desc' : 'asc',
        })}
        className="mt-4 rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
      >
        {query.direction === 'asc' ? 'Ascending' : 'Descending'}
      </button>
      <button
        type="button"
        onClick={() => onChange(DEFAULT_INVOICE_QUERY)}
        className="mt-4 px-4 py-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
      >
        Clear filters
      </button>
    </section>
  );
}
