import HTTP_CODE from '@/constants/http-code';
import { fetchPostApi } from '@/utils/fetch/client';
import { Dto } from './exercises.dto';

export async function createNewExercise(dto: Dto): Promise<Exercise> {
  const response = await fetchPostApi('/exercises', dto);

  if (response.status != HTTP_CODE.CREATED) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Exercise = await response.json();

  return data;
}
