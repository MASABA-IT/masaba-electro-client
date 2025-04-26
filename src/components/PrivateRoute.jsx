// src/components/PrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Retrieve the userData object from localStorage
  const userData = localStorage.getItem("userData");

  const token = userData ? JSON.parse(userData).token : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
