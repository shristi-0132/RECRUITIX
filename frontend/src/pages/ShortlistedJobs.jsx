import React, {
  useEffect,
  useState,
} from "react";

import {
  pageWrap,
  heading,
} from "../style/theme";

import {
  getShortlistedJobs,
} from "../services/studentApi";

import Card from "../components/Card";

export default function ShortlistedJobs() {
  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    getShortlistedJobs()
      .then((res) =>
        setJobs(
          res.data.jobs || []
        )
      )
      .catch(() =>
        setError(
          "Failed to load shortlisted jobs."
        )
      )
      .finally(() =>
        setLoading(false)
      );
  }, []);

  return (
    <div style={pageWrap}>
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
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
          My Shortlistings
        </h1>

        {loading ? (
          <p
            style={{
              marginTop:
                "20px",
              color:
                "#456882",
            }}
          >
            Loading...
          </p>
        ) : error ? (
          <p
            style={{
              marginTop:
                "20px",
              color:
                "red",
            }}
          >
            {error}
          </p>
        ) : jobs.length === 0 ? (
          <p
            style={{
              marginTop:
                "20px",
              color:
                "#456882",
            }}
          >
            No shortlisted jobs yet.
          </p>
        ) : (
          <div
            style={{
              marginTop:
                "24px",
              display: "grid",
              gap: "16px",
            }}
          >
            {jobs.map(
              (job) => (
                <Card
                  key={
                    job.application_id
                  }
                >
                  <h3
                    style={{
                      marginBottom:
                        "10px",
                      color:
                        "#1B3C53",
                    }}
                  >
                    {
                      job.title
                    }
                  </h3>

                  <p>
                    {
                      job.company
                    }
                  </p>

                  <p
                    style={{
                      fontWeight: 600,
                      color:
                        "#085041",
                      marginTop:
                        "10px",
                    }}
                  >
                    Status:{" "}
                    {
                      job.status
                    }
                  </p>
                </Card>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}