import React, { useEffect, useState } from "react";
import Workout from "../components/Workout";
import Form from "../components/Form";
import axios from "axios";
const domaine = import.meta.env.VITE_Domaine;
import { useWorkout } from "../components/Hooks/useWorkout";
import Edit from "../components/Edit";
import { useAuth } from "../components/Hooks/useAuth";
const Home = () => {
  const { dispatch } = useWorkout();
  const {user} =useAuth();
  const [isloading, setIsloading] = useState(false);
  const fetchWorkouts = async () => {
    try {
      setIsloading(true);
      const response = await axios.get(`${domaine}`,{
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      });
      // console.log(response.data);
      dispatch({ type: "SET_WORKOUTS", payload: response.data });
      setIsloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchWorkouts();
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-4">
          {!isloading && <Workout />} {isloading && <p>is loading</p>}
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white shadow-lg p-4 rounded">
            <h2 className="text-xl mb-4">Add Workout </h2>
            <Form />
          </div>
        </div>
      </div>
      {/* <Edit/> */}
    </>
  );
};

export default Home;
