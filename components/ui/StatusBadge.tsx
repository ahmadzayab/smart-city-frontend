import React from 'react';
import clsx from 'clsx';

type Status = 'online' | 'offline' | 'warning' | 'info';

const statusLabels: Record<Status, string> = {
  online:  'All systems operational',
  offline: 'Systems degraded',
  warning: 'Partial outage',
  info:    'Maintenance scheduled',
};

interface StatusBadgeProps {
  status?: Status;
  label?: string;
  className?: string;
}

export function StatusBadge({ status = 'online', label, className }: StatusBadgeProps) {
  return (
    <div className={clsx('status-badge', `status-badge--${status}`, className)}>
      <span className="status-badge__dot" />
      <span className="status-badge__label">{label ?? statusLabels[status]}</span>
    </div>
  );
}
