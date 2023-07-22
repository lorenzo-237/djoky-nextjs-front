import { fetchApi } from '@/utils/fetch/server';

export default async function getAllCategories() {
  const response = await fetchApi('/categories', { cache: 'no-store' });

  if (!response.ok) return undefined;

  return response.json();
}
