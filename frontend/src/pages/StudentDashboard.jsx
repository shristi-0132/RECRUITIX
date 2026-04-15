import React from "react";
import { useNavigate } from "react-router-dom";
import {
  pageWrap,
  heading,
  btnPrimary,
  btnSecondary,
} from "../style/theme";

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div style={pageWrap}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <p
            style={{
              margin: "0 0 6px",
              fontSize: "13px",
              color: "#456882",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Student Portal
          </p>

          <h1 style={heading}>
            Dashboard
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          <button
            style={btnPrimary}
            onClick={() =>
              navigate("/student/jobs")
            }
          >
            View Listed Jobs
          </button>

          <button
            style={btnPrimary}
            onClick={() =>
              navigate(
                "/student/applications"
              )
            }
          >
            My Applications
          </button>

          <button
            style={btnSecondary}
            onClick={() =>
              navigate(
                "/student/shortlisted"
              )
            }
          >
            My Shortlistings
          </button>

          <button
            style={btnSecondary}
            onClick={() =>
              navigate(
                "/student/profile"
              )
            }
          >
            My Profile
          </button>
        </div>
      </div>
    </div>
  );
}