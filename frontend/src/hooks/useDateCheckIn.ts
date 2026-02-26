import type { Time } from '../backend';

export function useDateCheckIn(checkIns: Time[], targetDate: Date): boolean {
  if (!checkIns || checkIns.length === 0) return false;

  const dayStart = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  ).getTime();
  const dayEnd = dayStart + 24 * 60 * 60 * 1000;

  return checkIns.some((t) => {
    const ms = Number(t) / 1_000_000;
    return ms >= dayStart && ms < dayEnd;
  });
}
