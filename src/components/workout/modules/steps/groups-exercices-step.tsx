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
import { fakeExercises, fakeGroups } from './db.fake';
import { CheckExercise } from './types';
import useForm from '../hooks/useFormMultiStep';

function GroupsExercicesStep() {
  const groups = fakeGroups;

  return (
    <Stack spacing={4}>
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder='Groupe' autoComplete='off' />
        </InputGroup>
      </FormControl>
      {groups.length > 0 && <GroupsList groups={groups} />}
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
  const [gridVisible, setGridVisible] = useState<boolean | null>(null);
  const [exercises, setExercises] = useState<CheckExercise[]>([]);

  const { addExercise, removeExercise, addListExercises, removeListExercises } = useForm();

  const fetchExercises = () => {
    const exercisesDb = fakeExercises; // todo: make http GET request by group id
    setExercises(
      exercisesDb.map((exo) => {
        return { ...exo, checked: false };
      })
    );
  };

  const handleClickOnGroup = () => {
    if (gridVisible === null) {
      fetchExercises();
      setGridVisible(true);
    } else {
      setGridVisible((prev) => !prev);
    }
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
          <Text fontWeight='bold'>{group.name}</Text>
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
