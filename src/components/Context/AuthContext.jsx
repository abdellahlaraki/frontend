import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext(null);

const Authreducer=(state,action)=>{
    switch (action.type) {
        case "LOGIN":
            return {user:action.payload}
        case  "LOGOUT":
            return {user:null}
        default:
            return state;
    }

}

export const AuthProvider = ({ children }) => {
    const [state,dispatch]=useReducer(Authreducer,{
        user:null
    })
    console.log(state);
    useEffect(()=>{
        const token= JSON.parse(localStorage.getItem("user"));
        if(token){
            dispatch({type:"LOGIN",payload:token})
        }
    },[dispatch])
  return <AuthContext.Provider value={{...state,dispatch}}>{children}</AuthContext.Provider>;
};
