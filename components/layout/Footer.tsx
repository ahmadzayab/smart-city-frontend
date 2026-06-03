import React from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {new Date().getFullYear()} UrbanOS City Platform</p>
      <StatusBadge status="online" />
    </footer>
  );
}
