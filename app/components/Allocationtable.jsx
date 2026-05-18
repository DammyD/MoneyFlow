"use client";

import { formatNaira, calcAmount, getTotalPct } from "../../utilis";

export default function AllocationTable({ allocations, income, onUpdate, isEditing }) {
  const total = getTotalPct(allocations);
  const isOver = total > 100;
  const isUnder = total < 100;

  function handlePctChange(id, value) {
    const parsed = Math.min(100, Math.max(0, Number(value)));
    onUpdate(allocations.map((a) => (a.id === id ? { ...a, pct: parsed } : a)));
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
      <p className="text-sm font-medium text-gray-900 mb-4">Your pocket allocation</p>

      <div className="divide-y divide-gray-50">
        {allocations.map((item) => {
          const amount = calcAmount(income, item.pct);
          return (
            <div key={item.id} className="flex items-center gap-3 py-2.5">
              {/* Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
                <i className={`ti ${item.icon} text-sm ${item.iconColor}`} aria-hidden="true" />
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
              </div>

              {/* Bar */}
              <div className="w-16 hidden sm:block">
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(item.pct, 100)}%`, background: item.color }}
                  />
                </div>
              </div>

              {/* Pct — editable or static */}
              {isEditing ? (
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={item.pct}
                  onChange={(e) => handlePctChange(item.id, e.target.value)}
                  className="w-14 text-xs text-right border border-violet-300 rounded-md px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
              ) : (
                <span className="text-xs text-gray-400 w-8 text-right">{item.pct}%</span>
              )}

              {/* Amount */}
              <span className="text-xs font-medium text-gray-900 w-20 text-right">
                {formatNaira(amount)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Validation */}
      {isEditing && (isOver || isUnder) && (
        <p className={`text-xs mt-2 ${isOver ? "text-red-500" : "text-amber-500"}`}>
          {isOver
            ? `Total is ${total}% — reduce by ${total - 100}%`
            : `Total is ${total}% — ${100 - total}% still unallocated`}
        </p>
      )}

      {/* Total row */}
      <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-900">Total</span>
        <div className="flex items-center gap-4">
          <span className={`text-sm font-medium ${isOver ? "text-red-500" : "text-gray-900"}`}>
            {total}%
          </span>
          <span className="text-sm font-medium text-gray-900">{formatNaira(income)}</span>
        </div>
      </div>
    </div>
  );
}