import React from 'react';

export default function ProfileCard({ profile, onEdit }) {
  const skills = profile?.skills
    ? profile.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 2px 16px rgba(27,60,83,0.08)',
      overflow: 'hidden',
    }}>
      {/* Header strip */}
      <div style={{
        background: 'linear-gradient(135deg, #1B3C53 0%, #234C6A 100%)',
        padding: '36px 36px 28px',
        position: 'relative',
      }}>
        {/* Avatar initials */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(210,193,182,0.25)',
          border: '2px solid rgba(210,193,182,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          fontWeight: 700,
          color: '#D2C1B6',
          marginBottom: '16px',
          fontFamily: "'Georgia', serif",
        }}>
          {profile?.name ? profile.name.charAt(0).toUpperCase() : '?'}
        </div>
        <h2 style={{ margin: 0, color: '#fff', fontSize: '22px', fontWeight: 700 }}>
          {profile?.name || 'No name set'}
        </h2>
        <p style={{ margin: '6px 0 0', color: '#D2C1B6', fontSize: '14px' }}>
          {profile?.enrollment_no || '—'}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '28px 36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '28px',
        }}>
          <InfoItem label="CGPA" value={profile?.cgpa ?? '—'} />
          <InfoItem label="Email" value={profile?.email || '—'} />
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#456882' }}>
            Skills
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.length > 0 ? skills.map((sk, i) => (
              <span key={i} style={{
                padding: '5px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                background: '#f0ece8',
                color: '#234C6A',
                fontWeight: 500,
                border: '1px solid #D2C1B6',
              }}>{sk}</span>
            )) : <span style={{ color: '#aaa', fontSize: '14px' }}>No skills added yet</span>}
          </div>
        </div>

        {/* Resume */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#456882' }}>
            Resume
          </p>
          {profile?.resume_url ? (
            <a href={profile.resume_url} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#1B3C53',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              borderBottom: '1px solid #D2C1B6',
              paddingBottom: '2px',
            }}>
              View Resume →
            </a>
          ) : (
            <span style={{ color: '#aaa', fontSize: '14px' }}>No resume uploaded</span>
          )}
        </div>

        {/* Edit button */}
        <button onClick={onEdit} style={{
          background: '#1B3C53',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          padding: '12px 28px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s',
          letterSpacing: '0.3px',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#234C6A'}
          onMouseLeave={e => e.currentTarget.style.background = '#1B3C53'}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#456882' }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1B3C53' }}>
        {value}
      </p>
    </div>
  );
}