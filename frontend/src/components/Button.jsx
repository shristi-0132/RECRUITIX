import React from 'react';

const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: '0.875rem',
  letterSpacing: '0.02em',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  transition: 'all var(--transition)',
  padding: '0.6rem 1.4rem',
};

const variants = {
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-white)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-primary)',
    border: '1.5px solid var(--color-primary)',
  },
  danger: {
    background: 'var(--color-error)',
    color: 'var(--color-white)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-primary-light)',
  },
};

const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  style = {},
}) => {
  const variantStyle = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...base,
        ...variantStyle,
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
