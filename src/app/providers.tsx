// app/providers.tsx
'use client';

import { SessionDjoky } from '@/constants';
import { AuthProvider } from '@/contexts/auth-context';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { DataProps, DataLoading } from '@/components/data-loading';

export function Providers({
  session,
  data,
  children,
}: {
  session: SessionDjoky | null;
  data: DataProps;
  children: React.ReactNode;
}) {
  return (
    <AuthProvider session={session}>
      <DataLoading data={data}>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </DataLoading>
    </AuthProvider>
  );
}
