'use client';

import type { InvoiceQuery } from '../types/invoice-query';

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
    </section>
  );
}
