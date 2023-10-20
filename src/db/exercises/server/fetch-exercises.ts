import { fetchApi } from '@/utils/fetch/server';

export default async function fetchExercises(): Promise<ExerciseResponse | undefined> {
  const response = await fetchApi('/exercises/all', { cache: 'no-store' });

  if (!response.ok) return undefined;

  return response.json();
}
