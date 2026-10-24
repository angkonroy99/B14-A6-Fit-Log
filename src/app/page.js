
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import WorkoutCard from "./components/WorkoutCard";

export default function Home() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Could not load workouts");
        }

        const data = await response.json();
        const list = Array.isArray(data) ? data : data.value;

        if (!Array.isArray(list)) {
          throw new Error("Invalid workout data");
        }

        setWorkouts(list);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#1E1E1E] text-white">
      <Navbar />

      <section className="mx-auto mt-8 grid min-h-[448px] w-[calc(100%-32px)] max-w-[1232px] grid-cols-1 items-center gap-6 sm:mt-12 sm:w-[calc(100%-48px)] md:grid-cols-2 md:gap-0">
        <div className="flex min-h-[260px] w-full max-w-[558px] flex-col justify-center sm:min-h-[300px] md:ml-[57px]">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#CCFF00] sm:mb-5 sm:text-sm">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-[558px] text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#9CA3AF] sm:mt-5 sm:text-base sm:leading-7">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-6 inline-flex min-h-[40px] w-fit items-center justify-center bg-[#CCFF00] px-5 text-sm font-bold text-black transition hover:bg-white sm:mt-7"
          >
            BROWSE WORKOUTS →
          </a>
        </div>

        <div className="flex w-full items-center justify-center md:justify-end">
          <img
            src="/banner.png"
            alt="Fitness exercise illustration"
            className="block h-auto w-full max-w-[220px] object-contain sm:max-w-[290px] md:max-w-[334px]"
          />
        </div>
      </section>

      <section
        id="library"
        className="mx-auto mt-12 w-[calc(100%-32px)] max-w-[1232px] scroll-mt-24 pb-12 sm:mt-16 sm:w-[calc(100%-48px)] sm:pb-16"
      >
        <h2 className="text-2xl font-bold">THE LIBRARY</h2>

        <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">
          Twelve lifts covering every major muscle group.
        </p>

        {loading && (
          <p className="py-12 text-center text-[#9CA3AF]">
            Loading workouts...
          </p>
        )}

        {error && (
          <p className="py-12 text-center text-red-400">
            Could not load workouts. Please refresh the page.
          </p>
        )}

        {!loading && !error && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onClick={() => router.push(`/workout/${workout.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
