'use client';

import React, { useEffect, useState } from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Heading,
  Text,
  Stack,
  Badge,
  CardBody,
  Card,
  CardHeader,
  VStack,
  Tooltip,
  Tabs,
  Wrap,
} from '@chakra-ui/react';
import { formatDateToCustomFormat } from '@/utils/functions/convert';
import fetchWorkout from '@/db/workouts/client/fetch-workout';
import { PageNotFound } from '../pages';
import WorkoutPostsIt from './modules/workout-posts-it';
import WorkoutMultistep from './modules/workout-multistep';
import { FormMultiStepProvider } from './modules/contexts/form-multistep.context';

const KawaiiWorkoutPage = ({ id }: { id: number }) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWorkout({ id });
        setWorkout(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'API:", error);
      }
    };

    fetchData().then(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!workout) {
    return <PageNotFound />;
  }

  return (
    <Card>
      <CardHeader>
        <Heading fontSize='2xl' mb={4}>
          {workout.description}
        </Heading>

        <Stack direction={['column', 'row']} mb={2}>
          <Badge colorScheme='teal' fontSize='md'>
            {formatDateToCustomFormat(workout.date)}
          </Badge>
          <Badge colorScheme='blue' fontSize='md'>
            {workout.user.firstname} {workout.user.lastname}
          </Badge>
        </Stack>
        <Text fontSize='lg' as='b'>
          {workout.exercises.length} Exercices
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={10}>
          <Tabs variant='soft-rounded' colorScheme='blue' w='full' defaultIndex={1}>
            <TabList mb={5}>
              <Tooltip label='Consulter les exercices' openDelay={500}>
                <Tab>CONSULTER</Tab>
              </Tooltip>
              <Tooltip label='Ajouter des exercices' openDelay={500}>
                <Tab>AJOUTER</Tab>
              </Tooltip>
            </TabList>
            <TabPanels>
              <TabPanel>
                <WorkoutPostsIt exercises={workout.exercises} />
              </TabPanel>
              <TabPanel>
                <FormMultiStepProvider>
                  <WorkoutMultistep />
                </FormMultiStepProvider>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default KawaiiWorkoutPage;
