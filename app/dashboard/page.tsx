'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { InvoiceTable } from '../../components/InvoiceTable';
import { InvoiceFilters } from '../../components/InvoiceFilters';
import { StatusBadge } from '../../components/StatusBadge';
import { useWallet } from '../../lib/useWallet';
import { getInvoicesForAddress } from '../../lib/api';
import {
  DEFAULT_INVOICE_QUERY,
  parseInvoiceQuery,
  queryInvoices,
} from '../../lib/invoice-query';
import type { Invoice } from '../../types/invoice';
import type { InvoiceQuery } from '../../types/invoice-query';

export default function DashboardPage() {
  const { address, available, loading, connect } = useWallet();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [query, setQuery] = useState<InvoiceQuery>(DEFAULT_INVOICE_QUERY);
  const [queryReady, setQueryReady] = useState(false);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const visibleInvoices = useMemo(
    () => queryInvoices(invoices, query, address),
    [address, invoices, query],
  );

  useEffect(() => {
    setQuery(parseInvoiceQuery(new URLSearchParams(window.location.search)));
    setQueryReady(true);
  }, []);

  useEffect(() => {
    if (!address) {
      return;
    }

    setLoadingInvoices(true);
    setError(null);

    getInvoicesForAddress(address)
      .then((data) => setInvoices(data))
      .catch((err) => setError(err.message || 'Unable to load invoices'))
      .finally(() => setLoadingInvoices(false));
  }, [address]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-8 shadow-card backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Invoice dashboard</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">Active invoices</h1>
            <p className="mt-3 text-slate-300">Manage invoices issued or received by the current connected account.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/invoices/new" className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Create invoice
            </Link>
            {!address ? (
              <button
                type="button"
                onClick={connect}
                disabled={!available || loading}
                className="rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            ) : (
              <div className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100">{address}</div>
            )}
          </div>
        </div>

        <section className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-8 shadow-card backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Invoice summary</h2>
              <p className="mt-2 text-slate-400">Review recent payments, status updates, and verification actions.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <StatusBadge status="Created" />
              <StatusBadge status="PartiallyPaid" />
              <StatusBadge status="Paid" />
              <StatusBadge status="Overdue" />
              <StatusBadge status="Cancelled" />
            </div>
          </div>

          {address ? (
            <div className="mt-8">
              {loadingInvoices ? (
                <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-8 text-slate-300">Loading invoices...</div>
              ) : error ? (
                <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-8 text-rose-200">{error}</div>
              ) : invoices.length === 0 ? (
                <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-8 text-slate-300">
                  No invoices found for this wallet address. Create the first invoice or verify an existing invoice by ID.
                </div>
              ) : (
                <div className="space-y-5">
                  <InvoiceFilters
                    query={query}
                    onChange={setQuery}
                    visibleCount={visibleInvoices.length}
                    totalCount={invoices.length}
                  />
                  {visibleInvoices.length > 0 ? (
                    <InvoiceTable invoices={visibleInvoices} />
                  ) : (
                    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-8 text-center">
                      <p className="font-semibold text-slate-200">No invoices match this view</p>
                      <p className="mt-2 text-sm text-slate-400">
                        Adjust the search or clear the active filters to see more invoices.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-8 text-slate-300">
              Connect your Freighter wallet to view invoices where your account is issuer or payer.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
