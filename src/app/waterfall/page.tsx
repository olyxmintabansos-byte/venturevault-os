"use client";

import React, { useState } from "react";
import { useVenture } from "@/context/VentureContext";
import { formatUSD, formatPercentage, formatNumber } from "@/lib/utils";
import {
  TrendingDown,
  DollarSign,
  ShieldCheck,
  Award,
  Sliders,
  Sparkles,
  PieChart,
} from "lucide-react";

export default function WaterfallSimulatorPage() {
  const { shareholders, calculateWaterfall } = useVenture();
  const [exitValuationUSD, setExitValuationUSD] = useState<number>(60000000);

  const waterfallRows = calculateWaterfall(exitValuationUSD);

  const totalFounderProceeds = waterfallRows
    .filter((r) => r.shareClass === "Common")
    .reduce((acc, r) => acc + r.totalProceedsUSD, 0);

  const totalInvestorProceeds = waterfallRows
    .filter((r) => r.shareClass.includes("Preferred"))
    .reduce((acc, r) => acc + r.totalProceedsUSD, 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[#0a0f20] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">M&amp;A Exit Valuation</div>
          <div className="text-2xl font-black text-emerald-400 flex items-center justify-between">
            <span>{formatUSD(exitValuationUSD)}</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Enterprise Gross Proceeds</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Founders Payout</div>
          <div className="text-2xl font-black text-white flex items-center justify-between">
            <span>{formatUSD(totalFounderProceeds)}</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-[10px] text-amber-400 mt-1 font-bold">
            {((totalFounderProceeds / exitValuationUSD) * 100).toFixed(1)}% of Exit Pool
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Investors Payout</div>
          <div className="text-2xl font-black text-cyan-400 flex items-center justify-between">
            <span>{formatUSD(totalInvestorProceeds)}</span>
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">1x Non-Participating Preferred</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Average VC MOIC</div>
          <div className="text-2xl font-black text-purple-400 flex items-center justify-between">
            <span>
              {(
                waterfallRows
                  .filter((r) => r.moicMultiple > 0 && r.moicMultiple < 900)
                  .reduce((acc, r) => acc + r.moicMultiple, 0) / 2
              ).toFixed(1)}
              x
            </span>
            <TrendingDown className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Multiple on Invested Capital</div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>M&amp;A Exit Liquidation Preference Waterfall</span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            DILUTION MODEL
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Simulasi pembagian hasil akuisisi M&amp;A atau IPO: preferensi likuidasi investor senior, titik konversi non-participating, dan proceeds bersih pemegang saham common.
        </p>
      </div>

      {/* Exit Valuation Slider Control */}
      <div className="p-6 rounded-2xl bg-[#0a0f20] border border-slate-800 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-black text-white">Simulasi Nilai Penjualan Perusahaan (Exit Valuation)</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Geser slider dari $5 Juta hingga $200 Juta untuk melihat pergeseran titik preferensi vs konversi ke saham biasa.
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {formatUSD(exitValuationUSD)}
            </span>
          </div>
        </div>

        <input
          type="range"
          min={5000000}
          max={200000000}
          step={1000000}
          value={exitValuationUSD}
          onChange={(e) => setExitValuationUSD(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />

        <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
          <span>$5M (Distressed Exit)</span>
          <span>$50M (Baseline Target)</span>
          <span>$100M (Growth Milestone)</span>
          <span>$200M (Unicorn Acquisition)</span>
        </div>
      </div>

      {/* Waterfall Payout Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0a0f20] overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#070b18] flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Waterfall Distribution by Shareholder
          </h3>
          <span className="text-[10px] text-slate-400">Pari-Passu Preferred Tranche Standard</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] bg-[#080d1c]">
              <tr>
                <th className="py-3 px-6">Shareholder Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4 text-right">Pref Payout</th>
                <th className="py-3 px-4 text-right">Common Payout</th>
                <th className="py-3 px-4 text-right">Total Net Proceeds</th>
                <th className="py-3 px-4 text-right">Effective %</th>
                <th className="py-3 px-6 text-right">MOIC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {waterfallRows.map((row) => (
                <tr key={row.shareholderId} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{row.shareholderName}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 border border-slate-700 text-slate-300">
                      {row.shareClass}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-slate-400">
                    {row.preferencePayoutUSD > 0 ? formatUSD(row.preferencePayoutUSD) : "-"}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-slate-400">
                    {row.commonProceedsUSD > 0 ? formatUSD(row.commonProceedsUSD) : "-"}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-black text-emerald-400">
                    {formatUSD(row.totalProceedsUSD)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-white">
                    {formatPercentage(row.effectiveOwnershipPct)}
                  </td>
                  <td className="py-4 px-6 text-right font-mono font-black text-cyan-400">
                    {row.moicMultiple > 900 ? "N/A" : `${row.moicMultiple}x`}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-slate-800 font-bold text-white bg-[#080d1c]">
              <tr>
                <td className="py-3 px-6">Total Exit Waterfall</td>
                <td className="py-3 px-4 text-[10px] text-slate-400">100% Fully Distributed</td>
                <td className="py-3 px-4 text-right font-mono text-slate-400">-</td>
                <td className="py-3 px-4 text-right font-mono text-slate-400">-</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">
                  {formatUSD(exitValuationUSD)}
                </td>
                <td className="py-3 px-4 text-right font-mono text-white">100.00%</td>
                <td className="py-3 px-6 text-right font-mono text-cyan-400">-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}
