import { useStreakCalculation } from '../hooks/useStreakCalculation';
import type { Time } from '../backend';

interface StreakDisplayProps {
  checkIns: Time[];
}

export function StreakDisplay({ checkIns }: StreakDisplayProps) {
  const { currentStreak, longestStreak } = useStreakCalculation(checkIns);

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <img
          src="/assets/generated/badge-streak.dim_128x128.png"
          alt="Streak"
          className="w-8 h-8"
        />
        <div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
            {currentStreak}
          </div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
        </div>
      </div>
      <div className="h-12 w-px bg-border" />
      <div>
        <div className="text-2xl font-bold text-muted-foreground">{longestStreak}</div>
        <div className="text-xs text-muted-foreground">Best Streak</div>
      </div>
    </div>
  );
}
