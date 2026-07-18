import type { Invoice } from '../types/invoice';
import {
  getAddress,
  isConnected,
  requestAccess,
  signTransaction,
} from '@stellar/freighter-api';

export function isFreighterAvailable(): boolean {
  return typeof window !== 'undefined' && typeof (window as any).freighterApi !== 'undefined';
}

export async function connectWallet(): Promise<string> {
  // Check if the Freighter extension is connected/accessible
  const connected = await isConnected();
  if (!connected?.isConnected) {
    // Prompt the user to grant access
    const access = await requestAccess();
    if (access?.error) {
      throw new Error(
        access.error.message ??
          'Freighter wallet is not available. Install the extension and refresh the page.',
      );
    }

    // Verify the user actually approved (not just closed the popup)
    const recheck = await isConnected();
    if (!recheck?.isConnected) {
      throw new Error(
        'Freighter access was not granted. Please approve the connection in the extension.',
      );
    }
  }

  const result = await getAddress();
  if (result?.error) {
    throw new Error(result.error.message ?? 'Unable to retrieve wallet address from Freighter.');
  }

  if (!result.address) {
    throw new Error('Freighter returned an empty address. Make sure your wallet is unlocked.');
  }

  return result.address;
}

export async function signInvoiceTransaction(invoice: Invoice): Promise<string> {
  const connected = await isConnected();
  if (!connected?.isConnected) {
    throw new Error('Freighter signing is not available.');
  }

  const transactionXdr = prepareInvoiceTransaction(invoice);
  const networkPassphrase = 'Test SDF Network ; September 2015';

  const result = await signTransaction(transactionXdr, {
    networkPassphrase,
  });

  if (result?.error) {
    throw new Error(result.error.message ?? 'Transaction signing failed.');
  }

  return result.signedTxXdr ?? String(result);
}

export function prepareInvoiceTransaction(invoice: Invoice): string {
  return `STUBBED_TRANSACTION_XDR_FOR_INVOICE_${invoice.id}`;
}
