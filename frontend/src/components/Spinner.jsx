import React from 'react';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid var(--color-accent)',
    borderTop: '3px solid var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
};

const Spinner = ({ size = 36 }) => (
  <>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <div style={styles.wrapper}>
      <div style={{ ...styles.spinner, width: size, height: size }} />
    </div>
  </>
);

export default Spinner;
