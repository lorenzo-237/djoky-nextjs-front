import { fetchApi } from '@/utils/fetch/client';

export type FilterType = {
  startDate: string;
  endDate: string;
  page: number;
  pageSize: number;
};

export default async function fetchSessionWorkout({
  startDate,
  endDate,
  page,
  pageSize,
}: FilterType): Promise<WorkoutResponse> {
  const response = await fetchApi(
    `/workouts?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}`,
    { credentials: 'include' }
  );

  if (!response.ok) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
