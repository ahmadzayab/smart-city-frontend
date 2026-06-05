"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { loginUser, clearError } from "../../store/slices/authSlice";

// const ROLE_OPTIONS: { value: Role; label: string }[] = [
//   { value: 'RESIDENT',         label: 'Resident' },
//   { value: 'DEPT_ADMIN',       label: 'Department Admin' },
//   { value: 'KNOWLEDGE_WORKER', label: 'Knowledge Worker' },
// ];

interface SignInProps {
  onSwitchToRegister?: () => void;
  onClose?: () => void;
}

export function SignIn({ onSwitchToRegister, onClose }: SignInProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, user } = useAppSelector((s) => s.auth);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // track whether THIS form submitted a login — prevents auto-redirect on open
  const [attempted, setAttempted] = React.useState(false);

  useEffect(() => {
    // only redirect if the user just logged in via this form, not from a persisted session
    if (user) {
      const role = user.user_roles[0]?.role.name; // assuming single role per user for simplicity

      onClose?.();

      const roleRouteMap: Record<string, string> = {
        SUPER_ADMIN: "/dashboard/super_admin",
        DEPARTMENT_ADMIN: "/dashboard/dept_admin",
        EMPLOYEE: "/dashboard/employee",
        RESIDENT: "/dashboard/resident",
      };

      const route = roleRouteMap[role];
      router.push(route);
    }
  }, [user, router, onClose]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  function handleError() {
    return error ? (
      <p className="form-field__error">
        <i className="ti ti-alert-circle" /> {error}
      </p>
    ) : null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttempted(true);
    dispatch(loginUser({ email, password }));
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

      <Button type="submit" loading={loading} className="w-full">
        Continue
      </Button>
      <div className="center-align">{handleError()}</div>
      <div className="auth-switch">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="auth-switch__link"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
