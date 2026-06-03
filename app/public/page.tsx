'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RoleCard } from '@/components/ui/RoleCard';
import { Modal } from '@/components/ui/Modal';
import { SignInForm } from '@/components/ui/SignInForm';
import { StatCard } from '@/components/ui/StatCard';
import { Role, ROLE_REDIRECT } from '@/types/auth';

const ALL_ROLES: Role[] = ['RESIDENT', 'EMPLOYEE', 'DEPT_ADMIN', 'SUPER_ADMIN'];

const STATS = [
  { value: '4',         label: 'Role-based portals' },
  { value: '24/7',      label: 'Service availability' },
  { value: 'Real-time', label: 'Issue tracking' },
  { value: 'SSO',       label: 'Single sign-on' },
];

export default function LandingPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('RESIDENT');

  function openSignIn(role?: Role) {
    if (role) setSelectedRole(role);
    setModalOpen(true);
  }

  function handleSignInSuccess() {
    setModalOpen(false);
    router.push(ROLE_REDIRECT[selectedRole]);
  }

  return (
    <div className="page">
      <Navbar onSignInClick={() => openSignIn()} />

      {/* Hero */}
      <section className="hero">
        <p className="hero__eyebrow">Smart City Platform</p>
        <h1 className="hero__title">
          One city.<br />
          <span className="hero__title--accent">Connected.</span>
        </h1>
        <p className="hero__subtitle">
          Manage services, infrastructure, and residents through a unified digital
          platform built for modern urban governance.
        </p>
      </section>

      {/* Role cards */}
      <section className="roles-section">
        <p className="roles-section__label">Access by role</p>
        <div className="roles-grid">
          {ALL_ROLES.map((role) => (
            <RoleCard key={role} role={role} onClick={openSignIn} />
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      <div className="flex-1" />
      <Footer />

      {/* Sign-in modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Sign in"
        subtitle="Access your city portal"
      >
        <SignInForm defaultRole={selectedRole} onSuccess={handleSignInSuccess} />
      </Modal>
    </div>
  );
}
