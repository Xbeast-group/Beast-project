"use client";
import {
  Sparkles,
  ListChecks,
  ShieldAlert,
  Eye,
  Lock,
  History,
} from "lucide-react";
import HowItWorks from "../HowItWorks/page";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Summaries",
    description:
      "Groq's Llama models distill dense legalese into a clear, human-readable summary in seconds.",
  },
  {
    icon: ListChecks,
    title: "Key Points Extraction",
    description:
      "The most important clauses surfaced as bullet points — no more skimming 40 pages.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Detection",
    description:
      "Automatic red-flag detection for clauses that could disadvantage you.",
  },
  {
    icon: Eye,
    title: "Privacy Insights",
    description:
      "See exactly what data is collected, shared, and how long it's kept.",
  },
  {
    icon: Lock,
    title: "Secure Processing",
    description:
      "Documents are analyzed over encrypted channels. Your privacy is respected.",
  },
  {
    icon: History,
    title: "History Tracking",
    description:
      "Sign in to save every summary. Revisit and compare policies over time.",
  },
];

export default function FeaturesPage() {
  return (
    <>
    <main className="min-h-screen w-full  bg-[#0a0a0a] text-white p-20">
      <div className=" mx-auto">
        <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
          Features
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-2xl">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            read the fine print
          </span>
          .
        </h1>

        <p className="text-zinc-400 text-base max-w-xl mb-14">
          Built to make legal documents feel effortless. From risk scoring to
          privacy audits — one paste is all it takes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, idx) => {
              const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#141414] border border-zinc-800 rounded-xl p-6 hover:border-violet-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
        })}
        </div>
      </div>
      
    </main>
    <HowItWorks/>
        </>
  );
}