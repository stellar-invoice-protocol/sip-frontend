import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stellar Invoice Protocol',
  description: 'A modern invoice dashboard for Stellar-powered payments',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <body>{children}</body>
    </html>
  );
}
