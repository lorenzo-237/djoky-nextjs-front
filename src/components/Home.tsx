'use client';

import React from 'react';
import Login from './Login';
import useAuth from '@/hooks/useAuth';
import { Image } from '@chakra-ui/react';

export const HomeComponent = () => {
  const { auth } = useAuth();

  if (!auth) {
    return <Login />;
  }

  return (
    <div>
      <Image src='./assets/djoky_128px.png' alt='Djoky' />
      <h1>Bonjour {auth.firstname}</h1>
    </div>
  );
};
