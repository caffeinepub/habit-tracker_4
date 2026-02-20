import { HabitForm } from '../components/HabitForm';
import { HabitList } from '../components/HabitList';

export function HabitsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2 bg-blue-100">
        <h2 className="text-3xl font-semibold tracking-tight">Your Habits</h2>
        <p className="text-muted-foreground">
          Build better habits, one day at a time. Track your progress and maintain your streaks.
        </p>
      </div>

      <HabitForm />
      <HabitList />
    </div>
  );
}
