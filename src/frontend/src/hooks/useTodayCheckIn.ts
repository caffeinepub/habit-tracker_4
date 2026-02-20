import type { Time } from '../backend';

export function useTodayCheckIn(checkIns: Time[]): boolean {
  if (!checkIns || checkIns.length === 0) return false;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const todayEnd = todayStart + 24 * 60 * 60 * 1000;

  // Convert nanoseconds to milliseconds
  const lastCheckIn = Number(checkIns[checkIns.length - 1]) / 1_000_000;

  return lastCheckIn >= todayStart && lastCheckIn < todayEnd;
}
