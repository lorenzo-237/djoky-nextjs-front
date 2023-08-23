import { fetchApi } from '@/utils/fetch/server';

export default async function fetchSessionWorkout(): Promise<WorkoutResponse | undefined> {
  const response = await fetchApi('/workouts', { cache: 'no-store' });

  if (!response.ok) return undefined;

  return response.json();
}
