'use client';

import { useWallet } from '../lib/useWallet';

export function WalletStatus({ onConnect }: { onConnect?: (address: string) => void }) {
  const { address, available, loading, error, status, connect, disconnect } = useWallet();

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-card backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300/80">Wallet</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">{status}</p>
          {address ? <p className="text-sm text-slate-400">{address}</p> : null}
        </div>

        <div className="flex flex-wrap gap-3">
          {address ? (
            <button
              type="button"
              onClick={disconnect}
              className="rounded-full bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Disconnect
            </button>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await connect();
                if (onConnect && address) {
                  onConnect(address);
                }
              }}
              disabled={!available || loading}
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Connect Freighter'}
            </button>
          )}
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
