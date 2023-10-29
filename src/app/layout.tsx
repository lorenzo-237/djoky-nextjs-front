import '../styles/form.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { Sidebar } from '@/components/sidebar';
import { getSession } from '@/utils/fetch/server';
import fetchCategories from '@/db/categories/fetch-categories';
import fetchGroups from '@/db/groups/fetch-groups';
import fetchExercises from '@/db/exercises/server/fetch-exercises';
import { HomeComponent } from '@/components/Home';

export const metadata: Metadata = {
  title: 'Djoky',
  description: 'Sport',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  console.log('server layout');
  const categoryRes = !session ? null : await fetchCategories();
  const groupRes = !session ? null : await fetchGroups();
  const exerciseRes = !session ? null : await fetchExercises();

  return (
    <html lang='fr'>
      <body>
        <Providers session={session} data={{ category: categoryRes, group: groupRes, exercise: exerciseRes }}>
          {session ? <Sidebar>{children}</Sidebar> : <HomeComponent />}
        </Providers>
      </body>
    </html>
  );
}
