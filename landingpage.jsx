"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: "↗",
      title: "Smart Allocation",
      desc: "Automatically split your income the smart way.",
    },
    {
      icon: "🛡",
      title: "Financial Clarity",
      desc: "Know exactly where your money should go.",
    },
    {
      icon: "🎯",
      title: "Achieve Goals",
      desc: "Build wealth, create security, and enjoy life guilt-free.",
    },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f3ff] p-2 md:p-4">
      <div className="bg-white rounded-[28px] border border-[#ece8ff] overflow-hidden shadow-sm">

        {/* NAVBAR */}
        <header className="flex items-center justify-between px-5 md:px-10 py-5 border-b border-[#f0ebff]">

          {/* LOGO */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#6C4CF1] flex items-center justify-center text-white text-sm">
              ✦
            </div>

            <h1 className="text-[22px] font-bold tracking-tight text-[#111827]">
              Money<span className="text-[#6C4CF1]">Flow</span>
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-10 text-[14px] font-medium text-[#111827]">
            {[
              "Features",
              "How It Works",
              "Why It Matters",
              "Pricing",
              "FAQ",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(item.toLowerCase().replace(/\s/g, "-"))
                }
                className="hover:text-[#6C4CF1] transition"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={() => router.push("/login")}
              className="text-[14px] font-medium text-[#111827]"
            >
              Log in
            </button>

            <Button
              onClick={() => router.push("/signup")}
              className="bg-[#6C4CF1] hover:bg-[#5a3ee0] text-white rounded-xl px-6 h-11 text-[14px] shadow-lg shadow-purple-200"
            >
              Get Started Free
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </header>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-[80%] h-full bg-white z-50 shadow-2xl p-6 lg:hidden"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl mb-8"
              >
                ✕
              </button>

              <div className="flex flex-col gap-6">
                {[
                  "Features",
                  "How It Works",
                  "Why It Matters",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(
                        item.toLowerCase().replace(/\s/g, "-")
                      );
                      setMenuOpen(false);
                    }}
                    className="text-left text-[15px] font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/login")}
                >
                  Log in
                </Button>

                <Button
                  className="w-full bg-[#6C4CF1] hover:bg-[#5a3ee0]"
                  onClick={() => router.push("/signup")}
                >
                  Signup
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section className="px-5 md:px-10 py-12 md:py-20">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[46px] md:text-[68px] leading-[1.05] font-bold tracking-tight text-[#0f172a] max-w-[560px]"
              >
                Give every{" "}
                <span className="text-[#6C4CF1]">naira</span>
                <br />
                a purpose.
              </motion.h1>

              <p className="mt-7 text-[#5b6475] text-[16px] leading-8 max-w-[560px]">
                PocketPlan helps you intentionally divide your income into
                savings, investments, emergency funds, and lifestyle spending —
                so your money works for you, not the other way around.
              </p>

              {/* FEATURES */}
              <div
                id="features"
                className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12"
              >
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="flex flex-col"
                  >

                    {/* ICON */}
                    <div className="w-14 h-14 rounded-2xl bg-[#f4f0ff] flex items-center justify-center text-[#6C4CF1] text-xl shadow-sm">
                      {f.icon}
                    </div>

                    {/* TEXT */}
                    <h3 className="mt-5 text-[16px] font-semibold text-[#111827]">
                      {f.title}
                    </h3>

                    <p className="mt-2 text-[14px] leading-6 text-[#6b7280]">
                      {f.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <Button
                  onClick={() => scrollToSection("features")}
                  className="bg-[#6C4CF1] hover:bg-[#5a3ee0] text-white h-12 px-7 rounded-xl text-[15px] shadow-xl shadow-purple-200"
                >
                  Start Planning Now →
                </Button>

                <Button
                  variant="outline"
                  onClick={() => scrollToSection("how-it-works")}
                  className="h-12 px-7 rounded-xl border-[#e5e7eb] text-[15px]"
                >
                  ⏺ See How It Works
                </Button>
              </div>

              {/* USERS */}
              <div className="flex items-center gap-4 mt-10">

                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-300 to-purple-500"
                    />
                  ))}
                </div>

                <p className="text-[14px] text-[#6b7280]">
                  Join{" "}
                  <span className="font-semibold text-[#111827]">
                    1,000+
                  </span>{" "}
                  people taking control of their finances
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >

              {/* Glow */}
              <div className="absolute -inset-6 bg-purple-200/30 blur-3xl rounded-full"></div>

              {/* CARD */}
              <div className="relative bg-white border border-[#ece8ff] rounded-[28px] shadow-2xl shadow-purple-100 overflow-hidden">

                {/* TOP BAR */}
                <div className="flex items-center gap-2 px-6 py-4 border-b border-[#f1efff]">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b6b]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffd93d]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#6bcB77]"></div>

                  <div className="ml-auto w-20 h-3 rounded-full bg-[#f3f4f6]"></div>
                </div>

                <div className="p-6 md:p-8">

                  <h2 className="text-[22px] font-semibold text-[#111827]">
                    Your Monthly Plan
                  </h2>

                  <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">

                    {/* CHART */}
                    <div className="relative flex justify-center">

                      <div className="w-[230px] h-[230px] rounded-full bg-[conic-gradient(#6C4CF1_0deg_144deg,#4F8EF7_144deg_216deg,#36C690_216deg_270deg,#F5A524_270deg_324deg,#FF6B9A_324deg_360deg)] flex items-center justify-center shadow-xl">

                        <div className="w-[105px] h-[105px] bg-white rounded-full flex items-center justify-center text-4xl shadow-inner">
                          💼
                        </div>
                      </div>
                    </div>

                    {/* LEGEND */}
                    <div className="space-y-5">

                      {[
                        ["Bills & Essentials", "40%", "#6C4CF1"],
                        ["Savings", "20%", "#36C690"],
                        ["Investments", "15%", "#4F8EF7"],
                        ["Emergency Fund", "15%", "#F5A524"],
                        ["Flex / Lifestyle", "10%", "#FF6B9A"],
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ background: item[2] }}
                            ></div>

                            <div>
                              <p className="text-[14px] font-medium text-[#111827]">
                                {item[0]}
                              </p>

                              <p className="text-[12px] text-[#9ca3af]">
                                {item[1]}
                              </p>
                            </div>
                          </div>

                          <p className="text-[14px] font-semibold text-[#111827]">
                            {item[1]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM CARD */}
                  <div className="mt-8 bg-[#f7fff9] border border-[#d7f5df] rounded-2xl px-5 py-4 flex items-center justify-between">

                    <div>
                      <p className="text-[14px] font-semibold text-[#166534]">
                        You're on track!
                      </p>

                      <p className="text-[13px] text-[#4b5563] mt-1">
                        Keep it up and watch your money grow.
                      </p>
                    </div>

                    <div className="text-3xl">
                      📈
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRUSTED */}
        <section className="px-5 md:px-10 pb-12">

          <div className="border-t border-[#f0ebff] pt-8">

            <p className="text-center text-[#6b7280] text-[14px]">
              Trusted by smart earners who want more from their money
            </p>

            <div className="flex flex-wrap items-center justify-center gap-10 mt-8 opacity-60 text-[#4b5563] font-semibold">

              <span>piggyVest</span>
              <span>Cowrywise</span>
              <span>Risevest</span>
              <span>bamboo</span>
              <span>ARM</span>

            </div>
          </div>
        </section>

        {/* SECTIONS */}
        <section id="how-it-works"></section>
        <section id="why-it-matters"></section>
        <section id="pricing"></section>
        <section id="faq"></section>

      </div>
    </div>
  );
}
