/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useContext } from "react";
import { toast } from "react-toastify";


const SignUp = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/users/signup",
        // "https://qgauth.onrender.com/users/signup",
        { username, email, password },
        { withCredentials: true }
      );
      console.log(data);
      
      toast.success("Registered successfully");
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to /main after successful registration
      navigate("/dashboard");
      setLoading(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="relative min-h-screen flex items-center justify-center transition-all bg-blue-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-2 bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>

      {/* Large Faded Question Marks */}
      <div className="absolute inset-0 flex items-center justify-center text-[10rem] text-gray-300 opacity-20 select-none">
        ???
      </div>

      {/* Sign Up Box */}
      <div className="relative -mt-20 z-10 p-8 rounded-lg shadow-lg w-96 text-center bg-white dark:bg-gray-800 transition-all">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Create an Account
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Join us to generate smart questions!
        </p>

        <form className="mt-6 space-y-4" onSubmit={submitHandler}>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 bg-gray-200 dark:bg-gray-700 dark:text-white focus:ring-blue-500"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 bg-gray-200 dark:bg-gray-700 dark:text-white focus:ring-blue-500"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 bg-gray-200 dark:bg-gray-700 dark:text-white focus:ring-blue-500"
          />
          <button
          disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 dark:text-blue-400 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
