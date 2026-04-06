import React from 'react';
import Card from './Card';
import StatusBadge from './StatusBadge';
import Button from './Button';

const JobCard = ({ job, applicationStatus, onApply }) => {
  if (!job) return null;
  const {
    job_id,
    title,
    company_name,
    description,
    skills,
    expected_package,
    min_cgpa,
  } = job;
  const skillList = Array.isArray(skills)
  ? skills
  : (skills?.split(',') || []).map(s => s.trim()).filter(Boolean);
  return (
    <Card>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: 'var(--color-primary)',
            margin: '0 0 0.2rem',
          }}>
            {title}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-primary-light)',
            margin: 0,
            fontWeight: 600,
          }}>
            {company_name}
          </p>
        </div>

        {applicationStatus && <StatusBadge status={applicationStatus} />}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        color: 'var(--color-text-muted)',
        margin: '0.9rem 0',
        lineHeight: 1.6,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {description}
      </p>

      {/* Meta row */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <span style={metaStyle}>
          <strong>Package</strong> ₹{Number(expected_package || 0).toLocaleString('en-IN')} p.a.
        </span>
        <span style={metaStyle}>
          <strong>Min CGPA</strong> {min_cgpa}
        </span>
      </div>

      {/* Skills */}
{skillList.length > 0 && (
  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
    {skillList.map(skill => (
      <span key={skill} style={skillChip}>{skill}</span>
    ))}
  </div>
)}

      {/* Apply button — only shown if no application exists yet */}
      {!applicationStatus && onApply && (
        <Button onClick={() => onApply(job_id)} fullWidth>
          Apply Now
        </Button>
      )}
    </Card>
  );
};

const metaStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.8rem',
  color: 'var(--color-text-muted)',
};

const skillChip = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.72rem',
  fontWeight: 600,
  color: 'var(--color-primary)',
  background: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: '999px',
  padding: '0.2rem 0.65rem',
  textTransform: 'lowercase',
};

export default JobCard;
