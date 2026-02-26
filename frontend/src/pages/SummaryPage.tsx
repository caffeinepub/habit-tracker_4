import { WeeklySummary } from '../components/WeeklySummary';

export function SummaryPage() {
  return (
    <div className="px-4 pt-4 pb-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Weekly Summary</h2>
        <p className="text-sm text-muted-foreground">
          Your progress over the past 7 days.
        </p>
      </div>
      <WeeklySummary />
    </div>
  );
}
