import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(27,60,83,0.45)',
          backdropFilter: 'blur(2px)',
          zIndex: 100,
        }}
      />

      {/* Dialog */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: '2rem',
          width: '90%',
          maxWidth: '420px',
          zIndex: 101,
        }}
      >
        {/* Header line */}
        <div style={{
          width: '40px',
          height: '3px',
          background: danger ? 'var(--color-error)' : 'var(--color-primary)',
          borderRadius: '2px',
          marginBottom: '1rem',
        }} />

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.2rem',
          color: 'var(--color-primary)',
          margin: '0 0 0.6rem',
        }}>
          {title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          margin: '0 0 1.5rem',
          lineHeight: 1.6,
        }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
