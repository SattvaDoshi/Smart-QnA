/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUP";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Header from "./Components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "./main";
import DashBoard from "./pages/DashBoard";


function App() {
  const { setIsAuthenticated } = useContext(Context);

  // useEffect(() => {
  //   const authStatus = localStorage.getItem("isAuthenticated");
  //   if (authStatus === "true") {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  
  //   // Optionally, check with your backend to ensure session is valid
  //   axios
  //     .get("http://localhost:3000/users/me", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res);
        
  //       if (res.data.success) {
  //         setIsAuthenticated(true);
  //         localStorage.setItem("isAuthenticated", "true"); // Store authentication state in localStorage
  //       } else {
  //         setIsAuthenticated(false);
  //         localStorage.removeItem("isAuthenticated"); // Clear auth status if not valid
  //       }
  //     })
  //     .catch(() => {
  //       setIsAuthenticated(false);
  //       localStorage.removeItem("isAuthenticated"); // Clear auth status if error occurs
  //     });
  // }, []);
  


  return (
    <Router>
      <ToastContainer position="top-left" autoClose={1500} />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/main" element={<MainPage />} />
        <Route path="/dashboard" element={<DashBoard/>} />

      </Routes>
    </Router>
  );
}

export default App;
