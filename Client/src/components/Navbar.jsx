import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Navigation Links */}
        <div className="flex space-x-6 font-medium">
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          {/* Admin only */}
          {user?.role === "admin" && (
            <>
             <Link
              to="/admin"
              className="hover:text-blue-600 transition-colors"
            >
              Complaint List
            </Link>
              <Link
              to="/news-mange"
              className="hover:text-blue-600 transition-colors"
            >
              News-Mange
            </Link>
            </>
           
          )}

          {/* Logged-in user (all roles) */}
          {user && user.role === "user" &&(
            <>
              <Link
                to="/my-complaints"
                className="hover:text-blue-600 transition-colors"
              >
                My Complaints
              </Link>
              <Link
                to="/create-complaint"
                className="hover:text-blue-600 transition-colors"
              >
                Register Complaint
              </Link>
              <Link
                to="/news"
                className="hover:text-blue-600 transition-colors"
              >
                News
              </Link>
            </>
          )}
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
