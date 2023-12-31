'use client';

import React, { useEffect, useState } from 'react';
import { KawaiiResults, SliderPageSize } from './modules';
import {
  FormControl,
  Input,
  FormLabel,
  Stack,
  Card,
  CardBody,
  Button,
  VStack,
  IconButton,
  Text,
  Tooltip,
  Fade,
  Image,
  Center,
  Skeleton,
  Collapse,
  CardHeader,
  useToast,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, Search2Icon } from '@chakra-ui/icons';
import fetchSessionWorkout from '@/db/workouts/client/fetch-session-workout';
import { DateRangeType, PageFilterType } from './types';
import { getDateRange, getPageSize, getFilter, saveFilter } from './utils';
import { WORKOUT_LOCAL_KEY } from '@/constants';

function WorkoutList() {
  const toast = useToast();
  const [data, setData] = useState<WorkoutResponse>({
    page: 0,
    pageSize: 0,
    totalPage: 0,
    count: 0,
    rows: [],
  });
  const [filterOpen, setFilterOpen] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<DateRangeType>(getDateRange());
  const [pageSize, setPageSize] = useState<number>(getPageSize());

  const [filter, setFilter] = useState<PageFilterType>(getFilter());
  const [loading, setLoading] = useState<boolean>(false);

  // handle form dates changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: value,
    }));
  };

  const fetchWorkouts = async (page: number, pageSize: number, startDate: string, endDate: string) => {
    setLoading(true);

    // Utilisez setTimeout pour simuler un chargement
    setTimeout(async () => {
      try {
        const fetchedData = await fetchSessionWorkout({
          startDate,
          endDate,
          page,
          pageSize,
        });
        if (fetchedData.count > 0) {
          setFilterOpen(false);
        }

        setData(fetchedData);
      } catch (error: any) {
        toast({
          title: 'Erreur lors de la récupération des données',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      setLoading(false);
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const newStartDate = dateRange.min;
    const newEndDate = dateRange.max;
    const newPageSize = pageSize;

    const data = {
      page: 1,
      pageSize: newPageSize,
      startDate: newStartDate,
      endDate: newEndDate,
    };

    setFilter(data);
    saveFilter(data);
    fetchWorkouts(1, newPageSize, newStartDate, newEndDate);
  };

  const handlePageChange = (newPage: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, page: newPage }));

    const { startDate, endDate, pageSize } = filter;

    fetchWorkouts(newPage, pageSize, startDate, endDate);
  };

  useEffect(() => {
    if (localStorage.getItem(WORKOUT_LOCAL_KEY) != null) {
      fetchWorkouts(1, filter.pageSize, filter.startDate, filter.endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack spacing={4} align='stretch'>
      <Card w='full'>
        <CardHeader>
          <Button colorScheme='blue' variant='link' onClick={() => setFilterOpen((prev) => !prev)}>
            {`${filterOpen ? 'Masquer les filtres' : 'Afficher les filtres'}`}
          </Button>
        </CardHeader>
        <Collapse in={filterOpen} animateOpacity>
          <CardBody>
            <form onSubmit={handleSearch}>
              <VStack spacing={6}>
                <Stack w='full' align='end' direction={['column', 'row']}>
                  <FormControl flex={1}>
                    <FormLabel>Date Min</FormLabel>
                    <Input
                      type='date'
                      name='min'
                      colorScheme='blue'
                      value={dateRange.min}
                      onChange={handleDateChange}
                    />
                  </FormControl>
                  <FormControl flex={1}>
                    <FormLabel>Date Max</FormLabel>
                    <Input
                      type='date'
                      name='max'
                      colorScheme='blue'
                      value={dateRange.max}
                      onChange={handleDateChange}
                    />
                  </FormControl>
                </Stack>
                <FormControl w={['full', 'sm', 'md']}>
                  <FormLabel>Nombre de workouts affichés</FormLabel>
                  <SliderPageSize pageSize={pageSize} setPageSize={setPageSize} />
                </FormControl>
                <Button
                  type='submit'
                  colorScheme='blue'
                  leftIcon={<Search2Icon />}
                  title='Rechercher des workouts dans la période sélectionnée'
                >
                  Rechercher
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Collapse>
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
  handlePageChange: (newPage: number) => void;
}) {
  // https://www.iconfinder.com/Rudityas
  if (data.page === 0) {
    return (
      <VStack w='full'>
        <Center>
          <Image src='./assets/cute_choper.png' alt='Cute Choper' />
        </Center>
        <Text fontSize={['2xl', '4xl']} color='blue.700' fontWeight='bold'>
          Effectuez une recherche !
        </Text>
      </VStack>
    );
  }

  if (loading) {
    return (
      <Stack>
        <Text fontSize='lg' as='b'>
          Chargement en cours...
        </Text>
        <Skeleton height='200px' rounded='md' boxShadow='sm' />
        <Skeleton height='200px' rounded='md' boxShadow='sm' />
        <Skeleton height='200px' rounded='md' boxShadow='sm' />
      </Stack>
    );
  }

  // https://www.iconfinder.com/Rudityas
  if (data.page < 0) {
    return (
      <VStack w='full'>
        <Center>
          <Image src='./assets/cute_psykokwak.png' alt='Cute Psykokwak' />
        </Center>
        <Text fontSize={['2xl', '4xl']} color='blue.700' fontWeight='bold'>
          ¿ Pas de résultats ?
        </Text>
      </VStack>
    );
  }

  return (
    <>
      <Text fontSize='lg' as='b'>{`${data.count} résultat${data.count > 1 ? 's' : ''}`}</Text>
      <KawaiiResults workouts={data.rows} />

      <Stack justify='center' align='center' direction='row' spacing={4}>
        <Tooltip label={`Page précédente`} openDelay={500}>
          <IconButton
            isRound={true}
            variant='solid'
            aria-label='précédent'
            colorScheme='blue'
            onClick={() => handlePageChange(filter.page - 1)}
            isDisabled={loading || filter.page <= 1}
            icon={<ChevronLeftIcon />}
          />
        </Tooltip>
        <Tooltip label={`Vous êtes sur la page ${data.page}`} openDelay={500}>
          <Text textDecoration='underline' fontWeight='bold' fontSize='xl'>
            {data.page}
          </Text>
        </Tooltip>
        <Tooltip label={`Page suivante`} openDelay={500}>
          <IconButton
            isRound={true}
            variant='solid'
            aria-label='suivant'
            colorScheme='blue'
            onClick={() => handlePageChange(filter.page + 1)}
            isDisabled={loading || filter.page >= data.totalPage}
            icon={<ChevronRightIcon />}
          />
        </Tooltip>
      </Stack>

      <PageNumbers currentPage={data.page} totalPage={data.totalPage} handlePageChange={handlePageChange} />
    </>
  );
}

function PageNumbers({
  currentPage,
  totalPage,
  handlePageChange,
}: {
  currentPage: number;
  totalPage: number;
  handlePageChange: (newPage: number) => void;
}) {
  const pages: number[] = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <Stack direction='row' justify='center'>
      {pages.map((page) => {
        if (page === currentPage) {
          return (
            <Fade key={page} in={currentPage === page}>
              <Tooltip label={`Vous êtes sur la page ${page}`} openDelay={500}>
                <Button colorScheme='blue' variant={`${currentPage === page ? 'solid' : 'outline'}`}>
                  {page}
                </Button>
              </Tooltip>
            </Fade>
          );
        } else {
          return (
            <Tooltip key={page} label={`Aller sur la page ${page}`} openDelay={500}>
              <Button
                colorScheme='blue'
                variant={`${currentPage === page ? 'solid' : 'outline'}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            </Tooltip>
          );
        }
      })}
    </Stack>
  );
}

export default WorkoutList;
