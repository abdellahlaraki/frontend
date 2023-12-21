import axios from "axios";
import { useState } from "react";
import {toast} from "react-toastify";
import {useAuth} from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
const loginurl=import.meta.env.VITE_LOGIN;
export const useLogin = () => {
    const navigate=useNavigate();
    const [error, setError] = useState(null);
    const [isloading, setisloading] = useState(null);
     const { dispatch } = useAuth();
  
    const login = async (email, password) => {
      setisloading(true);
      setError(null);
  
      try {
        const response = await axios.post(`${loginurl}`, {
          email, password
        });

        if (response.status === 200) {
            toast.success("succe", {position:toast.POSITION.TOP_RIGHT});
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
             dispatch({ type: "LOGIN", payload: response.data });
             navigate("/");
        } else {
          setError(response.data.error);
          toast.warn("warn", {position:toast.POSITION.TOP_RIGHT});
        }
        setisloading(false);
      } catch (err) {
        setError(err.message);
        setisloading(false);
      }
    };

    return {login, isloading, error};
};
