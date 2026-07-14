'use client';

import { useEffect, useMemo, useState } from 'react';
import { connectWallet, isFreighterAvailable } from './freighter';

const STORAGE_KEY = 'sip_wallet_address';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAvailable(isFreighterAvailable());
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAddress(stored);
      }
    }
  }, []);

  const connect = async () => {
    setLoading(true);
    setError(null);

    try {
      const publicKey = await connectWallet();
      setAddress(publicKey);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, publicKey);
      }
      setAvailable(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setError(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const status = useMemo(() => {
    if (loading) return 'Connecting...';
    if (address) return 'Connected';
    if (!available) return 'Freighter not installed';
    return 'Disconnected';
  }, [address, available, loading]);

  return {
    address,
    available,
    loading,
    error,
    status,
    connect,
    disconnect,
  };
}
