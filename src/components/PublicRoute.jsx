// components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");
  const token = userData ? JSON.parse(userData).token : null;

  if (token) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default PublicRoute;
