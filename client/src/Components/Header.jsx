import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect } from "react";


const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

console.log(darkMode);



  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <header className="flex justify-between items-center px-8 py-6 bg-white text-gray-800 shadow-lg relative">
      {/* Left */}
      <div className="text-xl font-semibold text-gray-700">
        <span className="text-gray-500">
         <p className="flex justify-center items-center gap-4"> <SignedIn><UserButton afterSignOutUrl="/" /> {user?.username}! </SignedIn></p>
          <SignedOut>Let&lsquo;s Get Started!</SignedOut>
        </span>
      </div>

      {/* Centered Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl font-extrabold text-center tracking-wider flex items-center space-x-2 text-blue-600">
        <span>Smart Question Generator</span>
      </h1>

      {/* Right Nav */}
      <div className="ml-auto flex items-center space-x-6">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-gray-800 text-3xl"
        >
          <FiMenu />
        </button>

        <nav
          className={`sm:flex sm:items-center sm:space-x-6 absolute sm:static top-16 right-6 bg-white sm:bg-transparent shadow-lg sm:shadow-none p-6 sm:p-0 rounded-lg transition-all ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <button
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <button
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </SignedIn>
          <button
    onClick={() => setDarkMode(!darkMode)}
    className="p-2 bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-md"
    title="Toggle Theme"
  >
    {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
  </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
