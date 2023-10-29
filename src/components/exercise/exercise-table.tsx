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
  Icon,
  Text,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, TimeIcon } from '@chakra-ui/icons';
import { GiWeight, GiHourglass } from 'react-icons/gi';
import { pendingExercise, validateExercise } from '@/db/exercises';
import { useRef, useState } from 'react';
import { ExerciseUpdateModal } from './modules';
import { useExerciseStore, useGroupStore } from '@/stores';
import { UpdateExerciseDto } from '@/stores/exercise.store';

export default function ExerciseTable() {
  const { count, rows } = useExerciseStore((state) => state.response);
  const setCurrentUpdate = useExerciseStore((state) => state.setCurrentUpdate);
  const validate = useExerciseStore((state) => state.validate);
  const pending = useExerciseStore((state) => state.pending);
  const groups = useGroupStore((state) => state.response);

  const [groupId, setGroupId] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateBtnRef = useRef(null);

  function handleEdit(editDto: UpdateExerciseDto) {
    setCurrentUpdate(editDto);
    onOpen();
  }

  const handleValidate = async (id: number) => {
    try {
      await validateExercise(id);
      validate(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePending = async (id: number) => {
    try {
      await pendingExercise(id);
      pending(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId: number = event.target.value === '' ? 0 : parseInt(event.target.value);
    setGroupId(groupId);
  };

  const TableRow = ({ exercise }: { exercise: Exercise }) => {
    return (
      <Tr>
        <Td>
          <Stack direction='row' align='center'>
            {exercise.timed ? <Icon boxSize={6} as={GiHourglass} /> : <Icon boxSize={6} as={GiWeight} />}
            <Text>{exercise.name}</Text>
          </Stack>
        </Td>
        <Td color={`${exercise.isPending ? 'red.500' : ''}`}>{exercise.isPending ? 'Oui' : 'Non'}</Td>
        <Td>{exercise.group.name}</Td>
        <Td>
          <HStack spacing={1}>
            <IconButton
              ref={updateBtnRef}
              variant='outline'
              aria-label='Modifier'
              title={`Modifier la catégorie : ${exercise.name}`}
              icon={<EditIcon />}
              onClick={() =>
                handleEdit({
                  id: exercise.id,
                  name: exercise.name,
                  description: exercise.description,
                  timed: exercise.timed,
                  group: exercise.group,
                })
              }
              size='sm'
              colorScheme='blue'
            />
            {exercise.isPending ? (
              <IconButton
                variant='outline'
                aria-label='Valider'
                title={`Valider la catégorie : ${exercise.name}`}
                icon={<CheckIcon />}
                onClick={() => handleValidate(exercise.id)}
                size='sm'
                colorScheme='green'
              />
            ) : (
              <IconButton
                variant='outline'
                aria-label='Valider'
                title={`Mettre en attente la catégorie : ${exercise.name}`}
                icon={<TimeIcon />}
                onClick={() => handlePending(exercise.id)}
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
        <Heading size='md'>Liste des exercisees ({count} éléments)</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={4} divider={<StackDivider borderColor='teal.400' />}>
          <Select variant='filled' placeholder='Tous les groupes' onChange={handleSelectGroup}>
            {groups.rows.map((group) => (
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
                <Th>Groupe</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((exercise: Exercise) => {
                if (groupId <= 0) {
                  return <TableRow key={exercise.id} exercise={exercise} />;
                }
                if (groupId === exercise.group.id) {
                  return <TableRow key={exercise.id} exercise={exercise} />;
                }
              })}
            </Tbody>
          </Table>
        </Stack>
      </CardBody>
      <ExerciseUpdateModal finalRef={updateBtnRef} isOpen={isOpen} onClose={onClose} />
    </Card>
  );
}
