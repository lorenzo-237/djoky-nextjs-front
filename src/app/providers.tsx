// app/providers.tsx
'use client';

import { SessionDjoky } from '@/constants';
import { AuthProvider } from '@/contexts/auth-context';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppContextType, AppProvider } from '@/contexts/app-context';

export function Providers({
  session,
  appContextType,
  children,
}: {
  session: SessionDjoky | null;
  appContextType: AppContextType;
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider session={session}>
        <AppProvider appContextType={appContextType}>
          <CacheProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </CacheProvider>
        </AppProvider>
      </AuthProvider>
    </Provider>
  );
}
