import { KawaiiWorkoutCard } from '@/components/workout';

export default function WorkoutDetails({ params }: { params: { id: string } }) {
  return <KawaiiWorkoutCard id={parseInt(params.id)} />;
}
