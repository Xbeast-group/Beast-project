"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function BulletAccordion({ bullets }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      {bullets.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex justify-between items-center px-4 py-3 bg-violet-500 hover:bg-violet-400 transition text-left"
            >
              <span className="font-medium text-white">{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 py-3 text-sm text-white bg-violet-500 border-t border-gray-100">
                {item.detail}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}