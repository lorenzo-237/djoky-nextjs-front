'use client';
import { useCategoryStore, useExerciseStore, useGroupStore } from '@/stores';
import { useEffect } from 'react';

export type DataProps = {
  category: CategoryResponse | null;
  group: GroupResponse | null;
  exercise: ExerciseResponse | null;
};

type AppProps = { data: DataProps | null; children: JSX.Element };

export const DataLoading = ({ data, children }: AppProps) => {
  const initCategory = useCategoryStore((state) => state.initData);
  const initGroup = useGroupStore((state) => state.initData);
  const initExercise = useExerciseStore((state) => state.initData);

  useEffect(() => {
    console.log('\x1b[36m%s\x1b[0m', 'data are fetched => process to init datas');
    if (data && data.category) initCategory(data.category);
    if (data && data.group) initGroup(data.group);
    if (data && data.exercise) initExercise(data.exercise);
  }, [data, initCategory, initGroup, initExercise]);

  return <>{children}</>;
};

export default DataLoading;
