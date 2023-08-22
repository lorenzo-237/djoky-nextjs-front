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
  Select,
  Stack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup } from '@/app/reducers/group.slice';
import { createNewGroup } from '@/db/group';
import { RootState } from '@/app/store';

export default function GroupForm() {
  const [groupName, setGroupName] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.category.data);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (categoryId === 0) {
      const msg = 'Sélectionnez une catégorie avant de créer un groupe';
      setError(msg);
      toast({
        title: 'Erreur création',
        description: msg,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setError(null);

    try {
      const group = await createNewGroup(groupName, categoryId);

      setError(null);
      setGroupName('');

      toast({
        title: 'Groupe cré',
        description: 'Vous pouvez maintenant utiliser votre groupe',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      dispatch(addGroup(group));
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

  const handleSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId: number = event.target.value === '' ? 0 : parseInt(event.target.value);
    setCategoryId(categoryId);
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align='stretch'>
            <FormControl id='groupName' isInvalid={error !== null}>
              <Stack spacing={3}>
                <FormLabel>Nouveau groupe</FormLabel>
                <Select placeholder='Chosir une catégorie' onChange={handleSelectCategory}>
                  {categories.rows.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <Input
                  type='text'
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder='Saisissez le nom du groupe'
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </Stack>
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
