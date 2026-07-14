import type { Invoice } from '../types/invoice';

let freighterApi: any = null;

export function isFreighterAvailable(): boolean {
  return typeof window !== 'undefined' && typeof (window as any).freighterApi !== 'undefined';
}

export async function ensureFreighter(): Promise<any> {
  if (typeof window === 'undefined') {
    return null;
  }

  if (freighterApi) {
    return freighterApi;
  }

  try {
    const freighterModule = await import('@stellar/freighter-api');
    if (freighterModule?.FreighterApi) {
      freighterApi = new freighterModule.FreighterApi();
    } else if ((window as any).freighterApi) {
      freighterApi = (window as any).freighterApi;
    }
  } catch {
    freighterApi = (window as any).freighterApi;
  }

  return freighterApi;
}

export async function connectWallet(): Promise<string> {
  const api = await ensureFreighter();

  if (!api || typeof api.getPublicKey !== 'function') {
    throw new Error('Freighter wallet is not available. Install the extension and refresh the page.');
  }

  const publicKey = await api.getPublicKey();

  if (typeof publicKey === 'string') {
    return publicKey;
  }

  return publicKey.publicKey ?? publicKey.accountId ?? String(publicKey);
}

export async function signInvoiceTransaction(invoice: Invoice): Promise<string> {
  const api = await ensureFreighter();

  if (!api || typeof api.signTransaction !== 'function') {
    throw new Error('Freighter signing is not available.');
  }

  const transactionXdr = prepareInvoiceTransaction(invoice);
  const networkPassphrase = 'Test SDF Network ; September 2015';

  const signed = await api.signTransaction(transactionXdr, networkPassphrase);

  if (signed?.signature) {
    return signed.signature;
  }

  return String(signed);
}

export function prepareInvoiceTransaction(invoice: Invoice): string {
  return `STUBBED_TRANSACTION_XDR_FOR_INVOICE_${invoice.id}`;
}
