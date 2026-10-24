
"use client";

import { useEffect } from "react";
import { usePlan } from "./PlanContext";

export default function Toast() {
  const { message, clearMessage } = usePlan();

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      clearMessage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, clearMessage]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100%-40px)] items-center gap-3 border border-[#CCFF00]/40 bg-[#242424] px-5 py-4 text-sm text-white shadow-xl"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] font-bold text-black">
        ✓
      </span>

      <p>{message}</p>

      <button
        type="button"
        onClick={clearMessage}
        aria-label="Dismiss notification"
        className="ml-2 text-lg text-[#9CA3AF] hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
