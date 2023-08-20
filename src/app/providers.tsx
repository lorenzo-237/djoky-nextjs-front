// app/providers.tsx
'use client';

import { SessionDjoky } from '@/constants';
import { AuthProvider } from '@/contexts/auth-context';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';

export function Providers({ session, children }: { session: SessionDjoky | null; children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider session={session}>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </AuthProvider>
    </Provider>
  );
}
