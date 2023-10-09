'use client';

import React, { useEffect, useState } from 'react';
import { KawaiiResults } from './modules';
import { FormControl, Input, FormLabel, Stack, Card, CardBody, Button, VStack } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import fetchSessionWorkout from '@/db/workouts/client/fetch-session-workout';

export type DateRangeType = {
  min: string;
  max: string;
};

// Formatage des dates au format "YYYY-MM-DD" pour les champs de date
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function WorkoutList() {
  const [data, setData] = useState<WorkoutResponse>({
    count: 0,
    rows: [],
  });
  const [dateRange, setDateRange] = useState<DateRangeType>({
    min: '',
    max: '',
  });

  useEffect(() => {
    const calculateDateRange = () => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      setDateRange({
        min: formatDate(sevenDaysAgo),
        max: formatDate(today),
      });
    };

    calculateDateRange();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: value,
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fetchedData = await fetchSessionWorkout();
      setData(fetchedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'API:", error);
    }
  };

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
