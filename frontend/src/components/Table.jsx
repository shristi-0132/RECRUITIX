import React from 'react';

export default function Table({ columns, data, emptyMessage = 'No data found.' }) {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px',
        color: '#1B3C53',
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #D2C1B6' }}>
            {columns.map((col) => (
              <th key={col.key} style={{
                padding: '14px 16px',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                color: '#456882',
                whiteSpace: 'nowrap',
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{
                padding: '40px 16px',
                textAlign: 'center',
                color: '#456882',
                fontSize: '14px',
              }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} style={{
                borderBottom: '1px solid #f0ece8',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#faf8f6'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: '16px', verticalAlign: 'middle' }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}