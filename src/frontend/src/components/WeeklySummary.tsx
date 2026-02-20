import { useGetHabits } from '../hooks/useQueries';
import { useWeeklySummary } from '../hooks/useWeeklySummary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, TrendingUp, CheckCircle2, Target } from 'lucide-react';

export function WeeklySummary() {
  const { data: habits, isLoading } = useGetHabits();
  const summary = useWeeklySummary(habits || []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!habits || habits.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
          <span className="text-3xl">📊</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No data yet</h3>
        <p className="text-muted-foreground">
          Add some habits and start checking in to see your weekly summary!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-border shadow-subtle">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              Total Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-success mb-1">
              {summary.totalCheckIns}
            </div>
            <p className="text-xs text-muted-foreground">Past 7 days</p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-subtle">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-primary mb-1">
              {summary.completionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.totalCheckIns} of {summary.possibleCheckIns} possible
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-subtle">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              Active Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-accent mb-1">
              {habits.length}
            </div>
            <p className="text-xs text-muted-foreground">Being tracked</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-Habit Breakdown */}
      <Card className="border border-border shadow-subtle">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Habit Breakdown</CardTitle>
          <CardDescription>Individual completion rates for the past week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {summary.habitBreakdown.map((item) => {
            const percentage = Math.round((item.count / 7) * 100);
            return (
              <div key={item.habitId.toString()} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.habitName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.count} of 7 days completed
                    </p>
                  </div>
                  <div className="text-2xl font-semibold text-primary ml-4">
                    {percentage}%
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
