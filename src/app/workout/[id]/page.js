
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { usePlan } from "../../components/PlanContext";

export default function WorkoutDetails() {
  const { id } = useParams();
  const router = useRouter();

  const {
    addToPlan,
    addToSaved,
    message,
    clearMessage,
    ready,
  } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();
        const item = data?.value ?? data;

        if (!item || !item.id) {
          throw new Error("Invalid workout data");
        }

        setWorkout(item);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadWorkout();
    }
  }, [id]);

  return (
    <main className="min-h-screen bg-[#1E1E1E] text-white">
      <Navbar />

      <div className="mx-auto w-[calc(100%-32px)] max-w-[1232px] py-10 sm:w-[calc(100%-48px)]">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-[#CCFF00] hover:text-white"
        >
          ← BACK TO WORKOUTS
        </Link>

        {loading && (
          <p className="py-16 text-center text-[#9CA3AF]">
            Loading workout...
          </p>
        )}

        {error && !loading && (
          <div className="py-16 text-center">
            <h1 className="text-2xl font-bold">Workout not found</h1>
            <p className="mt-3 text-[#9CA3AF]">
              Could not load this workout. Please try again.
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-6 bg-[#CCFF00] px-5 py-3 font-bold text-black"
            >
              BACK TO WORKOUTS
            </button>
          </div>
        )}

        {workout && !loading && !error && (
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <div className="overflow-hidden border border-white/10 bg-[#242424]">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-auto max-h-[600px] min-h-[280px] w-full object-cover"
                />
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[#CCFF00]">
                WORKOUT DETAILS
              </p>

              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                {workout.name}
              </h1>

              {workout.description && (
                <p className="mt-5 leading-7 text-[#9CA3AF]">
                  {workout.description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {(workout.muscleGroups || []).map((group) => (
                  <span
                    key={group}
                    className="border border-[#CCFF00]/40 px-3 py-1.5 text-sm text-[#CCFF00]"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  ["Equipment", workout.equipment],
                  ["Difficulty", workout.difficulty],
                  ["Sets", workout.sets],
                  ["Reps", workout.reps],
                  ["Duration", workout.duration ? `${workout.duration} min` : null],
                  ["Calories", workout.caloriesBurned ? `${workout.caloriesBurned} kcal` : null],
                  ["Rating", workout.rating ? `★ ${workout.rating}` : null],
                ]
                  .filter(([, value]) => value !== undefined && value !== null && value !== "")
                  .map(([label, value]) => (
                    <div
                      key={label}
                      className="border border-white/10 bg-[#242424] p-4"
                    >
                      <p className="text-xs text-[#9CA3AF]">{label}</p>
                      <p className="mt-2 break-words font-semibold">{value}</p>
                    </div>
                  ))}
              </div>

              {Array.isArray(workout.instructions) &&
                workout.instructions.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-bold">HOW TO PERFORM</h2>
                    <ol className="mt-4 list-inside list-decimal space-y-3 text-sm leading-6 text-[#9CA3AF]">
                      {workout.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => addToPlan(workout)}
                  disabled={!ready}
                  className="min-h-12 flex-1 bg-[#CCFF00] px-4 text-sm font-bold text-black transition hover:bg-white disabled:opacity-60"
                >
                  + ADD TO TODAY&apos;S PLAN
                </button>

                <button
                  type="button"
                  onClick={() => addToSaved(workout)}
                  disabled={!ready}
                  className="min-h-12 flex-1 border border-white/30 px-4 text-sm font-bold text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00] disabled:opacity-60"
                >
                  SAVE FOR LATER
                </button>
              </div>

              {message && (
                <div
                  role="status"
                  className="mt-4 border border-white/10 bg-[#242424] p-3 text-sm text-[#CCFF00]"
                >
                  <p>{message}</p>
                  <button
                    type="button"
                    onClick={clearMessage}
                    className="mt-2 text-xs text-[#9CA3AF] underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
