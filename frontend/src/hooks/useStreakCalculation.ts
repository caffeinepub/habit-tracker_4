import type { Time } from '../backend';

interface StreakResult {
  currentStreak: number;
  longestStreak: number;
}

export function useStreakCalculation(checkIns: Time[]): StreakResult {
  if (!checkIns || checkIns.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Convert nanoseconds to milliseconds and create date objects
  const dates = checkIns
    .map((time) => {
      const ms = Number(time) / 1_000_000;
      const date = new Date(ms);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    })
    .sort((a, b) => a - b);

  // Remove duplicates (same day check-ins)
  const uniqueDates = Array.from(new Set(dates));

  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;

  let checkDate = todayStart;
  for (let i = uniqueDates.length - 1; i >= 0; i--) {
    if (uniqueDates[i] === checkDate || uniqueDates[i] === checkDate - oneDayMs) {
      currentStreak++;
      checkDate = uniqueDates[i] - oneDayMs;
    } else {
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    if (uniqueDates[i] - uniqueDates[i - 1] === oneDayMs) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { currentStreak, longestStreak };
}
