import { useState, useMemo } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";

const DC_COLORS = {
  crimson: "#912121",
  navy: "#002060",
  charcoal: "#323232",
  teal: "#009999",
};

let nextId = 4;

const startingRoles = [
  { id: 1, name: "Solution Architect", hours: 120, rate: 145 },
  { id: 2, name: "Business Analyst", hours: 200, rate: 110 },
  { id: 3, name: "Developer", hours: 160, rate: 125 },
];

function SummaryCell({ label, value }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRight: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div style={{ fontSize: 11, color: "#6b6b6b", fontWeight: 700, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: DC_COLORS.charcoal }}>{value}</div>
    </div>
  );
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "$0";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
}

function marginColor(pct) {
  if (pct >= 40) return DC_COLORS.teal;
  if (pct >= 25) return "#B58900";
  return DC_COLORS.crimson;
}

export default function GrossMarginCalculator() {
  const [contractPrice, setContractPrice] = useState(150000);
  const [roles, setRoles] = useState(startingRoles);

  const totals = useMemo(() => {
    const totalHours = roles.reduce((sum, r) => sum + (Number(r.hours) || 0), 0);
    const totalCost = roles.reduce(
      (sum, r) => sum + (Number(r.hours) || 0) * (Number(r.rate) || 0),
      0
    );
    const price = Number(contractPrice) || 0;
    const grossMargin = price - totalCost;
    const marginPct = price > 0 ? (grossMargin / price) * 100 : 0;
    const blendedRate = totalHours > 0 ? totalCost / totalHours : 0;
    const effectiveBillRate = totalHours > 0 ? price / totalHours : 0;

    return { totalHours, totalCost, price, grossMargin, marginPct, blendedRate, effectiveBillRate };
  }, [contractPrice, roles]);

  function updateRole(id, field, value) {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  function addRole() {
    setRoles((prev) => [
      ...prev,
      { id: nextId++, name: "", hours: 0, rate: 0 },
    ]);
  }

  function removeRole(id) {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  }

  const isHealthy = totals.marginPct >= 30;

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: 880,
        margin: "0 auto",
        padding: "24px",
        color: DC_COLORS.charcoal,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: `3px solid ${DC_COLORS.crimson}`,
          paddingBottom: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 12, letterSpacing: 1.5, color: DC_COLORS.navy, fontWeight: 700 }}>
          DEMAND CHAIN SYSTEMS
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "4px 0 0", color: DC_COLORS.charcoal }}>
          Fixed bid gross margin calculator
        </h1>
        <p style={{ fontSize: 13, color: "#6b6b6b", margin: "4px 0 0" }}>
          Single contract price against labor cost by role. Labor only — no overhead, discount, or non-labor cost inputs.
        </p>
      </div>

      {/* Contract price input */}
      <div
        style={{
          background: "#fafafa",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          padding: "16px 20px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <label style={{ fontSize: 14, fontWeight: 700, color: DC_COLORS.navy }}>
          Total fixed bid (contract price)
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 18, color: "#6b6b6b" }}>$</span>
          <input
            type="number"
            value={contractPrice}
            onChange={(e) => setContractPrice(e.target.value)}
            style={{
              fontSize: 20,
              fontWeight: 700,
              padding: "8px 10px",
              border: `1px solid ${DC_COLORS.navy}`,
              borderRadius: 6,
              width: 180,
              color: DC_COLORS.navy,
            }}
          />
        </div>
      </div>

      {/* Role table */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 110px 130px 130px 40px",
            gap: 8,
            padding: "0 8px",
            fontSize: 11,
            fontWeight: 700,
            color: "#6b6b6b",
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          <div>ROLE</div>
          <div>HOURS</div>
          <div>COST RATE ($/HR)</div>
          <div>ROLE COST</div>
          <div></div>
        </div>

        {roles.map((role) => {
          const roleCost = (Number(role.hours) || 0) * (Number(role.rate) || 0);
          return (
            <div
              key={role.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 110px 130px 130px 40px",
                gap: 8,
                alignItems: "center",
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              <input
                type="text"
                value={role.name}
                placeholder="Role name"
                onChange={(e) => updateRole(role.id, "name", e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #d0d0d0",
                  borderRadius: 6,
                  fontSize: 14,
                }}
              />
              <input
                type="number"
                value={role.hours}
                onChange={(e) => updateRole(role.id, "hours", e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #d0d0d0",
                  borderRadius: 6,
                  fontSize: 14,
                }}
              />
              <input
                type="number"
                value={role.rate}
                onChange={(e) => updateRole(role.id, "rate", e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #d0d0d0",
                  borderRadius: 6,
                  fontSize: 14,
                }}
              />
              <div style={{ fontSize: 14, fontWeight: 700, color: DC_COLORS.charcoal }}>
                {formatCurrency(roleCost)}
              </div>
              <button
                onClick={() => removeRole(role.id)}
                aria-label="Remove role"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#999",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}

        <button
          onClick={addRole}
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: `1px dashed ${DC_COLORS.navy}`,
            borderRadius: 6,
            color: DC_COLORS.navy,
            fontSize: 13,
            fontWeight: 700,
            padding: "8px 14px",
            cursor: "pointer",
          }}
        >
          <Plus size={14} /> Add role
        </button>
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: 28,
          borderRadius: 10,
          border: `1px solid ${DC_COLORS.navy}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: DC_COLORS.navy,
            color: "white",
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          MARGIN SUMMARY
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 0,
          }}
        >
          <SummaryCell label="Total hours" value={totals.totalHours.toLocaleString()} />
          <SummaryCell label="Total labor cost" value={formatCurrency(totals.totalCost)} />
          <SummaryCell label="Blended cost rate" value={`${formatCurrency(totals.blendedRate)}/hr`} />
          <SummaryCell label="Effective bill rate" value={`${formatCurrency(totals.effectiveBillRate)}/hr`} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            background: "#fafafa",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "#6b6b6b", fontWeight: 700 }}>GROSS MARGIN</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: marginColor(totals.marginPct) }}>
              {formatCurrency(totals.grossMargin)}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#6b6b6b", fontWeight: 700 }}>MARGIN %</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: marginColor(totals.marginPct),
                display: "flex",
                alignItems: "center",
                gap: 6,
                justifyContent: "flex-end",
              }}
            >
              {isHealthy ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
              {formatPercent(totals.marginPct)}
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: "#999", marginTop: 16 }}>
        Labor-only model: gross margin = contract price − Σ(hours × cost rate). Discounts, contingency,
        non-labor costs (travel, licenses) are not included.
      </p>
    </div>
  );
}
