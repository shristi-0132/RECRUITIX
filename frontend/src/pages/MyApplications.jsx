import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationTable from '../components/ApplicationTable';
import { getApplications } from '../services/studentApi';
import { pageWrap, heading } from '../style/theme';

export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');

  useEffect(() => {
    getApplications()
      .then(res => setApplications(res.data.applications || []))
      .catch(() => setError('Failed to load applications. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  /* Summary counts */
  const counts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={pageWrap}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#456882', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Student Portal
        </p>
        <h1 style={heading}>My Applications</h1>
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
          <SummaryCard label="Applied"     value={counts.applied     || 0} color="#234C6A" />
          <SummaryCard label="Shortlisted" value={counts.shortlisted || 0} color="#085041" />
          <SummaryCard label="Selected"    value={counts.selected    || 0} color="#27500A" />
          <SummaryCard label="Rejected"    value={counts.rejected    || 0} color="#791F1F" />
        </div>
      )}

      {/* Table card */}
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
            Application History
          </h2>
          <button
            onClick={() => navigate('/student/jobs')}
            style={{
              background: '#1B3C53', color: '#fff',
              border: 'none', borderRadius: '8px',
              padding: '8px 18px', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer',
            }}
          >
            Browse More Jobs
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '8px 0' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <div style={{
                width: 36, height: 36,
                border: '3px solid #D2C1B6',
                borderTopColor: '#1B3C53',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : error ? (
            <div style={{
              margin: '20px 28px',
              background: '#FCEBEB', border: '1px solid #F7C1C1',
              borderRadius: '10px', padding: '16px 20px',
              color: '#791F1F', fontSize: '14px',
            }}>{error}</div>
          ) : (
            <ApplicationTable applications={applications} />
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