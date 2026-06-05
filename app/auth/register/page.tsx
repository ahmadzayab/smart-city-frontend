"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { registerResident, clearError } from "../../store/slices/authSlice";

interface RegisterProps {
  onSwitchToSignIn?: () => void;
  onClose?: () => void;
}

export function Register({ onSwitchToSignIn, onClose }: RegisterProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, user } = useAppSelector((s) => s.auth);

  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [localError, setLocalError] = React.useState("");

  useEffect(() => {
    if (user) {
      onClose?.();
      router.push("/dashboard/resident");
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    dispatch(registerResident({ email, password, phone_number: phoneNumber }));
  }

  const displayError = localError || error;

  return (
    <form onSubmit={handleSubmit} className="modal__form">
      {/* <Input
        label="Full Name"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        iconLeft="ti-user"
        required
      /> */}
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
      {/* <Input
        label="House No"
        type="text"
        placeholder="House 12, Block A"
        value={houseNo}
        onChange={(e) => setHouseNo(e.target.value)}
        iconLeft="ti-home"
        required
      /> */}
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

      <Button type="submit" loading={loading} className="w-full">
        Create Account
      </Button>
      {displayError && (
        <p className="form-field__error">
          <i className="ti ti-alert-circle" /> {displayError}
        </p>
      )}
      <div className="auth-switch">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="auth-switch__link"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
