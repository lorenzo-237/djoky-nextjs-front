import HTTP_CODE from '@/constants/http-code';
import { fetchPatchApi } from '@/utils/fetch/client';

export async function updateCategory(id: number, name: string): Promise<Category> {
  const response = await fetchPatchApi(`/categories/${id}`, { name });

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Category = await response.json();

  return data;
}
