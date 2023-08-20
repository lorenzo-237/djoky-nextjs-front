'use client';

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
import createNewCatory from '@/db/create-category';
import { useDispatch } from 'react-redux';
import { addCategory } from '@/app/reducers/category.slice';

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const category = await createNewCatory(categoryName);

      setError(null);
      setCategoryName('');

      toast({
        title: 'Catégorie crée',
        description: 'Vous pouvez maintenant utiliser votre catégorie',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      dispatch(addCategory(category));
    } catch (error: any) {
      setError(error.message.toString());
      toast({
        title: 'Erreur création',
        description: error.message.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
