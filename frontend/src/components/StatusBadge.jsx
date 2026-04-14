import React from 'react';
import { APPLICATION_STATUS } from '../utils/constants';

const statusConfig = {
  [APPLICATION_STATUS.APPLIED]: {
    label: 'Applied',
    background: '#e8f0fe',
    color: 'var(--color-info)',
    dot: '#234C6A',
  },
  [APPLICATION_STATUS.SHORTLISTED]: {
    label: 'Shortlisted',
    background: '#e6f4ec',
    color: 'var(--color-success)',
    dot: '#2d7a4f',
  },
  [APPLICATION_STATUS.REJECTED]: {
    label: 'Rejected',
    background: '#fde8e8',
    color: 'var(--color-error)',
    dot: '#b91c1c',
  },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || {
    label: status,
    background: 'var(--color-accent)',
    color: 'var(--color-text-muted)',
    dot: 'var(--color-text-muted)',
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: config.background,
        color: config.color,
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        borderRadius: '999px',
        padding: '0.25rem 0.75rem',
      }}
    >
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: config.dot,
        flexShrink: 0,
      }} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
