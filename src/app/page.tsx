"use client";

import React, { useState } from "react";
import { useVenture } from "@/context/VentureContext";
import { CapTableWaterfall } from "@/components/CapTableWaterfall";
import { formatUSD, formatNumber } from "@/lib/utils";
import {
  Vault,
  TrendingUp,
  DollarSign,
  Users,
  Plus,
  Sparkles,
  PieChart,
  Sliders,
} from "lucide-react";

export default function CapTableDashboardPage() {
  const {
    shareholders,
    rounds,
    totalShares,
    currentValuationUSD,
    simulateNewFundingRound,
  } = useVenture();

  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [simRoundName, setSimRoundName] = useState<"Series A" | "Series B">("Series A");
  const [simPreMoney, setSimPreMoney] = useState<number>(30000000);
  const [simCapitalRaised, setSimCapitalRaised] = useState<number>(8000000);

  const foundersShares = shareholders
    .filter((s) => s.role === "Founder")
    .reduce((acc, s) => acc + s.sharesCount, 0);
  const foundersOwnershipPct = (foundersShares / totalShares) * 100;

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateNewFundingRound(simRoundName, Number(simPreMoney), Number(simCapitalRaised));
    setIsSimulateModalOpen(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Financial KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[#0a0f20] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Post-Money Valuation</div>
          <div className="text-2xl font-black text-emerald-400 flex items-center justify-between">
            <span>{formatUSD(currentValuationUSD)}</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Latest Priced Round Valuation</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Fully Diluted Shares</div>
          <div className="text-2xl font-black text-white flex items-center justify-between">
            <span>{formatNumber(totalShares)}</span>
            <PieChart className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-[10px] text-cyan-400 mt-1 font-bold">100% Equity Accounted</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Founders Retained Equity</div>
          <div className="text-2xl font-black text-amber-400 flex items-center justify-between">
            <span>{foundersOwnershipPct.toFixed(1)}%</span>
            <Users className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Common Voting Control</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Priced Rounds Closed</div>
          <div className="text-2xl font-black text-purple-400 flex items-center justify-between">
            <span>{rounds.length} Putaran</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Institutional VC Backed</div>
        </div>
      </div>

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Institutional Capitalization Matrix</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              VENTURE GRADE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visualisasi kepemilikan saham fully diluted, simulasi putaran pendanaan baru, dan perhitungan efek dilusi founder real-time.
          </p>
        </div>

        <button
          onClick={() => setIsSimulateModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Simulasi Putaran Pendanaan Baru</span>
        </button>
      </div>

      {/* Main Cap Table Waterfall Component */}
      <CapTableWaterfall
        shareholders={shareholders}
        totalShares={totalShares}
        postMoneyValuation={currentValuationUSD}
      />

      {/* Simulation Modal */}
      {isSimulateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0c1224] border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">Simulasi Putaran Saham Baru</h3>
              </div>
              <button
                onClick={() => setIsSimulateModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimulateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nama Putaran Saham</label>
                <select
                  value={simRoundName}
                  onChange={(e) => setSimRoundName(e.target.value as any)}
                  className="w-full bg-[#080d1a] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-emerald-500 outline-none"
                >
                  <option value="Series A">Series A Preferred</option>
                  <option value="Series B">Series B Preferred</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Pre-Money Valuation (USD)</label>
                <input
                  type="number"
                  step={1000000}
                  required
                  value={simPreMoney}
                  onChange={(e) => setSimPreMoney(Number(e.target.value))}
                  className="w-full bg-[#080d1a] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Fresh Capital Raised (USD)</label>
                <input
                  type="number"
                  step={500000}
                  required
                  value={simCapitalRaised}
                  onChange={(e) => setSimCapitalRaised(Number(e.target.value))}
                  className="w-full bg-[#080d1a] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#080d1a] border border-slate-800 space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Hasil Post-Money:</span>
                  <span className="text-white font-bold font-mono">
                    {formatUSD(Number(simPreMoney) + Number(simCapitalRaised))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Dilusi Investor Baru:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {((simCapitalRaised / (Number(simPreMoney) + Number(simCapitalRaised))) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSimulateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20"
                >
                  Eksekusi Dilusi Putaran Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
