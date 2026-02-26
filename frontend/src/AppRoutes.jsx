// src/AppRoutes.jsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

// Lazy-loaded pages
const HomePage = React.lazy(() => import("./pages/private/mainpage.jsx"));
const LoginPage = React.lazy(() => import("./pages/public/login.jsx"));
const RegisterPage = React.lazy(() => import("./pages/public/register.jsx"));
const AddProductPage = React.lazy(() => import("./pages/private/addpage.jsx"));
const ProfilePage = React.lazy(() => import("./pages/private/profilepage.jsx"));

const AppRoutes = ({ token,  setToken, setUser }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* PUBLIC ROUTES: accessible only if NOT logged in */}
        <Route element={<PublicRoute token={token} />}>
          <Route
            path="/login"
            element={<LoginPage setToken={setToken} setUser={setUser} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* PRIVATE ROUTES: accessible only if logged in */}
        <Route element={<PrivateRoute token={token} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route
            path="/profile"
            element={
              <ProfilePage currentUser={token} setToken={setToken} setUser={setUser} />
            }
          />
        </Route>

        {/* Unknown route: redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;