'use client';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Stack } from '@chakra-ui/react';
import CategoryForm from './../components/category/CategoryForm';
import CategoryTable from './../components/category/CategoryTable';

export default function ManageTabs({ categories }: { categories: any[] }) {
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
              <CategoryTable categories={categories} />
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
