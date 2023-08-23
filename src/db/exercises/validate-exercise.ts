import HTTP_CODE from '@/constants/http-code';
import { fetchPatchApi } from '@/utils/fetch/client';

export async function validateExercise(id: number): Promise<Exercise> {
  const response = await fetchPatchApi(`/exercises/${id}/validate`);

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Exercise = await response.json();

  return data;
}

export async function pendingExercise(id: number): Promise<Exercise> {
  const response = await fetchPatchApi(`/exercises/${id}/pending`);

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Exercise = await response.json();

  return data;
}
