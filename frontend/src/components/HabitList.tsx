import { useEffect, useRef } from 'react';
import { useGetHabits, useSeedPlaceholderHabits } from '../hooks/useQueries';
import { HabitCard } from './HabitCard';
import { Loader2 } from 'lucide-react';

interface HabitListProps {
  selectedDate: Date;
  isToday: boolean;
}

export function HabitList({ selectedDate, isToday }: HabitListProps) {
  const { data: habits, isLoading, isFetched } = useGetHabits();
  const { mutate: seedHabits, isPending: isSeeding } = useSeedPlaceholderHabits();
  const seededRef = useRef(false);

  useEffect(() => {
    if (isFetched && habits && habits.length === 0 && !seededRef.current) {
      seededRef.current = true;
      seedHabits();
    }
  }, [isFetched, habits, seedHabits]);

  if (isLoading || isSeeding) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        {isSeeding && (
          <p className="text-sm text-muted-foreground">Setting up your habits…</p>
        )}
      </div>
    );
  }

  if (!habits || habits.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No habits yet</h3>
        <p className="text-muted-foreground text-sm">
          Tap the <span className="font-semibold text-primary">+</span> button to add your first habit!
        </p>
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
