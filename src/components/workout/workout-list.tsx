'use client';

import React, { useState } from 'react';
import { KawaiiResults } from './modules';
import { FormControl, Input, FormLabel, Stack, Card, CardBody, Button, VStack } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import fetchSessionWorkout from '@/db/workouts/client/fetch-session-workout';

type DateRangeType = {
  min: string;
  max: string;
};

type PageFilterType = {
  startDate: string;
  endDate: string;
  page: number;
  pageSize: number;
};

// Formatage des dates au format "YYYY-MM-DD" pour les champs de date
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DEFAULT_PAGE_SIZE = 2;

function WorkoutList() {
  const [data, setData] = useState<WorkoutResponse>({
    page: 0,
    pageSize: 0,
    totalPage: 0,
    count: 0,
    rows: [],
  });
  const [dateRange, setDateRange] = useState<DateRangeType>({
    min: formatDate(new Date(new Date().setDate(new Date().getDate() - 7))),
    max: formatDate(new Date()),
  });
  const [filter, setFilter] = useState<PageFilterType>({
    startDate: '',
    endDate: '',
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // handle form dates changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: value,
    }));
  };

  const fetchWorkouts = async (page: number, startDate: string, endDate: string) => {
    try {
      const { pageSize } = filter;
      const fetchedData = await fetchSessionWorkout({
        startDate,
        endDate,
        page,
        pageSize,
      });
      setData(fetchedData);
    } catch (error) {
      throw error;
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newStartDate = dateRange.min;
    const newEndDate = dateRange.max;

    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      startDate: newStartDate,
      endDate: newEndDate,
    }));

    try {
      await fetchWorkouts(1, newStartDate, newEndDate);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'API:", error);
    }

    setLoading(false);
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    setFilter((prevFilter) => ({ ...prevFilter, page: newPage }));

    const { startDate, endDate } = filter;

    try {
      await fetchWorkouts(newPage, startDate, endDate);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'API:", error);
    }

    setLoading(false);
  };

  return (
    <VStack spacing={4} align='stretch'>
      <Card w='full'>
        <CardBody>
          <form onSubmit={handleSearch}>
            <Stack align='end' direction={['column', 'row']}>
              <FormControl flex={1}>
                <FormLabel>Date Min</FormLabel>
                <Input type='date' name='min' colorScheme='blue' value={dateRange.min} onChange={handleDateChange} />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel>Date Max</FormLabel>
                <Input type='date' name='max' colorScheme='blue' value={dateRange.max} onChange={handleDateChange} />
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
      <WorkoutsListAndPagination loading={loading} data={data} filter={filter} handlePageChange={handlePageChange} />
    </VStack>
  );
}

function WorkoutsListAndPagination({
  loading,
  data,
  filter,
  handlePageChange,
}: {
  loading: boolean;
  data: WorkoutResponse;
  filter: PageFilterType;
  handlePageChange: any;
}) {
  if (data.page === 0) {
    return <p>Please make a search...</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.page < 0) {
    return <p>Pas de résultats...</p>;
  }

  return (
    <>
      <p>Il y a {data.totalPage} page(s)</p>
      <p>Vous êtes sur la page numéro {data.page}</p>
      <p>Il y a {data.count} workout(s) en tout</p>
      <KawaiiResults workouts={data.rows} />

      <Button
        colorScheme='blue'
        onClick={() => handlePageChange(filter.page - 1)}
        isDisabled={loading || filter.page <= 1}
      >
        Page précédente
      </Button>

      <Button
        colorScheme='blue'
        onClick={() => handlePageChange(filter.page + 1)}
        isDisabled={loading || filter.page >= data.totalPage}
      >
        Page suivante
      </Button>
    </>
  );
}

export default WorkoutList;
