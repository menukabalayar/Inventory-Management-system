import React, { Suspense } from "react";
import AppRoutes from "./AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}