import { HomeComponent } from '@/components/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Djoky',
};

export default async function Home() {
  return <HomeComponent />;
}
