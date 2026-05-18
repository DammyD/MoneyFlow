"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatNaira, calcAmount } from "../../utilis";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-xs">
      <p className="font-medium text-gray-900">{item.name}</p>
      <p className="text-gray-500 mt-0.5">{item.pct}% · {formatNaira(item.amount)}</p>
    </div>
  );
}

export default function DonutChart({ allocations, income }) {
  const data = allocations.map((a) => ({
    ...a,
    amount: calcAmount(income, a.pct),
    value: a.pct,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
      <p className="text-sm font-medium text-gray-900 mb-4">Allocation breakdown</p>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-col gap-2 mt-2">
        {allocations.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
            <span className="text-xs text-gray-500 flex-1">{item.name}</span>
            <span className="text-xs text-gray-400 w-8">{item.pct}%</span>
            <span className="text-xs font-medium text-gray-900 w-20 text-right">
              {formatNaira(calcAmount(income, item.pct))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}