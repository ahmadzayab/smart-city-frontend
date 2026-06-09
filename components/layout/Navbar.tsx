"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  onSignInClick?: () => void;
}

export function Navbar({ onSignInClick }: NavbarProps) {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar__logo">
        <span className="navbar__logo-dot" />
        UrbanCity
      </Link>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={onSignInClick}
          iconLeft={<i className="ti ti-user text-sm" aria-hidden="true" />}
        >
          Sign in
        </Button>
      </div>
    </nav>
  );
}
