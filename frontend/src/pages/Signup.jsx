import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./../App.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response =
        await api.post(
          "/auth/signup",
          formData
        );

      console.log(
        "Signup Response:",
        response.data
      );

      alert(
        "Signup successful! Please login."
      );

      // go back to auth page
      navigate("/auth");
    } catch (error) {
      console.error(
        "Signup Error:",
        error
      );
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-box"
        onSubmit={handleSignup}
      >
        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">
            Student
          </option>
          <option value="recruiter">
            Recruiter
          </option>
        </select>

        <button type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;