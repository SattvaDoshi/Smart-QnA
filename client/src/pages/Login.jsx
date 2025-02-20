/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
   const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(Context);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Logging in with:", formData);
    try {
      const { data } = await axios.post(
        // "http://localhost:3000/users/login",
        "https://qgauth.onrender.com/users/login",
        
        {email:formData.email,password:formData.password},
        { withCredentials: true }
      );
      console.log(data);
      
      toast.success("Logged in successfully");
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to /main after successful registration
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  return (
    <div className={` min-h-screen flex items-center justify-center transition-all ${
      darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-30 right-6 p-2 bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {/* Login Box */}
      <div className={`-mt-20 w-full max-w-md p-8 rounded-lg shadow-lg transition-all ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className="text-3xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Username */}
        

          {/* Email */}
          <div>
            {/* <label className="block text-gray-500 dark:text-gray-300">Email</label> */}
            <input placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 transition-all ${
                darkMode
                  ? "bg-gray-700 text-white focus:ring-blue-500"
                  : "bg-gray-200 text-black focus:ring-blue-500"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            {/* <label className="block text-gray-500 dark:text-gray-300">Password</label> */}
            <input
            placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 transition-all ${
                darkMode
                  ? "bg-gray-700 text-white focus:ring-blue-500"
                  : "bg-gray-200 text-black focus:ring-blue-500"
              }`}
              required
            />
          </div>

          {/* Login Button */}
          <button
          disabled={loading}
            type="submit"
            className="w-full py-2 rounded-md font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="mt-4 text-center text-gray-500 dark:text-gray-300">
          Don&lsquo;t have an account?{" "}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
