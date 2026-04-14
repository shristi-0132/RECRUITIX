import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import StatusBadge from '../components/StatusBadge';
import Spinner from '../components/Spinner';
import { getJobApplicants, shortlistApplicant } from '../services/recruiterApi';
import { pageWrap, heading } from '../styles/theme';

export default function ViewApplications() {
  const { job_id } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null); // student_id being actioned

  useEffect(() => {
    getJobApplicants(job_id)
      .then(res => {
        const data = res.data;
        setApplications(data.applications || data || []);
        setJobTitle(data.job_title || '');
      })
      .catch(() => setError('Failed to load applicants. Please try again.'))
      .finally(() => setLoading(false));
  }, [job_id]);

  const handleShortlist = async (studentId) => {
    setActionLoading(studentId);
    try {
      await shortlistApplicant({ job_id, student_id: studentId });
      setApplications(prev =>
        prev.map(a => a.student_id === studentId ? { ...a, status: 'shortlisted' } : a)
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to shortlist. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const counts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const columns = [
    { key: 'name', label: 'Student Name' },
    { key: 'enrollment_no', label: 'Enrollment No.' },
    { key: 'cgpa', label: 'CGPA' },
    {
      key: 'resume_url',
      label: 'Resume',
      render: (val) =>
        val ? (
          <a
            href={val}
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#1B3C53', fontWeight: 600, fontSize: '13px',
              textDecoration: 'none', borderBottom: '1px solid #D2C1B6',
            }}
          >
            View →
          </a>
        ) : (
          <span style={{ color: '#aaa', fontSize: '13px' }}>Not uploaded</span>
        ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'student_id',
      label: 'Action',
      render: (val, row) =>
        row.status === 'shortlisted' || row.status === 'selected' ? (
          <span style={{ color: '#456882', fontSize: '13px', fontStyle: 'italic' }}>—</span>
        ) : (
          <button
            onClick={() => handleShortlist(val)}
            disabled={actionLoading === val}
            style={{
              background: actionLoading === val ? '#f0ece8' : '#1B3C53',
              color: actionLoading === val ? '#456882' : '#fff',
              border: 'none', borderRadius: '6px',
              padding: '6px 14px', fontSize: '12px',
              fontWeight: 600, cursor: actionLoading === val ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {actionLoading === val ? 'Processing…' : 'Shortlist'}
          </button>
        ),
    },
  ];

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Back */}
        <button
          onClick={() => navigate('/recruiter/dashboard')}
          style={{ background: 'none', border: 'none', color: '#456882', cursor: 'pointer', fontSize: '14px', padding: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#456882', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Recruiter Portal
          </p>
          <h1 style={heading}>
            {jobTitle ? `Applicants — ${jobTitle}` : 'View Applicants'}
          </h1>
        </div>

        {/* Summary cards */}
        {!loading && !error && applications.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '14px',
            marginBottom: '28px',
          }}>
            <SummaryCard label="Total" value={applications.length} color="#1B3C53" />
            <SummaryCard label="Applied" value={counts.applied || 0} color="#234C6A" />
            <SummaryCard label="Shortlisted" value={counts.shortlisted || 0} color="#085041" />
            <SummaryCard label="Rejected" value={counts.rejected || 0} color="#791F1F" />
          </div>
        )}

        {/* Table card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(27,60,83,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '20px 28px',
            borderBottom: '1px solid #f0ece8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1B3C53' }}>
              Applications
            </h2>
            <button
              onClick={() => navigate(`/recruiter/shortlisted/${job_id}`)}
              style={{
                background: 'none', border: '1px solid #D2C1B6',
                borderRadius: '8px', padding: '8px 18px',
                fontSize: '13px', color: '#456882',
                fontWeight: 600, cursor: 'pointer',
              }}
            >
              View Shortlisted
            </button>
          </div>

          <div style={{ padding: '8px 0' }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <Spinner />
              </div>
            ) : error ? (
              <div style={{
                margin: '20px 28px',
                background: '#FCEBEB', border: '1px solid #F7C1C1',
                borderRadius: '10px', padding: '16px 20px',
                color: '#791F1F', fontSize: '14px',
              }}>{error}</div>
            ) : (
              <Table
                columns={columns}
                data={applications}
                emptyMessage="No applications yet for this job."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(27,60,83,0.06)',
      padding: '16px 20px',
      borderTop: `3px solid ${color}`,
    }}>
      <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#456882', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: '28px', fontWeight: 700, color, lineHeight: 1.1 }}>
        {value}
      </p>
    </div>
  );
}
