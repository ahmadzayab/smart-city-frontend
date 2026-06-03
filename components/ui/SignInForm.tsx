'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Role, ROLE_LABELS } from '@/types/auth';

const roleOptions = (Object.keys(ROLE_LABELS) as Role[]).map((role) => ({
  value: role,
  label: ROLE_LABELS[role],
}));

interface SignInFormProps {
  defaultRole?: Role;
  onSuccess?: () => void;
}

export function SignInForm({ defaultRole = 'RESIDENT', onSuccess }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(defaultRole);
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
      setError('Invalid credentials. Please try again.');
      return;
    }

    onSuccess?.();
  }

  return (
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
        Continue
      </Button>
    </form>
  );
}
