"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const QUICK_AMOUNTS = [
  { label: "100K", value: 100000 },
  { label: "250K", value: 250000 },
  { label: "500K", value: 500000 },
  { label: "1M+", value: 1000000 },
];

const MODES = [
  {
    id: "survival",
    icon: "🛡️",
    name: "Survival Mode",
    description: "Focused on stability, essentials, and emergency preparedness.",
    pills: [
      { label: "Bills", pct: "50%" },
      { label: "Emergency", pct: "25%" },
      { label: "Savings", pct: "15%" },
      { label: "Invest", pct: "5%" },
      { label: "Flex", pct: "5%" },
    ],
  },
  {
    id: "growth",
    icon: "📈",
    name: "Growth Mode",
    description: "Focused on balanced wealth building, savings, and long-term growth.",
    pills: [
      { label: "Bills", pct: "40%" },
      { label: "Savings", pct: "20%" },
      { label: "Invest", pct: "20%" },
      { label: "Emergency", pct: "10%" },
      { label: "Flex", pct: "10%" },
    ],
  },
  {
    id: "softlife",
    icon: "✨",
    name: "Soft Life Mode",
    description: "Focused on enjoying money responsibly and balanced lifestyle spending.",
    pills: [
      { label: "Bills", pct: "40%" },
      { label: "Flex", pct: "25%" },
      { label: "Savings", pct: "15%" },
      { label: "Emergency", pct: "10%" },
      { label: "Invest", pct: "10%" },
    ],
  },
];

const STEPS = [
  { number: 1, label: "Your Income", subtext: "Tell us how much you earn." },
  { number: 2, label: "Choose Your Mode", subtext: "Pick a financial style that fits you." },
  { number: 3, label: "Your Plan", subtext: "See your personalized allocation." },
];

