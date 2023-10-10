import { KawaiiWorkoutPage } from '@/components/workout';

export default function WorkoutDetails({ params }: { params: { id: string } }) {
  return <KawaiiWorkoutPage id={parseInt(params.id)} />;
}
