"use client";

import React, { useState } from "react";
import { useVenture } from "@/context/VentureContext";
import { SafeNote } from "@/types/venture";
import { formatUSD, formatNumber, formatPercentage } from "@/lib/utils";
import { Calculator, CheckCircle2, TrendingUp, AlertCircle, Sparkles } from "lucide-react";

export default function SafeConverterPage() {
  const { safes, totalShares, currentValuationUSD, convertSafeNotes } = useVenture();
  const [nextRoundValuationUSD, setNextRoundValuationUSD] = useState<number>(30000000);
  const [convertedSuccess, setConvertedSuccess] = useState(false);

  const nextRoundSharePrice = nextRoundValuationUSD / totalShares;

  const handleConvert = () => {
    convertSafeNotes(nextRoundSharePrice);
    setConvertedSuccess(true);
    setTimeout(() => setConvertedSuccess(false), 4000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Y Combinator SAFE Notes Conversion Engine</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              VALUATION CAP &amp; DISCOUNT
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kalkulator konversi instrumen Simple Agreement for Future Equity (SAFE) menjadi saham preferen saat putaran pendanaan ekuitas berikutnya.
          </p>
        </div>

        <button
          onClick={handleConvert}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
          <span>Konversi Semua SAFE ke Saham</span>
        </button>
      </div>

      {convertedSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Seluruh SAFE Notes berhasil dikonversi dan tercatat di Cap Table Fully Diluted!</span>
        </div>
      )}

      {/* Conversion Simulator Control */}
      <div className="p-6 rounded-2xl bg-[#0a0f20] border border-slate-800 mb-8">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>Simulasi Valuasi Putaran Berikutnya (Next Qualified Equity Financing)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Target Next Round Valuation</label>
            <input
              type="number"
              step={1000000}
              value={nextRoundValuationUSD}
              onChange={(e) => setNextRoundValuationUSD(Number(e.target.value))}
              className="w-full bg-[#070b18] border border-slate-800 rounded-xl px-4 py-2 text-white font-mono focus:border-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Implied Share Price Tanpa Diskon</label>
            <div className="p-2.5 bg-[#070b18] border border-slate-800 rounded-xl font-mono text-emerald-400 font-bold">
              ${nextRoundSharePrice.toFixed(4)} / share
            </div>
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Existing Fully Diluted Base</label>
            <div className="p-2.5 bg-[#070b18] border border-slate-800 rounded-xl font-mono text-white">
              {formatNumber(totalShares)} shares
            </div>
          </div>
        </div>
      </div>

      {/* Active SAFE Notes Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0a0f20] overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#070b18] flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Daftar Portofolio SAFE Notes Aktif ({safes.length})
          </h3>
          <span className="text-[10px] text-slate-400">Y Combinator Post-Money Safe Standard</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {safes.map((safe) => {
            const effectiveCapPrice = safe.valuationCapUSD / totalShares;
            const discountPrice = nextRoundSharePrice * (1 - safe.discountRatePercent / 100);
            const conversionPrice = Math.min(effectiveCapPrice, discountPrice);
            const sharesToIssue = Math.round(safe.investmentAmountUSD / conversionPrice);
            const impliedOwnershipPct = (sharesToIssue / (totalShares + sharesToIssue)) * 100;

            return (
              <div
                key={safe.id}
                className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-900/30 transition-colors text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{safe.investorName}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        safe.status === "CONVERTED"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {safe.status}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] flex flex-wrap gap-3 mt-1">
                    <span>Investment: <strong className="text-white font-mono">{formatUSD(safe.investmentAmountUSD)}</strong></span>
                    <span>•</span>
                    <span>Valuation Cap: <strong className="text-emerald-400 font-mono">{formatUSD(safe.valuationCapUSD)}</strong></span>
                    <span>•</span>
                    <span>Discount: <strong className="text-cyan-400 font-mono">{safe.discountRatePercent}%</strong></span>
                    <span>•</span>
                    <span>Type: {safe.safeType}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-right pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Effective Price</div>
                    <div className="font-mono font-bold text-white">${conversionPrice.toFixed(4)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Shares Earned</div>
                    <div className="font-mono font-bold text-cyan-400">{formatNumber(sharesToIssue)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Implied %</div>
                    <div className="font-mono font-bold text-emerald-400">
                      {formatPercentage(impliedOwnershipPct)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
