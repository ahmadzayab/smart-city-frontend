'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Modal } from '@/components/ui/Modal';
import { SignIn } from '../app/auth/signin/page';
import { Register } from '../app/auth/register/page';
import { StatCard } from '@/components/ui/StatCard';
import { logout } from './store/slices/authSlice';
import { useAppDispatch } from './store/hook';

type ModalView = 'signin' | 'register' | null;

const STATS = [
  { value: '3',         label: 'Role-based portals' },
  { value: '24/7',      label: 'Service availability' },
  { value: 'Real-time', label: 'Issue tracking' },
  { value: 'Redux',     label: 'State management' },
];

export default function LandingPage() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<ModalView>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchParams.get('signin') === 'true') setView('signin');
  }, [searchParams]);
    useEffect(() => {
    // If user visits landing page, clear session
    dispatch(logout());
    localStorage.removeItem('auth_token');
  }, []);

  return (
    <div className="page">
      <Navbar onSignInClick={() => setView('signin')} />

      <section className="hero">
        <p className="hero__eyebrow">Smart City Platform</p>
        <h1 className="hero__title">
          One city.<br />
          <span className="hero__title--accent">Connected.</span>
        </h1>
        <p className="hero__subtitle">
          Manage services, infrastructure, and residents through a unified
          digital platform built for modern urban governance.
        </p>
      </section>

      <hr className="divider" />

      <section className="stats-section">
        <div className="stats-grid">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      <div className="flex-1" />
      <Footer />

      {/* Sign In Modal */}
      <Modal
        open={view === 'signin'}
        onClose={() => setView(null)}
        title="Sign in"
        subtitle="Access your city portal"
      >
        <SignIn
          onSwitchToRegister={() => setView('register')}
          onClose={() => setView(null)}
        />
      </Modal>

      {/* Register Modal — Resident only */}
      <Modal
        open={view === 'register'}
        onClose={() => setView(null)}
        title="Create Account"
        subtitle="Register as a resident to get started"
      >
        <Register
          onSwitchToSignIn={() => setView('signin')}
          onClose={() => setView(null)}
        />
      </Modal>
    </div>
  );
}