import HTTP_CODE from '@/constants/http-code';
import { fetchPatchApi } from '@/utils/fetch/client';

export async function updateGroup(id: number, name: string, categoryId: number): Promise<Group> {
  const response = await fetchPatchApi(`/groups/${id}`, { name, categoryId });

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Group = await response.json();

  return data;
}
