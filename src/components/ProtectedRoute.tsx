import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-md mb-4">
          You are not logged in.
        </div>
        <p className="text-gray-500 mb-4">Please login to view this page.</p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}