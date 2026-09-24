"use client";

import React from "react";
import { Shareholder } from "@/types/venture";
import { formatUSD, formatPercentage, formatNumber } from "@/lib/utils";
import { PieChart, Users, Shield, TrendingUp, Layers } from "lucide-react";

interface CapTableWaterfallProps {
  shareholders: Shareholder[];
  totalShares: number;
  postMoneyValuation: number;
}

export function CapTableWaterfall({
  shareholders,
  totalShares,
  postMoneyValuation,
}: CapTableWaterfallProps) {
  const sharePrice = totalShares > 0 ? postMoneyValuation / totalShares : 0;

  const roleColors: Record<Shareholder["role"], { bg: string; text: string; bar: string }> = {
    Founder: { bg: "bg-emerald-500/10", text: "text-emerald-400", bar: "bg-emerald-500" },
    "Venture Capital": { bg: "bg-cyan-500/10", text: "text-cyan-400", bar: "bg-cyan-500" },
    "Angel Investor": { bg: "bg-amber-500/10", text: "text-amber-400", bar: "bg-amber-500" },
    "ESOP Pool": { bg: "bg-purple-500/10", text: "text-purple-400", bar: "bg-purple-500" },
    Employee: { bg: "bg-blue-500/10", text: "text-blue-400", bar: "bg-blue-500" },
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0a0f20] p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              FULLY DILUTED
            </span>
            <span className="text-xs text-slate-400">Capitalization Ownership Ledger</span>
          </div>
          <h2 className="text-lg font-black text-white">Equity Distribution Breakdown</h2>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400 uppercase">Implied Share Price</div>
          <div className="text-xl font-black text-emerald-400 font-mono">
            ${sharePrice.toFixed(4)}
            <span className="text-xs text-slate-400 font-normal"> / share</span>
          </div>
        </div>
      </div>

      {/* Multi-Segment Stacked Ownership Bar */}
      <div className="mb-6">
        <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden flex shadow-inner">
          {shareholders.map((s) => {
            const pct = (s.sharesCount / totalShares) * 100;
            return (
              <div
                key={s.id}
                style={{ width: `${pct}%` }}
                className={`h-full transition-all duration-500 ${roleColors[s.role].bar} hover:opacity-80`}
                title={`${s.name} (${s.role}): ${pct.toFixed(2)}%`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Founders</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <span>Venture Capital</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Angel Investors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>ESOP Option Pool</span>
          </div>
        </div>
      </div>

      {/* Shareholders Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
            <tr>
              <th className="pb-3">Shareholder Name</th>
              <th className="pb-3">Role / Class</th>
              <th className="pb-3 text-right">Shares Count</th>
              <th className="pb-3 text-right">Ownership %</th>
              <th className="pb-3 text-right">Current Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {shareholders.map((s) => {
              const ownershipPercent = (s.sharesCount / totalShares) * 100;
              const currentValue = s.sharesCount * sharePrice;

              return (
                <tr key={s.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 font-bold text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${roleColors[s.role].bar}`} />
                    <span>{s.name}</span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${roleColors[s.role].bg} ${roleColors[s.role].text} border-current/20`}
                    >
                      {s.role} • {s.shareClass}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono text-slate-300">
                    {formatNumber(s.sharesCount)}
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-emerald-400">
                    {formatPercentage(ownershipPercent)}
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-white">
                    {formatUSD(currentValue)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="border-t-2 border-slate-800 font-bold text-white">
            <tr>
              <td className="pt-3">Total Fully Diluted</td>
              <td className="pt-3 text-[10px] text-slate-400 font-normal">All Classes</td>
              <td className="pt-3 text-right font-mono text-cyan-400">{formatNumber(totalShares)}</td>
              <td className="pt-3 text-right font-mono text-emerald-400">100.00%</td>
              <td className="pt-3 text-right font-mono text-emerald-400">
                {formatUSD(postMoneyValuation)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
