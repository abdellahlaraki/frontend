import { useContext } from "react"
import { WorkoutContext } from "../Context/WorkoutContext"
export const useWorkout=()=>{
    const context=useContext(WorkoutContext);
    if(!context){
        throw new Error('Workout probleme');
    }
    return context;
}