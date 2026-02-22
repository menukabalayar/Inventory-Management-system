// src/AppRoutes.jsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

// Lazy Pages
const HomePage = React.lazy(() => import("./pages/private/mainpage.jsx"));
const LoginPage = React.lazy(() => import("./pages/public/login.jsx"));
const RegisterPage = React.lazy(() => import("./pages/public/register.jsx"));
const AddProductPage = React.lazy(() => import("./pages/private/addpage.jsx"));

const AppRoutes = ({ token, user, setToken, setUser }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicRoute token={token} />}>
          <Route
            path="/login"
            element={<LoginPage setToken={setToken} setUser={setUser} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoute token={token} />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/add-product"
            element={
              user?.role === "admin" ? (
                <AddProductPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Route>

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;