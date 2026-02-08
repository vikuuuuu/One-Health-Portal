"use client";

import { useMemo, useState } from "react";

const initialEntries = [
  {
    id: 1,
    date: "2024-10-07",
    time: "10:30",
    buyPrice: 6200,
    goldAmount: 10,
    sellPrice: 6350,
    notes: "Diwali saving",
  },
  {
    id: 2,
    date: "2024-10-18",
    time: "14:15",
    buyPrice: 6280,
    goldAmount: 5,
    sellPrice: 6400,
    notes: "Extra investment",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

function getTotalInvested(entries) {
  return entries.reduce(
    (total, entry) => total + entry.buyPrice * entry.goldAmount,
    0
  );
}

function getTotalGold(entries) {
  return entries.reduce((total, entry) => total + entry.goldAmount, 0);
}

function getPotentialSell(entries) {
  return entries.reduce(
    (total, entry) => total + entry.sellPrice * entry.goldAmount,
    0
  );
}

function getProfitLoss(entries) {
  return getPotentialSell(entries) - getTotalInvested(entries);
}

function buildChartPoints(entries) {
  if (entries.length === 0) return [];
  const sorted = [...entries].sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );
  const prices = sorted.map((entry) => entry.buyPrice);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  return sorted.map((entry, index) => ({
    x: index,
    y: 100 - ((entry.buyPrice - min) / range) * 80 - 10,
    label: entry.buyPrice,
  }));
}

export default function DashboardPage() {
  const [entries, setEntries] = useState(initialEntries);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    buyPrice: "",
    goldAmount: "",
    sellPrice: "",
    notes: "",
  });

  const totals = useMemo(() => {
    return {
      totalInvested: getTotalInvested(entries),
      totalGold: getTotalGold(entries),
      potentialSell: getPotentialSell(entries),
      profitLoss: getProfitLoss(entries),
    };
  }, [entries]);

  const chartPoints = useMemo(() => buildChartPoints(entries), [entries]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: formData.date,
      time: formData.time,
      buyPrice: Number(formData.buyPrice),
      goldAmount: Number(formData.goldAmount),
      sellPrice: Number(formData.sellPrice),
      notes: formData.notes,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setFormData({
      date: "",
      time: "",
      buyPrice: "",
      goldAmount: "",
      sellPrice: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
            Gold Portfolio Dashboard
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Aaj ka buy, sell aur total gold ka snapshot
          </h1>
          <p className="text-base text-slate-300">
            Apne gold buy/sell entries, total investment, potential sell value,
            aur profit/loss ko ek hi jagah manage karein.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm text-slate-400">Total Gold (grams)</p>
            <p className="mt-2 text-2xl font-semibold">
              {numberFormatter.format(totals.totalGold)} g
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm text-slate-400">Total Invested</p>
            <p className="mt-2 text-2xl font-semibold">
              {currencyFormatter.format(totals.totalInvested)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm text-slate-400">Potential Sell Value</p>
            <p className="mt-2 text-2xl font-semibold">
              {currencyFormatter.format(totals.potentialSell)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm text-slate-400">Profit / Loss</p>
            <p
              className={`mt-2 text-2xl font-semibold ${
                totals.profitLoss >= 0 ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {currencyFormatter.format(totals.profitLoss)}
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="text-lg font-semibold">Buy &amp; Sell Entry</h2>
            <p className="mt-1 text-sm text-slate-400">
              Har purchase ke liye date, time, price, quantity, aur selling price
              note karein.
            </p>
            <form
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <label className="grid gap-2 text-sm text-slate-300">
                Buy Date
                <input
                  className="rounded-xl border border-slate-700 bg-slate-950 p-3"
                  name="date"
                  onChange={handleChange}
                  required
                  type="date"
                  value={formData.date}
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Buy Time
                <input
                  className="rounded-xl border border-slate-700 bg-slate-950 p-3"
                  name="time"
                  onChange={handleChange}
                  required
                  type="time"
                  value={formData.time}
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Buy Price (per gram)
                <input
                  className="rounded-xl border border-slate-700 bg-slate-950 p-3"
                  min="0"
                  name="buyPrice"
                  onChange={handleChange}
                  required
                  type="number"
                  value={formData.buyPrice}
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Gold Quantity (grams)
                <input
                  className="rounded-xl border border-slate-700 bg-slate-950 p-3"
                  min="0"
                  name="goldAmount"
                  onChange={handleChange}
                  required
                  step="0.1"
                  type="number"
                  value={formData.goldAmount}
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Expected Sell Price (per gram)
                <input
                  className="rounded-xl border border-slate-700 bg-slate-950 p-3"
                  min="0"
                  name="sellPrice"
                  onChange={handleChange}
                  required
                  type="number"
                  value={formData.sellPrice}
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Notes / Post Detail
                <input
                  className="rounded-xl border border-slate-700 bg-slate-950 p-3"
                  name="notes"
                  onChange={handleChange}
                  placeholder="e.g. Festival saving"
                  type="text"
                  value={formData.notes}
                />
              </label>
              <button
                className="col-span-full rounded-2xl bg-amber-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-300"
                type="submit"
              >
                Add Entry
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="text-lg font-semibold">Gold Price Trend</h2>
            <p className="mt-1 text-sm text-slate-400">
              Recent buy prices ka chart (per gram).
            </p>
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <svg viewBox="0 0 320 120" className="h-40 w-full">
                <defs>
                  <linearGradient
                    id="goldGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <rect width="320" height="120" fill="#0f172a" rx="16" />
                {chartPoints.length > 1 && (
                  <path
                    d={`M ${chartPoints
                      .map((point, index) =>
                        `${20 + index * 70} ${point.y}`
                      )
                      .join(" L ")}`}
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="3"
                  />
                )}
                {chartPoints.length > 1 && (
                  <path
                    d={`M 20 110 L ${chartPoints
                      .map((point, index) =>
                        `${20 + index * 70} ${point.y}`
                      )
                      .join(" L ")} L ${20 + (chartPoints.length - 1) * 70} 110 Z`}
                    fill="url(#goldGradient)"
                  />
                )}
                {chartPoints.map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={20 + index * 70}
                      cy={point.y}
                      r="4"
                      fill="#facc15"
                    />
                    <text
                      x={20 + index * 70}
                      y={point.y - 10}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="10"
                    >
                      {point.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Latest Buy Price</span>
                <span className="font-semibold text-white">
                  {entries[0]
                    ? currencyFormatter.format(entries[0].buyPrice)
                    : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Average Buy Price</span>
                <span className="font-semibold text-white">
                  {entries.length
                    ? currencyFormatter.format(
                        getTotalInvested(entries) / getTotalGold(entries)
                      )
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold">Transaction Details</h2>
          <p className="mt-1 text-sm text-slate-400">
            Har entry ka buy time, quantity, aur expected selling value.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3">Date &amp; Time</th>
                  <th className="pb-3">Buy Price</th>
                  <th className="pb-3">Gold (g)</th>
                  <th className="pb-3">Sell Price</th>
                  <th className="pb-3">Invested</th>
                  <th className="pb-3">Notes</th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-t border-slate-800/60"
                  >
                    <td className="py-3">
                      <div className="font-medium text-white">
                        {entry.date}
                      </div>
                      <div className="text-xs text-slate-400">
                        {entry.time}
                      </div>
                    </td>
                    <td className="py-3">
                      {currencyFormatter.format(entry.buyPrice)}
                    </td>
                    <td className="py-3">
                      {numberFormatter.format(entry.goldAmount)}
                    </td>
                    <td className="py-3">
                      {currencyFormatter.format(entry.sellPrice)}
                    </td>
                    <td className="py-3">
                      {currencyFormatter.format(
                        entry.buyPrice * entry.goldAmount
                      )}
                    </td>
                    <td className="py-3 text-slate-300">
                      {entry.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
