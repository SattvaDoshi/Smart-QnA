import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Context } from "../main"; // Import the Context

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700">
        Smart Question Generator
      </h1>
      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-blue-700 text-3xl">
          <FiMenu />
        </button>
      </div>
      <div
        className={`flex flex-col sm:flex-row sm:space-x-4 mt-4 sm:mt-0 absolute sm:static bg-white shadow-md sm:shadow-none p-4 sm:p-0 top-16 right-6 ${
          menuOpen ? "block" : "hidden"
        } sm:flex`}
      >
        {isAuthenticated ? (
          <button
            className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="mt-2 sm:mt-0 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
