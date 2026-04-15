import React, {
  useEffect,
  useState,
  useMemo,
} from "react";
import JobCard from "../components/JobCard";
import { getAllJobs } from "../services/jobApi";
import {
  pageWrap,
  heading,
} from "../style/theme";

export default function JobListings() {
  const [jobs, setJobs] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const [search, setSearch] =
    useState("");
  const [minCgpa, setMinCgpa] =
    useState("");
  const [skill, setSkill] =
    useState("");

  useEffect(() => {
    getAllJobs()
      .then((res) =>
        setJobs(
          res.data.jobs ||
            res.data
        )
      )
      .catch(() =>
        setError(
          "Failed to load jobs. Please try again."
        )
      )
      .finally(() =>
        setLoading(false)
      );
  }, []);

  const filtered =
    useMemo(() => {
      return jobs.filter(
        (job) => {
          const matchSearch =
            !search ||
            job.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            job.company
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchCgpa =
            !minCgpa ||
            parseFloat(
              job.min_cgpa
            ) >=
              parseFloat(
                minCgpa
              );

          const matchSkill =
            !skill ||
            job.skills
              ?.toLowerCase()
              .includes(
                skill.toLowerCase()
              );

          return (
            matchSearch &&
            matchCgpa &&
            matchSkill
          );
        }
      );
    }, [
      jobs,
      search,
      minCgpa,
      skill,
    ]);

  return (
    <div style={pageWrap}>
      <div
        style={{
          marginBottom:
            "36px",
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
            letterSpacing:
              "0.5px",
            textTransform:
              "uppercase",
          }}
        >
          Student Portal
        </p>

        <h1 style={heading}>
          Job Listings
        </h1>

        <p
          style={{
            margin:
              "8px 0 0",
            color:
              "#456882",
            fontSize:
              "15px",
          }}
        >
          {loading
            ? "—"
            : `${filtered.length} position${
                filtered.length !==
                1
                  ? "s"
                  : ""
              } available`}
        </p>
      </div>

      {/* FILTER BOX */}
      <div
        style={{
          background:
            "#fff",
          borderRadius:
            "14px",
          boxShadow:
            "0 2px 12px rgba(27,60,83,0.07)",
          padding:
            "20px 24px",
          marginBottom:
            "28px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems:
            "flex-end",
        }}
      >
        <FilterInput
          label="Search"
          placeholder="Job title or company..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            flex: 2,
            minWidth:
              "200px",
          }}
        />

        <FilterInput
          label="Min CGPA"
          placeholder="e.g. 7.5"
          value={minCgpa}
          onChange={(e) =>
            setMinCgpa(
              e.target.value
            )
          }
          style={{
            flex: 1,
            minWidth:
              "140px",
          }}
        />

        <FilterInput
          label="Skill"
          placeholder="e.g. React"
          value={skill}
          onChange={(e) =>
            setSkill(
              e.target.value
            )
          }
          style={{
            flex: 1,
            minWidth:
              "140px",
          }}
        />
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorBanner
          msg={error}
        />
      ) : filtered.length ===
        0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map(
            (
              job,
              index
            ) => (
              <JobCard
                key={
                  job.id ||
                  index
                }
                job={job}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

/* HELPERS */
function FilterInput({
  label,
  style,
  ...props
}) {
  return (
    <div style={style}>
      <label
        style={{
          display: "block",
          marginBottom:
            "6px",
          fontSize:
            "12px",
          fontWeight: 600,
          color:
            "#456882",
          textTransform:
            "uppercase",
        }}
      >
        {label}
      </label>

      <input
        {...props}
        style={{
          width: "100%",
          padding:
            "12px 14px",
          border:
            "1px solid #D2C1B6",
          borderRadius:
            "8px",
          fontSize:
            "14px",
          background:
            "#faf8f6",
          color:
            "#1B3C53",
          outline: "none",
        }}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        textAlign:
          "center",
        padding:
          "80px 20px",
        color:
          "#456882",
      }}
    >
      No jobs found
    </div>
  );
}

function ErrorBanner({
  msg,
}) {
  return (
    <div
      style={{
        background:
          "#FCEBEB",
        border:
          "1px solid #F7C1C1",
        borderRadius:
          "12px",
        padding:
          "20px 24px",
        color:
          "#791F1F",
        fontSize:
          "14px",
      }}
    >
      {msg}
    </div>
  );
}