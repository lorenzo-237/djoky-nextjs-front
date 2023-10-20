import {
  Box,
  BoxProps,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
} from '@chakra-ui/react';

export const steps = [
  { title: 'Sélection', description: 'Exercices' },
  { title: 'Création', description: 'Workout' },
  { title: 'Récapitulatif', description: 'Test' },
];

interface SteppeurProps extends BoxProps {
  // Vous pouvez ajouter des props spécifiques à votre composant ici
  // Par exemple, une prop "customProp" de type string
  activeStep: number;
}

function Steppeur({ activeStep, ...rest }: SteppeurProps) {
  const activeStepText = steps[activeStep].description;

  return (
    <Stack {...rest}>
      <Stepper index={activeStep} colorScheme='purple'>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>

            <Box flexShrink='0' display={{ base: 'none', md: 'block' }}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Text color='purple.600'>
        Étape {activeStep + 1}: <b>{activeStepText}</b>
      </Text>
    </Stack>
  );
}

export default Steppeur;
