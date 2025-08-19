import React from 'react';
import './globals.css';
import Providers from '@/components/providers';

export const metadata = { title: 'Dragon Force Monterrey – Ops' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
