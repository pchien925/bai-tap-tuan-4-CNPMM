// src/component/route/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};