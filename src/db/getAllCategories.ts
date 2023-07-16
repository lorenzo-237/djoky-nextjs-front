import fetchApi from '@/utils/fetchApi';

export default async function getAllCategories() {
  const response = await fetchApi('/categories', { cache: 'no-store' });

  if (!response.ok) return undefined;

  return response.json();
}
