import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [isLogin, setIsLogin] =
    useState(true);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "20px",
        }}
      >
        <button
          onClick={() =>
            setIsLogin(true)
          }
        >
          Login
        </button>

        <button
          onClick={() =>
            setIsLogin(false)
          }
        >
          Signup
        </button>
      </div>

      {isLogin ? <Login /> : <Signup />}
    </div>
  );
}