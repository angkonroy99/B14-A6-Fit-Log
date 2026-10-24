
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#1E1E1E]">
      <div className="mx-auto flex min-h-[69px] w-full max-w-[1232px] flex-col items-center justify-center gap-3 px-4 py-5 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
          />
          <span className="text-sm font-bold tracking-wider text-white">
            FITLOG
          </span>
        </div>

        <p className="text-center text-xs leading-5 text-[#9CA3AF] sm:text-right sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
