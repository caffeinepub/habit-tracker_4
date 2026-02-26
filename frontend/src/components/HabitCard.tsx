import { useDateCheckIn } from '../hooks/useDateCheckIn';
import { CheckInButton } from './CheckInButton';
import type { HabitView } from '../backend';

interface HabitCardProps {
  habit: HabitView;
  index: number;
  selectedDate: Date;
  isToday: boolean;
}

const HABIT_ICONS = ['🏃', '💧', '📚', '🧘', '🥗', '😴', '🏋️', '✍️', '🎯', '🌿'];

const PASTEL_CLASSES = [
  'pastel-green',
  'pastel-blue',
  'pastel-pink',
  'pastel-peach',
  'pastel-purple',
  'pastel-teal',
];

export function HabitCard({ habit, index, selectedDate, isToday }: HabitCardProps) {
  const isCheckedIn = useDateCheckIn(habit.checkIns, selectedDate);
  const icon = HABIT_ICONS[Number(habit.id) % HABIT_ICONS.length];
  const pastelClass = PASTEL_CLASSES[index % PASTEL_CLASSES.length];
  const checkInCount = habit.checkIns.length;

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-2xl min-h-[64px]
        ${pastelClass}
        ${isCheckedIn ? 'opacity-80' : ''}
        transition-opacity duration-200
      `}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/50 flex-shrink-0 text-xl">
        {icon}
      </div>

      {/* Name + count */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-base leading-tight truncate text-foreground ${isCheckedIn ? 'line-through opacity-60' : ''}`}>
          {habit.name}
        </p>
        {habit.description ? (
          <p className="text-xs text-foreground/60 truncate mt-0.5">{habit.description}</p>
        ) : (
          <p className="text-xs text-foreground/50 mt-0.5">
            {checkInCount} check-in{checkInCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Check-in button */}
      <CheckInButton
        habitId={habit.id}
        isCheckedIn={isCheckedIn}
        isToday={isToday}
      />
    </div>
  );
}
