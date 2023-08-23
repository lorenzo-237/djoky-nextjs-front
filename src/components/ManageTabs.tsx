'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Stack } from '@chakra-ui/react';
import { CategoryForm, CategoryTable } from './category';
import { GroupForm, GroupTable } from './group';
import { ExerciseForm, ExerciseTable } from './exercise';

export interface ManageProps {}
export default function ManageTabs() {
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
            <Stack spacing={4}>
              <ExerciseForm />
              <ExerciseTable />
            </Stack>
          </TabPanel>
          <TabPanel>
            <p>Utilisateurs</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
