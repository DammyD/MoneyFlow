"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from '../components/Sidebar'
import IncomeCard from '../components/Incomecard'
import AllocationTable from '../components/Allocationtable'
import DonutChart from '../components/Donutchart'
import { ALLOCATIONS } from "../../data";
import { getTotalPct, downloadPlan } from "../../utilis";

export default function dashboard() {
  const searchParams = useSearchParams();

  const income = Number(searchParams.get("income")) || 500000;
  const sideHustle = Number(searchParams.get("sideHustle")) || 0;
  const other = Number(searchParams.get("other")) || 0;
  const mode = searchParams.get("mode") || "growth";

  const totalIncome = income + sideHustle + other;

  const [allocations, setAllocations] = useState(ALLOCATIONS);
  const [isEditing, setIsEditing] = useState(false);

  const totalPct = getTotalPct(allocations);
  const canSave = totalPct === 100;

  function handleEditToggle() {
    if (isEditing && !canSave) return;
    setIsEditing((v) => !v);
  }

  function handleDownload() {
    downloadPlan({ allocations, income: totalIncome, mode });
  }

  const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <div className="flex min-h-screen bg-[#EFEFFF]">
      {/* Sidebar — hidden on mobile */}
      <div className="hidden lg:flex">
        <Sidebar activeNav="Overview" />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-sm font-medium text-gray-900">Your monthly plan overview</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Based on{" "}
              <span className="inline-flex items-center gap-1 text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full text-xs font-medium">
                {modeLabel} Mode
                <i className="ti ti-pencil text-[10px]" aria-hidden="true" />
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleEditToggle}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors
                ${isEditing
                  ? canSave
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
            >
              <i className={`ti ${isEditing ? "ti-check" : "ti-pencil"} text-sm`} aria-hidden="true" />
              {isEditing ? (canSave ? "Save changes" : `${totalPct}/100%`) : "Edit percentages"}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors"
            >
              <i className="ti ti-download text-sm" aria-hidden="true" />
              <span className="hidden sm:inline">Download plan</span>
            </button>
          </div>
        </header>

        {/* Content grid */}
        <main className="flex-1 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[200px_1fr_220px] gap-4 items-start">
          <IncomeCard
            income={totalIncome}
            allocated={totalIncome}
            unallocated={0}
          />
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