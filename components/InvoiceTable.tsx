import Link from 'next/link';
import type { Invoice } from '../types/invoice';
import { StatusBadge } from './StatusBadge';

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
          <thead className="bg-slate-950/90 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Invoice ID</th>
              <th className="px-6 py-4 font-medium">Payer</th>
              <th className="px-6 py-4 font-medium">Issuer</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Due</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-950/80 text-slate-300">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-900/60">
                <td className="px-6 py-4 font-medium text-slate-100">{invoice.id}</td>
                <td className="px-6 py-4">{invoice.payer}</td>
                <td className="px-6 py-4">{invoice.issuer}</td>
                <td className="px-6 py-4">{invoice.amount} {invoice.currency}</td>
                <td className="px-6 py-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
