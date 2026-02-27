# Specification

## Summary
**Goal:** Fix the bug preventing habits from loading on the HabitsPage in the latest build.

**Planned changes:**
- Investigate and fix the data-fetching logic in `useQueries.ts` or `HabitList.tsx` that causes habits not to appear
- Ensure the `useHabits` query (or equivalent) correctly initializes and resolves with habit data from the backend
- Verify that `HabitList` renders `HabitCard` entries for all returned habits without showing an indefinite loading or empty state

**User-visible outcome:** Logged-in users can navigate to the Habits page and see their habits listed correctly without errors or infinite loading.
