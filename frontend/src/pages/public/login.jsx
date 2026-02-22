// src/pages/public/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.css";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Hardcoded login check
    const dummyUser = {
      email: "admin@example.com",
      password: "123456",
      username: "Admin",
      role: "admin"
    };

    if (
      loginData.email === dummyUser.email &&
      loginData.password === dummyUser.password
    ) {
      // Save token & user in localStorage (optional)
      localStorage.setItem("token", "dummy-token-123"); 
      localStorage.setItem("user", JSON.stringify(dummyUser));

      // Navigate to main page
      navigate("/"); // your HomePage/mainpage
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error" style={{ color: "red" }}>{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}