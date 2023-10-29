'use client';

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultModal } from '../../structure';
import { updateCategory } from '@/db/categories';
import { useCategoryStore, useGroupStore } from '@/stores';

export interface CategoryUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalRef: React.RefObject<HTMLElement>;
}

export default function CategoryUpdateModal({ isOpen, onClose, finalRef }: CategoryUpdateModalProps) {
  const initialRef = useRef(null);
  const { id, name } = useCategoryStore((state) => state.currentUpdate);
  const updateStore = useCategoryStore((state) => state.update);
  const refreshCategory = useGroupStore((state) => state.refreshCategory);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    setCategoryName(name);
  }, [name]);

  const handleUpdate = async () => {
    try {
      const category = await updateCategory(id, categoryName);
      updateStore({ id: category.id, name: category.name });
      refreshCategory({ categoryId: category.id, categoryName: category.name });
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
    title: 'Modifier la catégorie',
    footer: actions(),
  };

  return (
    <DefaultModal initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose} data={data}>
      <form onSubmit={handleUpdate}></form>
      <FormControl>
        <FormLabel>Nom</FormLabel>
        <Input
          focusBorderColor='teal'
          ref={initialRef}
          placeholder='Saisissez le nom de la catégorie'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </FormControl>
    </DefaultModal>
  );
}
