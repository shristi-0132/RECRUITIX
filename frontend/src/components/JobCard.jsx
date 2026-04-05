import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const skills = job?.skills
    ? job.skills.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4)
    : [];

  return (
    <div
      onClick={() => navigate(`/student/jobs/${job.job_id}`)}
      style={{
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 2px 12px rgba(27,60,83,0.07)',
        padding: '24px',
        cursor: 'pointer',
        border: '1px solid #f0ece8',
        transition: 'box-shadow 0.2s, transform 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(27,60,83,0.14)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(27,60,83,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Company + title */}
      <div>
        <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#456882', fontWeight: 600, letterSpacing: '0.4px' }}>
          {job.company_name || 'Company'}
        </p>
        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#1B3C53', lineHeight: 1.3 }}>
          {job.title}
        </h3>
      </div>

      {/* Skills pills */}
      {skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skills.map((sk, i) => (
            <span key={i} style={{
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              background: '#f0ece8',
              color: '#456882',
              border: '1px solid #D2C1B6',
            }}>{sk}</span>
          ))}
        </div>
      )}

      {/* Meta row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '8px',
        borderTop: '1px solid #f0ece8',
        marginTop: 'auto',
      }}>
        <MetaItem label="Min CGPA" value={job.min_cgpa ?? '—'} />
        <MetaItem label="Package" value={job.expected_package ? `₹${job.expected_package} LPA` : '—'} />
        <span style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#1B3C53',
          borderBottom: '1px solid #D2C1B6',
        }}>
          View Details →
        </span>
      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <p style={{ margin: 0, fontSize: '10px', color: '#456882', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#234C6A' }}>{value}</p>
    </div>
  );
}