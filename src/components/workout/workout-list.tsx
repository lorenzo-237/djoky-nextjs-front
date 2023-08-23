'use client';

import { RootState } from '@/app/store';
import { initData } from '@/reducers/workout.slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WorkoutCard } from './modules';
import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react';

export type WorkoutListProps = {
  workoutRes: WorkoutResponse;
};

function WorkoutList({ workoutRes }: WorkoutListProps) {
  const dispatch = useDispatch();
  const { count, rows } = useSelector((state: RootState) => state.workout.data);

  useEffect(() => {
    if (workoutRes) {
      console.log('\x1b[36m%s\x1b[0m', 'DISPATCH FETCH WORKOUTS');
      dispatch(initData(workoutRes));
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'NO WORKOUTS TO DISPATCH');
    }
  }, [workoutRes, dispatch]);

  return (
    <Flex justify='center' align='flex-start' h='100vh'>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing='6'>
        {rows.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default WorkoutList;
