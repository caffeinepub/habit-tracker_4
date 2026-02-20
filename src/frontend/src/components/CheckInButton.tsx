import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCheckIn } from '../hooks/useQueries';

interface CheckInButtonProps {
  habitId: bigint;
  isCheckedIn: boolean;
}

export function CheckInButton({ habitId, isCheckedIn }: CheckInButtonProps) {
  const checkInMutation = useCheckIn();

  const handleCheckIn = async () => {
    if (isCheckedIn) return;
    await checkInMutation.mutateAsync(habitId);
  };

  if (isCheckedIn) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 border border-success/20 animate-fade-in">
        <img
          src="/assets/generated/checkmark-complete.dim_64x64.png"
          alt="Completed"
          className="w-5 h-5"
        />
        <span className="text-sm font-medium text-success">Done</span>
      </div>
    );
  }

  return (
    <Button
      onClick={handleCheckIn}
      disabled={checkInMutation.isPending}
      size="sm"
      variant="outline"
      className="font-medium transition-all duration-200 hover:bg-accent/10 hover:border-accent"
    >
      {checkInMutation.isPending ? (
        <>
          <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Checking...
        </>
      ) : (
        <>
          <Check className="w-4 h-4 mr-2" />
          Check In
        </>
      )}
    </Button>
  );
}
