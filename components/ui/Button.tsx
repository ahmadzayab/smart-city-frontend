import React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  full?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  full = false,
  iconLeft,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        full && 'btn--full',
        className
      )}
      {...props}
    >
      {loading
        ? <i className="ti ti-loader-2 animate-spin" aria-hidden="true" />
        : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}
