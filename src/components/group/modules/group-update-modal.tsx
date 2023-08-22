'use client';

import { Button, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultModal } from '../../structure';
import { RootState } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateGroup } from '@/db/groups';
import { update } from '@/reducers/group.slice';

export interface GroupUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalRef: React.RefObject<HTMLElement>;
}

export default function GroupUpdateModal({ isOpen, onClose, finalRef }: GroupUpdateModalProps) {
  const initialRef = useRef(null);
  const { id, name, category } = useSelector((state: RootState) => state.group.currentUpdate);
  const [groupName, setGroupName] = useState<string>('');
  const [groupCategory, setGroupCategory] = useState<{ id: number; name: string }>({ id: 0, name: '' });
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.data);

  useEffect(() => {
    setGroupName(name);
    setGroupCategory(category);
  }, [name, category]);

  const handleUpdate = async () => {
    try {
      const group = await updateGroup(id, groupName, groupCategory.id);
      dispatch(update({ id: group.id, name: group.name, category: group.category }));
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

    setGroupCategory({ id: selectedId, name: selectedItem.name });
  };

  return (
    <DefaultModal initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose} data={data}>
      <form onSubmit={handleUpdate}></form>
      <FormControl>
        <Stack spacing={3}>
          <FormLabel>Catégorie du groupe</FormLabel>
          <Select placeholder='Chosir une catégorie' value={groupCategory.id} onChange={handleSelectCategory}>
            {categories.rows.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormLabel>Nom du groupe</FormLabel>
          <Input
            ref={initialRef}
            placeholder='Saisissez le nom du groupe'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Stack>
      </FormControl>
    </DefaultModal>
  );
}
