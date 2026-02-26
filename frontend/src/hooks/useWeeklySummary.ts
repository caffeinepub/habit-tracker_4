import type { HabitView, Time } from '../backend';

interface WeeklySummaryData {
  totalCheckIns: number;
  completionRate: number;
  possibleCheckIns: number;
  habitBreakdown: Array<{
    habitId: bigint;
    habitName: string;
    count: number;
  }>;
}

export function useWeeklySummary(habits: HabitView[]): WeeklySummaryData {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const sevenDaysAgoMs = sevenDaysAgo.getTime();

  let totalCheckIns = 0;
  const habitBreakdown: Array<{
    habitId: bigint;
    habitName: string;
    count: number;
  }> = [];

  habits.forEach((habit) => {
    const weekCheckIns = habit.checkIns.filter((time: Time) => {
      const ms = Number(time) / 1_000_000;
      return ms >= sevenDaysAgoMs;
    });

    // Count unique days
    const uniqueDays = new Set(
      weekCheckIns.map((time: Time) => {
        const ms = Number(time) / 1_000_000;
        const date = new Date(ms);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      })
    );

    const count = uniqueDays.size;
    totalCheckIns += count;

    habitBreakdown.push({
      habitId: habit.id,
      habitName: habit.name,
      count,
    });
  });

  const possibleCheckIns = habits.length * 7;
  const completionRate = possibleCheckIns > 0 ? Math.round((totalCheckIns / possibleCheckIns) * 100) : 0;

  return {
    totalCheckIns,
    completionRate,
    possibleCheckIns,
    habitBreakdown,
  };
}
