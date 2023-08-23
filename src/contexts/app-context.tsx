'use client';

import { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initData as initCategory } from '@/reducers/category.slice';
import { initData as initGroup } from '@/reducers/group.slice';
import { initData as initExercise } from '@/reducers/exercise.slice';

export type AppContextType = {
  categoryResponse?: CategoryResponse | null;
  groupResponse?: GroupResponse | null;
  exerciseResponse?: ExerciseResponse | null;
};

const AppContext = createContext<AppContextType>({
  categoryResponse: null,
  groupResponse: null,
});

export const AppProvider = ({
  appContextType,
  children,
}: {
  appContextType: AppContextType | null;
  children: JSX.Element;
}) => {
  const [categoryResponse, setCategoryResponse] = useState<CategoryResponse | null | undefined>(
    appContextType?.categoryResponse
  );
  const [groupResponse, setGroupResponse] = useState<GroupResponse | null | undefined>(appContextType?.groupResponse);

  const [exerciseResponse, setExerciseResponse] = useState<ExerciseResponse | null | undefined>(
    appContextType?.exerciseResponse
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryResponse || groupResponse || exerciseResponse) {
      console.log('\x1b[36m%s\x1b[0m', 'DISPATCH ALL FETCH');
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'NOTHING TO DISPATCH PLEASE CONNECT');
    }

    if (categoryResponse) dispatch(initCategory(categoryResponse));
    if (groupResponse) dispatch(initGroup(groupResponse));
    if (exerciseResponse) dispatch(initExercise(exerciseResponse));
  }, [groupResponse, categoryResponse, exerciseResponse, dispatch]);

  useEffect(() => {
    setCategoryResponse(appContextType?.categoryResponse);
    setGroupResponse(appContextType?.groupResponse);
    setExerciseResponse(appContextType?.exerciseResponse);
  }, [appContextType]);

  return <AppContext.Provider value={{ categoryResponse, groupResponse }}>{children}</AppContext.Provider>;
};

export default AppContext;
