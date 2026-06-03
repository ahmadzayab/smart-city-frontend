'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, phone_number: phone }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message ?? 'Registration failed. Please try again.');
        return;
      }

      // Registration successful — redirect to sign in
      router.push('/auth/signin');
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
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

        <h1 className="modal__title" style={{ fontSize: '1.25rem' }}>Create an account</h1>
        <p className="modal__subtitle">Register as a resident to access city services</p>

        <form onSubmit={handleSubmit} className="modal__form">
          <Input
            label="Username"
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            iconLeft="ti-user"
            required
          />
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
            label="Phone (optional)"
            type="tel"
            placeholder="+1 234 567 8900"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            iconLeft="ti-phone"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Min 8 chars, A-z, 0-9, @$!%*?&"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft="ti-lock"
            required
          />
          {error && (
            <p className="form-field__error">
              <i className="ti ti-alert-circle" aria-hidden="true" />
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" size="md" loading={loading} full>
            Create account
          </Button>
        </form>

        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-gray-500)', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/auth/signin" style={{ color: 'var(--color-brand)', fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
