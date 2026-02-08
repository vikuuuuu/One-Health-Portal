import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/60 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
          One Health Portal
        </p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Gold Investment Dashboard
        </h1>
        <p className="mt-3 text-base text-slate-300">
          Apne gold buy/sell entries aur total investment ko manage karne ke
          liye dashboard open karein.
        </p>
        <Link
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-amber-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-300"
          href="/dashboard"
        >
          Open Dashboard
        </Link>
      </div>
    </div>
  );
}
