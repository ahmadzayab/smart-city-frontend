"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Modal } from "@/components/ui/Modal";
import { SignIn } from "./auth/signin/page";
import { Register } from "./auth/register/page";
import { StatCard } from "@/components/ui/StatCard";
import { Role, ROLE_REDIRECT } from "@/types/auth";

type ModalView = "signin" | "register" | null;

const STATS = [
  { value: "4",         label: "Role-based portals" },
  { value: "24/7",      label: "Service availability" },
  { value: "Real-time", label: "Issue tracking" },
  { value: "SSO",       label: "Single sign-on" },
];

export default function LandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<ModalView>(null);
  const [selectedRole] = useState<Role>("RESIDENT");

  useEffect(() => {
    if (searchParams.get("signin") === "true") setView("signin");
  }, [searchParams]);

  function handleSignInSuccess() {
    setView(null);
    router.push(ROLE_REDIRECT[selectedRole]);
  }

  function handleRegisterSuccess() {
    setView("signin");
  }

  return (
    <div className="page">
      <Navbar onSignInClick={() => setView("signin")} />

      <section className="hero">
        <p className="hero__eyebrow">Smart City Platform</p>
        <h1 className="hero__title">
          One city.
          <br />
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

      <Modal
        open={view === "signin"}
        onClose={() => setView(null)}
        title="Sign in"
        subtitle="Access your city portal"
      >
        <SignIn
          onSuccess={handleSignInSuccess}
          onSwitchToRegister={() => setView("register")}
        />
      </Modal>

      <Modal
        open={view === "register"}
        onClose={() => setView(null)}
        title="Create Account"
        subtitle="Register as a resident to get started"
      >
        <Register
          onSuccess={handleRegisterSuccess}
          onSwitchToSignIn={() => setView("signin")}
        />
      </Modal>
    </div>
  );
}