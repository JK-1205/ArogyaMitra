"use client";

import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* LEFT — VISUAL IDENTITY */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-transparent to-cyan-500/20" />

        {/* glow line */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 h-[420px] w-[2px] bg-gradient-to-b from-transparent via-emerald-400/70 to-transparent shadow-[0_0_40px_rgba(52,211,153,0.6)]" />

        <div className="relative z-10 flex flex-col justify-center px-20">
          <h1 className="text-5xl font-extrabold leading-tight">
            Your health.
            <br />
            <span className="text-emerald-400">One trusted space.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-lg">
            ArogyaMitra securely connects patients, doctors, and care — without
            friction. Your health data, appointments, and credits all in one
            trusted place.
          </p>
        </div>
      </div>

      {/* RIGHT — AUTH */}
      <div className="w-full lg:w-1/2 flex justify-center px-6">
        <div className="pt-36 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
    relative flex flex-col justify-center items-center rounded-2xl
    bg-white/5 backdrop-blur-xl
    border border-white/10
    px-10 py-12
    shadow-[0_0_80px_rgba(16,185,129,0.25)]
  "
          >
            {/* glow edge */}
            <div className="absolute inset-0 rounded-2xl ring-3 ring-emerald-400/30 pointer-events-none" />

            <div className="space-y-4">{children}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
