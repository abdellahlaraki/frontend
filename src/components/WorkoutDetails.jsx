import React from "react";
import axios from "axios";
const domaine = import.meta.env.VITE_Domaine;
import { useWorkout } from "../components/Hooks/useWorkout";
import {useAuth} from "../components/Hooks/useAuth"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const WorkoutDetails = ({ workout }) => {
  const {user}=useAuth();
  const { dispatch } = useWorkout();
  const handeleDelete = async (id) => {
     try {
       const response = await axios.delete(`${domaine}/${id}`,{
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
       });
       dispatch({ type: "DELETE_WORKOUT", payload: id });
       toast.success(response.data.message, {
         position: toast.TOP_RIGHT,
       });
     } catch (error) {
       console.log(error.message);
     }
  };
  return (
    <div className="bg-gray-100 p-2 rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-2xl mb-4 font-semibold text-gray-700">
          {workout.title}
        </h3>
        <p className="mb-2 text-gray-600">
          <span className="font-medium text-gray-800">Loads:</span>{" "}
          {workout.loads}
        </p>
        <p className="mb-4 text-gray-600">
          <span className="font-medium text-gray-800">Reps:</span>{" "}
          {workout.reps}
        </p>
        <div className="flex space-x-6">
          <button
            onClick={() => handeleDelete(workout._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            Delete
          </button>
          <Link
            to={"/edit/" + workout._id}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
