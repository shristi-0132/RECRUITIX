import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import { getProfile, updateProfile, createProfile } from '../services/studentApi';
import { pageWrap, heading, inputStyle, labelStyle } from '../styles/theme';

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', enrollment_no: '', cgpa: '', skills: '', resume_url: '', degree_url: '',
  });
  const [isNew,    setIsNew]    = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState('');
  const [fieldErr, setFieldErr] = useState({});

  useEffect(() => {
    getProfile()
      .then(res => {
        const p = res.data.profile;
        setForm({
          name:          p.name          || '',
          enrollment_no: p.enrollment_no || '',
          cgpa:          p.cgpa          ?? '',
          skills:        p.skills        || '',
          resume_url:    p.resume_url    || '',
          degree_url:    p.degree_url    || '',
        });
      })
      .catch(err => {
        if (err.response?.status === 404) setIsNew(true);
        else setError('Could not load profile data.');
      })
      .finally(() => setLoading(false));
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim())          errs.name = 'Name is required';
    if (!form.enrollment_no.trim()) errs.enrollment_no = 'Enrollment number is required';
    const cgpa = parseFloat(form.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) errs.cgpa = 'CGPA must be between 0 and 10';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setFieldErr(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErr(errs); return; }

    setSaving(true);
    setError('');
    try {
      const payload = { ...form, cgpa: parseFloat(form.cgpa) };
      if (isNew) await createProfile(payload);
      else       await updateProfile(payload);
      navigate('/student/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageShell><Spinner /></PageShell>;

  return (
    <PageShell>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/student/profile')}
            style={{ background: 'none', border: 'none', color: '#456882', cursor: 'pointer', fontSize: '14px', padding: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← Back to Profile
          </button>
          <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#456882', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Student Portal
          </p>
          <h1 style={heading}>{isNew ? 'Create Profile' : 'Edit Profile'}</h1>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(27,60,83,0.08)',
          padding: '36px',
        }}>
          {error && (
            <div style={{
              background: '#FCEBEB', border: '1px solid #F7C1C1',
              borderRadius: '10px', padding: '14px 18px',
              color: '#791F1F', fontSize: '14px', marginBottom: '24px',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Field label="Full Name *" error={fieldErr.name}>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Shristi Rana"
                style={{ ...inputStyle, borderColor: fieldErr.name ? '#E24B4A' : '#D2C1B6' }} />
            </Field>

            <Field label="Enrollment No. *" error={fieldErr.enrollment_no}>
              <input name="enrollment_no" value={form.enrollment_no} onChange={handleChange}
                placeholder="e.g. 23293916125"
                style={{ ...inputStyle, borderColor: fieldErr.enrollment_no ? '#E24B4A' : '#D2C1B6' }} />
            </Field>

            <Field label="CGPA *" error={fieldErr.cgpa}>
              <input name="cgpa" value={form.cgpa} onChange={handleChange}
                type="number" step="0.01" min="0" max="10"
                placeholder="e.g. 8.5"
                style={{ ...inputStyle, borderColor: fieldErr.cgpa ? '#E24B4A' : '#D2C1B6' }} />
            </Field>

            <Field label="Skills" hint="Comma-separated">
              <input name="skills" value={form.skills} onChange={handleChange}
                placeholder="e.g. React, Node.js, SQL"
                style={inputStyle} />
            </Field>

            <Field label="Resume URL" hint="Paste Google Drive / S3 link">
              <input name="resume_url" value={form.resume_url} onChange={handleChange}
                placeholder="https://..."
                style={inputStyle} />
            </Field>

            <Field label="Degree URL" hint="Optional (for 4-yr degree holders)">
              <input name="degree_url" value={form.degree_url} onChange={handleChange}
                placeholder="https://..."
                style={inputStyle} />
            </Field>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <Button
              type="submit"
              variant="primary"
              disabled={saving}
            >
              {saving ? 'Saving…' : isNew ? 'Create Profile' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/student/profile')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

/* ── Helpers ── */
function PageShell({ children }) {
  return <div style={pageWrap}>{children}</div>;
}

function Field({ label, hint, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={labelStyle}>{label}</label>
      {hint && <span style={{ fontSize: '11px', color: '#456882', marginTop: '-4px' }}>{hint}</span>}
      {children}
      {error && <span style={{ fontSize: '12px', color: '#E24B4A', marginTop: '2px' }}>{error}</span>}
    </div>
  );
}