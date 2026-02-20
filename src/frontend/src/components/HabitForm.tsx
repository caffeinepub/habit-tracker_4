import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddHabit } from '../hooks/useQueries';

export function HabitForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const addHabitMutation = useAddHabit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }

    await addHabitMutation.mutateAsync({
      name: name.trim(),
      description: description.trim(),
    });

    setName('');
    setDescription('');
  };

  return (
    <Card className="border border-border shadow-subtle">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary" />
          </div>
          Add New Habit
        </CardTitle>
        <CardDescription>Create a new habit to track daily</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">Habit Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Morning meditation, Read 30 minutes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={addHabitMutation.isPending}
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Why is this habit important to you?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={addHabitMutation.isPending}
              className="transition-all duration-200"
            />
          </div>
          <Button
            type="submit"
            disabled={!name.trim() || addHabitMutation.isPending}
            className="w-full font-medium shadow-subtle hover:shadow-elevated transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            {addHabitMutation.isPending ? 'Adding...' : 'Add Habit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
