'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Flex,
  Wrap,
  WrapItem,
  CardBody,
  Card,
  CardHeader,
  VStack,
} from '@chakra-ui/react';
import { formatDateToCustomFormat } from '@/utils/functions/convert';
import fetchWorkout from '@/db/workouts/client/fetch-workout';

const postItColors = ['blue.100', 'green.100', 'red.100', 'purple.100'];

const giveMeColor = (index: number) => {
  const colorIndex = index % postItColors.length;
  return postItColors[colorIndex];
};

const KawaiiWorkoutPage = ({ id }: { id: number }) => {
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWorkout({ id });
        setWorkout(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'API:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!workout) {
    return <p>Not found workout</p>;
  }

  return (
    <Card>
      <CardHeader>
        <Heading fontSize='2xl' mb={4}>
          {workout.description}
        </Heading>
        <Stack direction={['column', 'row']}>
          <Badge colorScheme='teal' fontSize='md'>
            {formatDateToCustomFormat(workout.date)}
          </Badge>
          <Badge colorScheme='blue' fontSize='md'>
            {workout.user.firstname} {workout.user.lastname}
          </Badge>
        </Stack>
      </CardHeader>
      <CardBody>
        <VStack spacing={10} align='center'>
          <Text fontSize='xl'>
            Il y a <strong style={{ fontWeight: 'bold' }}>{workout.exercises.length}</strong> exercices
          </Text>
          <Wrap>
            {workout.exercises.map((exercise, index) => {
              return (
                <WrapItem key={exercise.id}>
                  <PostIt exercise={exercise} index={index} />
                </WrapItem>
              );
            })}
          </Wrap>
        </VStack>
      </CardBody>
    </Card>
  );
};

function PostIt({ exercise, index }: { exercise: WorkoutExercise; index: number }) {
  return (
    <Flex alignItems='center' justifyContent='center'>
      <Box bg={giveMeColor(index)} w='300px' boxShadow='md' position='relative'>
        <Scotch name={exercise.group.name} />
        <Flex color='blue.700' direction='column' alignItems='center' paddingY='2rem'>
          <Box>
            <Heading fontSize='lg' fontWeight='semibold'>
              {exercise.name}
            </Heading>
            <Text>Répétitions : {exercise.repetitions}</Text>
            <Text>Séries : {exercise.series}</Text>
            <Text>Total : {exercise.total}</Text>
            <Text>Time : {exercise.time}</Text>
            <Text>Poids : {exercise.weight}</Text>
            <Text>Date heure : {formatDateToCustomFormat(exercise.assignedAt)}</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

function Scotch({ name }: { name: string }) {
  return (
    <Box
      color='yellow.700'
      fontWeight='semibold'
      bg='yellow.200'
      paddingX='1rem'
      h='45px'
      position='absolute'
      top='-20px'
      left='25%'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      {name}
    </Box>
  );
}

export default KawaiiWorkoutPage;
