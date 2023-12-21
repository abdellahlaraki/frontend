import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
import { Login } from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./components/Hooks/useAuth";

function App() {
  const {user}=useAuth();
  return (
    <>
    <Navbar />
      <Routes>
        
        <Route path="/" element={user?<Home />:<Navigate to={"/login"} />} />
        <Route path="/edit/:id" element={user?<Edit />:<Navigate to={"/login"} />} />
        <Route path="/login" element={!user?<Login />:<Navigate to={"/"} />} />
        <Route path="/signup" element={!user?<Signup />:<Navigate to={"/"} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
