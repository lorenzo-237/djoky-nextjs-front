'use client';

import { Box, Text } from '@chakra-ui/react';
import { useSteps } from '@chakra-ui/react';
import { GroupsExercicesStep, Steppeur, steps } from './steps';
import { useFormMultiStepStore } from './store/multistep.store';

export default function WorkoutMultistep() {
  const { exercises } = useFormMultiStepStore();

  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Box as='form'>
      <Text>Exo : {exercises.length}</Text>
      <Steppeur activeStep={activeStep} mb='20px' />
      {activeStep === 0 && <GroupsExercicesStep />}
    </Box>
  );
}
