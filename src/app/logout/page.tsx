'use client';

import useAuth from '@/hooks/useAuth';
import { Button, Card, CardBody, CardHeader, Stack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='lg'>Tu nous quittes déjà ? 😢</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          <Button colorScheme='teal' onClick={handleLogout}>
            Oui je me déconnecte
          </Button>
          <Button
            colorScheme='red'
            onClick={() => {
              router.replace('/');
            }}
          >
            Non, je reste
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}
