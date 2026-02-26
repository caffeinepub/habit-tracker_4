import { Check, Circle } from 'lucide-react';
import { useCheckIn } from '../hooks/useQueries';

interface CheckInButtonProps {
  habitId: bigint;
  isCheckedIn: boolean;
  isToday: boolean;
}

export function CheckInButton({ habitId, isCheckedIn, isToday }: CheckInButtonProps) {
  const checkInMutation = useCheckIn();

  const handleCheckIn = async () => {
    if (isCheckedIn || !isToday) return;
    await checkInMutation.mutateAsync(habitId);
  };

  if (isCheckedIn) {
    return (
      <div className="flex items-center justify-center w-11 h-11 rounded-full bg-success/15 flex-shrink-0">
        <img
          src="/assets/generated/checkmark-complete.dim_64x64.png"
          alt="Done"
          className="w-6 h-6"
        />
      </div>
    );
  }

  if (!isToday) {
    return (
      <div className="flex items-center justify-center w-11 h-11 rounded-full bg-muted flex-shrink-0">
        <Circle className="w-5 h-5 text-muted-foreground" />
      </div>
    );
  }

  return (
    <button
      onClick={handleCheckIn}
      disabled={checkInMutation.isPending}
      aria-label="Check in"
      className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-border bg-card hover:border-primary hover:bg-primary/5 active:scale-95 transition-all duration-150 flex-shrink-0 disabled:opacity-60"
    >
      {checkInMutation.isPending ? (
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      ) : (
        <Check className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
}
