"use client";

import { formatNaira, calcAmount, getTotalPct } from "../../utilis";

export default function AllocationTable({ allocations, income, onUpdate, isEditing }) {
  const total = getTotalPct(allocations);
  const isOver  = total > 100;
  const isUnder = total < 100;
 
  function handleChange(id, raw) {
    const val = Math.min(100, Math.max(0, Number(raw) || 0));
    onUpdate(allocations.map((a) => (a.id === id ? { ...a, pct: val } : a)));
  }
 
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
      <p className="text-sm font-semibold text-gray-900 mb-4">Your pocket allocation</p>
 
      <div className="divide-y divide-gray-50">
        {allocations.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-3">
 
            {/* Coloured icon square — requires Tabler Icons CSS in layout */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
              <i className={`ti ${item.icon} text-base leading-none ${item.iconColor}`} />
            </div>
 
            {/* Name + description */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
              <p className="text-xs text-gray-400 truncate">{item.description}</p>
            </div>
 
            {/* Progress bar */}
            <div className="w-20 hidden sm:block">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(item.pct, 100)}%`, background: item.color }}
                />
              </div>
            </div>
 
            {/* Percentage — input in edit mode, plain text otherwise */}
            {isEditing ? (
              <input
                type="number"
                min={0}
                max={100}
                value={item.pct}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className="w-14 text-xs text-right border border-violet-300 rounded-lg px-2 py-1
                           focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            ) : (
              <span className="text-xs text-gray-500 w-8 text-right shrink-0">{item.pct}%</span>
            )}
 
            {/* Naira amount */}
            <span className="text-xs font-semibold text-gray-900 w-24 text-right shrink-0">
              {formatNaira(calcAmount(income, item.pct))}
            </span>
          </div>
        ))}
      </div>
 
      {/* Validation hint while editing */}
      {isEditing && (isOver || isUnder) && (
        <p className={`text-xs mt-2 font-medium ${isOver ? "text-red-500" : "text-amber-500"}`}>
          {isOver
            ? `Over by ${total - 100}% — reduce to reach 100%`
            : `${100 - total}% still unallocated`}
        </p>
      )}
 
      {/* Total row */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
        <span className="text-sm font-semibold text-gray-900">Total</span>
        <div className="flex items-center gap-6">
          <span className={`text-sm font-semibold ${isOver ? "text-red-500" : "text-gray-900"}`}>
            {total}%
          </span>
          <span className="text-sm font-semibold text-gray-900">{formatNaira(income)}</span>
        </div>
      </div>
    </div>
  );
}