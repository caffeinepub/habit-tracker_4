import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { HabitView } from '../backend';
import { useEffect, useRef } from 'react';

export function useGetHabits() {
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity && !isInitializing;

  return useQuery<HabitView[]>({
    queryKey: ['habits'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabits();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    retry: 1,
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

export function useDeleteHabit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habitId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteHabit(habitId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}

/**
 * Ensures the "Stretch & Move" default habit exists for the current user.
 * When the habits list is loaded and empty, this hook automatically seeds
 * the default habit via an update call (which can persist state on ICP,
 * unlike query calls).
 */
export function useEnsureDefaultHabits() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const seededRef = useRef(false);

  const isAuthenticated = !!identity && !isInitializing;
  const habitsQuery = useGetHabits();

  useEffect(() => {
    // Only run once per session, when actor is ready and habits are loaded
    if (seededRef.current) return;
    if (!isAuthenticated) return;
    if (actorFetching || !actor) return;
    if (habitsQuery.isLoading || !habitsQuery.isFetched) return;

    const habits = habitsQuery.data ?? [];

    // Check if "Stretch & Move" already exists
    const hasStretchHabit = habits.some(
      (h) => h.name === 'Stretch & Move'
    );

    if (!hasStretchHabit) {
      seededRef.current = true;
      actor
        .addHabit('Stretch & Move', 'Take a short stretch or movement break')
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['habits'] });
        })
        .catch(() => {
          // Reset so it can retry on next render if it failed
          seededRef.current = false;
        });
    } else {
      // Already exists, mark as done
      seededRef.current = true;
    }
  }, [actor, actorFetching, isAuthenticated, habitsQuery.data, habitsQuery.isLoading, habitsQuery.isFetched, queryClient]);
}
