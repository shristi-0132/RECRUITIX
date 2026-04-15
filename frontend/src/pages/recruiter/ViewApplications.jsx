import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import Spinner from "../../components/Spinner";

import {
  getJobApplicants,
  shortlistApplicant,
} from "../../services/recruiterApi";

import {
  pageWrap,
  heading,
} from "../../style/theme";

export default function ViewApplications() {
  const { job_id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [jobTitle, setJobTitle] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    actionLoading,
    setActionLoading,
  ] = useState(null);

  useEffect(() => {
    getJobApplicants(job_id)
      .then((res) => {
        const data =
          res.data;

        setApplications(
          data.applicants ||
            []
        );

        setJobTitle(
          data.job_title ||
            ""
        );
      })
      .catch(() =>
        setError(
          "Failed to load applicants. Please try again."
        )
      )
      .finally(() =>
        setLoading(false)
      );
  }, [job_id]);

  const handleShortlist =
    async (
      applicationId
    ) => {
      setActionLoading(
        applicationId
      );

      try {
        await shortlistApplicant(
          applicationId
        );

        setApplications(
          (prev) =>
            prev.map(
              (a) =>
                a.application_id ===
                applicationId
                  ? {
                      ...a,
                      status:
                        "shortlisted",
                    }
                  : a
            )
        );
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            "Failed to shortlist. Please try again."
        );
      } finally {
        setActionLoading(
          null
        );
      }
    };

  const counts =
    applications.reduce(
      (acc, a) => {
        acc[a.status] =
          (acc[
            a.status
          ] || 0) + 1;
        return acc;
      },
      {}
    );

  const columns = [
    {
      key: "name",
      label:
        "Student Name",
    },
    {
      key: "cgpa",
      label: "CGPA",
    },
    {
      key: "resume_url",
      label: "Resume",
      render: (
        val
      ) =>
        val ? (
          <a
            href={val}
            target="_blank"
            rel="noreferrer"
            style={{
              color:
                "#1B3C53",
              fontWeight: 600,
            }}
          >
            View →
          </a>
        ) : (
          <span>
            Not uploaded
          </span>
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (
        val
      ) => (
        <StatusBadge
          status={
            val
          }
        />
      ),
    },
    {
      key:
        "application_id",
      label:
        "Action",
      render: (
        val,
        row
      ) =>
        row.status ===
          "shortlisted" ||
        row.status ===
          "selected" ? (
          <span>
            —
          </span>
        ) : (
          <button
            onClick={() =>
              handleShortlist(
                row.application_id
              )
            }
            disabled={
              actionLoading ===
              row.application_id
            }
            style={{
              background:
                "#1B3C53",
              color:
                "#fff",
              border:
                "none",
              borderRadius:
                "6px",
              padding:
                "6px 14px",
              cursor:
                "pointer",
            }}
          >
            {actionLoading ===
            row.application_id
              ? "Processing…"
              : "Shortlist"}
          </button>
        ),
    },
  ];

  return (
    <div style={pageWrap}>
      <div
        style={{
          maxWidth: 1000,
          margin:
            "0 auto",
        }}
      >
        <button
          onClick={() =>
            navigate(
              "/recruiter/dashboard"
            )
          }
          style={{
            background:
              "none",
            border:
              "none",
            color:
              "#456882",
            cursor:
              "pointer",
            marginBottom:
              "20px",
          }}
        >
          ← Back to Dashboard
        </button>

        <div
          style={{
            marginBottom:
              "28px",
          }}
        >
          <p
            style={{
              margin:
                "0 0 6px",
              fontSize:
                "13px",
              color:
                "#456882",
              fontWeight: 600,
              textTransform:
                "uppercase",
            }}
          >
            Recruiter
            Portal
          </p>

          <h1
            style={
              heading
            }
          >
            {jobTitle
              ? `Applicants — ${jobTitle}`
              : "View Applicants"}
          </h1>
        </div>

        {!loading &&
          !error &&
          applications.length >
            0 && (
            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "14px",
                marginBottom:
                  "28px",
              }}
            >
              <SummaryCard
                label="Total"
                value={
                  applications.length
                }
                color="#1B3C53"
              />

              <SummaryCard
                label="Applied"
                value={
                  counts.applied ||
                  0
                }
                color="#234C6A"
              />

              <SummaryCard
                label="Shortlisted"
                value={
                  counts.shortlisted ||
                  0
                }
                color="#085041"
              />
            </div>
          )}

        <div
          style={{
            background:
              "#fff",
            borderRadius:
              "16px",
            boxShadow:
              "0 2px 16px rgba(27,60,83,0.08)",
            overflow:
              "hidden",
          }}
        >
          {loading ? (
            <Spinner />
          ) : error ? (
            <p>
              {error}
            </p>
          ) : (
            <Table
              columns={
                columns
              }
              data={
                applications
              }
              emptyMessage="No applications yet."
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
}) {
  return (
    <div
      style={{
        background:
          "#fff",
        borderRadius:
          "12px",
        padding:
          "16px 20px",
        borderTop: `3px solid ${color}`,
      }}
    >
      <p>{label}</p>
      <p
        style={{
          fontSize:
            "28px",
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </p>
    </div>
  );
}