import HTTP_CODE from '@/constants/http-code';
import { fetchPatchApi } from '@/utils/fetch/client';

export async function validateCategory(id: number): Promise<Category> {
  const response = await fetchPatchApi(`/categories/${id}/validate`);

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Category = await response.json();

  return data;
}

export async function pendingCategory(id: number): Promise<Category> {
  const response = await fetchPatchApi(`/categories/${id}/pending`);

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Category = await response.json();

  return data;
}
