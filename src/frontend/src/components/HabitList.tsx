import { useGetHabits } from '../hooks/useQueries';
import { HabitCard } from './HabitCard';
import { Loader2 } from 'lucide-react';

export function HabitList() {
  const { data: habits, isLoading } = useGetHabits();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!habits || habits.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No habits yet</h3>
        <p className="text-muted-foreground">
          Add your first habit above to start tracking your progress!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {habits.map((habit) => (
        <HabitCard key={habit.id.toString()} habit={habit} />
      ))}
    </div>
  );
}
