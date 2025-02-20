import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useCallback } from "react";
import { FiMenu } from "react-icons/fi";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
// import { FaBook } from "react-icons/fa";  // Importing a book icon from react-icons

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  // Fetch user details if authenticated
  const fetchUserDetails = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users/me", { withCredentials: true });
      setUsername(data?.user?.username || "User");
    } catch (error) {
      toast.error("Failed to fetch user details");
      console.error("User fetch error:", error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated, fetchUserDetails]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center px-8 py-6 bg-white text-gray-800 shadow-lg relative">
    {/* Left: Display either greeting or a logo/placeholder */}
    <div className="text-xl font-semibold text-gray-700">
      {isAuthenticated ? (
        <span>
          Welcome back, <span className="text-blue-600">{username}</span>!
        </span>
      ) : (
        <span className="text-gray-500">Let&lsquo;s Get Started!</span> // Add a logo or placeholder text here
      )}
    </div>
  
    {/* Centered Title with Book Icon */}
    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl font-extrabold text-center tracking-wider flex items-center space-x-2 text-blue-600">
      {/* <FaBook className="text-blue-600 text-2xl" /> Book icon */}
      <span>Smart Question Generator</span>
    </h1>
  
    {/* Navbar Buttons */}
    <div className="ml-auto flex items-center space-x-6">
      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-gray-800 text-3xl">
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
  
        {isAuthenticated ? (
          <button
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging Out..." : "Logout"}
          </button>
        ) : (
          <>
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </nav>
    </div>
  </header>
  
  );
};

export default Header;
