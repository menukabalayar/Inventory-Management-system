import React from "react";


export default function mainpage() {


  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Inventory Management System</h1>

      {user && (
        <h3>Hello, {user.name} 👋</h3>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}