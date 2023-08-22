'use client';

import { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initData as initCategory } from '@/reducers/category.slice';
import { initData as initGroup } from '@/reducers/group.slice';

export type AppContextType = {
  categoryResponse?: CategoryResponse | null;
  groupResponse?: GroupResponse | null;
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryResponse || groupResponse) {
      console.log('\x1b[36m%s\x1b[0m', 'DISPATCH ALL FETCH');
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'NOTHING TO DISPATCH PLEASE CONNECT');
    }

    if (categoryResponse) dispatch(initCategory(categoryResponse));
    if (groupResponse) dispatch(initGroup(groupResponse));
  }, [groupResponse, categoryResponse, dispatch]);

  useEffect(() => {
    setCategoryResponse(appContextType?.categoryResponse);
    setGroupResponse(appContextType?.groupResponse);
  }, [appContextType]);

  return <AppContext.Provider value={{ categoryResponse, groupResponse }}>{children}</AppContext.Provider>;
};

export default AppContext;
