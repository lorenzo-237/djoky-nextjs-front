import { HomeComponent } from '@/components/Home';
import { getSession } from '@/utils/fetch/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Djoky',
};

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <HomeComponent session={session} />
    </>
  );
}
