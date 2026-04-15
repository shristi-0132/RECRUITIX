import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import {
  getProfile,
  updateProfile,
  createProfile,
} from "../services/studentApi";

import {
  pageWrap,
  heading,
  inputStyle,
  labelStyle,
} from "../style/theme";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    enrollment_no: "",
    cgpa: "",
    skills: "",
    resume_url: "",
    degree_url: "",
  });

  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErr, setFieldErr] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      const p = res.data?.profile || {};

      setForm({
        name: p.name || "",
        enrollment_no: p.enrollment_no || "",
        cgpa: p.cgpa ?? "",
        skills: p.skills || "",
        resume_url: p.resume_url || "",
        degree_url: p.degree_url || "",
      });

      setIsNew(false);
    } catch (err) {
      if (err.response?.status === 404) {
        setIsNew(true);
      } else {
        setError("Could not load profile data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Name is required";
    }

    if (!form.enrollment_no.trim()) {
      errs.enrollment_no =
        "Enrollment number is required";
    }

    const cgpa = parseFloat(form.cgpa);

    if (
      isNaN(cgpa) ||
      cgpa < 0 ||
      cgpa > 10
    ) {
      errs.cgpa =
        "CGPA must be between 0 and 10";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErr((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setFieldErr(errs);
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        cgpa: parseFloat(form.cgpa),
      };

      if (isNew) {
        await createProfile(payload);
      } else {
        await updateProfile(payload);
      }

      alert("Profile saved successfully");

      navigate("/student/profile");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to save profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageShell>
        <Spinner />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          <button
            onClick={() =>
              navigate("/student/profile")
            }
            style={{
              background: "none",
              border: "none",
              color: "#456882",
              cursor: "pointer",
              fontSize: "14px",
              padding: 0,
              marginBottom: "12px",
            }}
          >
            ← Back to Profile
          </button>

          <p
            style={{
              margin: "0 0 6px",
              fontSize: "13px",
              color: "#456882",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Student Portal
          </p>

          <h1 style={heading}>
            {isNew
              ? "Create Profile"
              : "Edit Profile"}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow:
              "0 2px 16px rgba(27,60,83,0.08)",
            padding: "36px",
          }}
        >
          {error && (
            <div
              style={{
                background: "#FCEBEB",
                border:
                  "1px solid #F7C1C1",
                borderRadius: "10px",
                padding: "14px 18px",
                color: "#791F1F",
                marginBottom: "24px",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "20px",
            }}
          >
            <Field
              label="Full Name *"
              error={fieldErr.name}
            >
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </Field>

            <Field
              label="Enrollment No *"
              error={
                fieldErr.enrollment_no
              }
            >
              <input
                name="enrollment_no"
                value={
                  form.enrollment_no
                }
                onChange={handleChange}
                style={inputStyle}
              />
            </Field>

            <Field
              label="CGPA *"
              error={fieldErr.cgpa}
            >
              <input
                name="cgpa"
                type="number"
                step="0.01"
                value={form.cgpa}
                onChange={handleChange}
                style={inputStyle}
              />
            </Field>

            <Field label="Skills">
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                style={inputStyle}
              />
            </Field>

            <Field label="Resume URL">
              <input
                name="resume_url"
                value={
                  form.resume_url
                }
                onChange={handleChange}
                style={inputStyle}
              />
            </Field>

            <Field label="Degree URL">
              <input
                name="degree_url"
                value={
                  form.degree_url
                }
                onChange={handleChange}
                style={inputStyle}
              />
            </Field>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "32px",
            }}
          >
            <Button
              type="submit"
              variant="primary"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                navigate(
                  "/student/profile"
                )
              }
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <div style={pageWrap}>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <label style={labelStyle}>
        {label}
      </label>
      {children}
      {error && (
        <span
          style={{
            color: "red",
            fontSize: "12px",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}