
export default function WorkoutCard({ workout, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full overflow-hidden border border-white/10 bg-[#242424] text-left transition hover:border-[#CCFF00]/60"
    >
      <div className="h-[220px] overflow-hidden bg-[#2a2a2a]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="border border-[#CCFF00]/40 px-2 py-1 text-xs text-[#CCFF00]"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-[#9CA3AF]">
          {workout.equipment}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
          <span className="text-[#9CA3AF]">
            {workout.duration} min
          </span>

          <span className="text-[#9CA3AF]">
            {workout.caloriesBurned} kcal
          </span>

          <span className="font-semibold text-[#CCFF00]">
            ★ {workout.rating}
          </span>
        </div>
      </div>
    </button>
  );
}
