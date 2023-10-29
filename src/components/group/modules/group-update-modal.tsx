'use client';

import { Button, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultModal } from '../../structure';
import { updateGroup } from '@/db/groups';
import { useCategoryStore, useExerciseStore, useGroupStore } from '@/stores';

export interface GroupUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalRef: React.RefObject<HTMLElement>;
}

export default function GroupUpdateModal({ isOpen, onClose, finalRef }: GroupUpdateModalProps) {
  const initialRef = useRef(null);
  const { id, name, category } = useGroupStore((state) => state.currentUpdate);
  const update = useGroupStore((state) => state.update);
  const refreshGroup = useExerciseStore((state) => state.refreshGroup);
  const [state, setState] = useState({
    name: '',
    categoryId: 0,
  });
  const categories = useCategoryStore((state) => state.response);

  useEffect(() => {
    setState({ name: name, categoryId: category.id });
  }, [name, category]);

  const handleUpdate = async () => {
    try {
      const group = await updateGroup(id, state.name, state.categoryId);
      update({ id: group.id, name: group.name, category: group.category });
      refreshGroup({ groupId: group.id, groupName: group.name });
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
    title: 'Modifier le groupe',
    footer: actions(),
  };

  const handleSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId: number = event.target.value === '' ? 0 : parseInt(event.target.value);
    const selectedItem = categories.rows.find((category) => category.id === selectedId);

    if (!selectedItem) {
      return;
    }

    setState({ ...state, categoryId: selectedItem.id });
  };

  return (
    <DefaultModal initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose} data={data}>
      <form onSubmit={handleUpdate}></form>
      <FormControl>
        <Stack spacing={3}>
          <FormLabel>Catégorie du groupe</FormLabel>
          <Select
            focusBorderColor='teal'
            placeholder='Chosir une catégorie'
            value={state.categoryId}
            onChange={handleSelectCategory}
          >
            {categories.rows.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormLabel>Nom du groupe</FormLabel>
          <Input
            focusBorderColor='teal'
            ref={initialRef}
            placeholder='Saisissez le nom du groupe'
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </Stack>
      </FormControl>
    </DefaultModal>
  );
}
