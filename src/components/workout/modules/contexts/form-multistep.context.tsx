'use client';

import { createContext, useState } from 'react';
import { CheckExercise } from '../steps/types';

export type FormMultiStepProps = {
  exercises: CheckExercise[];
  addExercise: (exo: CheckExercise) => void;
  removeExercise: (exo: CheckExercise) => void;
  addListExercises: (exos: CheckExercise[]) => void;
  removeListExercises: (exos: CheckExercise[]) => void;
};

const FormMultiStepContext = createContext<FormMultiStepProps>({
  exercises: [],
  addExercise: () => {},
  removeExercise: () => {},
  addListExercises: () => {},
  removeListExercises: () => {},
});

export function FormMultiStepProvider({ children }: { children: JSX.Element }) {
  const [exercises, setExercises] = useState<CheckExercise[]>([]);

  const addExercise = (exo: CheckExercise) => {
    if (!exercises.some((item) => item.id === exo.id)) {
      const newExercises = [...exercises];
      newExercises.push(exo);
      setExercises(newExercises);
    }
  };

  const removeExercise = (exo: CheckExercise) => {
    if (exercises.some((item) => item.id === exo.id)) {
      const newExercises = exercises.filter((item) => item.id !== exo.id);
      setExercises(newExercises);
    }
  };

  const addListExercises = (exos: CheckExercise[]) => {
    const exercisesToAdd = exos.filter((exo) => {
      return !exercises.some((item) => exo.id === item.id);
    });

    const newExercises = [...exercises, ...exercisesToAdd];
    setExercises(newExercises);
  };

  const removeListExercises = (exos: CheckExercise[]) => {
    const exercisesToKeep = exercises.filter((item) => {
      return !exos.some((exo) => exo.id !== item.id);
    });

    console.log(exercisesToKeep);

    setExercises(exercisesToKeep);
  };

  return (
    <FormMultiStepContext.Provider
      value={{ exercises, addExercise, removeExercise, addListExercises, removeListExercises }}
    >
      {children}
    </FormMultiStepContext.Provider>
  );
}

export default FormMultiStepContext;
