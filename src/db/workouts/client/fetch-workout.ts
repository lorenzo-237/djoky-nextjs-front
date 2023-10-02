import { fetchApi } from '@/utils/fetch/client';

export default async function fetchWorkout({ id }: { id: number }): Promise<Workout> {
  const response = await fetchApi(`/workouts/${id}`, { credentials: 'include' });

  if (!response.ok) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
