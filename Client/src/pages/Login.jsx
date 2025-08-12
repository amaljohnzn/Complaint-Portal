import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { Mail, Lock, XCircle, AlertTriangle, X } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const closeError = () => setError("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center justify-between bg-red-50 border border-red-300 text-red-800 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <span className="bg-red-500 text-white rounded-full p-1">
                <XCircle size={16} />
              </span>
              <span className="font-medium">{error}</span>
            </div>
            <button onClick={closeError} type="button" className="text-red-500">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Email Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Mail size={18} />
          </span>
          <input
            className="border border-gray-300 rounded-lg w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={18} />
          </span>
          <input
            className="border border-gray-300 rounded-lg w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
