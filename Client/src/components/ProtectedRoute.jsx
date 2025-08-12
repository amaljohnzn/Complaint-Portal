import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role, requiredRole }) {
  if (!role) return <Navigate to="/login" />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/" />;
  return children;
}
