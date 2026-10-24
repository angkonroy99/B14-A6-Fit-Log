
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { usePlan } from "../components/PlanContext";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const {
    plan,
    saved,
    ready,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const currentItems = activeTab === "plan" ? plan : saved;

  const sortedItems = useMemo(() => {
    return [...currentItems].sort((a, b) => {
      const aValue = Number(a[sortBy] || 0);
      const bValue = Number(b[sortBy] || 0);

      return bValue - aValue;
    });
  }, [currentItems, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#1E1E1E] text-white">
      <Navbar />

      <div className="mx-auto min-h-[630px] w-[calc(100%-32px)] max-w-[1184px] py-10 sm:w-[calc(100%-48px)]">
        <section>
          <h1 className="text-3xl font-bold tracking-wide">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm text-[#9CA3AF]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-white/10 bg-[#242424] p-5">
            <p className="text-sm text-[#9CA3AF]">Exercises</p>
            <p className="mt-3 text-3xl font-bold text-[#CCFF00]">
              {ready ? plan.length : 0}
            </p>
          </div>

          <div className="border border-white/10 bg-[#242424] p-5">
            <p className="text-sm text-[#9CA3AF]">Minutes</p>
            <p className="mt-3 text-3xl font-bold text-[#CCFF00]">
              {ready ? totalMinutes : 0}
            </p>
          </div>

          <div className="border border-white/10 bg-[#242424] p-5">
            <p className="text-sm text-[#9CA3AF]">Calories</p>
            <p className="mt-3 text-3xl font-bold text-[#CCFF00]">
              {ready ? totalCalories : 0}
            </p>
          </div>
        </section>

        <section className="mt-8 flex flex-col justify-between gap-4 border-b border-white/10 sm:flex-row sm:items-center">
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`border-b-2 px-1 py-3 text-sm font-bold ${
                activeTab === "plan"
                  ? "border-[#CCFF00] text-[#CCFF00]"
                  : "border-transparent text-[#9CA3AF] hover:text-white"
              }`}
            >
              TODAY&apos;S PLAN ({ready ? plan.length : 0})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`border-b-2 px-1 py-3 text-sm font-bold ${
                activeTab === "saved"
                  ? "border-[#CCFF00] text-[#CCFF00]"
                  : "border-transparent text-[#9CA3AF] hover:text-white"
              }`}
            >
              SAVED ({ready ? saved.length : 0})
            </button>
          </div>

          <label className="flex items-center gap-3 py-3 text-sm">
            <span className="text-[#9CA3AF]">Sort By</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="min-h-10 border border-white/20 bg-[#242424] px-3 text-white outline-none focus:border-[#CCFF00]"
            >
              <option value="duration">Duration ↓</option>
              <option value="caloriesBurned">Calories ↓</option>
              <option value="rating">Rating ↓</option>
            </select>
          </label>
        </section>

        {!ready ? (
          <p className="py-16 text-center text-[#9CA3AF]">
            Loading workouts...
          </p>
        ) : sortedItems.length === 0 ? (
          <section className="flex min-h-[300px] flex-col items-center justify-center py-12 text-center">
            <h2 className="text-2xl font-bold">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#9CA3AF]">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#CCFF00] px-6 text-sm font-bold text-black transition hover:bg-white"
            >
              GO TO WORKOUTS
            </Link>
          </section>
        ) : (
          <section className="mt-6 space-y-4">
            {sortedItems.map((workout) => (
              <article
                key={workout.id}
                className="flex flex-col gap-4 border border-white/10 bg-[#242424] p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-36 w-full object-cover sm:h-28 sm:w-36"
                  loading="lazy"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold">
                    {workout.name}
                  </h2>

                  <p className="mt-2 text-sm text-[#9CA3AF]">
                    {workout.equipment || "Equipment not specified"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#9CA3AF]">
  <span>Duration: {workout.duration || 0} min</span>
  <span>Calories: {workout.caloriesBurned || 0} kcal</span>
  <span>Rating: ★ {workout.rating || "N/A"}</span>
</div>
                  {activeTab === "plan" && workout.done && (
                    <p className="mt-2 text-sm font-bold text-[#CCFF00]">
                      COMPLETED
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 sm:max-w-[190px]">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="border border-white/20 px-3 py-2 text-center text-xs font-bold hover:border-[#CCFF00]"
                  >
                    VIEW DETAILS
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => markAsDone(workout.id)}
                      disabled={workout.done}
                      className="border border-[#CCFF00]/50 px-3 py-2 text-xs font-bold text-[#CCFF00] disabled:opacity-50"
                    >
                      {workout.done ? "DONE" : "MARK AS DONE"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="border border-white/20 px-3 py-2 text-xs font-bold text-white hover:border-red-400 hover:text-red-400"
                  >
                    REMOVE ×
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-xs text-[#9CA3AF]">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </footer>
    </main>
  );
}
