import { fetchApi } from '@/utils/fetch/server';

export default async function fetchCategories(): Promise<CategoryResponse | undefined> {
  const response = await fetchApi('/categories', { cache: 'no-store' });

  if (!response.ok) return undefined;

  return response.json();
}
