"use client";
import { FileText, Sparkles, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Paste Document",
    description:
      "Grab any T&C, Privacy Policy or Policy Doc. No fancy formatting needed.",
  },
  {
    icon: Sparkles,
    title: "AI Analysis",
    description:
      "Groq AI reads through all clauses, releases, and rights in seconds.",
  },
  {
    icon: ClipboardCheck,
    title: "Easy Summary",
    description:
      "Get a clear, plain-English breakdown of the risks that matter.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#0a0a0a] text-white px-6 py-24">
      <div className=" w-full mx-auto text-center">
        <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
          How it works
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          Three steps.{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Zero legalese.
          </span>
        </h2>

        <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Connecting line, sirf desktop pe dikhega */}
          <div className="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-violet-500/40 via-violet-500/40 to-violet-500/40" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className=" w-full relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-5 z-10 bg-[#0a0a0a]">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}