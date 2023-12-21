import React from "react";
import { useWorkout } from "./Hooks/useWorkout";
import WorkoutDetails from "./WorkoutDetails";
const Workout = () => {
  const { dispatch, workouts } = useWorkout();
  return (
    <>
      {workouts.length ? (
        workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative "
          role="alert"
        >
          <strong className="font-bold">Notice!</strong>
          <span className="block sm:inline"> No workouts available.</span>
        </div>
      )}
    </>
  );
};

export default Workout;
