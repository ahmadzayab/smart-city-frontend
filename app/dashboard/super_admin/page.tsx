"use client";

import { useState } from "react";
import Link from "next/link";
const MOCK_USERS = [
  {
    id: "u-1",
    name: "Ali Hassan",
    email: "ali@UrbanCity.gov",
    role: "RESIDENT",
    is_active: true,
    joined: "2026-01-12",
  },
  {
    id: "u-2",
    name: "Tariq Mahmood",
    email: "tariq@UrbanCity.gov",
    role: "EMPLOYEE",
    is_active: true,
    joined: "2026-02-03",
  },
  {
    id: "u-3",
    name: "Sara Khalid",
    email: "sara@UrbanCity.gov",
    role: "EMPLOYEE",
    is_active: true,
    joined: "2026-02-10",
  },
  {
    id: "u-4",
    name: "Nadia Hussain",
    email: "nadia@UrbanCity.gov",
    role: "DEPARTMENT_ADMIN",
    is_active: true,
    joined: "2026-01-20",
  },
  {
    id: "u-5",
    name: "Zara Noor",
    email: "zara@UrbanCity.gov",
    role: "RESIDENT",
    is_active: false,
    joined: "2026-03-05",
  },
  {
    id: "u-6",
    name: "Kamran Ali",
    email: "kamran@UrbanCity.gov",
    role: "RESIDENT",
    is_active: true,
    joined: "2026-03-18",
  },
  {
    id: "u-7",
    name: "Bilal Akhtar",
    email: "bilal@UrbanCity.gov",
    role: "EMPLOYEE",
    is_active: false,
    joined: "2026-04-01",
  },
  {
    id: "u-8",
    name: "Super Admin",
    email: "admin@UrbanCity.gov",
    role: "SUPER_ADMIN",
    is_active: true,
    joined: "2025-12-01",
  },
];

const MOCK_DEPARTMENTS = [
  {
    id: "d-1",
    name: "Roads & Infrastructure",
    code: "RI",
    admin: "Nadia Hussain",
    employees: 4,
    open_complaints: 3,
  },
  {
    id: "d-2",
    name: "Health Services",
    code: "HS",
    admin: "Omar Sheikh",
    employees: 6,
    open_complaints: 1,
  },
  {
    id: "d-3",
    name: "Sanitation & Waste Mgmt",
    code: "SW",
    admin: "Hina Malik",
    employees: 3,
    open_complaints: 2,
  },
  {
    id: "d-4",
    name: "Electricity & Utilities",
    code: "EU",
    admin: "Fahad Raza",
    employees: 5,
    open_complaints: 0,
  },
  {
    id: "d-5",
    name: "Public Safety",
    code: "PS",
    admin: "Ayesha Butt",
    employees: 8,
    open_complaints: 4,
  },
];

const MOCK_COMPLAINTS = [
  {
    id: "c-101",
    ticket: "TKT-2026-881",
    title: "Water pipe burst on Main Street",
    dept: "Roads & Infrastructure",
    status: "in_progress",
    filed: "2026-06-01",
    employee: "Tariq Mahmood",
  },
  {
    id: "c-102",
    ticket: "TKT-2026-904",
    title: "Pothole near school zone",
    dept: "Roads & Infrastructure",
    status: "assigned",
    filed: "2026-06-03",
    employee: "Sara Khalid",
  },
  {
    id: "c-103",
    ticket: "TKT-2026-917",
    title: "Broken street light — Block 7",
    dept: "Electricity & Utilities",
    status: "submitted",
    filed: "2026-06-05",
    employee: "—",
  },
  {
    id: "c-104",
    ticket: "TKT-2026-933",
    title: "Road construction debris blocking road",
    dept: "Roads & Infrastructure",
    status: "resolved",
    filed: "2026-05-28",
    employee: "Nadia Hussain",
  },
  {
    id: "c-105",
    ticket: "TKT-2026-940",
    title: "Drain overflow near market",
    dept: "Sanitation & Waste Mgmt",
    status: "in_progress",
    filed: "2026-06-06",
    employee: "Tariq Mahmood",
  },
  {
    id: "c-106",
    ticket: "TKT-2026-955",
    title: "Fire hazard near fuel station",
    dept: "Public Safety",
    status: "submitted",
    filed: "2026-06-07",
    employee: "—",
  },
  {
    id: "c-107",
    ticket: "TKT-2026-961",
    title: "Garbage not collected for 4 days",
    dept: "Sanitation & Waste Mgmt",
    status: "resolved",
    filed: "2026-06-02",
    employee: "Bilal Akhtar",
  },
];

