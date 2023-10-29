import { SearchIcon } from '@chakra-ui/icons';
import {
  FormControl,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Flex,
  VStack,
  Stack,
  Checkbox,
  Button,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CheckExercise } from './types';
import { useFormMultiStepStore } from '../store/multistep.store';
import { useExerciseStore, useGroupStore } from '@/stores';

function GroupsExercicesStep() {
  const { count, rows } = useGroupStore((state) => state.response);
  const [groupName, setGroupName] = useState('');

  const rowsVisible =
    count <= 0
      ? []
      : rows.filter((row) => row.name.toLowerCase().startsWith(groupName.toLowerCase()) && row.exercisesCount > 0);

  return (
    <Stack spacing={4}>
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder='Rechercher un groupe'
            autoComplete='off'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      {rowsVisible.length > 0 ? (
        <GroupsList groups={rowsVisible} />
      ) : (
        <Text align='center' textDecoration='underline' color='red.400'>
          Pas de résultats
        </Text>
      )}
    </Stack>
  );
}

function GroupsList({ groups }: { groups: Group[] }) {
  return (
    <VStack>
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </VStack>
  );
}

function GroupItem({ group }: { group: Group }) {
  const [gridVisible, setGridVisible] = useState<boolean>(false);

  const exos = useExerciseStore((state) => state.getExercisesByGroup(group.id));

  const [exercises, setExercises] = useState<CheckExercise[]>(
    exos.map((exo) => ({
      ...exo,
      checked: false,
      assignedAt: '',
      series: 0,
      repetitions: 0,
      time: 0,
      weight: 0,
      total: 0,
    }))
  );

  const { addExercise, removeExercise, addListExercises, removeListExercises } = useFormMultiStepStore();

  const handleClickOnGroup = () => {
    setGridVisible((prev) => !prev);
  };

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    if (!isChecked) addExercise(exercises[index]);
    else removeExercise(exercises[index]);

    setExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[index].checked = !updatedExercises[index].checked;
      return updatedExercises;
    });
  };

  const allChecked = exercises.every((exo) => exo.checked === true);

  const checkUnCheckAll = () => {
    setExercises((prevExercises) => prevExercises.map((exo) => ({ ...exo, checked: !allChecked })));

    !allChecked ? addListExercises(exercises) : removeListExercises(exercises);
  };

  const visible = exercises.length > 0 && gridVisible === true;

  return (
    <>
      <Box
        w='full'
        p='2'
        borderRadius='md'
        shadow='sm'
        bg='purple.500'
        color='white'
        fontWeight='normal'
        cursor='pointer'
        _hover={{
          bg: 'purple.600',
          boxShadow: 'md',
        }}
        onClick={handleClickOnGroup}
      >
        <Flex direction='row' alignItems='center' justify='center' gap={2}>
          <Text fontWeight='bold'>
            {group.name} ({group.exercisesCount})
          </Text>
        </Flex>
      </Box>
      {visible && (
        <Stack w='full'>
          <Button colorScheme='blue' onClick={checkUnCheckAll} variant='link'>
            {allChecked ? 'Décocher' : 'Cocher'} tous les exercices
          </Button>
          <Wrap>
            {exercises.map((exo, index) => (
              <WrapItem key={exo.id}>
                <Checkbox
                  border='1px solid'
                  borderColor='purple.500'
                  cursor='pointer'
                  rounded='lg'
                  size='lg'
                  px={3}
                  py={1}
                  colorScheme='purple'
                  padding='1'
                  isChecked={exo.checked}
                  onChange={() => handleCheckboxChange(index, exo.checked)}
                >
                  {exo.name}
                </Checkbox>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      )}
    </>
  );
}

export default GroupsExercicesStep;
