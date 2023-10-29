import { fetchApi } from '@/utils/fetch/server';

export default async function fetchExercises(): Promise<ExerciseResponse | null> {
  const response = await fetchApi('/exercises/all', { cache: 'no-store' });

  if (!response.ok) return null;

  return response.json();
}
