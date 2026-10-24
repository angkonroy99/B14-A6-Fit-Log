
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePlan } from "./PlanContext";

export default function Navbar() {
  const { plan, saved, ready } = usePlan();

  const planCount = ready ? plan.length : 0;
  const savedCount = ready ? saved.length : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1E1E1E]">
      <nav className="mx-auto flex min-h-[81px] max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-lg font-bold tracking-wide text-white sm:text-xl">
            FITLOG
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-[#CCFF00]"
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded border border-[#CCFF00] bg-[#CCFF00] px-2.5 py-2 text-xs font-bold text-black sm:px-4"
          >
            Plan <span className="ml-1">{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded border border-white/30 px-2.5 py-2 text-xs font-bold text-white sm:px-4"
          >
            Saved <span className="ml-1">{savedCount}</span>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center gap-8 border-t border-white/5 py-3 md:hidden">
        <Link
          href="/"
          className="text-sm font-medium text-[#CCFF00]"
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className="text-sm font-medium text-gray-300"
        >
          My Plan
        </Link>
      </div>
    </header>
  );
}
