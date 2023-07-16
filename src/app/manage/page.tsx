import getAllCategories from '@/db/getAllCategories';
import ManageTabs from './components/ManageTabs';

export default async function Manage() {
  const categories = await getAllCategories();

  return <ManageTabs categories={categories} />;
}
