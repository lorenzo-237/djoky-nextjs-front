'use client';

import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, Select, Stack, Textarea } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultModal } from '../../structure';
import { updateExercise } from '@/db/exercises';
import { useExerciseStore, useGroupStore } from '@/stores';

export interface ExerciseUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalRef: React.RefObject<HTMLElement>;
}

const initialState = {
  name: '',
  groupId: 0,
  description: '',
};

export default function ExerciseUpdateModal({ isOpen, onClose, finalRef }: ExerciseUpdateModalProps) {
  const initialRef = useRef(null);
  const { id, name, description, timed, group } = useExerciseStore((state) => state.currentUpdate);
  const update = useExerciseStore((state) => state.update);
  const groups = useGroupStore((state) => state.response);
  const [state, setState] = useState(initialState);
  const [type, setType] = useState('0');

  useEffect(() => {
    setState({
      name: name,
      description: description,
      groupId: group.id,
    });
    setType(timed ? '1' : '0');
  }, [name, description, group, timed]);

  const handleUpdate = async () => {
    try {
      const exercise = await updateExercise(id, { ...state, timed: type === '1' });
      update({
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        timed: exercise.timed,
        group: exercise.group,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const actions = () => {
    return (
      <>
        <Button colorScheme='blue' mr={3} onClick={() => handleUpdate()}>
          Enregistrer
        </Button>
        <Button colorScheme='red' onClick={onClose}>
          Annuler
        </Button>
      </>
    );
  };

  const data = {
    title: 'Modifier le exercisee',
    footer: actions(),
  };

  const handleSelectGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId: number = event.target.value === '' ? 0 : parseInt(event.target.value);
    const selectedItem = groups.rows.find((group) => group.id === selectedId);

    if (!selectedItem) {
      return;
    }

    setState({ ...state, groupId: selectedId });
  };

  return (
    <DefaultModal initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose} data={data}>
      <form onSubmit={handleUpdate}></form>
      <FormControl>
        <Stack spacing={3}>
          <FormLabel>Groupe de l&lsquo;exercice</FormLabel>
          <Select
            focusBorderColor='teal'
            placeholder='Chosir un group'
            value={state.groupId}
            onChange={handleSelectGroup}
          >
            {groups.rows.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Select>
          <FormLabel>Nom de l&lsquo;exercice</FormLabel>
          <Input
            focusBorderColor='teal'
            ref={initialRef}
            placeholder="Saisissez le nom de l'exercice"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
          <Textarea
            focusBorderColor='teal'
            placeholder="Description de l'exercice"
            value={state.description}
            onChange={(e) => setState({ ...state, description: e.target.value })}
          />
          <RadioGroup onChange={setType} value={type} colorScheme='teal'>
            <Stack direction='row'>
              <Radio value='0'>Exercice en poids</Radio>
              <Radio value='1'>Exercice en temps</Radio>
            </Stack>
          </RadioGroup>
        </Stack>
      </FormControl>
    </DefaultModal>
  );
}
