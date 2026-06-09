"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_DEPARTMENTS = [
  { id: "dept-roads", name: "Roads & Infrastructure", code: "RI" },
  { id: "dept-health", name: "Health Services", code: "HS" },
  { id: "dept-sanitation", name: "Sanitation & Waste Management", code: "SW" },
];

const MOCK_COMPLAINTS = [
  {
    id: "comp-101",
    ticket_number: "TKT-2026-881",
    title: "Water pipe burst on Main Street",
    description:
      "Major water pipe burst near City Hall causing flooding and traffic blockages.",
    status: "resolved",
    department: "Roads & Infrastructure",
    landmark_address: "Near City Hall, Main Street, Block 5",
    created_at: "2026-06-01",
  },
  {
    id: "comp-102",
    ticket_number: "TKT-2026-904",
    title: "Illegal dumping near park",
    description:
      "Someone is leaving commercial trash bags near the central park east gate every night.",
    status: "in_progress",
    department: "Sanitation & Waste Management",
    landmark_address: "Central Park, East Gate",
    created_at: "2026-06-04",
  },
];

const STATUS_STYLES: Record<
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

export default function ResidentPage() {
  const [activeTab, setActiveTab] = useState<"file-complaint" | "history">(
    "file-complaint",
  );
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [gpsOpen, setGpsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department_id: "",
    landmark_address: "",
    is_anonymous: false,
    latitude: "",
    longitude: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessMessage(
        "Complaint submitted successfully! Ready for API integration.",
      );
      setFormData({
        title: "",
        description: "",
        department_id: "",
        landmark_address: "",
        is_anonymous: false,
        latitude: "",
        longitude: "",
      });
      setTimeout(() => setSuccessMessage(""), 4500);
    }, 8000);
  };

  const totalFiled = MOCK_COMPLAINTS.length;
  const inProgress = MOCK_COMPLAINTS.filter(
    (c) => c.status === "in_progress",
  ).length;
  const resolved = MOCK_COMPLAINTS.filter(
    (c) => c.status === "resolved",
  ).length;

  return (
    <div className="page">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="navbar">
        <Link href="/" className="navbar__logo">
          <span className="navbar__logo-dot" />
          UrbanCity
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-resident)",
              background: "var(--color-resident-bg)",
              border: "1px solid #a7f3d0",
              borderRadius: "var(--radius-full)",
              padding: "4px 12px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--color-resident)",
                display: "inline-block",
              }}
            />
            Resident
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
        {/* ── Page Title ─────────────────────────────────────── */}
        <div style={{ marginBottom: "2rem" }}>
          <p className="hero__eyebrow">Citizen Portal</p>
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
            My Dashboard
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-gray-500)" }}>
            Report city issues and track your active complaints in real time.
          </p>
        </div>

        {/* ── Stats Row ──────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 12,
            marginBottom: "2rem",
          }}
        >
          {[
            {
              label: "Total Filed",
              value: totalFiled,
              color: "var(--color-gray-900)",
            },
            { label: "In Progress", value: inProgress, color: "#d97706" },
            { label: "Resolved", value: resolved, color: "var(--color-brand)" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: s.color,
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

        {/* ── Tab Switcher ───────────────────────────────────── */}
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
              { id: "file-complaint", label: "File a Complaint" },
              { id: "history", label: "My Complaints" },
            ] as const
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

        {/* ── Success Banner ─────────────────────────────────── */}
        {successMessage && (
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "12px 16px",
              background: "var(--color-resident-bg)",
              border: "1px solid #a7f3d0",
              borderRadius: "var(--radius-md)",
              color: "var(--color-brand-dark)",
              fontSize: "0.82rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <i className="ti ti-circle-check" style={{ fontSize: "1rem" }} />
            {successMessage}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 1 — File a Complaint
        ══════════════════════════════════════════════════════ */}
        {activeTab === "file-complaint" && (
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--color-gray-200)",
              borderRadius: "var(--radius-xl)",
              padding: "1.75rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-gray-900)",
                marginBottom: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--color-gray-100)",
              }}
            >
              New Issue Report
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              {/* Title */}
              <div className="form-field">
                <label className="form-field__label">
                  Complaint Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Water line break blocking street"
                  className="form-field__input"
                />
              </div>

              {/* Description */}
              <div className="form-field">
                <label className="form-field__label">
                  Detailed Description{" "}
                  <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the issue precisely so city workers can respond accurately..."
                  className="form-field__input"
                  style={{ resize: "vertical", lineHeight: 1.6 }}
                />
              </div>

              {/* Department + Address grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div className="form-field">
                  <label className="form-field__label">
                    Target Department{" "}
                    <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    name="department_id"
                    required
                    value={formData.department_id}
                    onChange={handleInputChange}
                    className="form-field__select"
                  >
                    <option value="">-- Select Department --</option>
                    {MOCK_DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-field__label">
                    Landmark / Address{" "}
                    <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="landmark_address"
                    required
                    value={formData.landmark_address}
                    onChange={handleInputChange}
                    placeholder="e.g., Near City Hall, Block 5"
                    className="form-field__input"
                  />
                </div>
              </div>

              {/* GPS — collapsible */}
              <div
                style={{
                  border: "1px solid var(--color-gray-200)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setGpsOpen(!gpsOpen)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "var(--color-gray-50)",
                    border: "none",
                    padding: "10px 14px",
                    cursor: "pointer",
                    color: "var(--color-gray-500)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <i
                      className="ti ti-map-pin"
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-gray-400)",
                      }}
                    />
                    GPS Coordinates (Optional)
                  </span>
                  <i
                    className={`ti ti-chevron-${gpsOpen ? "up" : "down"}`}
                    style={{ fontSize: "0.8rem" }}
                  />
                </button>
                {gpsOpen && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      padding: "12px 14px",
                      background: "#fff",
                      borderTop: "1px solid var(--color-gray-100)",
                    }}
                  >
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="Latitude  (e.g. 40.7128)"
                      className="form-field__input"
                      style={{ fontSize: "0.8rem" }}
                    />
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="Longitude (e.g. -74.006)"
                      className="form-field__input"
                      style={{ fontSize: "0.8rem" }}
                    />
                  </div>
                )}
              </div>

              {/* Anonymous toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--color-gray-50)",
                  border: "1px solid var(--color-gray-200)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 14px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--color-gray-700)",
                    }}
                  >
                    Submit Anonymously
                  </p>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--color-gray-400)",
                      marginTop: 2,
                    }}
                  >
                    Hide your profile details on this ticket
                  </p>
                </div>
                {/* Sleek toggle switch */}
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: 42,
                    height: 24,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <input
                    type="checkbox"
                    id="is_anonymous"
                    name="is_anonymous"
                    checked={formData.is_anonymous}
                    onChange={handleInputChange}
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0,
                      position: "absolute",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 24,
                      transition: "background var(--transition-base)",
                      background: formData.is_anonymous
                        ? "var(--color-brand)"
                        : "var(--color-gray-300)",
                      boxShadow: formData.is_anonymous
                        ? "0 0 0 3px var(--color-brand-light)"
                        : "none",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      left: formData.is_anonymous ? 21 : 3,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left var(--transition-base)",
                      boxShadow: "var(--shadow-xs)",
                    }}
                  />
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn--primary btn--lg btn--full"
                style={{ marginTop: 4, opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? (
                  <>
                    <i
                      className="ti ti-loader-2"
                      style={{
                        animation: "spin 1s linear infinite",
                        fontSize: "1rem",
                      }}
                    />{" "}
                    Submitting…
                  </>
                ) : (
                  "File Complaint"
                )}
              </button>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 2 — Complaints History
        ══════════════════════════════════════════════════════ */}
        {activeTab === "history" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MOCK_COMPLAINTS.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  color: "var(--color-gray-400)",
                  fontSize: "0.875rem",
                }}
              >
                No complaints filed yet.
              </div>
            )}
            {MOCK_COMPLAINTS.map((c) => {
              const s = STATUS_STYLES[c.status] ?? STATUS_STYLES["submitted"];
              return (
                <div
                  key={c.id}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-gray-200)",
                    borderRadius: "var(--radius-xl)",
                    padding: "1.25rem 1.4rem",
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
                  {/* Top row — ticket + status */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'JetBrains Mono','Fira Code','Courier New',monospace",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "var(--color-brand)",
                        background: "var(--color-resident-bg)",
                        border: "1px solid #a7f3d0",
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

                  {/* Title + description */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--color-gray-900)",
                      marginBottom: 4,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-gray-500)",
                      lineHeight: 1.6,
                      marginBottom: 12,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {c.description}
                  </p>

                  {/* Meta row + action */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: 10,
                      borderTop: "1px solid var(--color-gray-100)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      {[
                        { icon: "ti-map-pin", text: c.landmark_address },
                        { icon: "ti-building", text: c.department },
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

                    <button
                      className="btn btn--secondary btn--sm"
                      onClick={() =>
                        alert(
                          `Next: ${c.status === "resolved" ? "POST /feedback" : `GET /complaints/${c.id}/logs`}`,
                        )
                      }
                      style={{ flexShrink: 0 }}
                    >
                      {c.status === "resolved" ? (
                        <>
                          <i className="ti ti-star" /> Rate
                        </>
                      ) : (
                        <>
                          <i className="ti ti-eye" /> Track
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
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

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
