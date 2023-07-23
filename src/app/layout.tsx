import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Sidebar from '@/components/Sidebar';
import { getSession } from '@/utils/fetch/server';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    return (
      <html lang='fr'>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang='fr'>
      <body>
        <Providers>
          <Sidebar>{children}</Sidebar>
        </Providers>
      </body>
    </html>
  );
}
