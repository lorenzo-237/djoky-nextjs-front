import HTTP_CODE from '@/constants/http-code';
import { fetchPatchApi } from '@/utils/fetch/client';

export async function validateGroup(id: number): Promise<Group> {
  const response = await fetchPatchApi(`/groups/${id}/validate`);

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Group = await response.json();

  return data;
}

export async function pendingGroup(id: number): Promise<Group> {
  const response = await fetchPatchApi(`/groups/${id}/pending`);

  if (response.status != HTTP_CODE.OK) {
    const error: ErrorApiMessage = await response.json();
    throw new Error(error.message);
  }

  const data: Group = await response.json();

  return data;
}
