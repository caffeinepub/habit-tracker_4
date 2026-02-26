import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserProfile = {
    name : Text;
  };

  type Habit = {
    id : Nat;
    name : Text;
    description : Text;
    createdAt : Time.Time;
    checkIns : List.List<Time.Time>;
  };

  type HabitView = {
    id : Nat;
    name : Text;
    description : Text;
    createdAt : Time.Time;
    checkIns : [Time.Time];
  };

  module HabitView {
    public func compare(h1 : HabitView, h2 : HabitView) : Order.Order {
      Text.compare(h1.name, h2.name);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userHabits = Map.empty<Principal, Map.Map<Nat, Habit>>();
  var nextHabitId = 0;

  // --- User profile functions ---
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // --- Habit helper functions ---
  func createHabit(name : Text, description : Text) : Habit {
    {
      id = nextHabitId;
      name;
      description;
      createdAt = Time.now();
      checkIns = List.empty<Time.Time>();
    };
  };

  func toHabitView(habit : Habit) : HabitView {
    {
      habit with
      checkIns = habit.checkIns.toArray();
    };
  };

  func addDefaultHabits() {
    let defaultHabit = createHabit("Stretch & Move", "Take a short stretch or movement break");
    nextHabitId += 1;

    for (habitMap in userHabits.values()) {
      habitMap.add(defaultHabit.id, defaultHabit);
    };
  };

  func addHabitInternal(habits : Map.Map<Nat, Habit>, name : Text, description : Text) {
    let habit = createHabit(name, description);
    habits.add(habit.id, habit);
    nextHabitId += 1;
  };

  func getOrInitializeUserHabits(user : Principal) : Map.Map<Nat, Habit> {
    let habits = switch (userHabits.get(user)) {
      case (?existing) { existing };
      case (null) {
        let newHabits = Map.empty<Nat, Habit>();
        userHabits.add(user, newHabits);
        newHabits;
      };
    };

    // Always ensure "Stretch & Move" exists
    let stretchExists = habits.values().any(
      func(h) { h.name == "Stretch & Move" }
    );

    if (not stretchExists) {
      habits.add(
        nextHabitId,
        createHabit("Stretch & Move", "Take a short stretch or movement break"),
      );
      nextHabitId += 1;
    };

    habits;
  };

  // --- Public habit functions (require authenticated user) ---
  public shared ({ caller }) func addHabit(name : Text, description : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add habits");
    };
    let habits = getOrInitializeUserHabits(caller);
    let habit = createHabit(name, description);
    habits.add(habit.id, habit);
    nextHabitId += 1;
    habit.id;
  };

  public shared ({ caller }) func checkIn(habitId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check in habits");
    };
    let habits = getOrInitializeUserHabits(caller);
    switch (habits.get(habitId)) {
      case (null) { Runtime.trap("Habit not found") };
      case (?habit) {
        habit.checkIns.add(Time.now());
      };
    };
  };

  public shared ({ caller }) func deleteHabit(habitId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete habits");
    };

    switch (userHabits.get(caller)) {
      case (null) { Runtime.trap("No habits found for user") };
      case (?habits) {
        if (not habits.containsKey(habitId)) {
          Runtime.trap("Habit not found");
        };
        habits.remove(habitId);
      };
    };
  };

  public query ({ caller }) func getHabits() : async [HabitView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get habits");
    };
    let habits = getOrInitializeUserHabits(caller);
    let habitViews = habits.values().toArray().map(toHabitView);
    habitViews.sort();
  };

  public query ({ caller }) func getHabitsByCheckIns() : async [HabitView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get habits");
    };
    let habits = getOrInitializeUserHabits(caller);
    let habitViews = habits.values().toArray().map(toHabitView);
    let sortedHabitViews = habitViews.sort(
      func(h1, h2) {
        switch (Int.compare(h1.checkIns.size().toInt(), h2.checkIns.size().toInt())) {
          case (#equal) { Int.compare(h1.createdAt, h2.createdAt) };
          case (order) { order };
        };
      }
    );
    sortedHabitViews;
  };

  public query ({ caller }) func getHabit(id : Nat) : async HabitView {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get a habit");
    };
    let habits = getOrInitializeUserHabits(caller);
    switch (habits.get(id)) {
      case (null) { Runtime.trap("Habit does not exist") };
      case (?habit) { toHabitView(habit) };
    };
  };

  public query ({ caller }) func hasHabits() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check habits");
    };
    switch (userHabits.get(caller)) {
      case (null) { false };
      case (?habits) { not habits.isEmpty() };
    };
  };

  public query func getDummyHabits() : async [(Text, Text)] {
    [
      ("Morning Walk", "Start your day with a 30-minute walk"),
      ("Drink 1L of Water", "Stay hydrated throughout the day"),
      ("Read for 20 Minutes", "Read a book or article before bed"),
      ("Meditate", "5-minute breathing exercise"),
      ("No Junk Food", "Avoid processed snacks and sugary drinks"),
      ("Stretch & Move", "Take a short stretch or movement break"),
    ];
  };

  // Call initialization at actor startup
};
