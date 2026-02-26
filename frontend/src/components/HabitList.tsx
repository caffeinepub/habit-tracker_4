import { useGetHabits, useEnsureDefaultHabits } from '../hooks/useQueries';
import { HabitCard } from './HabitCard';
import { Loader2 } from 'lucide-react';

interface HabitListProps {
  selectedDate: Date;
  isToday: boolean;
}

export function HabitList({ selectedDate, isToday }: HabitListProps) {
  const { data: habits, isLoading } = useGetHabits();

  // Automatically seed "Stretch & Move" if the user has no habits yet.
  // This is needed because ICP query calls cannot persist state, so the
  // backend's seeding logic (inside getHabits query) never actually saves.
  useEnsureDefaultHabits();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!habits || habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Setting up your habits…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4">
      {habits.map((habit, index) => (
        <HabitCard
          key={habit.id.toString()}
          habit={habit}
          index={index}
          selectedDate={selectedDate}
          isToday={isToday}
        />
      ))}
    </div>
  );
}
