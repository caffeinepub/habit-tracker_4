# Specification

## Summary
**Goal:** Pre-populate the Habit Tracker with placeholder habits so new users see example content immediately upon opening the app.

**Planned changes:**
- Seed the backend with at least 5 placeholder habits (e.g., "Morning Walk", "Drink 1L of Water", "Read for 20 Minutes", "Meditate", "No Junk Food") during canister initialization, only if no habits exist yet.
- Update the HabitList empty-state UI to ensure it only appears when there are truly no habits.

**User-visible outcome:** New users immediately see a set of example habits when they open the app, giving a clear demonstration of how the tracker works. The empty state is still shown correctly if all habits are deleted.
