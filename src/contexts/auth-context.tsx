'use client';

import { SessionDjoky } from '@/constants';
import HTTP_CODE from '@/constants/http-code';
import { fetchPostApi } from '@/utils/fetch/client';
import { convertUserToSessionDjkoy } from '@/utils/functions/convert';
import { createContext, useState } from 'react';

export type AuthContextType = {
  auth: SessionDjoky | null;
  login: (userDto: { username: string; password: string }) => Promise<{
    error: boolean;
    message: any;
  }>;
};

const AuthContext = createContext<AuthContextType>({
  auth: null,
  login: async () => ({
    error: false,
    message: '',
  }),
});

export const AuthProvider = ({ session, children }: { session: SessionDjoky | null; children: JSX.Element }) => {
  const [auth, setAuth] = useState<SessionDjoky | null>(session);

  const login = async (userDto: { username: string; password: string }) => {
    try {
      const response = await fetchPostApi('/auth/login', userDto);

      if (response.status != HTTP_CODE.OK) {
        const errorData: ErrorApiMessage = await response.json();
        return { error: true, message: errorData.message.toString() };
      }

      const user: User = await response.json();
      setAuth(convertUserToSessionDjkoy(user));
      return { error: false, message: 'connected' };
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      return { error: true, message: error };
    }
  };

  return <AuthContext.Provider value={{ auth, login }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
