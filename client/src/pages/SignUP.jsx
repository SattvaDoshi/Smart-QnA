import axios from "axios";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";


const SignUp = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submitHandler=async(e)=>{
    e.preventDefault();
    console.log(username,email,password);
    const {data}=await axios.post("https://qgauth.onrender.com/users/signup",{username,email,password},{
      withCredentials:true,
      
    });
    console.log(data);    
  }

  

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
    <div className="relative min-h-screen flex items-center justify-center transition-all bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
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
      <div className="relative z-10 p-8 rounded-lg shadow-lg w-96 text-center bg-white dark:bg-gray-800 transition-all">
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
             onChange={(e)=>(setUsername(e.target.value))}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 bg-gray-200 dark:bg-gray-700 dark:text-white focus:ring-blue-500"
          />
          <input
            type="email"
            required
            onChange={(e)=>(setEmail(e.target.value))}
            value={email}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 bg-gray-200 dark:bg-gray-700 dark:text-white focus:ring-blue-500"
          />
          <input
            required
            onChange={(e)=>(setPassword(e.target.value))}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 bg-gray-200 dark:bg-gray-700 dark:text-white focus:ring-blue-500"
          />
          <button
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
