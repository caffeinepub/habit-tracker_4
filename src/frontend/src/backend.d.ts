import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HabitView {
    id: bigint;
    name: string;
    createdAt: Time;
    description: string;
    checkIns: Array<Time>;
}
export type Time = bigint;
export interface backendInterface {
    addHabit(name: string, description: string): Promise<bigint>;
    checkIn(habitId: bigint): Promise<void>;
    getHabit(id: bigint): Promise<HabitView>;
    getHabits(): Promise<Array<HabitView>>;
    getHabitsByCheckIns(): Promise<Array<HabitView>>;
}
