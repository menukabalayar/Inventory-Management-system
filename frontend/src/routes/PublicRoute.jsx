import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ token }) => {
  return token ? <Navigate to="/browse" replace /> : <Outlet />;
};

export default PublicRoute;