// frontend/src/components/Header.jsx
import React from "react";

export const Header = ({ role }) => {
  return (
    <header
      style={{
        padding: "10px",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>Inventory Management System</h1>
      {role && <span>Role: {role}</span>}
    </header>
  );
};