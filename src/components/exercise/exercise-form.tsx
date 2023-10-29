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
  Textarea,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { createNewExercise } from '@/db/exercises';
import { useExerciseStore, useGroupStore } from '@/stores';

const initialState = {
  name: '',
  groupId: 0,
  description: '',
};

export default function ExerciseForm() {
  const [data, setData] = useState(initialState);
  const [type, setType] = useState('0');

  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const groups = useGroupStore((state) => state.response);
  const addExercise = useExerciseStore((state) => state.add);
  const addExerciseToGroup = useGroupStore((state) => state.addExercise);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (data.groupId === 0) {
      const msg = 'Sélectionnez un groupe avant de créer un exercice';
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
      const exercise = await createNewExercise({ ...data, timed: type === '1' });

      setError(null);
      setData(initialState);

      toast({
        title: 'Exercice crée',
        description: 'Vous pouvez maintenant utiliser votre exercice',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      addExercise(exercise);
      addExerciseToGroup({ groupId: data.groupId, exercise: { ...exercise } });
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

  const handleSelectGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId: number = event.target.value === '' ? 0 : parseInt(event.target.value);
    setData({ ...data, groupId });
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align='stretch'>
            <FormControl id='exerciseName' isInvalid={error !== null}>
              <Stack spacing={3}>
                <FormLabel>Nouvel exercice</FormLabel>
                <Select
                  focusBorderColor='teal'
                  placeholder='Chosir un groupe'
                  value={data.groupId}
                  onChange={handleSelectGroup}
                >
                  {groups.rows.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
                <Input
                  focusBorderColor='teal'
                  type='text'
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Saisissez le nom de l'exercice"
                />
                <Textarea
                  focusBorderColor='teal'
                  placeholder="Description de l'exercice"
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                />
                <RadioGroup onChange={setType} value={type} colorScheme='teal'>
                  <Stack direction='row'>
                    <Radio value='0'>Exercice en poids</Radio>
                    <Radio value='1'>Exercice en temps</Radio>
                  </Stack>
                </RadioGroup>
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
