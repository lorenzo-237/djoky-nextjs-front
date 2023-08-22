import HTTP_CODE from '@/constants/http-code';
import { fetchPostApi } from '@/utils/fetch/client';

export async function createNewGroup(name: string, categoryId: number): Promise<Group> {
  const response = await fetchPostApi('/groups', { name, categoryId });

  if (response.status != HTTP_CODE.CREATED) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Group = await response.json();

  return data;
}
