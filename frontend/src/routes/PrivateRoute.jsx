import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ token }) => {
  // if token exists in props OR localStorage
  const storedToken = token || localStorage.getItem("token");

  return storedToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;