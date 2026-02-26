import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { HabitView } from '../backend';

export function useGetHabits() {
  const { actor, isFetching } = useActor();

  return useQuery<HabitView[]>({
    queryKey: ['habits'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabits();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddHabit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addHabit(name, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}

export function useCheckIn() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habitId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.checkIn(habitId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}

const PLACEHOLDER_HABITS = [
  { name: 'Morning Walk', description: 'Start your day with a 30-minute walk outside' },
  { name: 'Drink 1L of Water', description: 'Stay hydrated — aim for at least 1 litre by noon' },
  { name: 'Read for 20 Minutes', description: 'Wind down with a book or article before bed' },
  { name: 'Meditate', description: '5-minute breathing exercise to clear your mind' },
  { name: 'No Junk Food', description: 'Avoid processed snacks and sugary drinks today' },
  { name: 'Stretch & Move', description: 'Do a quick 10-minute stretch or yoga session' },
];

export function useSeedPlaceholderHabits() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      for (const habit of PLACEHOLDER_HABITS) {
        await actor.addHabit(habit.name, habit.description);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}
