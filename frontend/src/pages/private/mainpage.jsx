// src/pages/private/mainpage.jsx

import React from "react";
import {Header} from "../../components/Header";
import "./mainpage.css"; // ✅ import css

export default function MainPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // optional redirect
  };

  return (
    <div className="main-container">
      <Header />

      <div className="main-card">
        <h1>Welcome to Inventory Management System</h1>

        {user && (
          <h3 className="user-name">Hello, {user.name} 👋</h3>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}