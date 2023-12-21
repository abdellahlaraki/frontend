import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutProvider } from "./components/Context/WorkoutContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WorkoutProvider>
          <App />
        </WorkoutProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
