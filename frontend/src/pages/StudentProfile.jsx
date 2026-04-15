import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import ProfileCard from "../components/ProfileCard";
import Spinner from "../components/Spinner";

import {
  getProfile,
} from "../services/studentApi";

import {
  pageWrap,
  heading,
} from "../style/theme";

export default function StudentProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data.profile);
    } catch (err) {
      if (
        err.response?.status === 404
      ) {
        navigate(
          "/student/profile/edit"
        );
        return;
      }

      setError(
        "Failed to load profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageShell>
        <Spinner />
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <ErrorBanner
          msg={error}
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              margin: "0 0 6px",
              fontSize: "13px",
              color: "#456882",
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
            My Profile
          </h1>
        </div>

        {profile && (
          <ProfileCard
            profile={profile}
            onEdit={() =>
              navigate(
                "/student/profile/edit"
              )
            }
          />
        )}
      </div>
    </PageShell>
  );
}

/* layout */
function PageShell({
  children,
}) {
  return (
    <div style={pageWrap}>
      {children}
    </div>
  );
}

function ErrorBanner({
  msg,
}) {
  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        background: "#FCEBEB",
        border:
          "1px solid #F7C1C1",
        borderRadius: "12px",
        padding: "20px 24px",
        color: "#791F1F",
        fontSize: "14px",
        fontWeight: 500,
      }}
    >
      {msg}
    </div>
  );
}