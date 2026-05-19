export function formatNaira(amount) {
  return `₦ ${Math.round(amount).toLocaleString("en-NG")}`;
}

export function calcAmount(income, pct) {
  return Math.round((pct / 100) * income);
}

export function getTotalPct(allocations) {
  return allocations.reduce((sum, a) => sum + a.pct, 0);
}

export function downloadPlan({ allocations, income, mode }) {
  const total = getTotalPct(allocations);
  const lines = [
    `MoneyFlow — Monthly Plan`,
    `Mode: ${mode}`,
    `Total Income: ${formatNaira(income)}`,
    ``,
    `Allocation Breakdown`,
    `─────────────────────────────────────`,
    ...allocations.map(
      (a) =>
        `${a.name.padEnd(22)} ${String(a.pct + "%").padEnd(6)} ${formatNaira(calcAmount(income, a.pct))}`
    ),
    `─────────────────────────────────────`,
    `${"Total".padEnd(22)} ${String(total + "%").padEnd(6)} ${formatNaira(income)}`,
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pocketplan.txt";
  a.click();
  URL.revokeObjectURL(url);
}