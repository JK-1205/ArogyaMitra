"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        variables: {
          colorPrimary: "#34d399",
          colorBackground: "transparent",
          borderRadius: "14px",
          fontFamily: "Inter, system-ui",
        },
        elements: {
          card: "bg-transparent shadow-none p-0 tracking-[0.01em]",
          headerTitle: "text-2xl font-semibold tracking-tight text-white mb-1",
          headerSubtitle: "text-sm text-slate-400 leading-relaxed mb-7",
          footer: "hidden",

          formFieldLabel: "text-xs font-medium text-slate-400 mb-1",
          formFieldInput:
            "h-11 rounded-lg bg-slate-900 border border-slate-700 text-white \
             focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 \
             focus:shadow-[0_0_24px_rgba(52,211,153,0.45)] transition-all duration-300",

          formButtonPrimary:
            "h-11 rounded-lg bg-emerald-500 hover:bg-emerald-600 \
             text-slate-900 font-semibold transition shadow-md",

          footerActionLink:
            "text-emerald-400 hover:text-emerald-300 font-medium",
        },
      }}
    />
  );
}
