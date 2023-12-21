import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Hooks/useAuth";
const Navbar = () => {
  const navigate=useNavigate();
  const { user, dispatch } = useAuth();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      <header className="bg-blue-500 p-4 shadow-md">
        <nav>
          <ul className="flex justify-between items-center space-x-4">
            {user && (
              <>
                <li>{user.email}</li>
                <li>
                  <Link to="/" className="text-white hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-white hover:underline">
                    Create
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/login" className="text-white hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-white hover:underline">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
