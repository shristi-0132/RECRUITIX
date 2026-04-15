import React from "react";
import Card from "./Card";
import { applyJob } from "../services/studentApi";

export default function JobCard({ job }) {
  const handleApply = async () => {
    try {
      await applyJob(job.id);

      alert(
        "Application submitted successfully"
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to apply"
      );
    }
  };

  return (
    <Card
      style={{
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent:
          "space-between",
      }}
    >
      <div>
        <h2
          style={{
            color: "#1B3C53",
            marginBottom: "16px",
          }}
        >
          {job.title}
        </h2>

        <p
          style={{
            color: "#456882",
            marginBottom: "18px",
          }}
        >
          {job.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "18px",
            fontSize: "14px",
          }}
        >
          <p>
            <strong>
              Package
            </strong>{" "}
            ₹
            {
              job.expected_package
            }{" "}
            p.a.
          </p>

          <p>
            <strong>
              Min CGPA
            </strong>{" "}
            {job.min_cgpa}
          </p>
        </div>
      </div>

      <button
        onClick={handleApply}
        style={{
          background:
            "#1B3C53",
          color: "#fff",
          border: "none",
          padding:
            "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 600,
          width: "fit-content",
        }}
      >
        Apply Now
      </button>
    </Card>
  );
}