const SYSTEM_INFO = [
  { key: "API Base URL", value: "http://localhost:3001" },
  { key: "App Version", value: "v1.0.0-beta" },
  { key: "Environment", value: "DEV" },
  { key: "Last Deploy", value: "2026-06-08 14:32 UTC" },
  { key: "Database", value: "PostgreSQL 16" },
  { key: "Auth Strategy", value: "JWT + Refresh Token" },
  { key: "ORM", value: "Prisma 7" },
  { key: "Node Version", value: "v24.13.0" },
];

const STATUS_CFG: Record<
  string,
  { bg: string; color: string; dot: string; label: string }
> = {
  resolved: {
    bg: "#d1fae5",
    color: "#065f46",
    dot: "#10b981",
    label: "Resolved",
  },
  in_progress: {
    bg: "#fef3c7",
    color: "#92400e",
    dot: "#f59e0b",
    label: "In Progress",
  },
  assigned: {
    bg: "#eff6ff",
    color: "#1e40af",
    dot: "#3b82f6",
    label: "Assigned",
  },
  submitted: {
    bg: "#f3f4f6",
    color: "#374151",
    dot: "#9ca3af",
    label: "Submitted",
  },
  rejected: {
    bg: "#fee2e2",
    color: "#991b1b",
    dot: "#ef4444",
    label: "Rejected",
  },
};

const ROLE_CFG: Record<string, { bg: string; color: string; label: string }> = {
  RESIDENT: { bg: "#e1f5ee", color: "#0f6e56", label: "Resident" },
  EMPLOYEE: { bg: "#eff6ff", color: "#1e40af", label: "Employee" },
  DEPARTMENT_ADMIN: { bg: "#fffbeb", color: "#92400e", label: "Dept Admin" },
  SUPER_ADMIN: { bg: "#f5f3ff", color: "#5b21b6", label: "Super Admin" },
};

