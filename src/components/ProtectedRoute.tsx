// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // e.g. ["investor"]
  matchUserId?: boolean;   // restrict route to the logged-in user’s ID
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  matchUserId = false,
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const { id } = useParams(); // from /investor/:id

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Not logged in → go to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // Optional strict ID check (investor can only see their own dashboard)
  if (matchUserId && id && Number(id) !== user.id) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → show the page
  return children;
};

export default ProtectedRoute;
