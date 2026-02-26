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
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addHabit(name: string, description: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkIn(habitId: bigint): Promise<void>;
    deleteHabit(habitId: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDummyHabits(): Promise<Array<[string, string]>>;
    getHabit(id: bigint): Promise<HabitView>;
    getHabits(): Promise<Array<HabitView>>;
    getHabitsByCheckIns(): Promise<Array<HabitView>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasHabits(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
