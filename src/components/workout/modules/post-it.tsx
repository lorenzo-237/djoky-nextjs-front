import { formatDateToCustomFormat } from '@/utils/functions/convert';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const postItColors = ['blue.100', 'green.100', 'red.100', 'purple.100'];

const giveMeColor = (index: number) => {
  const colorIndex = index % postItColors.length;
  return postItColors[colorIndex];
};

export default function PostIt({ exercise, index }: { exercise: WorkoutExercise; index: number }) {
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
