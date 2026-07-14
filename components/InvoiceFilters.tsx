'use client';

import type { InvoiceQuery } from '../types/invoice-query';

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
      <h3 className="text-base font-semibold text-slate-100">Find invoices</h3>
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
    </section>
  );
}
