import ManageTabs from '@/components/ManageTabs';
import getAllCategories from '@/db/getAllCategories';

export default async function Manage() {
  const categories = await getAllCategories();

  if (!categories) {
    return <p>Nope</p>;
  }

  return <ManageTabs categories={categories} />;
}
