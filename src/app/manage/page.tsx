import ManageTabs from '@/components/ManageTabs';
import fetchCategories from '@/db/fetch-categories';

export default async function Manage() {
  const categoryRes = await fetchCategories();

  if (!categoryRes) {
    return <p>Nope</p>;
  }

  return <ManageTabs categoryResponse={categoryRes} />;
}
