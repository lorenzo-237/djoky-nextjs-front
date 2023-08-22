'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Stack } from '@chakra-ui/react';
import { CategoryForm, CategoryTable } from './category';
import { GroupForm, GroupTable } from './group';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initData as initCategory } from '@/app/reducers/category.slice';
import { initData as initGroup } from '@/app/reducers/group.slice';

export type ManageTabsProps = {
  categoryResponse: CategoryResponse;
  groupResponse: GroupResponse;
};

export default function ManageTabs({ categoryResponse, groupResponse }: ManageTabsProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('dispatch category');
    dispatch(initCategory(categoryResponse));
    dispatch(initGroup(groupResponse));
  }, [groupResponse, categoryResponse, dispatch]);

  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>Catégories</Tab>
          <Tab>Groupes</Tab>
          <Tab>Exercices</Tab>
          <Tab>Utilisateurs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing={4}>
              <CategoryForm />
              <CategoryTable />
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing={4}>
              <GroupForm />
              <GroupTable />
            </Stack>
          </TabPanel>
          <TabPanel>
            <p>Exercices</p>
          </TabPanel>
          <TabPanel>
            <p>Utilisateurs</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
