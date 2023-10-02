'use client';

import { RootState } from '@/app/store';
import { initData } from '@/reducers/workout.slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KawaiiResults } from './modules';
import { FormControl, Input, FormLabel, Stack, Card, CardBody, Button, VStack } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

export type WorkoutListProps = {
  workoutRes: WorkoutResponse;
};

export type DateRangeType = {
  min: string;
  max: string;
};

function WorkoutList({ workoutRes }: WorkoutListProps) {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.workout.data);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    min: '',
    max: '',
  });

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Formatage des dates au format "YYYY-MM-DD" pour les champs de date
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setDateRange({
      min: formatDate(sevenDaysAgo),
      max: formatDate(today),
    });
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(dateRange);
  };

  useEffect(() => {
    if (workoutRes) {
      console.log('\x1b[36m%s\x1b[0m', 'DISPATCH FETCH WORKOUTS');
      dispatch(initData(workoutRes));
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'NO WORKOUTS TO DISPATCH');
    }
  }, [workoutRes, dispatch]);

  return (
    <VStack spacing={4} align='stretch'>
      <Card w='full'>
        <CardBody>
          <form onSubmit={handleSearch}>
            <Stack align='end' direction={['column', 'row']}>
              <FormControl flex={1}>
                <FormLabel>Date Min</FormLabel>
                <Input
                  type='date'
                  name='min'
                  focusBorderColor='teal'
                  value={dateRange.min}
                  onChange={handleDateChange}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel>Date Max</FormLabel>
                <Input
                  type='date'
                  name='max'
                  focusBorderColor='teal'
                  value={dateRange.max}
                  onChange={handleDateChange}
                />
              </FormControl>
              <Button
                type='submit'
                colorScheme='blue'
                leftIcon={<Search2Icon />}
                title='Rechercher des workouts dans la période sélectionnée'
              >
                Rechercher
              </Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
      <KawaiiResults data={data} />
    </VStack>
  );
}

export default WorkoutList;
