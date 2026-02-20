import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckInButton } from './CheckInButton';
import { StreakDisplay } from './StreakDisplay';
import { useTodayCheckIn } from '../hooks/useTodayCheckIn';
import type { HabitView } from '../backend';

interface HabitCardProps {
  habit: HabitView;
}

export function HabitCard({ habit }: HabitCardProps) {
  const isCheckedInToday = useTodayCheckIn(habit.checkIns);

  return (
    <Card className="hover:shadow-elevated transition-shadow duration-200 border border-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold mb-1 truncate">{habit.name}</CardTitle>
            {habit.description && (
              <CardDescription className="line-clamp-2">{habit.description}</CardDescription>
            )}
          </div>
          <CheckInButton habitId={habit.id} isCheckedIn={isCheckedInToday} />
        </div>
      </CardHeader>
      <CardContent>
        <StreakDisplay checkIns={habit.checkIns} />
      </CardContent>
    </Card>
  );
}
