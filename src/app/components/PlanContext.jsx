
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        const parsedPlan = JSON.parse(storedPlan);
        if (Array.isArray(parsedPlan)) {
          setPlan(parsedPlan);
        }
      }

      if (storedSaved) {
        const parsedSaved = JSON.parse(storedSaved);
        if (Array.isArray(parsedSaved)) {
          setSaved(parsedSaved);
        }
      }
    } catch {
      localStorage.removeItem("fitlog-plan");
      localStorage.removeItem("fitlog-saved");
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [plan, saved, ready]);

  function addToPlan(workout) {
    if (plan.some((item) => item.id === workout.id)) {
      setMessage("This workout is already in your plan.");
      return;
    }

    if (plan.length >= 5) {
      setMessage("Your plan is full. You can add up to 5 workouts.");
      return;
    }

    setPlan((current) => [...current, { ...workout, done: false }]);
    setMessage("Workout added to today's plan.");
  }

  function removeFromPlan(id) {
    setPlan((current) => current.filter((item) => item.id !== id));
    setMessage("Workout removed from your plan.");
  }

  function markAsDone(id) {
    setPlan((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: true } : item
      )
    );
    setMessage("Workout marked as done.");
  }

  function addToSaved(workout) {
    if (saved.some((item) => item.id === workout.id)) {
      setMessage("This workout is already saved.");
      return;
    }

    setSaved((current) => [...current, workout]);
    setMessage("Workout saved for later.");
  }

  function removeFromSaved(id) {
    setSaved((current) => current.filter((item) => item.id !== id));
    setMessage("Workout removed from saved.");
  }

  function clearMessage() {
    setMessage("");
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        ready,
        message,
        addToPlan,
        removeFromPlan,
        markAsDone,
        addToSaved,
        removeFromSaved,
        clearMessage,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
