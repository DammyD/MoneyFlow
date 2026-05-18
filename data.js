export const QUICK_AMOUNTS = [
  { label: "100K", value: 100000 },
  { label: "250K", value: 250000 },
  { label: "500K", value: 500000 },
  { label: "1M+", value: 1000000 },
];

export const MODES = [
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

export const STEPS = [
  { number: 1, label: "Your Income", subtext: "Tell us how much you earn." },
  { number: 2, label: "Choose Your Mode", subtext: "Pick a financial style that fits you." },
  { number: 3, label: "Your Plan", subtext: "See your personalized allocation." },
];