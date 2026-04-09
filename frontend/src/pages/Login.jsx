import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { saveToken, saveRole } from "../utils/authUtils";
import "./../App.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", formData);

      const token = response.data.token;
      const role = response.data.role;

      saveToken(token);
      saveRole(role);

      alert("Login successful");

      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;