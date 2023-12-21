import { createContext, useReducer } from "react";

export const WorkoutContext = createContext(null);

const initialeState = {
  workouts: [],
};

const WorkoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "DELETE_WORKOUT":
      return {
        workouts: [
          ...state.workouts.filter((workout) => workout._id !== action.payload),
        ],
      };
    case "CREATE_WORKOUT":
      return { workouts: [...state.workouts, action.payload] };
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.map((workout) =>
          workout._id === action.payload.id
            ? {
                ...workout,
                title: action.payload.title,
                reps: action.payload.reps,
                loads: action.payload.loads,
              }
            : workout
        ),
      };
    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutReducer, initialeState);
  console.log(state);
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
