"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatNaira, calcAmount } from "../../utilis";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-gray-900">{d.name}</p>
      <p className="text-gray-500 mt-0.5">{d.pct}% · {formatNaira(d.amount)}</p>
    </div>
  );
}
 
export default function DonutChart({ allocations, income }) {
  const data = allocations.map((a) => ({
    ...a,
    value: a.pct,
    amount: calcAmount(income, a.pct),
  }));
 
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
      <p className="text-sm font-semibold text-gray-900 mb-4">Allocation breakdown</p>
 
      {/* Donut chart — needs an explicit pixel height for Recharts to render */}
      <div className="w-full" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry) => (
                <Cell key={entry.id} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
 
      {/* Legend */}
      <div className="flex flex-col gap-2.5 mt-4">
        {allocations.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-xs text-gray-500 flex-1 truncate">{item.name}</span>
            <span className="text-xs text-gray-400 w-8 text-right">{item.pct}%</span>
            <span className="text-xs font-semibold text-gray-900 w-24 text-right">
              {formatNaira(calcAmount(income, item.pct))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}