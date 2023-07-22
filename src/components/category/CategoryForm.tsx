'use client';
import HTTP_CODE from '@/constants/http-code';
import { fetchApi } from '@/utils/fetch/client';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Card,
  CardBody,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const dto = {
      name: categoryName,
    };

    const response = await fetchApi('/categories', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });

    const data = await response.json();

    if (response.status != HTTP_CODE.CREATED) {
      setError(data.message.toString());
      toast({
        title: 'Erreur création',
        description: data.message.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setError(null);
    setCategoryName('');

    toast({
      title: 'Catégorie crée',
      description: 'Vous pouvez maintenant utiliser votre catégorie',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align='stretch'>
            <FormControl id='categoryName' isInvalid={error !== null}>
              <FormLabel>Nouvelle catégorie</FormLabel>
              <Input
                type='text'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder='Saisissez le nom de la catégorie'
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            <Button type='submit' colorScheme='teal'>
              Créer
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
}
