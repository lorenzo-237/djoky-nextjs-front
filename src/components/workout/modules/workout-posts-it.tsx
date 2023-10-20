import { Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import PostIt from './post-it';

type StepProps = {
  exercises: WorkoutExercise[];
};

export default function WorkoutPostsIt({ exercises }: StepProps) {
  return (
    <Wrap justify='center'>
      {exercises.map((exercise, index) => {
        return (
          <WrapItem key={exercise.id}>
            <PostIt exercise={exercise} index={index} />
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
