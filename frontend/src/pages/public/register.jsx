import { useState } from "react";
import "../../css/register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Registered Successfully!");
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />

        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
