import React from 'react';
import Table from './Table';
import StatusBadge from './StatusBadge';

export default function ApplicationTable({ applications }) {
  const columns = [
    {
      key: 'job_title',
      label: 'Job Title',
      render: (val) => (
        <span style={{ fontWeight: 600, color: '#1B3C53' }}>{val || '—'}</span>
      ),
    },
    {
      key: 'company_name',
      label: 'Company',
      render: (val) => (
        <span style={{ color: '#456882' }}>{val || '—'}</span>
      ),
    },
    {
      key: 'application_date',
      label: 'Applied On',
      render: (val) => val
        ? new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : '—',
    },
    {
      key: 'expected_package',
      label: 'Package',
      render: (val) => val ? `₹${val} LPA` : '—',
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <Table
      columns={columns}
      data={applications}
      emptyMessage="You haven't applied to any jobs yet."
    />
  );
}
