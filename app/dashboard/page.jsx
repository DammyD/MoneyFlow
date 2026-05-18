"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from '../components/Sidebar'
import IncomeCard from '../components/Incomecard'
import AllocationTable from '../components/Allocationtable'
import DonutChart from '../components/Donutchart'
import { ALLOCATIONS } from "../../data";
import { getTotalPct, downloadPlan } from "../../utilis";

export default function DashboardPage() {
  const searchParams = useSearchParams();
 
  // Income comes from SetupPage URL params — never hardcoded
  const income     = Number(searchParams.get("income"))     || 0;
  const sideHustle = Number(searchParams.get("sideHustle")) || 0;
  const other      = Number(searchParams.get("other"))      || 0;
  const mode       = searchParams.get("mode") || "growth";
 
  const totalIncome = income + sideHustle + other;
  const modeLabel   = mode.charAt(0).toUpperCase() + mode.slice(1);
 
  const [allocations, setAllocations] = useState(ALLOCATIONS);
  const [isEditing, setIsEditing]     = useState(false);
 
  const totalPct = getTotalPct(allocations);
  const canSave  = totalPct === 100;
 
  function handleEditToggle() {
    // Don't allow saving if percentages don't sum to 100
    if (isEditing && !canSave) return;
    setIsEditing((v) => !v);
  }
 
  function handleDownload() {
    downloadPlan({ allocations, income: totalIncome, mode });
  }
 
  return (
    <div className="flex min-h-screen bg-[#EFEFFF]">
 
      {/* ── Sidebar (hidden below lg) ── */}
      <div className="hidden lg:block">
        <Sidebar activeNav="Overview" />
      </div>
 
      <div className="flex flex-col flex-1 min-w-0">
 
        {/* ── Top bar ── */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div>
            <h1 className="text-sm font-semibold text-gray-900">Your monthly plan overview</h1>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              Based on
              <span className="inline-flex items-center gap-1 text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full text-xs font-medium ml-1">
                {modeLabel} Mode
                <i className="ti ti-pencil text-[10px]" />
              </span>
            </p>
          </div>
 
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleEditToggle}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer
                ${isEditing
                  ? canSave
                    ? "bg-violet-600 text-white border-violet-600 hover:bg-violet-700"
                    : "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
            >
              <i className={`ti ${isEditing ? "ti-check" : "ti-pencil"} text-sm`} />
              {isEditing
                ? canSave ? "Save changes" : `${totalPct}/100%`
                : "Edit percentages"}
            </button>
 
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors cursor-pointer"
            >
              <i className="ti ti-download text-sm" />
              <span className="hidden sm:inline">Download plan</span>
            </button>
          </div>
        </header>
 
        <main className="flex-1 p-6 grid gap-5
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-[240px_1fr_280px]
          items-start"
        >
          <IncomeCard income={totalIncome} />
 
          <AllocationTable
            allocations={allocations}
            income={totalIncome}
            onUpdate={setAllocations}
            isEditing={isEditing}
          />
 
          <DonutChart allocations={allocations} income={totalIncome} />
        </main>
      </div>
    </div>
  );
}