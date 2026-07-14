import type { InvoiceStatus } from '../types/invoice';

const statusStyles: Record<InvoiceStatus, string> = {
  Created: 'bg-sky-500/10 text-sky-200 ring-sky-500/30',
  PartiallyPaid: 'bg-amber-500/10 text-amber-200 ring-amber-500/30',
  Paid: 'bg-emerald-500/10 text-emerald-200 ring-emerald-500/30',
  Overdue: 'bg-rose-500/10 text-rose-200 ring-rose-500/30',
  Cancelled: 'bg-slate-600/10 text-slate-300 ring-slate-500/30',
};

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