function formatWithCommas(num) {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function SetupPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [income, setIncome] = useState(500000);
  const [sideHustleIncome, setSideHustleIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [showSideHustle, setShowSideHustle] = useState(false);
  const [showOtherIncome, setShowOtherIncome] = useState(false);
  const [selectedQuickAmount, setSelectedQuickAmount] = useState("500K");
  const [selectedMode, setSelectedMode] = useState(null);
  const [incomeError, setIncomeError] = useState("");
  const [modeError, setModeError] = useState("");

  const totalIncome = income + sideHustleIncome + otherIncome;

  function handleIncomeChange(e) {
    const raw = e.target.value.replace(/,/g, "");
    const num = parseInt(raw, 10);
    if (!isNaN(num)) {
      setIncome(num);
    } else if (raw === "") {
      setIncome(0);
    }
    setSelectedQuickAmount(null);
    setIncomeError("");
  }

  function handleQuickSelect(item) {
    setIncome(item.value);
    setSelectedQuickAmount(item.label);
    setIncomeError("");
  }

  function handleContinue() {
    if (!income || income <= 0) {
      setIncomeError("Please enter your monthly income");
      return;
    }
    setCurrentStep(2);
  }

  function handleGeneratePlan() {
    if (!selectedMode) {
      setModeError("Please select a financial mode to continue");
      return;
    }
    router.push(
      `/dashboard?mode=${selectedMode}&income=${income}&sideHustle=${sideHustleIncome}&other=${otherIncome}`
    );
  }

  const stepVariants = {
    enter: { opacity: 0, x: 60 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  };

  return (
    <div style={{ flex: "1 0 auto", minHeight: "100vh", background: "#EFEFFF", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Top Bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontSize: 22, fontWeight: 700 }}>
            <span style={{ color: "#1A1A2E" }}>Money</span>
            <span style={{ color: "#6C5CE7" }}>Flow</span>
          </span>
          <button
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.back()}
            style={{
              border: "1.5px solid #E5E7EB",
              background: "transparent",
              borderRadius: 8,
              padding: "8px 18px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: "#1A1A2E",
              fontFamily: "inherit",
            }}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Mobile Step Bar - hidden on desktop, shown on mobile */}
      <div className="mobile-step-bar" style={{ display: "none", alignItems: "flex-start", padding: "16px 20px", background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        {STEPS.map((step, i) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          return (
            <div key={step.number} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: isActive || isCompleted ? "#6C5CE7" : "#fff",
                  border: "2px solid",
                  borderColor: isActive || isCompleted ? "#6C5CE7" : "#D1D5DB",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                  color: isActive || isCompleted ? "#fff" : "#9CA3AF",
                }}>
                  {isCompleted ? "✓" : step.number}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#6C5CE7" : "#9CA3AF",
                  whiteSpace: "nowrap",
                }}>{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 0, borderTop: "2px dashed #E5E7EB", margin: "0 8px", marginBottom: 20 }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Main Layout */}
      <div className="setup-layout" style={{ flex: 1, padding: "32px 40px", display: "flex", gap: 32, alignItems: "stretch", flexWrap: "wrap" }}>

        {/* Sidebar */}
        <div className="setup-sidebar" style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="setup-steps-card" style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(108,92,231,0.07)" }}>
            <div className="steps-inner" style={{ position: "relative", paddingLeft: 0 }}>
              {STEPS.map((step, i) => {
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                const isInactive = currentStep < step.number;

                return (
                  <div key={step.number} style={{ display: "flex", gap: 16, marginBottom: i < STEPS.length - 1 ? 0 : 0 }}>
                    {/* Left: circle + line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <motion.div
                        animate={{
                          background: isCompleted || isActive ? "#6C5CE7" : "#fff",
                          borderColor: isActive || isCompleted ? "#6C5CE7" : "#D1D5DB",
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          border: "2px solid",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 700,
                          color: isCompleted || isActive ? "#fff" : "#9CA3AF",
                          flexShrink: 0,
                        }}
                      >
                        {isCompleted ? "✓" : step.number}
                      </motion.div>
                      {i < STEPS.length - 1 && (
                        <div style={{ width: 2, flex: 1, minHeight: 52, borderLeft: "2px dashed #E5E7EB", margin: "4px 0" }} />
                      )}
                    </div>

                    {/* Right: text */}
                    <div style={{ paddingTop: 6, paddingBottom: i < STEPS.length - 1 ? 52 : 0 }}>
                      <motion.p
                        animate={{ color: isActive ? "#6C5CE7" : isCompleted ? "#6C5CE7" : "#9CA3AF" }}
                        transition={{ duration: 0.3 }}
                        style={{ margin: 0, fontWeight: 700, fontSize: 14 }}
                      >
                        {step.label}
                      </motion.p>
                      <motion.p
                        animate={{ color: isActive ? "#6C5CE7" : "#9CA3AF" }}
                        transition={{ duration: 0.3 }}
                        style={{ margin: "2px 0 0", fontSize: 12 }}
                      >
                        {step.subtext}
                      </motion.p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trust Badge */}
          <div className="setup-trust-badge" style={{ background: "#F0FDF4", borderRadius: 12, padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "flex-start", gap: 12, marginTop: "auto" }}>
            <div style={{ fontSize: 24, flexShrink: 0 }}>🛡️</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: "#166534" }}>Your data is safe</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#4B7A5E" }}>
                We use bank-level encryption to keep your information secure.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Card */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="step-content-card"
                style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 4px 24px rgba(108,92,231,0.08)", flex: 1, display: "flex", flexDirection: "column" }}
              >
                <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 700, color: "#1A1A2E" }}>
                  Let&apos;s start with your income
                </h1>
                <p style={{ margin: "0 0 28px", fontSize: 15, color: "#6B7280" }}>
                  This helps us create a personalized plan for you.
                </p>

                {/* Income Field */}
                <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "#1A1A2E", marginBottom: 8 }}>
                  Monthly Income (After tax)
                </label>
                <div style={{ position: "relative", marginBottom: 8 }}>
                  <span style={{
                    position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                    fontSize: 20, fontWeight: 600, color: "#6B7280",
                  }}>₦</span>
                  <input
                    type="text"
                    value={formatWithCommas(income)}
                    onChange={handleIncomeChange}
                    style={{
                      width: "100%",
                      height: 60,
                      paddingLeft: 44,
                      paddingRight: 16,
                      fontSize: 20,
                      fontWeight: 600,
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 12,
                      outline: "none",
                      color: "#1A1A2E",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#6C5CE7")}
                    onBlur={e => (e.target.style.borderColor = "#E5E7EB")}
                  />
                </div>
                {incomeError && (
                  <p style={{ color: "#EF4444", fontSize: 13, margin: "4px 0 0" }}>{incomeError}</p>
                )}

                {/* Quick-select pills */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14, marginBottom: 48 }}>
                  {QUICK_AMOUNTS.map(item => {
                    const active = selectedQuickAmount === item.label;
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleQuickSelect(item)}
                        style={{
                          padding: "8px 18px",
                          borderRadius: 999,
                          border: active ? "1.5px solid #6C5CE7" : "1.5px solid #D1D5DB",
                          background: active ? "#F3F0FF" : "#fff",
                          color: active ? "#6C5CE7" : "#6B7280",
                          fontWeight: 600,
                          fontSize: 14,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          transition: "all 0.2s",
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Optional Income */}
                <p style={{ fontWeight: 600, fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
                  Add other income sources (optional)
                </p>

                {/* Side Hustle */}
                <div style={{ borderBottom: "1px solid #F3F4F6", paddingBottom: 8, marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                    onClick={() => setShowSideHustle(v => !v)}>
                    <span style={{ fontSize: 14, color: "#1A1A2E", fontWeight: 500 }}>Side Hustle Income</span>
                    <motion.span
                      animate={{ rotate: showSideHustle ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ fontSize: 20, color: "#6C5CE7", display: "inline-block", lineHeight: 1 }}
                    >+</motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {showSideHustle && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ position: "relative", marginTop: 10 }}>
                          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6B7280", fontWeight: 600 }}>₦</span>
                          <input
                            type="text"
                            value={formatWithCommas(sideHustleIncome)}
                            onChange={e => {
                              const raw = e.target.value.replace(/,/g, "");
                              setSideHustleIncome(parseInt(raw, 10) || 0);
                            }}
                            style={{
                              width: "100%", height: 46, paddingLeft: 32, paddingRight: 12,
                              border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 15,
                              fontFamily: "inherit", boxSizing: "border-box", color: "#1A1A2E",
                            }}
                            onFocus={e => (e.target.style.borderColor = "#6C5CE7")}
                            onBlur={e => (e.target.style.borderColor = "#E5E7EB")}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Income */}
                <div style={{ borderBottom: "1px solid #F3F4F6", paddingBottom: 8, marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                    onClick={() => setShowOtherIncome(v => !v)}>
                    <span style={{ fontSize: 14, color: "#1A1A2E", fontWeight: 500 }}>Other Income</span>
                    <motion.span
                      animate={{ rotate: showOtherIncome ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ fontSize: 20, color: "#6C5CE7", display: "inline-block", lineHeight: 1 }}
                    >+</motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {showOtherIncome && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ position: "relative", marginTop: 10 }}>
                          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6B7280", fontWeight: 600 }}>₦</span>
                          <input
                            type="text"
                            value={formatWithCommas(otherIncome)}
                            onChange={e => {
                              const raw = e.target.value.replace(/,/g, "");
                              setOtherIncome(parseInt(raw, 10) || 0);
                            }}
                            style={{
                              width: "100%", height: 46, paddingLeft: 32, paddingRight: 12,
                              border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 15,
                              fontFamily: "inherit", boxSizing: "border-box", color: "#1A1A2E",
                            }}
                            onFocus={e => (e.target.style.borderColor = "#6C5CE7")}
                            onBlur={e => (e.target.style.borderColor = "#E5E7EB")}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Continue Button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto", paddingTop: 24 }}>
                  <button
                    onClick={handleContinue}
                    style={{
                      background: "#6C5CE7", color: "#fff", border: "none",
                      borderRadius: 12, padding: "14px 32px", fontSize: 16,
                      fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="step-content-card"
                style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 4px 24px rgba(108,92,231,0.08)", flex: 1, display: "flex", flexDirection: "column" }}
              >
                <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 700, color: "#1A1A2E" }}>
                  Choose your financial mode
                </h1>
                <p style={{ margin: "0 0 28px", fontSize: 15, color: "#6B7280" }}>
                  Pick a style that matches your current financial goal.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                  {MODES.map(mode => {
                    const selected = selectedMode === mode.id;
                    return (
                      <motion.div
                        key={mode.id}
                        whileHover={{ scale: 1.01, boxShadow: "0 6px 24px rgba(108,92,231,0.13)" }}
                        onClick={() => { setSelectedMode(mode.id); setModeError(""); }}
                        style={{
                          border: selected ? "2px solid #6C5CE7" : "1.5px solid #E5E7EB",
                          background: selected ? "#F3F0FF" : "#fff",
                          borderRadius: 14,
                          padding: "18px 20px",
                          cursor: "pointer",
                          display: "flex",
                          gap: 16,
                          alignItems: "flex-start",
                          transition: "border 0.2s, background 0.2s",
                        }}
                      >
                        <span style={{ fontSize: 28, lineHeight: 1, marginTop: 2 }}>{mode.icon}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 16, color: selected ? "#6C5CE7" : "#1A1A2E" }}>
                            {mode.name}
                          </p>
                          <p style={{ margin: "0 0 10px", fontSize: 13, color: "#6B7280" }}>
                            {mode.description}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {mode.pills.map(pill => (
                              <span
                                key={pill.label}
                                style={{
                                  background: selected ? "#EDE9FE" : "#F3F4F6",
                                  color: selected ? "#6C5CE7" : "#374151",
                                  borderRadius: 999,
                                  padding: "3px 10px",
                                  fontSize: 12,
                                  fontWeight: 600,
                                }}
                              >
                                {pill.label} {pill.pct}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {modeError && (
                  <p style={{ color: "#EF4444", fontSize: 13, marginBottom: 12 }}>{modeError}</p>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 16 }}>
                  <button
                    onClick={handleGeneratePlan}
                    style={{
                      background: "#6C5CE7", color: "#fff", border: "none",
                      borderRadius: 12, padding: "14px 32px", fontSize: 16,
                      fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    Generate My Plan →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        /* ── Mobile Responsive ── */
        @media (max-width: 768px) {

          /* Show mobile step bar, hide desktop sidebar */
          .mobile-step-bar { display: flex !important; }
          .setup-sidebar   { display: none  !important; }

          /* Stack layout: full width, less padding */
          .setup-layout {
            flex-direction: column !important;
            padding: 16px !important;
            gap: 16px !important;
            align-items: stretch !important;
          }

          /* Card padding reduced */
          .step-content-card {
            padding: 24px 20px !important;
            border-radius: 16px !important;
          }

          /* Headings */
          .step-content-card h1 {
            font-size: 22px !important;
          }

          /* Income input: prevent iOS zoom (must be >= 16px) */
          .step-content-card input {
            font-size: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .setup-layout {
            padding: 12px !important;
          }
          .step-content-card {
            padding: 20px 16px !important;
          }
          .step-content-card h1 {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
