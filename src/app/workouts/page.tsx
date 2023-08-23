import { WorkoutList } from '@/components/workout';
import fetchSessionWorkout from '@/db/workouts/fetch-session-workout';
import React from 'react';

export default async function WorkoutsPage() {
  const workoutRes = await fetchSessionWorkout();

  if (!workoutRes) {
    return <p>Nope</p>;
  }

  return <WorkoutList workoutRes={workoutRes} />;
}
