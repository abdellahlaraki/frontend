import React, { useState } from "react";
import { useSignup } from "../components/Hooks/useSignup";
const Signup = () => {
  const { signup, error, isloading } = useSignup();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user.email, user.password);
  };
  
  return (
    <>
      <div className="w-full md:w-1/2 p-4">
        <div className="bg-white shadow-lg p-4 rounded">
          <h2 className="text-xl mb-4">Signup </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-bold mb-2">
                email:
              </label>
              <input
                value={user.email}
                type="text"
                id="title"
                name="email"
                className="w-full p-2 border rounded"
                placeholder="Enter workout title"
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="loads" className="block text-sm font-bold mb-2">
                password:
              </label>
              <input
                value={user.password}
                type="text"
                id="loads"
                name="password"
                className="w-full p-2 border rounded"
                placeholder="Enter loads"
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
