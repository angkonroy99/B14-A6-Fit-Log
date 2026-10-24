
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "./components/PlanContext";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "Pick a workout, build today's plan, and track your training with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#1E1E1E] font-sans text-white">
        <PlanProvider>
  {children}
  <Toast />
  <Footer />
</PlanProvider>
      </body>
    </html>
  );
}
