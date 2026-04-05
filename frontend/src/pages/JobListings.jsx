import React, { useEffect, useState, useMemo } from 'react';
import JobCard from '../components/JobCard';
import { getAllJobs } from '../services/jobApi';
import { pageWrap, heading } from '../styles/theme';

export default function JobListings() {
  const [jobs,    setJobs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [search,  setSearch]  = useState('');
  const [minCgpa, setMinCgpa] = useState('');
  const [skill,   setSkill]   = useState('');

  useEffect(() => {
    getAllJobs()
      .then(res => setJobs(res.data.jobs || res.data))
      .catch(() => setError('Failed to load jobs. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = !search ||
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.company_name?.toLowerCase().includes(search.toLowerCase());
      const matchCgpa = !minCgpa || (job.min_cgpa <= parseFloat(minCgpa));
      const matchSkill = !skill ||
        job.skills?.toLowerCase().includes(skill.toLowerCase());
      return matchSearch && matchCgpa && matchSkill;
    });
  }, [jobs, search, minCgpa, skill]);

  return (
    <div style={pageWrap}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#456882', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Student Portal
        </p>
        <h1 style={heading}>Job Listings</h1>
        <p style={{ margin: '8px 0 0', color: '#456882', fontSize: '15px' }}>
          {loading ? '—' : `${filtered.length} position${filtered.length !== 1 ? 's' : ''} available`}
        </p>
      </div>

      {/* Filters */}
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 2px 12px rgba(27,60,83,0.07)',
        padding: '20px 24px',
        marginBottom: '28px',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
      }}>
        <FilterInput
          label="Search"
          placeholder="Job title or company…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 2, minWidth: '200px' }}
        />
        <FilterInput
          label="Min CGPA"
          placeholder="e.g. 7.5"
          type="number"
          step="0.1"
          value={minCgpa}
          onChange={e => setMinCgpa(e.target.value)}
          style={{ flex: 1, minWidth: '120px' }}
        />
        <FilterInput
          label="Skill"
          placeholder="e.g. React"
          value={skill}
          onChange={e => setSkill(e.target.value)}
          style={{ flex: 1, minWidth: '140px' }}
        />
        {(search || minCgpa || skill) && (
          <button
            onClick={() => { setSearch(''); setMinCgpa(''); setSkill(''); }}
            style={{
              background: 'none', border: '1px solid #D2C1B6',
              borderRadius: '8px', padding: '10px 16px',
              fontSize: '13px', color: '#456882', cursor: 'pointer',
              alignSelf: 'flex-end',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <LoadingGrid />
      ) : error ? (
        <ErrorBanner msg={error} />
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {filtered.map(job => <JobCard key={job.job_id} job={job} />)}
        </div>
      )}
    </div>
  );
}

/* ── Helpers ── */
function FilterInput({ label, style: outerStyle, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...outerStyle }}>
      <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#456882' }}>
        {label}
      </label>
      <input {...props} style={{
        border: '1px solid #D2C1B6',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '14px',
        color: '#1B3C53',
        outline: 'none',
        background: '#faf8f6',
        width: '100%',
        boxSizing: 'border-box',
      }} />
    </div>
  );
}

function LoadingGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          background: '#fff', borderRadius: '14px', padding: '24px',
          height: '160px', border: '1px solid #f0ece8',
          animation: 'pulse 1.4s ease-in-out infinite',
          animationDelay: `${i * 0.1}s`,
        }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#456882' }}>
      <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.4 }}>◻</div>
      <p style={{ fontSize: '16px', fontWeight: 600, color: '#234C6A', margin: '0 0 8px' }}>No jobs found</p>
      <p style={{ fontSize: '14px', margin: 0 }}>Try adjusting your search filters</p>
    </div>
  );
}

function ErrorBanner({ msg }) {
  return (
    <div style={{
      background: '#FCEBEB', border: '1px solid #F7C1C1', borderRadius: '12px',
      padding: '20px 24px', color: '#791F1F', fontSize: '14px',
    }}>{msg}</div>
  );
}