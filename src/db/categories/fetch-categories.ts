import { fetchApi } from '@/utils/fetch/server';

export default async function fetchCategories(): Promise<CategoryResponse | null> {
  const response = await fetchApi('/categories/all', { cache: 'no-store' });

  if (!response.ok) return null;

  return response.json();
}
