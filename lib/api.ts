import type { CreateInvoiceRequest, Invoice } from '../types/invoice';

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/?$/, '') ?? '';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || response.statusText);
  }

  return response.json();
}

export async function getInvoicesForAddress(address: string): Promise<Invoice[]> {
  return fetchJson<Invoice[]>(`/invoices?address=${encodeURIComponent(address)}`);
}

export async function getInvoiceById(id: string): Promise<Invoice> {
  return fetchJson<Invoice>(`/invoices/${encodeURIComponent(id)}`);
}

export async function createInvoice(payload: CreateInvoiceRequest): Promise<Invoice> {
  return fetchJson<Invoice>(`/invoices`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
