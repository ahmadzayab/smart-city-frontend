'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, subtitle, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx('modal', className)}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal__close"
          aria-label="Close modal"
        >
          <i className="ti ti-x" aria-hidden="true" />
        </button>

        {(title || subtitle) && (
          <div>
            {title && <h2 className="modal__title">{title}</h2>}
            {subtitle && <p className="modal__subtitle">{subtitle}</p>}
          </div>
        )}

        <div className="modal__form">
          {children}
        </div>
      </div>
    </div>
  );
}
