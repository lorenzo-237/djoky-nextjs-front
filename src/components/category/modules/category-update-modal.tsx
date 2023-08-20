'use client';

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultModal } from '../../structure';
import { RootState } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory } from '@/db/categories';
import { update } from '@/app/reducers/category.slice';

export interface CategoryUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalRef: React.RefObject<HTMLElement>;
}

export default function CategoryUpdateModal({ isOpen, onClose, finalRef }: CategoryUpdateModalProps) {
  const initialRef = useRef(null);
  const { id, name } = useSelector((state: RootState) => state.category.currentUpdate);
  const [categoryName, setCategoryName] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    setCategoryName(name);
  }, [name]);

  const handleUpdate = async () => {
    try {
      const category = await updateCategory(id, categoryName);
      dispatch(update({ id: category.id, name: category.name }));
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
          ref={initialRef}
          placeholder='Saisissez le nom de la catégorie'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </FormControl>
    </DefaultModal>
  );
}
