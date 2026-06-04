"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface SignInFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function SignIn({ onSuccess, onSwitchToRegister }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    onSuccess?.();
  }

  return (
    <>
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

        {error && <p className="form-field__error"><i className="ti ti-alert-circle" aria-hidden="true" />{error}</p>}

        <Button type="submit" variant="primary" size="md" loading={loading} full>
          {loading ? "Signing in..." : "Continue"}
        </Button>
      </form>
      <div className="auth-switch">
        Don't have an account?{" "}
        <button
          type="button"
          className="auth-switch__link"
          onClick={onSwitchToRegister}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
