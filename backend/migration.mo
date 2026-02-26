import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  type OldHabit = {
    id : Nat;
    name : Text;
    description : Text;
    createdAt : Time.Time;
    checkIns : List.List<Time.Time>;
  };

  type OldActor = {
    habits : Map.Map<Nat, OldHabit>;
    nextHabitId : Nat;
  };

  type NewHabit = {
    id : Nat;
    name : Text;
    description : Text;
    createdAt : Time.Time;
    checkIns : List.List<Time.Time>;
  };

  type NewActor = {
    habits : Map.Map<Nat, NewHabit>;
    nextHabitId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newHabits = old.habits.map<Nat, OldHabit, NewHabit>(
      func(_id, oldHabit) {
        { oldHabit with checkIns = oldHabit.checkIns };
      }
    );
    { old with habits = newHabits };
  };
};
