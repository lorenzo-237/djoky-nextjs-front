import HTTP_CODE from '@/constants/http-code';
import { fetchPostApi } from '@/utils/fetch/client';

export async function createNewCategory(name: string): Promise<Category> {
  const response = await fetchPostApi('/categories', { name });

  if (response.status != HTTP_CODE.CREATED) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Category = await response.json();

  return data;
}
