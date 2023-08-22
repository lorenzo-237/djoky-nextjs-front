import ManageTabs from '@/components/ManageTabs';
import fetchCategories from '@/db/categories/fetch-categories';
import fetchGroups from '@/db/group/fetch-groups';
// si je fais ça
// import { fetchCategories } from '@/db/categories';
// next considère qu'il s'agit un component côté client et crash :/

export default async function Manage() {
  const categoryRes = await fetchCategories();
  const groupRes = await fetchGroups();

  if (!categoryRes || !groupRes) {
    return <p>Nope</p>;
  }

  return <ManageTabs categoryResponse={categoryRes} groupResponse={groupRes} />;
}
