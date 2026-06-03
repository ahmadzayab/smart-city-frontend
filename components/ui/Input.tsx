import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: string; // Tabler icon suffix e.g. 'ti-mail'
}

export function Input({ label, error, iconLeft, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="form-field__label">
          {label}
        </label>
      )}
      <div className="form-field__input-wrap">
        {iconLeft && (
          <i
            className={clsx('ti', iconLeft, 'form-field__icon')}
            aria-hidden="true"
          />
        )}
        <input
          id={inputId}
          className={clsx(
            'form-field__input',
            iconLeft && 'form-field__input--with-icon',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="form-field__error">
          <i className="ti ti-alert-circle" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
