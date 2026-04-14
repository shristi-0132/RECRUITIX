import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageWrap, heading } from '../styles/theme';
import { getRecruiterJobs } from '../services/recruiterApi';
import Spinner from '../components/Spinner';

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecruiterJobs()
      .then(res => setJobs(res.data.jobs || res.data || []))
      .catch(() => setError('Failed to load your job postings.'))
      .finally(() => setLoading(false));
  }, []);

  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicant_count || 0), 0);

  return (
    <div style={pageWrap}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#456882', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Recruiter Portal
        </p>
        <h1 style={heading}>Dashboard</h1>
      </div>

      {/* Summary cards */}
      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '14px',
          marginBottom: '32px',
        }}>
          <SummaryCard label="Total Jobs" value={jobs.length} color="#1B3C53" />
          <SummaryCard label="Total Applicants" value={totalApplicants} color="#234C6A" />
          <SummaryCard label="Active Listings" value={jobs.filter(j => j.status !== 'closed').length} color="#085041" />
        </div>
      )}

      {/* Jobs table card */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 2px 16px rgba(27,60,83,0.08)',
        overflow: 'hidden',
      }}>
        {/* Card header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid #f0ece8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1B3C53' }}>
            Your Job Postings
          </h2>
          <button
            onClick={() => navigate('/recruiter/post-job')}
            style={{
              background: '#1B3C53', color: '#fff',
              border: 'none', borderRadius: '8px',
              padding: '8px 18px', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer',
            }}
          >
            + Post New Job
          </button>
        </div>

        {/* Content */}
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
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#456882' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px', opacity: 0.4 }}>◻</div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#234C6A', margin: '0 0 6px' }}>No jobs posted yet</p>
              <p style={{ fontSize: '14px', margin: 0 }}>Click "Post New Job" to get started</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#1B3C53' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #D2C1B6' }}>
                    {['Job Title', 'Min CGPA', 'Package', 'Applicants', 'Actions'].map(col => (
                      <th key={col} style={{
                        padding: '14px 16px', textAlign: 'left',
                        fontWeight: 600, fontSize: '12px', letterSpacing: '0.6px',
                        textTransform: 'uppercase', color: '#456882', whiteSpace: 'nowrap',
                      }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, i) => (
                    <tr key={job.job_id || i}
                      style={{ borderBottom: '1px solid #f0ece8', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#faf8f6'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '16px', fontWeight: 600 }}>{job.title}</td>
                      <td style={{ padding: '16px' }}>{job.min_cgpa ?? '—'}</td>
                      <td style={{ padding: '16px' }}>{job.expected_package ? `₹${job.expected_package} LPA` : '—'}</td>
                      <td style={{ padding: '16px' }}>{job.applicant_count ?? 0}</td>
                      <td style={{ padding: '16px' }}>
                        <button
                          onClick={() => navigate(`/recruiter/applications/${job.job_id}`)}
                          style={{
                            background: 'none', border: '1px solid #D2C1B6',
                            borderRadius: '6px', padding: '6px 14px',
                            fontSize: '12px', color: '#456882',
                            cursor: 'pointer', fontWeight: 600,
                          }}
                        >
                          View Applicants
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
