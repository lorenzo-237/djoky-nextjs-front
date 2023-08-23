import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  StackDivider,
  Box,
  Heading,
  HStack,
  Tag,
} from '@chakra-ui/react';
import { formatDateToCustomFormat } from '@/utils/functions/convert';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const groups = Array.from(new Set(workout.exercises.map((exercise) => exercise.group.name)));

  return (
    <Card>
      <CardHeader bgColor='teal.300'>
        <Heading size='md'>{formatDateToCustomFormat(workout.date)}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={2}>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Nombre d&lsquo;exercice{workout.exercises.length === 1 ? '' : 's'}
            </Heading>
            <Text pt='2' fontSize='sm'>
              {workout.exercises.length}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Description
            </Heading>
            <Text pt='2' fontSize='sm'>
              {workout.description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <HStack spacing={4}>
          {groups.map((group) => (
            <Tag size='md' key={group} variant='solid' colorScheme='teal' borderRadius='full'>
              {group}
            </Tag>
          ))}
        </HStack>
      </CardFooter>
    </Card>
  );
}
