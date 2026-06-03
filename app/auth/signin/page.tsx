'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Role, ROLE_LABELS, ROLE_REDIRECT } from '@/types/auth';

const roleOptions = (Object.keys(ROLE_LABELS) as Role[]).map((role) => ({
  value: role,
  label: ROLE_LABELS[role],
}));

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('RESIDENT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      role,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password.');
      return;
    }

    router.push(ROLE_REDIRECT[role]);
  }

  return (
    <div className="page" style={{ alignItems: 'center', justifyContent: 'center', background: 'var(--color-gray-50)' }}>
      <div className="modal" style={{ position: 'static', boxShadow: 'var(--shadow-lg)', maxWidth: '400px', width: '100%' }}>
        {/* Logo */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/" className="navbar__logo" style={{ justifyContent: 'flex-start' }}>
            <span className="navbar__logo-dot" />
            UrbanOS
          </Link>
        </div>

        <h1 className="modal__title" style={{ fontSize: '1.25rem' }}>Welcome back</h1>
        <p className="modal__subtitle">Sign in to your city portal</p>

        <form onSubmit={handleSubmit} className="modal__form">
          <Input
            label="Email"
            type="email"
            placeholder="you@city.gov"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft="ti-mail"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft="ti-lock"
            required
          />
          <Select
            label="Role"
            options={roleOptions}
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          />
          {error && (
            <p className="form-field__error">
              <i className="ti ti-alert-circle" aria-hidden="true" />
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" size="md" loading={loading} full>
            Sign in
          </Button>
        </form>

        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-gray-500)', textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" style={{ color: 'var(--color-brand)', fontWeight: 500 }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
