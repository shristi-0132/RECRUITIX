import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";
import "./../App.css";

const Login = () => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response =
        await api.post(
          "/auth/login",
          formData
        );

      console.log(
        "Login Response:",
        response.data
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      const payload =
        JSON.parse(
          atob(
            response.data.token
              .split(".")[1]
          )
        );

      localStorage.setItem(
        "role",
        payload.role
      );

      if (
        payload.role ===
        "student"
      ) {
        navigate(
          "/student/dashboard"
        );
      } else if (
        payload.role ===
        "recruiter"
      ) {
        navigate(
          "/recruiter/dashboard"
        );
      } else {
        navigate("/auth");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      setError(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-box"
        onSubmit={handleLogin}
      >
        <h2>Login</h2>

        {error && (
          <p
            style={{
              color: "red",
              marginBottom:
                "10px",
            }}
          >
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p
          style={{
            marginTop:
              "15px",
          }}
        >
          Don’t have an
          account?{" "}
          <span
            style={{
              color:
                "#1B3C53",
              cursor:
                "pointer",
              fontWeight: 600,
            }}
            onClick={() =>
              navigate(
                "/signup"
              )
            }
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;