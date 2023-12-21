import React, { useState } from "react";
import { useWorkout } from "./Hooks/useWorkout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./Hooks/useAuth";
const domaine = import.meta.env.VITE_Domaine;
const Form = () => {
  const { dispatch } = useWorkout();
  const { user } = useAuth();
  const [person, setUser] = useState({
    title: "",
    loads: "",
    reps: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(person);
    const newuser = {
      title: person.title,
      loads: parseInt(person.loads),
      reps: parseInt(person.reps),
    };
    try {
      const response = await axios.post(`${domaine}`, newuser, {
        headers: {
          Authorization: `Brearer ${user.token}`,
        },
      });
      dispatch({ type: "CREATE_WORKOUT", payload: response.data.workout });
      setUser({
        title: "",
        loads: "",
        reps: "",
      });
      console.log(response.data.message);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error.message);
      toast.warn(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Title:
          </label>
          <input
            value={person.title}
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border rounded"
            placeholder="Enter workout title"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="loads" className="block text-sm font-bold mb-2">
            Loads:
          </label>
          <input
            value={person.loads}
            type="text"
            id="loads"
            name="loads"
            className="w-full p-2 border rounded"
            placeholder="Enter loads"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reps" className="block text-sm font-bold mb-2">
            Reps:
          </label>
          <input
            value={person.reps}
            type="text"
            id="reps"
            name="reps"
            className="w-full p-2 border rounded"
            placeholder="Enter reps"
            // This will spread the previous state of user and only update
            // the particular key being changed, ensuring other keys remain intact.
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Workout
        </button>
      </form>
    </>
  );
};

export default Form;
