import Link from 'next/link';
import { WalletStatus } from '../components/WalletStatus';
import { SectionHead } from '../components/SectionHead';

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <section className="space-y-10">
            <div className="max-w-3xl rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-10 shadow-card backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.26em] text-sky-300/80">Stellar Invoice Protocol</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Secure invoice issuance and verification for Stellar-powered businesses.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Stellar Invoice Protocol brings fast invoicing, proof of payment, and on-chain verification together in a clean dashboard built for modern teams.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                  Explore dashboard
                </Link>
                <Link href="/invoices/new" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-600">
                  Create invoice
                </Link>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: 'Problem',
                  body: 'Invoices are often disconnected from payment proof and verification, making disputes harder and reconciliation slower.',
                },
                {
                  title: 'How it works',
                  body: 'Issue invoices with payer and issuer metadata, store verification data in a trusted backend, and authorize payments with Freighter for added trust.',
                },
                {
                  title: 'Why Stellar',
                  body: 'Stellar gives fast settlement, low fees, and Soroban-friendly smart contract compatibility for the next generation of invoicing workflows.',
                },
              ].map((item) => (
                <article key={item.title} className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-card backdrop-blur-xl">
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
                </article>
              ))}
            </div>

            <section className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-8 shadow-card backdrop-blur-xl">
              <SectionHead
                title="Modern dashboard for invoice management"
                description="Track issued invoices, follow up on payment status, and share verification links with clients from one polished interface."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'Multi-status invoice board',
                  'Public verification links',
                  'Freighter wallet connect flow',
                  'Soroban transaction-ready payments',
                ].map((feature) => (
                  <div key={feature} className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-5">
                    <p className="text-base text-slate-200">{feature}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="space-y-6">
            <WalletStatus />
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-8 shadow-card backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-white">Ready for a faster invoice workflow</h2>
              <p className="mt-4 text-slate-300">
                Connect a Freighter wallet to see invoices where you are issuer or payer, and prepare payments directly from the dashboard.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
