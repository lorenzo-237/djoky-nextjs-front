import { fetchApi } from '@/utils/fetch/server';

export default async function fetchGroups(): Promise<GroupResponse | null> {
  const response = await fetchApi('/groups', { cache: 'no-store' });

  if (!response.ok) return null;

  return response.json();
}
