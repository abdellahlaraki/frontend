import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const domaine = import.meta.env.VITE_Domaine;
import { toast } from "react-toastify";
import { useWorkout } from "./Hooks/useWorkout";
import { useAuth } from "./Hooks/useAuth";
const Edit = () => {
  const {user}=useAuth();
  const { dispatch } = useWorkout();
  const navigate = useNavigate();
  const { id } = useParams();
  const [workout, setWorkout] = useState({
    title: "",
    reps: null,
    loads: null,
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${domaine}/${id}`);
        console.log(response.data);
        setWorkout({
          ...workout,
          title: response.data.title,
          reps: response.data.reps,
          loads: response.data.loads,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchdata();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateworkout = {
      title: workout.title,
      loads: parseInt(workout.loads),
      reps: parseInt(workout.reps),
    };
    console.log(updateworkout);
    // dispatch({
    //   type: "UPDATE_WORKOUT",
    //   payload: {
    //     id: id,
    //     title: updateworkout.title,
    //     reps: updateworkout.reps,
    //     loads: updateworkout.loads,
    //   },
    // });
    try {
      const response = await axios.put(`${domaine}/${id}`, updateworkout,{
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      });
      console.log(response.data);
      dispatch({
        type: "UPDATE_WORKOUT",
        payload: {
          id: id,
          title: updateworkout.title,
          reps: updateworkout.reps,
          loads: updateworkout.loads,
        },
      });
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="w-full md:w-1/2 p-4 ">
        <div className="bg-white shadow-lg p-4 rounded">
          <h2 className="text-xl mb-4">Edit Workout </h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-bold mb-2">
                Title:
              </label>
              <input
                value={workout.title}
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border rounded"
                placeholder="Enter workout title"
                onChange={(e) =>
                  setWorkout({
                    ...workout,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="loads" className="block text-sm font-bold mb-2">
                Loads:
              </label>
              <input
                value={workout.loads}
                type="text"
                id="loads"
                name="loads"
                className="w-full p-2 border rounded"
                placeholder="Enter loads"
                onChange={(e) =>
                  setWorkout((prev) => ({
                    ...workout,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reps" className="block text-sm font-bold mb-2">
                Reps:
              </label>
              <input
                value={workout.reps}
                type="text"
                id="reps"
                name="reps"
                className="w-full p-2 border rounded"
                placeholder="Enter reps"
                // This will spread the previous state of user and only update
                // the particular key being changed, ensuring other keys remain intact.
                onChange={(e) =>
                  setWorkout((prev) => ({
                    ...workout,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Workout
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
