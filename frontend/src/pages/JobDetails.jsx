import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../services/jobApi';
import { applyJob } from '../services/studentApi';
import StatusBadge from '../components/StatusBadge';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import { pageWrap, heading } from '../style/theme';

export default function JobDetails() {
  const { job_id }  = useParams();
  const navigate    = useNavigate();

  const [job,      setJob]      = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied,  setApplied]  = useState(false);
  const [error,    setError]    = useState('');
  const [applyErr, setApplyErr] = useState('');

  useEffect(() => {
    getJobById(job_id)
      .then(res => setJob(res.data.job || res.data))
      .catch(() => setError('Job not found or could not be loaded.'))
      .finally(() => setLoading(false));
  }, [job_id]);

  const handleApply = async () => {
    setApplying(true);
    setApplyErr('');
    try {
      await applyJob(job_id);
      setApplied(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to apply. Please try again.';
      if (msg.toLowerCase().includes('already')) setApplied(true);
      else setApplyErr(msg);
    } finally {
      setApplying(false);
    }
  };

  const skills = job?.skills
    ? job.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  if (loading) return <PageShell><Spinner /></PageShell>;
  if (error)   return <PageShell><ErrorBanner msg={error} onBack={() => navigate('/student/jobs')} /></PageShell>;

  return (
    <PageShell>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Back */}
        <button
          onClick={() => navigate('/student/jobs')}
          style={{ background: 'none', border: 'none', color: '#456882', cursor: 'pointer', fontSize: '14px', padding: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← Back to Jobs
        </button>

        {/* Main card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(27,60,83,0.08)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1B3C53 0%, #234C6A 100%)',
            padding: '36px',
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#D2C1B6', fontWeight: 600, letterSpacing: '0.4px' }}>
              {job.company_name || 'Company'}
            </p>
            <h1 style={{ margin: '0 0 16px', color: '#fff', fontSize: '26px', fontWeight: 700, lineHeight: 1.3 }}>
              {job.title}
            </h1>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <MetaChip label="Package" value={job.expected_package ? `₹${job.expected_package} LPA` : '—'} />
              <MetaChip label="Min CGPA" value={job.min_cgpa ?? '—'} />
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '36px' }}>
            {/* Description */}
            <Section title="Job Description">
              <p style={{ margin: 0, color: '#456882', fontSize: '15px', lineHeight: 1.7 }}>
                {job.description || 'No description provided.'}
              </p>
            </Section>

            {/* Skills */}
            {skills.length > 0 && (
              <Section title="Required Skills">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.map((sk, i) => (
                    <span key={i} style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      background: '#f0ece8',
                      color: '#234C6A',
                      fontWeight: 600,
                      border: '1px solid #D2C1B6',
                    }}>{sk}</span>
                  ))}
                </div>
              </Section>
            )}

            {/* Eligibility */}
            <Section title="Eligibility">
              <div style={{
                background: '#f7f4f1',
                borderRadius: '10px',
                padding: '16px 20px',
                borderLeft: '3px solid #1B3C53',
              }}>
                <p style={{ margin: 0, color: '#1B3C53', fontSize: '14px', fontWeight: 500 }}>
                  Minimum CGPA required: <strong>{job.min_cgpa ?? 'Not specified'}</strong>
                </p>
              </div>
            </Section>

            {/* Apply error */}
            {applyErr && (
              <div style={{
                background: '#FCEBEB', border: '1px solid #F7C1C1', borderRadius: '10px',
                padding: '14px 18px', color: '#791F1F', fontSize: '14px', marginBottom: '20px',
              }}>
                {applyErr}
              </div>
            )}

            {/* Apply button */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #f0ece8', marginTop: '28px' }}>
              {applied ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <StatusBadge status="applied" />
                  <span style={{ color: '#456882', fontSize: '14px' }}>
                    You have applied for this position.
                  </span>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleApply}
                  disabled={applying}
                  style={{ fontSize: '15px', padding: '14px 36px' }}
                >
                  {applying ? 'Submitting…' : 'Apply Now'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ── Helpers ── */
function PageShell({ children }) {
  return <div style={pageWrap}>{children}</div>;
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#456882' }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function MetaChip({ label, value }) {
  return (
    <div style={{ background: 'rgba(210,193,182,0.2)', borderRadius: '8px', padding: '8px 16px' }}>
      <p style={{ margin: 0, fontSize: '10px', color: '#D2C1B6', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>{value}</p>
    </div>
  );
}

function ErrorBanner({ msg, onBack }) {
  return (
    <div style={{ maxWidth: 500, margin: '40px auto', textAlign: 'center' }}>
      <div style={{
        background: '#FCEBEB', border: '1px solid #F7C1C1', borderRadius: '12px',
        padding: '24px', color: '#791F1F', fontSize: '14px', marginBottom: '16px',
      }}>{msg}</div>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#456882', cursor: 'pointer', fontSize: '14px' }}>
        ← Back to Jobs
      </button>
    </div>
  );
}