type Tab = "users" | "departments" | "complaints" | "system";

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [userSearch, setUserSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");

  const handleEditRole = (id: string) => alert(`Edit role for user ${id}`);
  const handleDeactivate = (id: string) =>
    alert(`Toggle active for user ${id}`);
  const handleViewDept = (id: string) => alert(`View department ${id}`);
  const handleEditDept = (id: string) => alert(`Edit department ${id}`);

  const totalUsers = MOCK_USERS.length;
  const totalDepts = MOCK_DEPARTMENTS.length;
  const totalComplaints = MOCK_COMPLAINTS.length;
  const resolved = MOCK_COMPLAINTS.filter(
    (c) => c.status === "resolved",
  ).length;
  const pending = MOCK_COMPLAINTS.filter(
    (c) => c.status === "submitted" || c.status === "assigned",
  ).length;

  // Filtered lists
  const filteredUsers = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()),
  );

  const filteredComplaints = MOCK_COMPLAINTS.filter((c) => {
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchDept = deptFilter === "all" || c.dept === deptFilter;
    return matchStatus && matchDept;
  });

  return (
    <div className="page">
      <nav className="navbar">
        <Link href="/" className="navbar__logo">
          <span className="navbar__logo-dot" />
          UrbanCity
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#5b21b6",
              background: "#f5f3ff",
              border: "1px solid #ddd6fe",
              borderRadius: "var(--radius-full)",
              padding: "4px 12px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Super Admin
          </span>
        </div>
      </nav>

      <main
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "2.5rem var(--section-px)",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <p className="hero__eyebrow" style={{ color: "#7c3aed" }}>
            System Control
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem,3vw,2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--color-gray-900)",
              marginBottom: 6,
            }}
          >
            Super Admin Console
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-gray-500)" }}>
            Full system access — users, departments, complaints, and
            configuration.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 10,
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Users", value: totalUsers, accent: "#7c3aed" },
            {
              label: "Departments",
              value: totalDepts,
              accent: "var(--color-employee)",
            },
            {
              label: "Complaints",
              value: totalComplaints,
              accent: "var(--color-gray-900)",
            },
            { label: "Resolved", value: resolved, accent: "#10b981" },
            { label: "Pending", value: pending, accent: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.9rem",
                  fontWeight: 800,
                  color: s.accent,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {s.value}
              </p>
              <p className="stat-card__label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Tab Switcher ───────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "var(--color-gray-100)",
            border: "1px solid var(--color-gray-200)",
            borderRadius: "var(--radius-lg)",
            padding: 4,
            marginBottom: "1.75rem",
          }}
        >
          {(
            [
              { id: "users", label: "Users" },
              { id: "departments", label: "Departments" },
              { id: "complaints", label: "Complaints" },
              { id: "system", label: "System" },
            ] as { id: Tab; label: string }[]
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  transition: "all var(--transition-fast)",
                  background: active ? "#fff" : "transparent",
                  color: active
                    ? "var(--color-gray-900)"
                    : "var(--color-gray-400)",
                  boxShadow: active ? "var(--shadow-sm)" : "none",
                  outline: "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "users" && (
          <div>
            {/* Search */}
            <div
              className="form-field"
              style={{ marginBottom: "1rem", maxWidth: 340 }}
            >
              <div className="form-field__input-wrap">
                <i className="ti ti-search form-field__icon" />
                <input
                  type="text"
                  placeholder="Search by name or email…"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="form-field__input form-field__input--with-icon"
                />
              </div>
            </div>

            {/* User list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredUsers.map((u) => {
                const r = ROLE_CFG[u.role] ?? ROLE_CFG["RESIDENT"];
                const initials = u.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2);
                return (
                  <div
                    key={u.id}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--color-gray-200)",
                      borderRadius: "var(--radius-xl)",
                      padding: "0.9rem 1.25rem",
                      boxShadow: "var(--shadow-xs)",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      transition: "box-shadow var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: r.bg,
                        border: `1px solid ${r.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        color: r.color,
                      }}
                    >
                      {initials}
                    </div>

                    {/* Name + email */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "var(--color-gray-900)",
                          fontFamily: "var(--font-display)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {u.name}
                      </p>
                      <p
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--color-gray-400)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {u.email}
                      </p>
                    </div>

                    {/* Role pill */}
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        padding: "3px 9px",
                        borderRadius: "var(--radius-full)",
                        background: r.bg,
                        color: r.color,
                      }}
                    >
                      {r.label}
                    </span>

                    {/* Status */}
                    <span
                      style={{
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        padding: "3px 9px",
                        borderRadius: "var(--radius-full)",
                        background: u.is_active
                          ? "#d1fae5"
                          : "var(--color-gray-100)",
                        color: u.is_active
                          ? "#065f46"
                          : "var(--color-gray-500)",
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: u.is_active
                            ? "#10b981"
                            : "var(--color-gray-300)",
                          display: "inline-block",
                        }}
                      />
                      {u.is_active ? "Active" : "Inactive"}
                    </span>

                    {/* Joined */}
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: "0.72rem",
                        color: "var(--color-gray-400)",
                        minWidth: 80,
                        textAlign: "right",
                      }}
                    >
                      {u.joined}
                    </span>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => handleEditRole(u.id)}
                      >
                        <i className="ti ti-pencil" /> Edit Role
                      </button>
                      <button
                        className="btn btn--sm"
                        onClick={() => handleDeactivate(u.id)}
                        style={{
                          background: u.is_active ? "#fee2e2" : "#d1fae5",
                          color: u.is_active ? "#991b1b" : "#065f46",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "var(--radius-md)",
                          padding: "6px 12px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {u.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </div>
                );
              })}
              {filteredUsers.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--color-gray-400)",
                    fontSize: "0.875rem",
                  }}
                >
                  No users found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 2 — Departments
        ══════════════════════════════════════════════════ */}
        {activeTab === "departments" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 12,
            }}
          >
            {MOCK_DEPARTMENTS.map((d) => (
              <div
                key={d.id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-gray-200)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.25rem",
                  boxShadow: "var(--shadow-xs)",
                  transition:
                    "box-shadow var(--transition-fast), border-color var(--transition-fast)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  e.currentTarget.style.borderColor = "var(--color-gray-300)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                  e.currentTarget.style.borderColor = "var(--color-gray-200)";
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "var(--color-gray-900)",
                        marginBottom: 2,
                      }}
                    >
                      {d.name}
                    </p>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: "var(--color-employee)",
                        background: "var(--color-employee-bg)",
                        border: "1px solid #bfdbfe",
                        borderRadius: "var(--radius-sm)",
                        padding: "1px 7px",
                      }}
                    >
                      {d.code}
                    </span>
                  </div>
                  {d.open_complaints > 0 && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "var(--radius-full)",
                        padding: "2px 8px",
                      }}
                    >
                      {d.open_complaints} open
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    paddingTop: 6,
                    borderTop: "1px solid var(--color-gray-100)",
                  }}
                >
                  {[
                    { icon: "ti-user-shield", text: d.admin, label: "Admin" },
                    {
                      icon: "ti-users",
                      text: `${d.employees} employees`,
                      label: "Staff",
                    },
                    {
                      icon: "ti-clipboard",
                      text: `${d.open_complaints} open complaints`,
                      label: "Open",
                    },
                  ].map((m) => (
                    <span
                      key={m.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.75rem",
                        color: "var(--color-gray-500)",
                      }}
                    >
                      <i
                        className={`ti ${m.icon}`}
                        style={{
                          color: "var(--color-gray-400)",
                          fontSize: "0.8rem",
                          width: 14,
                        }}
                      />
                      {m.text}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, paddingTop: 8 }}>
                  <button
                    className="btn btn--secondary btn--sm"
                    style={{ flex: 1 }}
                    onClick={() => handleViewDept(d.id)}
                  >
                    <i className="ti ti-eye" /> View
                  </button>
                  <button
                    className="btn btn--primary btn--sm"
                    style={{ flex: 1 }}
                    onClick={() => handleEditDept(d.id)}
                  >
                    <i className="ti ti-pencil" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 3 — Complaints
        ══════════════════════════════════════════════════ */}
        {activeTab === "complaints" && (
          <div>
            {/* Filters */}
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div className="form-field" style={{ width: 180 }}>
                <select
                  className="form-field__select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-field" style={{ width: 220 }}>
                <select
                  className="form-field__select"
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {MOCK_DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-gray-400)",
                  alignSelf: "center",
                }}
              >
                {filteredComplaints.length} result
                {filteredComplaints.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Complaints list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredComplaints.map((c) => {
                const s = STATUS_CFG[c.status] ?? STATUS_CFG["submitted"];
                return (
                  <div
                    key={c.id}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--color-gray-200)",
                      borderRadius: "var(--radius-xl)",
                      padding: "0.9rem 1.25rem",
                      boxShadow: "var(--shadow-xs)",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      flexWrap: "wrap",
                      transition: "box-shadow var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                    }}
                  >
                    {/* Ticket */}
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--color-employee)",
                        background: "var(--color-employee-bg)",
                        border: "1px solid #bfdbfe",
                        borderRadius: "var(--radius-sm)",
                        padding: "2px 8px",
                        flexShrink: 0,
                      }}
                    >
                      {c.ticket}
                    </span>

                    {/* Title */}
                    <p
                      style={{
                        flex: 1,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--color-gray-900)",
                        fontFamily: "var(--font-display)",
                        minWidth: 160,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.title}
                    </p>

                    {/* Department */}
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--color-gray-400)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className="ti ti-building"
                        style={{ fontSize: "0.75rem" }}
                      />
                      {c.dept}
                    </span>

                    {/* Status */}
                    <span
                      style={{
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        padding: "3px 9px",
                        borderRadius: "var(--radius-full)",
                        background: s.bg,
                        color: s.color,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: s.dot,
                          display: "inline-block",
                        }}
                      />
                      {s.label}
                    </span>

                    {/* Assigned employee */}
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--color-gray-400)",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <i
                        className="ti ti-user"
                        style={{ fontSize: "0.75rem" }}
                      />
                      {c.employee}
                    </span>

                    {/* Date */}
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--color-gray-400)",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <i
                        className="ti ti-calendar"
                        style={{ fontSize: "0.75rem" }}
                      />
                      {c.filed}
                    </span>
                  </div>
                );
              })}
              {filteredComplaints.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--color-gray-400)",
                    fontSize: "0.875rem",
                  }}
                >
                  No complaints match the selected filters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 4 — System
        ══════════════════════════════════════════════════ */}
        {activeTab === "system" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Environment badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  background: "#fef3c7",
                  color: "#92400e",
                  border: "1px solid #fde68a",
                }}
              >
                ● DEV environment — not for production use
              </span>
            </div>

            {/* Config rows */}
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--color-gray-200)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              {SYSTEM_INFO.map((item, i) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 20px",
                    borderBottom:
                      i < SYSTEM_INFO.length - 1
                        ? "1px solid var(--color-gray-100)"
                        : "none",
                    background: i % 2 === 0 ? "#fff" : "var(--color-gray-50)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--color-gray-600)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.key}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono','Fira Code',monospace",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color:
                        item.value === "DEV"
                          ? "#d97706"
                          : item.value === "PROD"
                            ? "#065f46"
                            : "var(--color-gray-800)",
                      background:
                        item.value === "DEV"
                          ? "#fef3c7"
                          : item.value === "PROD"
                            ? "#d1fae5"
                            : "transparent",
                      padding:
                        item.value === "DEV" || item.value === "PROD"
                          ? "2px 8px"
                          : "0",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Read-only notice */}
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--color-gray-400)",
                textAlign: "center",
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <i className="ti ti-lock" style={{ fontSize: "0.75rem" }} />
              Read-only — configuration changes require server-side environment
              variables
            </p>
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="footer">
        <p className="footer__text">
          © {new Date().getFullYear()} UrbanCity City Platform
        </p>
        <div className="status-badge status-badge--online">
          <span className="status-badge__dot" />
          <span className="status-badge__label">All systems operational</span>
        </div>
      </footer>
    </div>
  );
}
