import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api.js";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await apiRequest("POST", "/auth/login", {
        data: { email, password },
      });

      toast.dismiss(loadingToast);

      const res = response.data;

      if (res.access_token) {
        localStorage.setItem("token", res.access_token);

        const userData = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          address: res.user.address,
          phone: res.user.phone,
          gender: res.user.gender,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("Login successful!");
        navigate("/", { replace: true });

      } else {
        toast.error(res.message || "Invalid credentials");
      }

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h3 className="login-title">Login</h3>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div style={{ marginTop: "10px" }}>
            Don't have an account? <Link to="/register">Register</Link>
          </div>

        </form>
      </div>
    </div>
  );
}