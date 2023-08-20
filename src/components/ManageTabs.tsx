'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Stack } from '@chakra-ui/react';
import CategoryForm from './category/CategoryForm';
import CategoryTable from './category/CategoryTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { init } from '@/app/reducers/category.slice';

export default function ManageTabs({ categoryResponse }: { categoryResponse: CategoryResponse }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('dispatch category');
    dispatch(init(categoryResponse));
  }, [categoryResponse, dispatch]);

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
            <p>Groupes</p>
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
