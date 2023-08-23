import HTTP_CODE from '@/constants/http-code';
import { fetchPatchApi } from '@/utils/fetch/client';
import { Dto } from './exercises.dto';

export async function updateExercise(id: number, dto: Dto): Promise<Exercise> {
  const response = await fetchPatchApi(`/exercises/${id}`, dto);

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Exercise = await response.json();

  return data;
}
