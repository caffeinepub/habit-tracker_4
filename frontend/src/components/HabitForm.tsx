import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddHabit } from '../hooks/useQueries';

interface HabitFormProps {
  onSuccess?: () => void;
}

export function HabitForm({ onSuccess }: HabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const addHabitMutation = useAddHabit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addHabitMutation.mutateAsync({
      name: name.trim(),
      description: description.trim(),
    });

    setName('');
    setDescription('');
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="habit-name" className="font-medium text-sm">
          Habit Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="habit-name"
          placeholder="e.g., Morning meditation, Read 30 min"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={addHabitMutation.isPending}
          className="h-12 rounded-xl text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="habit-desc" className="font-medium text-sm">
          Description <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="habit-desc"
          placeholder="Why is this habit important to you?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={addHabitMutation.isPending}
          className="h-12 rounded-xl text-base"
        />
      </div>
      <Button
        type="submit"
        disabled={!name.trim() || addHabitMutation.isPending}
        className="w-full h-12 rounded-xl font-semibold text-base mt-2"
      >
        {addHabitMutation.isPending ? (
          <>
            <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Adding…
          </>
        ) : (
          <>
            <Plus className="w-5 h-5 mr-2" />
            Add Habit
          </>
        )}
      </Button>
    </form>
  );
}
