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
  Select,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, TimeIcon } from '@chakra-ui/icons';
import { pendingGroup, validateGroup } from '@/db/groups';
import { useRef, useState } from 'react';
import { GroupUpdateModal } from './modules';
import { useCategoryStore, useGroupStore } from '@/stores';

export default function GroupTable() {
  const { count, rows } = useGroupStore((state) => state.response);
  const setCurrentUpdate = useGroupStore((state) => state.setCurrentUpdate);
  const validate = useGroupStore((state) => state.validate);
  const pending = useGroupStore((state) => state.pending);
  const categories = useCategoryStore((state) => state.response);
  const [groupId, setGroupId] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateBtnRef = useRef(null);

  const handleEdit = (id: number, name: string, category: { id: number; name: string }) => {
    setCurrentUpdate({ id, name, category });
    onOpen();
  };

  const handleValidate = async (id: number) => {
    try {
      await validateGroup(id);
      validate(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePending = async (id: number) => {
    try {
      await pendingGroup(id);
      pending(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId: number = event.target.value === '' ? 0 : parseInt(event.target.value);
    setGroupId(groupId);
  };

  const TableRow = ({ group }: { group: Group }) => {
    return (
      <Tr>
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
              onClick={() => handleEdit(group.id, group.name, group.category)}
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
    );
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Liste des groupes ({count} éléments)</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={4} divider={<StackDivider borderColor='teal.400' />}>
          <Select variant='filled' placeholder='Toutes les catégories' onChange={handleSelectGroup}>
            {categories.rows.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Select>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Nom</Th>
                <Th>En Attente</Th>
                <Th>Catégorie</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((group: Group) => {
                if (groupId <= 0) {
                  return <TableRow key={group.id} group={group} />;
                }
                if (groupId === group.category.id) {
                  return <TableRow key={group.id} group={group} />;
                }
              })}
            </Tbody>
          </Table>
        </Stack>
      </CardBody>
      <GroupUpdateModal finalRef={updateBtnRef} isOpen={isOpen} onClose={onClose} />
    </Card>
  );
}
