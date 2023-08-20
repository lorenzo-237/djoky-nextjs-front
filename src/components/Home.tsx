'use client';

import React from 'react';
import Login from './Login';
import useAuth from '@/hooks/useAuth';

export const HomeComponent = () => {
  const { auth } = useAuth();

  if (!auth) {
    return <Login />;
  }

  return (
    <div>
      <h1>Bonjour {auth.firstname}</h1>
    </div>
  );
};
