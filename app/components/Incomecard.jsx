import { formatNaira } from "../../utilis";

export default function IncomeCard({ income, allocated, unallocated }) {
  const allocatedPct = Math.round((allocated / income) * 100);
  const unallocatedPct = 100 - allocatedPct;

  return (
    <div className="bg-[#2D2B7A] rounded-2xl p-5 flex flex-col justify-between h-full min-h-[220px]">
      <div>
        <p className="text-xs text-white/60 mb-1">Total monthly income</p>
        <p className="text-2xl font-medium text-white">{formatNaira(income)}</p>
        <p className="text-xs text-white/50 mt-0.5">After tax</p>
      </div>

      <svg viewBox="0 0 80 60" width="80" height="60" className="my-2 opacity-90" aria-hidden="true">
        <rect x="10" y="20" width="60" height="36" rx="6" fill="#6C5CE7" />
        <rect x="10" y="20" width="60" height="14" rx="6" fill="#8B7FF0" />
        <rect x="22" y="32" width="36" height="6" rx="3" fill="#4A3ABF" />
        <circle cx="40" cy="35" r="4" fill="#6C5CE7" stroke="#8B7FF0" strokeWidth="1.5" />
        <rect x="26" y="8" width="28" height="16" rx="4" fill="#8B7FF0" opacity="0.6" />
      </svg>

      <div>
        <p className="text-xs text-white/60">Total allocated</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-medium text-white">{formatNaira(allocated)}</span>
          <span className="text-xs text-white/50">({allocatedPct}%)</span>
        </div>
        <p className="text-xs text-white/60 mt-2.5">Unallocated</p>
        <p className="text-sm font-medium text-white/70">{formatNaira(unallocated)} ({unallocatedPct}%)</p>
      </div>
    </div>
  );
}