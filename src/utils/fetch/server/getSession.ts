import { fetchApi } from './fetchServerSide';
import { SESSION_ID_COOKIE_NAME, SessionDjoky } from '@/constants';
import HTTP_CODE from '@/constants/http-code';
import { convertUserToSessionDjkoy } from '@/utils/functions/convert';
import { cookies } from 'next/headers';

export async function getSession(): Promise<SessionDjoky | null> {
  const cookieStore = cookies();

  if (!cookieStore.has(SESSION_ID_COOKIE_NAME)) {
    return null;
  }

  try {
    const response = await fetchApi(`/auth/session`, { method: 'GET', credentials: 'include' });

    if (response.status != HTTP_CODE.OK) {
      return null;
    }

    const user: User = await response.json();

    return convertUserToSessionDjkoy(user);
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
    return null;
  }
}
