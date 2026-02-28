// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // refresh for safety
  };

  return (
    <header
      style={{
        padding: "10px 20px",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left side */}
      <h2>Inventory Management System</h2>

      {/* Middle navigation (PRIVATE ROUTES ONLY) */}
      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/add" style={{ color: "#fff", textDecoration: "none" }}>
          Add Product
        </Link>

        <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
          Profile
        </Link>
      </nav>

      {/* Right side */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {role && <span>Role: {role}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}