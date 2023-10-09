import { fetchApi } from '@/utils/fetch/client';

export default async function fetchSessionWorkout(): Promise<WorkoutResponse> {
  const response = await fetchApi('/workouts', { credentials: 'include' });

  if (!response.ok) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
