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

// dashboard data
export const ALLOCATIONS = [
  {
    id: "bills",
    name: "Bills & essentials",
    description: "Needs that keep you going",
    icon: "ti-home",
    color: "#6C5CE7",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    pct: 40,
  },
  {
    id: "savings",
    name: "Savings",
    description: "Short-term goals & future plans",
    icon: "ti-piggy-bank",
    color: "#1D9E75",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    pct: 20,
  },
  {
    id: "investments",
    name: "Investments",
    description: "Grow your wealth",
    icon: "ti-trending-up",
    color: "#378ADD",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    pct: 15,
  },
  {
    id: "emergency",
    name: "Emergency fund",
    description: "For life's unexpected moments",
    icon: "ti-shield-check",
    color: "#BA7517",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    pct: 15,
  },
  {
    id: "flex",
    name: "Flex / lifestyle",
    description: "Enjoy life guilt-free",
    icon: "ti-sparkles",
    color: "#D4537E",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    pct: 10,
  },
];

export const NAV_ITEMS = [
  { label: "Overview", icon: "ti-layout-dashboard" },
  { label: "Pockets", icon: "ti-wallet" },
  { label: "Goals", icon: "ti-target" },
  { label: "Insights", icon: "ti-chart-bar" },
  { label: "Resources", icon: "ti-book" },
  { label: "Settings", icon: "ti-settings" },
];

export const USER = {
  name: "David O.",
  email: "david@example.com",
  initials: "DO",
};