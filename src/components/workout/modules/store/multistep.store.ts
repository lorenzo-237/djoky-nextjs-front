import { create } from 'zustand';
// sans le combine pour tester
import { CheckExercise } from '../steps/types';

type FormMultiStepState = {
  exercises: CheckExercise[];
  addExercise: (exo: CheckExercise) => void;
  removeExercise: (exo: CheckExercise) => void;
  addListExercises: (exos: CheckExercise[]) => void;
  removeListExercises: (exos: CheckExercise[]) => void;
};

export const useFormMultiStepStore = create<FormMultiStepState>()((set) => ({
  exercises: [],
  addExercise: (exo) => set((state) => ({ exercises: [...state.exercises, exo] })),
  removeExercise: (exo) => set((state) => ({ exercises: state.exercises.filter((item) => item.id !== exo.id) })),
  addListExercises: (exos) =>
    set((state) => ({
      exercises: [...state.exercises, ...exos.filter((exo) => !state.exercises.some((item) => exo.id === item.id))],
    })),
  removeListExercises: (exos) =>
    set((state) => ({
      exercises: state.exercises.filter((item) => !exos.some((exo) => exo.id === item.id)),
    })),
}));
