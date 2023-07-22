import { SessionDjoky } from '@/constants';
import React from 'react';
import Login from './Login';

export const HomeComponent = ({ session }: { session: SessionDjoky | null }) => {
  if (!session) {
    return <Login />;
  }
  return (
    <div>
      <h1>Bonjour {session.firstname}</h1>
    </div>
  );
};
