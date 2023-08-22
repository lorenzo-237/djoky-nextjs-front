'use client';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardHeader,
  Heading,
  CardBody,
  IconButton,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, TimeIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { pending, setCurrentUpdate, validate } from '@/reducers/category.slice';
import { pendingCategory, validateCategory } from '@/db/categories';
import { useRef } from 'react';
import { CategoryUpdateModal } from './modules';

export default function CategoryTable() {
  const { count, rows } = useSelector((state: RootState) => state.category.data);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateBtnRef = useRef(null);

  const handleEdit = (id: number, name: string) => {
    dispatch(setCurrentUpdate({ id, name }));
    onOpen();
  };

  const handleValidate = async (id: number) => {
    try {
      await validateCategory(id);
      dispatch(validate(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePending = async (id: number) => {
    try {
      await pendingCategory(id);
      dispatch(pending(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Liste des catégories ({count} éléments)</Heading>
      </CardHeader>
      <CardBody>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>Nom</Th>
              <Th>En Attente</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((category: Category) => (
              <Tr key={category.id}>
                <Td>{category.name}</Td>
                <Td color={`${category.isPending ? 'red.500' : ''}`}>{category.isPending ? 'Oui' : 'Non'}</Td>
                <Td>
                  <HStack spacing={1}>
                    <IconButton
                      ref={updateBtnRef}
                      variant='outline'
                      aria-label='Modifier'
                      title={`Modifier la catégorie : ${category.name}`}
                      icon={<EditIcon />}
                      onClick={() => handleEdit(category.id, category.name)}
                      size='sm'
                      colorScheme='blue'
                    />
                    {category.isPending ? (
                      <IconButton
                        variant='outline'
                        aria-label='Valider'
                        title={`Valider la catégorie : ${category.name}`}
                        icon={<CheckIcon />}
                        onClick={() => handleValidate(category.id)}
                        size='sm'
                        colorScheme='green'
                      />
                    ) : (
                      <IconButton
                        variant='outline'
                        aria-label='Valider'
                        title={`Mettre en attente la catégorie : ${category.name}`}
                        icon={<TimeIcon />}
                        onClick={() => handlePending(category.id)}
                        size='sm'
                        colorScheme='red'
                      />
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
      <CategoryUpdateModal finalRef={updateBtnRef} isOpen={isOpen} onClose={onClose} />
    </Card>
  );
}
