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
import { pending, setCurrentUpdate, validate } from '@/app/reducers/group.slice';
// import { pendingGroup, validateGroup } from '@/db/groups';
import { useRef } from 'react';
// import { GroupUpdateModal } from './modules';

export default function GroupTable() {
  const { count, rows } = useSelector((state: RootState) => state.group.data);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateBtnRef = useRef(null);

  const handleEdit = (id: number, name: string, categoryId: number) => {
    dispatch(setCurrentUpdate({ id, name, categoryId }));
    onOpen();
  };

  const handleValidate = async (id: number) => {
    try {
      //   await validateGroup(id);
      dispatch(validate(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePending = async (id: number) => {
    try {
      //   await pendingGroup(id);
      dispatch(pending(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Liste des groupes ({count} éléments)</Heading>
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
            {rows.map((group: Group) => (
              <Tr key={group.id}>
                <Td>{group.name}</Td>
                <Td color={`${group.isPending ? 'red.500' : ''}`}>{group.isPending ? 'Oui' : 'Non'}</Td>
                <Td>{group.category.name}</Td>
                <Td>
                  <HStack spacing={1}>
                    <IconButton
                      ref={updateBtnRef}
                      variant='outline'
                      aria-label='Modifier'
                      title={`Modifier la catégorie : ${group.name}`}
                      icon={<EditIcon />}
                      onClick={() => handleEdit(group.id, group.name, group.category.id)}
                      size='sm'
                      colorScheme='blue'
                    />
                    {group.isPending ? (
                      <IconButton
                        variant='outline'
                        aria-label='Valider'
                        title={`Valider la catégorie : ${group.name}`}
                        icon={<CheckIcon />}
                        onClick={() => handleValidate(group.id)}
                        size='sm'
                        colorScheme='green'
                      />
                    ) : (
                      <IconButton
                        variant='outline'
                        aria-label='Valider'
                        title={`Mettre en attente la catégorie : ${group.name}`}
                        icon={<TimeIcon />}
                        onClick={() => handlePending(group.id)}
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
      {/* <GroupUpdateModal finalRef={updateBtnRef} isOpen={isOpen} onClose={onClose} /> */}
    </Card>
  );
}
