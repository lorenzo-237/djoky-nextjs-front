'use client';
import HTTP_CODE from '@/constants/http-code';
import fetchApi from '@/utils/fetchApi';
import { FormControl, FormLabel, Input, Button, VStack, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

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
      console.log(data.message.toString());
      return;
    }

    console.log('Created');
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align='stretch'>
            <FormControl id='categoryName'>
              <FormLabel>Nouvelle catégorie</FormLabel>
              <Input
                type='text'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder='Saisissez le nom de la catégorie'
              />
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
