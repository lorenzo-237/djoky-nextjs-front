'use client';

import React from 'react';
import {
  Card,
  Text,
  VStack,
  HStack,
  Badge,
  CardBody,
  Wrap,
  WrapItem,
  Tag,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { formatDateToCustomFormat } from '@/utils/functions/convert';
import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import Link from 'next/link';

// function randomColorScheme() {
//   const availableColorSchemes = ['teal', 'blue', 'green', 'red', 'pink', 'yellow'];
//   const randomIndex = Math.floor(Math.random() * availableColorSchemes.length);
//   return availableColorSchemes[randomIndex];
// }

export default function KawaiiResults({ workouts }: { workouts: Workout[] }) {
  const displayedGroups = new Set();

  const bgColor = useColorModeValue('white', 'gray.900');

  return (
    <VStack spacing={4} align='start'>
      {workouts.map((workouts) => (
        <Card
          key={workouts.id}
          w='full'
          borderWidth='1px'
          borderColor={bgColor}
          _hover={{
            borderColor: 'purple.400',
            boxShadow: 'lg',
          }}
        >
          <CardBody>
            <HStack>
              <Badge fontSize='lg' colorScheme='purple' variant='subtle'>
                {formatDateToCustomFormat(workouts.date)}
              </Badge>
              <Badge colorScheme='blue'>{workouts.user.firstname}</Badge>
            </HStack>
            <Text fontWeight='bold' fontSize='lg' mt={2}>
              {workouts.description || 'Aucune description disponible'}
            </Text>
            <HStack spacing={2} mt={2}>
              <Link href={`/workouts/${workouts.id}`}>
                <IconButton
                  variant='outline'
                  colorScheme='purple'
                  title='Consulter le workout'
                  aria-label='Consulter le workout'
                  size='sm'
                  icon={<ViewIcon />}
                />
              </Link>

              <IconButton
                variant='outline'
                colorScheme='green'
                title='Ajouter un exercice'
                aria-label='Ajouter un exercice'
                size='sm'
                icon={<AddIcon />}
              />
              <IconButton
                variant='outline'
                colorScheme='red'
                title='Supprimer le workout => demande de confirmation'
                aria-label='Supprimer le workout'
                size='sm'
                icon={<DeleteIcon />}
              />
            </HStack>
            <Text mt={2}>
              {workouts.exercises.length > 0
                ? `Nombre d'exercices: ${workouts.exercises.length}`
                : 'Aucun exercice trouvé'}
            </Text>
            {workouts.exercises.length > 0 ? (
              <Wrap mt={2}>
                {workouts.exercises.map((exercise) => {
                  if (displayedGroups.has(exercise.group.name)) {
                    return null;
                  }
                  displayedGroups.add(exercise.group.name);
                  return (
                    <WrapItem key={exercise.id}>
                      <Tag colorScheme='purple' variant='outline'>
                        {exercise.group.name}
                      </Tag>
                    </WrapItem>
                  );
                })}
              </Wrap>
            ) : (
              <Tag mt={2} colorScheme='purple'>
                Ajouter des exercices avec le +
              </Tag>
            )}
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
}
