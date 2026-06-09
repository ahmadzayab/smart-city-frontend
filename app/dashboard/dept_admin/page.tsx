"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_DEPT = { name: "Roads & Infrastructure", code: "RI" };

const MOCK_EMPLOYEES = [
  {
    id: "emp-1",
    name: "Tariq Mahmood",
    email: "tariq@UrbanCity.gov",
    active_complaints: 3,
    is_active: true,
  },
  {
    id: "emp-2",
    name: "Sara Khalid",
    email: "sara@UrbanCity.gov",
    active_complaints: 1,
    is_active: true,
  },
  {
    id: "emp-3",
    name: "Bilal Akhtar",
    email: "bilal@UrbanCity.gov",
    active_complaints: 0,
    is_active: false,
  },
  {
    id: "emp-4",
    name: "Nadia Hussain",
    email: "nadia@UrbanCity.gov",
    active_complaints: 2,
    is_active: true,
  },
];

const MOCK_COMPLAINTS = [
  {
    id: "c-101",
    ticket_number: "TKT-2026-881",
    title: "Water pipe burst on Main Street",
    resident: "Ali Hassan",
    status: "in_progress",
    employee: "Tariq Mahmood",
    created_at: "2026-06-01",
  },
  {
    id: "c-102",
    ticket_number: "TKT-2026-904",
    title: "Pothole near school zone",
    resident: "Zara Noor",
    status: "assigned",
    employee: "Sara Khalid",
    created_at: "2026-06-03",
  },
  {
    id: "c-103",
    ticket_number: "TKT-2026-917",
    title: "Broken street light — Block 7",
    resident: "Kamran Ali",
    status: "submitted",
    employee: "—",
    created_at: "2026-06-05",
  },
  {
    id: "c-104",
    ticket_number: "TKT-2026-933",
    title: "Road construction debris blocking road",
    resident: "Hina Malik",
    status: "resolved",
    employee: "Nadia Hussain",
    created_at: "2026-05-28",
  },
  {
    id: "c-105",
    ticket_number: "TKT-2026-940",
    title: "Drain overflow near market",
    resident: "Usman Farooq",
    status: "in_progress",
    employee: "Tariq Mahmood",
    created_at: "2026-06-06",
  },
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

type Tab = "complaints" | "employees" | "analytics";

export default function DeptAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("complaints");

  const handleAssign = (id: string) =>
    alert(`Assign employee to complaint ${id}`);
  const handleStatus = (id: string) =>
    alert(`Update status of complaint ${id}`);

  const total = MOCK_COMPLAINTS.length;
  const pending = MOCK_COMPLAINTS.filter(
    (c) => c.status === "submitted",
  ).length;
  const inProgress = MOCK_COMPLAINTS.filter(
    (c) => c.status === "in_progress" || c.status === "assigned",
  ).length;
  const resolved = MOCK_COMPLAINTS.filter(
    (c) => c.status === "resolved",
  ).length;

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
              color: "var(--color-employee)",
              background: "var(--color-employee-bg)",
              border: "1px solid #bfdbfe",
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
            {MOCK_DEPT.name}
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
          <p
            className="hero__eyebrow"
            style={{ color: "var(--color-employee)" }}
          >
            Department Admin
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
            {MOCK_DEPT.name}
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-gray-500)" }}>
            Manage complaints, assign employees, and track department
            performance.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 12,
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Total", value: total, accent: "var(--color-gray-900)" },
            { label: "Pending", value: pending, accent: "#9ca3af" },
            { label: "In Progress", value: inProgress, accent: "#d97706" },
            {
              label: "Resolved",
              value: resolved,
              accent: "var(--color-employee)",
            },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
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
              { id: "complaints", label: "Assigned Complaints" },
              { id: "employees", label: "Employees" },
              { id: "analytics", label: "Analytics" },
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

        {activeTab === "complaints" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MOCK_COMPLAINTS.map((c) => {
              const s = STATUS_CFG[c.status] ?? STATUS_CFG["submitted"];
              return (
                <div
                  key={c.id}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-gray-200)",
                    borderRadius: "var(--radius-xl)",
                    padding: "1.1rem 1.4rem",
                    boxShadow: "var(--shadow-xs)",
                    transition:
                      "box-shadow var(--transition-fast), border-color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    e.currentTarget.style.borderColor = "var(--color-gray-300)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                    e.currentTarget.style.borderColor = "var(--color-gray-200)";
                  }}
                >
                  {/* Top row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'JetBrains Mono','Fira Code','Courier New',monospace",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "var(--color-employee)",
                        background: "var(--color-employee-bg)",
                        border: "1px solid #bfdbfe",
                        borderRadius: "var(--radius-sm)",
                        padding: "2px 8px",
                      }}
                    >
                      {c.ticket_number}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
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
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--color-gray-900)",
                      marginBottom: 10,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {c.title}
                  </h3>

                  {/* Meta row */}
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    {[
                      { icon: "ti-user", text: c.resident },
                      { icon: "ti-briefcase", text: c.employee },
                      { icon: "ti-calendar", text: c.created_at },
                    ].map((m) => (
                      <span
                        key={m.text}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "0.72rem",
                          color: "var(--color-gray-400)",
                        }}
                      >
                        <i
                          className={`ti ${m.icon}`}
                          style={{ fontSize: "0.8rem" }}
                        />
                        {m.text}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      paddingTop: 10,
                      borderTop: "1px solid var(--color-gray-100)",
                    }}
                  >
                    <button
                      className="btn btn--secondary btn--sm"
                      onClick={() => handleAssign(c.id)}
                    >
                      <i className="ti ti-user-plus" /> Assign Employee
                    </button>
                    <button
                      className="btn btn--primary btn--sm"
                      onClick={() => handleStatus(c.id)}
                    >
                      <i className="ti ti-refresh" /> Update Status
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {activeTab === "employees" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MOCK_EMPLOYEES.map((emp) => (
              <div
                key={emp.id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-gray-200)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.1rem 1.4rem",
                  boxShadow: "var(--shadow-xs)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  transition: "box-shadow var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                }}
              >
                {/* Avatar + info */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: emp.is_active
                        ? "var(--color-employee-bg)"
                        : "var(--color-gray-100)",
                      border: `1px solid ${emp.is_active ? "#bfdbfe" : "var(--color-gray-200)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: emp.is_active
                        ? "var(--color-employee)"
                        : "var(--color-gray-400)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {emp.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--color-gray-900)",
                        marginBottom: 2,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {emp.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-gray-400)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <i
                        className="ti ti-mail"
                        style={{ fontSize: "0.75rem" }}
                      />
                      {emp.email}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    flexShrink: 0,
                  }}
                >
                  {/* Active complaints */}
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.3rem",
                        fontWeight: 800,
                        color:
                          emp.active_complaints > 0
                            ? "#d97706"
                            : "var(--color-gray-300)",
                        lineHeight: 1,
                      }}
                    >
                      {emp.active_complaints}
                    </p>
                    <p
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--color-gray-400)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: 2,
                      }}
                    >
                      Active
                    </p>
                  </div>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      background: emp.is_active
                        ? "#d1fae5"
                        : "var(--color-gray-100)",
                      color: emp.is_active
                        ? "#065f46"
                        : "var(--color-gray-500)",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: emp.is_active
                          ? "#10b981"
                          : "var(--color-gray-300)",
                        display: "inline-block",
                      }}
                    />
                    {emp.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "analytics" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Complaints by Status */}
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--color-gray-200)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "var(--color-gray-900)",
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Complaints by Status
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[
                  {
                    label: "Resolved",
                    value: resolved,
                    max: total,
                    color: "#10b981",
                    bg: "#d1fae5",
                  },
                  {
                    label: "In Progress",
                    value: inProgress,
                    max: total,
                    color: "#f59e0b",
                    bg: "#fef3c7",
                  },
                  {
                    label: "Pending",
                    value: pending,
                    max: total,
                    color: "#9ca3af",
                    bg: "#f3f4f6",
                  },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "var(--color-gray-600)",
                        }}
                      >
                        {bar.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: bar.color,
                        }}
                      >
                        {bar.value}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        background: "var(--color-gray-100)",
                        borderRadius: "var(--radius-full)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "var(--radius-full)",
                          background: bar.color,
                          width: `${total > 0 ? Math.round((bar.value / total) * 100) : 0}%`,
                          transition: "width 600ms ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {[
                {
                  label: "This Month",
                  value: "5",
                  sub: "complaints filed",
                  accent: "var(--color-employee)",
                },
                {
                  label: "Last Month",
                  value: "8",
                  sub: "complaints filed",
                  accent: "var(--color-gray-400)",
                },
                {
                  label: "Avg Resolution",
                  value: "3.2d",
                  sub: "average time",
                  accent: "#d97706",
                },
                {
                  label: "Resolution Rate",
                  value: `${total > 0 ? Math.round((resolved / total) * 100) : 0}%`,
                  sub: "of total complaints",
                  accent: "#10b981",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="stat-card"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-gray-200)",
                    boxShadow: "var(--shadow-xs)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: card.accent,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      marginBottom: 4,
                    }}
                  >
                    {card.value}
                  </p>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--color-gray-700)",
                      marginBottom: 2,
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--color-gray-400)",
                    }}
                  >
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid var(--color-gray-200)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "var(--color-gray-900)",
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Employee Workload
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {MOCK_EMPLOYEES.filter((e) => e.is_active).map((emp) => {
                  const maxActive = Math.max(
                    ...MOCK_EMPLOYEES.map((e) => e.active_complaints),
                    1,
                  );
                  return (
                    <div
                      key={emp.id}
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--color-gray-600)",
                          fontWeight: 500,
                          width: 120,
                          flexShrink: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {emp.name.split(" ")[0]}
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: 8,
                          background: "var(--color-gray-100)",
                          borderRadius: "var(--radius-full)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            background: "var(--color-employee)",
                            borderRadius: "var(--radius-full)",
                            width: `${Math.round((emp.active_complaints / maxActive) * 100)}%`,
                            transition: "width 600ms ease",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "var(--color-employee)",
                          width: 16,
                          textAlign: "right",
                          flexShrink: 0,
                        }}
                      >
                        {emp.active_complaints}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

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
