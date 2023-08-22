import { fetchApi } from '@/utils/fetch/server';

export default async function fetchGroups(): Promise<GroupResponse | undefined> {
  const response = await fetchApi('/groups/all', { cache: 'no-store' });

  if (!response.ok) return undefined;

  return response.json();
}
