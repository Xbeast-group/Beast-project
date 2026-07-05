"use client";
import { useState } from "react";
import BulletAccordion from "@/components/BulletAccordion";
import Navbar from "@/app/navbar/page";

export default function Home() {
  const [text, setText] = useState("");
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    setBullets([]);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setBullets(data.bullets);
    } catch (e) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 ">
      <Navbar/>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Terms & Conditions Summarizer
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your Terms & Conditions here..."
          className="w-full h-60 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSummarize}
          disabled={loading || !text}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {bullets.length > 0 && <BulletAccordion bullets={bullets} />}
      </div>
    </main>
  );
}