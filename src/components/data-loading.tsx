'use client';
import useCategoryStore from '@/stores/category.store';
import { useEffect } from 'react';

export type DataProps = {
  category: CategoryResponse | null;
  group: GroupResponse | null;
  exercise: ExerciseResponse | null;
};

type AppProps = { data: DataProps | null; children: JSX.Element };

export const DataLoading = ({ data, children }: AppProps) => {
  const initCategory = useCategoryStore((state) => state.initData);

  useEffect(() => {
    console.log('\x1b[36m%s\x1b[0m', 'data fetched init datas');
    if (data && data.category) initCategory(data.category);
    // setGroup(data?.group);
    // setExercise(data?.exercise);
  }, [data, initCategory]);

  return <>{children}</>;
};

export default DataLoading;
