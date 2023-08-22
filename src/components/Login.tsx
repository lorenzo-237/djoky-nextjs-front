'use client';

import useAuth from '@/hooks/useAuth';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('lorenzo');
  const [password, setPassword] = useState<string>('lorenzo');
  const toast = useToast();
  const { login } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const dto = {
      username: username,
      password: password,
    };

    const user = await login(dto);

    if (user.error) {
      toast({
        title: 'Non autorisé',
        description: user.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    router.refresh();
    router.replace('/');
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Hey Djoky 😉</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Cette appli commence par une <Link color={'blue.400'}>djoke</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <FormControl id='username'>
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <Input type='username' value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Mot de passe</FormLabel>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Checkbox>Se rappeler de moi</Checkbox>
                </Stack>
                <Button
                  type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Se connecter
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
