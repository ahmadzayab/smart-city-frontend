"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToSignIn?: () => void;
}

export function Register({ onSuccess, onSwitchToSignIn }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone_number: phoneNumber,
          house_no: houseNo,
          password,
          role: "RESIDENT",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) throw new Error(data?.message || "Registration failed.");

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <Input
        label="Full Name"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        label="Phone Number"
        type="tel"
        placeholder="03xxxxxxxxx"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        iconLeft="ti-phone"
        required
      />
      <Input
        label="House No"
        type="text"
        placeholder="House 12, Block A"
        value={houseNo}
        onChange={(e) => setHouseNo(e.target.value)}
        iconLeft="ti-home"
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
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        iconLeft="ti-lock"
        required
      />

      {error && <p className="form-field__error"><i className="ti ti-alert-circle" aria-hidden="true" />{error}</p>}

      <Button type="submit" variant="primary" size="md" loading={loading} full>
        {loading ? "Creating account..." : "Create Account"}
      </Button>

      <div className="auth-switch">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToSignIn} className="auth-switch__link">
          Sign In
        </button>
      </div>
    </form>
  );
}