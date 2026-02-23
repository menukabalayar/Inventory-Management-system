import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ token }) => {
  const storedToken = token || localStorage.getItem("token");

  return storedToken ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;