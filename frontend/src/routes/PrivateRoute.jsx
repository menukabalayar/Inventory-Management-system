import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ token, user }) => {
  if (!token || !user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;