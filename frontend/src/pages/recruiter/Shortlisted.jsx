import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import Spinner from "../../components/Spinner";

import {
  getShortlisted,
  selectApplicant,
  rejectApplicant,
} from "../../services/recruiterApi";

export default function Shortlisted() {
  const { job_id } = useParams();
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    getShortlisted(job_id)
      .then(res => {
        const data = res.data;
        setCandidates(data.applications || data || []);
        setJobTitle(data.job_title || '');
      })
      .catch(() => setError('Failed to load shortlisted candidates.'))
      .finally(() => setLoading(false));
  }, [job_id]);

  const handleAction = async (studentId, action) => {
    const key = `${studentId}-${action}`;
    setActionLoading(key);
    try {
      if (action === 'select') {
        await selectApplicant({ job_id, student_id: studentId });
        setCandidates(prev =>
          prev.map(c => c.student_id === studentId ? { ...c, status: 'selected' } : c)
        );
      } else {
        await rejectApplicant({ job_id, student_id: studentId });
        setCandidates(prev =>
          prev.map(c => c.student_id === studentId ? { ...c, status: 'rejected' } : c)
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action}. Please try again.`);
    } finally {
      setActionLoading(null);
    }
  };

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
      label: 'Actions',
      render: (val, row) => {
        if (row.status === 'selected' || row.status === 'rejected') {
          return <span style={{ color: '#456882', fontSize: '13px', fontStyle: 'italic' }}>Finalised</span>;
        }
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleAction(val, 'select')}
              disabled={actionLoading !== null}
              style={{
                background: actionLoading === `${val}-select` ? '#f0ece8' : '#085041',
                color: actionLoading === `${val}-select` ? '#456882' : '#fff',
                border: 'none', borderRadius: '6px',
                padding: '6px 12px', fontSize: '12px',
                fontWeight: 600, cursor: actionLoading !== null ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {actionLoading === `${val}-select` ? '…' : 'Select'}
            </button>
            <button
              onClick={() => handleAction(val, 'reject')}
              disabled={actionLoading !== null}
              style={{
                background: actionLoading === `${val}-reject` ? '#f0ece8' : '#FCEBEB',
                color: actionLoading === `${val}-reject` ? '#456882' : '#791F1F',
                border: '1px solid #F7C1C1',
                borderRadius: '6px',
                padding: '6px 12px', fontSize: '12px',
                fontWeight: 600, cursor: actionLoading !== null ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {actionLoading === `${val}-reject` ? '…' : 'Reject'}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Back */}
        <button
          onClick={() => navigate(`/recruiter/applications/${job_id}`)}
          style={{ background: 'none', border: 'none', color: '#456882', cursor: 'pointer', fontSize: '14px', padding: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ← Back to Applicants
        </button>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#456882', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Recruiter Portal
          </p>
          <h1 style={heading}>
            {jobTitle ? `Shortlisted — ${jobTitle}` : 'Shortlisted Candidates'}
          </h1>
          <p style={{ margin: '8px 0 0', color: '#456882', fontSize: '15px' }}>
            {loading ? '—' : `${candidates.filter(c => c.status === 'shortlisted').length} candidate${candidates.filter(c => c.status === 'shortlisted').length !== 1 ? 's' : ''} awaiting final decision`}
          </p>
        </div>

        {/* Table card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(27,60,83,0.08)',
          overflow: 'hidden',
        }}>
          {/* Card header */}
          <div style={{
            background: 'linear-gradient(135deg, #1B3C53 0%, #234C6A 100%)',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                Shortlisted Candidates
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#D2C1B6' }}>
                Select or reject candidates to finalise hiring
              </p>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <MiniStat
                label="Selected"
                value={candidates.filter(c => c.status === 'selected').length}
                color="#4ade80"
              />
              <MiniStat
                label="Rejected"
                value={candidates.filter(c => c.status === 'rejected').length}
                color="#f87171"
              />
            </div>
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
                data={candidates}
                emptyMessage="No shortlisted candidates yet."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: '22px', fontWeight: 700, color }}>{value}</p>
      <p style={{ margin: 0, fontSize: '11px', color: '#D2C1B6', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase' }}>{label}</p>
    </div>
  );
}
