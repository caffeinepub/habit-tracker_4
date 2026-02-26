# Specification

## Summary
**Goal:** Allow users to delete habits by swiping left on mobile or click-dragging left on desktop.

**Planned changes:**
- Add a `deleteHabit(habitId)` backend function that removes the habit and its associated check-ins, restricted to the authenticated owner.
- Add a `useDeleteHabit` mutation hook that calls the backend delete function and invalidates the habits query on success.
- Update HabitCard to support swipe-left (touch) and drag-left (pointer) gestures using native events — dragging past a threshold reveals a red delete button; releasing before the threshold snaps the card back.
- Wire the delete gesture to call `useDeleteHabit` and remove the card from the list in both HabitsPage and HabitList.

**User-visible outcome:** Users can swipe left on a habit card (mobile) or click-drag left (desktop) to reveal a red delete button and remove the habit from their list.
