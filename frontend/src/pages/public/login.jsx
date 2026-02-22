import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import "../../css/login.css";  

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // ✅ create navigate function

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Here you can do real login logic (API call)
    // For now, we'll just simulate login success:
    console.log("Login Data:", loginData);

    // ✅ Navigate to mainpage after successful login
    navigate("/"); // assuming "/" is your HomePage/mainpage
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}