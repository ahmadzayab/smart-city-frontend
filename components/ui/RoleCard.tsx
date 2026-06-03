'use client';

import React from 'react';
import clsx from 'clsx';
import { Role, ROLE_LABELS, ROLE_DESCRIPTIONS, ROLE_ICONS, ROLE_PORTAL_LABELS } from '@/types/auth';

// BEM modifier maps to globals.css: .role-card--resident, --employee, --dept-admin, --super-admin
const roleBemModifier: Record<Role, string> = {
  RESIDENT:   'role-card--resident',
  EMPLOYEE:   'role-card--employee',
  DEPT_ADMIN: 'role-card--dept-admin',
  SUPER_ADMIN:'role-card--super-admin',
};

interface RoleCardProps {
  role: Role;
  onClick?: (role: Role) => void;
  className?: string;
}

export function RoleCard({ role, onClick, className }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(role)}
      className={clsx('role-card', roleBemModifier[role], className)}
    >
      {/* Icon block — color comes from BEM modifier in globals.css */}
      <div className="role-card__icon">
        <i className={`ti ${ROLE_ICONS[role]}`} aria-hidden="true" />
      </div>

      <p className="role-card__title">{ROLE_LABELS[role]}</p>
      <p className="role-card__desc">{ROLE_DESCRIPTIONS[role]}</p>

      <span className="role-card__tag">{ROLE_PORTAL_LABELS[role]}</span>
    </button>
  );
}
