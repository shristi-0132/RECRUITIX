import React, {
  useState,
} from "react";
import {
  useNavigate,
} from "react-router-dom";

import {
  postJob,
} from "../../services/recruiterApi";

import Spinner from "../../components/Spinner";

import {
  pageWrap,
  heading,
  inputStyle,
  labelStyle,
  btnPrimary,
  btnSecondary,
} from "../../style/theme";

export default function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    skills: '',
    min_cgpa: '',
    expected_package: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) { setError('Job title is required.'); return; }
    if (!form.description.trim()) { setError('Job description is required.'); return; }

    setSubmitting(true);
    try {
      await postJob({
        ...form,
        min_cgpa: form.min_cgpa ? parseFloat(form.min_cgpa) : null,
        expected_package: form.expected_package ? parseFloat(form.expected_package) : null,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={pageWrap}>
        <div style={{ maxWidth: 560, margin: '60px auto', textAlign: 'center' }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 16px rgba(27,60,83,0.08)',
            padding: '48px 40px',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
            <h2 style={{ margin: '0 0 10px', color: '#1B3C53', fontSize: '22px', fontWeight: 700 }}>
              Job Posted Successfully!
            </h2>
            <p style={{ color: '#456882', fontSize: '15px', margin: '0 0 32px' }}>
              Your job listing is now live and students can start applying.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/recruiter/dashboard')}
                style={btnPrimary}
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => { setSuccess(false); setForm({ title: '', description: '', skills: '', min_cgpa: '', expected_package: '' }); }}
                style={btnSecondary}
              >
                Post Another Job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/recruiter/dashboard')}
            style={{ background: 'none', border: 'none', color: '#456882', cursor: 'pointer', fontSize: '14px', padding: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← Back to Dashboard
          </button>
          <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#456882', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Recruiter Portal
          </p>
          <h1 style={heading}>Post a New Job</h1>
        </div>

        {/* Form card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(27,60,83,0.08)',
          overflow: 'hidden',
        }}>
          {/* Card header */}
          <div style={{
            background: 'linear-gradient(135deg, #1B3C53 0%, #234C6A 100%)',
            padding: '28px 36px',
          }}>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: 700 }}>
              Job Details
            </h2>
            <p style={{ margin: '6px 0 0', color: '#D2C1B6', fontSize: '13px' }}>
              Fill in the details below to create a new job listing
            </p>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} style={{ padding: '36px' }}>
            {/* Error banner */}
            {error && (
              <div style={{
                background: '#FCEBEB', border: '1px solid #F7C1C1',
                borderRadius: '10px', padding: '14px 18px',
                color: '#791F1F', fontSize: '14px', marginBottom: '24px',
              }}>
                {error}
              </div>
            )}

            <FormGroup label="Job Title *">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Software Development Engineer"
                style={inputStyle}
              />
            </FormGroup>

            <FormGroup label="Job Description *">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and what you're looking for…"
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
            </FormGroup>

            <FormGroup label="Required Skills">
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, SQL (comma separated)"
                style={inputStyle}
              />
              <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#456882' }}>
                Separate multiple skills with commas
              </p>
            </FormGroup>

            {/* Two column row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <FormGroup label="Minimum CGPA">
                <input
                  name="min_cgpa"
                  value={form.min_cgpa}
                  onChange={handleChange}
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  placeholder="e.g. 7.5"
                  style={inputStyle}
                />
              </FormGroup>
              <FormGroup label="Expected Package (LPA)">
                <input
                  name="expected_package"
                  value={form.expected_package}
                  onChange={handleChange}
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="e.g. 12"
                  style={inputStyle}
                />
              </FormGroup>
            </div>

            {/* Action buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              paddingTop: '28px',
              borderTop: '1px solid #f0ece8',
              marginTop: '8px',
            }}>
              <button
                type="submit"
                disabled={submitting}
                style={{ ...btnPrimary, opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {submitting ? <><Spinner size={16} /> Posting…</> : 'Post Job'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/recruiter/dashboard')}
                style={btnSecondary}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <label style={{ ...labelStyle, display: 'block', marginBottom: '8px' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
