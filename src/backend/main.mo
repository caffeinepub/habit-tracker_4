import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
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

  var nextHabitId = 0;
  let habits = Map.empty<Nat, Habit>();

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

  func getSortedHabitsByCheckIns() : [HabitView] {
    habits.values().toArray().map<Habit, HabitView>(toHabitView).sort(
      func(h1, h2) {
        switch (Int.compare(h1.checkIns.size().toInt(), h2.checkIns.size().toInt())) {
          case (#equal) { Int.compare(h1.createdAt, h2.createdAt) };
          case (order) { order };
        };
      }
    );
  };

  func getHabitViews() : [HabitView] {
    habits.values().toArray().map<Habit, HabitView>(toHabitView);
  };

  public shared ({ caller }) func addHabit(name : Text, description : Text) : async Nat {
    let habit = createHabit(name, description);
    habits.add(habit.id, habit);
    nextHabitId += 1;
    habit.id;
  };

  public shared ({ caller }) func checkIn(habitId : Nat) : async () {
    switch (habits.get(habitId)) {
      case (null) { Runtime.trap("Habit not found") };
      case (?habit) {
        habit.checkIns.add(Time.now());
      };
    };
  };

  public query ({ caller }) func getHabits() : async [HabitView] {
    getHabitViews().sort();
  };

  public query ({ caller }) func getHabitsByCheckIns() : async [HabitView] {
    getSortedHabitsByCheckIns();
  };

  public query ({ caller }) func getHabit(id : Nat) : async HabitView {
    switch (habits.get(id)) {
      case (null) { Runtime.trap("Habit does not exist") };
      case (?habit) { toHabitView(habit) };
    };
  };
};
