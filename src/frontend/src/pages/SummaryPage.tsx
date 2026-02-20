import { WeeklySummary } from '../components/WeeklySummary';

export function SummaryPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Weekly Summary</h2>
        <p className="text-muted-foreground">
          Your progress over the past 7 days. Keep up the great work!
        </p>
      </div>

      <WeeklySummary />
    </div>
  );
}
