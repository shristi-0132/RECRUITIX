/* ─── Recruitix Student UI — Design Tokens ─────────────────────
   Primary  : #1B3C53
   Secondary: #234C6A
   Accent   : #456882
   Light    : #D2C1B6
   ──────────────────────────────────────────────────────────── */

export const colors = {
  primary:   '#1B3C53',
  secondary: '#234C6A',
  accent:    '#456882',
  light:     '#D2C1B6',
  bg:        '#f7f4f1',
  surface:   '#ffffff',
  border:    '#f0ece8',
};

export const pageWrap = {
  minHeight: '100vh',
  background: '#f7f4f1',
  padding: '48px 40px',
  boxSizing: 'border-box',
  fontFamily: "'Sora', 'Segoe UI', sans-serif",
};

export const heading = {
  margin: 0,
  fontSize: '28px',
  fontWeight: 700,
  color: '#1B3C53',
  letterSpacing: '-0.3px',
};

export const inputStyle = {
  border: '1px solid #D2C1B6',
  borderRadius: '8px',
  padding: '11px 14px',
  fontSize: '14px',
  color: '#1B3C53',
  background: '#faf8f6',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.15s',
};

export const labelStyle = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.7px',
  textTransform: 'uppercase',
  color: '#456882',
};

export const btnPrimary = {
  background: '#1B3C53',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  padding: '12px 28px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  letterSpacing: '0.3px',
  fontFamily: 'inherit',
  transition: 'background 0.2s',
};

export const btnSecondary = {
  background: 'transparent',
  color: '#456882',
  border: '1px solid #D2C1B6',
  borderRadius: '10px',
  padding: '12px 28px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
};