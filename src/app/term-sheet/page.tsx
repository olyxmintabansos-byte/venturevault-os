"use client";

import React, { useState } from "react";
import { useVenture } from "@/context/VentureContext";
import { formatUSD } from "@/lib/utils";
import { FileCheck2, Printer, Shield, CheckCircle2, Building2 } from "lucide-react";

export default function TermSheetPage() {
  const { termSheet } = useVenture();

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>NVCA Series A Term Sheet Engine</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              LEGAL GRADE A4
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Lembar kesepakatan investasi modal ventura standar National Venture Capital Association (NVCA) format cetak A4.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Dokumen Term Sheet A4</span>
        </button>
      </div>

      {/* Pixel-Perfect A4 Sheet Document */}
      <div className="flex justify-center">
        <div className="w-full max-w-[850px] bg-white text-slate-900 rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 font-sans text-xs">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
              SUMMARY OF TERMS FOR SERIES A PREFERRED STOCK FINANCING
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight uppercase">
              {termSheet.companyName}
            </h2>
            <p className="text-[11px] text-slate-600 mt-1 max-w-lg mx-auto">
              This Term Sheet summarizes the principal terms with respect to the Series A Preferred Stock financing of {termSheet.companyName} by {termSheet.leadInvestor}.
            </p>
          </div>

          {/* Core Terms Summary Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-8">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-700 w-1/3">Issuer:</td>
                  <td className="py-2.5 px-4 font-black text-slate-900">{termSheet.companyName}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-700">Lead Investor:</td>
                  <td className="py-2.5 px-4 text-slate-900 font-bold">{termSheet.leadInvestor}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-700">Securities:</td>
                  <td className="py-2.5 px-4 font-black text-slate-900">{termSheet.shareClass}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-700">Investment Amount:</td>
                  <td className="py-2.5 px-4 font-mono font-black text-emerald-700">
                    {formatUSD(termSheet.investmentAmountUSD)}
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-700">Pre-Money Valuation:</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">
                    {formatUSD(termSheet.preMoneyValuationUSD)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-700">Post-Money Valuation:</td>
                  <td className="py-2.5 px-4 font-mono font-black text-slate-950">
                    {formatUSD(termSheet.postMoneyValuationUSD)}
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-700">Purchase Price Per Share:</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">
                    ${termSheet.sharePriceUSD.toFixed(4)} per share
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-700">Option Pool Reservation:</td>
                  <td className="py-2.5 px-4 text-slate-900">
                    {termSheet.optionPoolPercentage}% unallocated post-closing pool for employee equity.
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-700">Liquidation Preference:</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">
                    {termSheet.liquidationPreference} (pari-passu with prior Seed Preferred).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legal Clauses */}
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-black text-slate-950 text-sm uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
                1. Board of Directors Governance
              </h3>
              <p className="text-slate-700 leading-relaxed">
                The Board of Directors shall consist of five (5) members upon closing: {termSheet.boardComposition}.
              </p>
            </div>

            <div>
              <h3 className="font-black text-slate-950 text-sm uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
                2. Protective Provisions (Negative Covenants)
              </h3>
              <p className="text-slate-700 mb-2">
                So long as at least 25% of Series A Preferred Stock remains outstanding, the Company shall not take any of the following actions without majority Series A consent:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                {termSheet.protectiveProvisions.map((prov, i) => (
                  <li key={i}>{prov}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-black text-slate-950 text-sm uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
                3. Vesting &amp; Lock-Up
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Common Stock held by Founders will be subject to a standard 48-month vesting schedule with a 12-month cliff. Standard double-trigger acceleration upon a Change of Control event shall apply.
              </p>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t-2 border-slate-900">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest text-center mb-8">
              IN WITNESS WHEREOF, THE PARTIES HERETO HAVE EXECUTED THIS TERM SHEET
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="border-t border-slate-400 pt-3">
                <div className="font-black text-slate-950 text-sm">{termSheet.companyName}</div>
                <div className="text-slate-700 mt-1">By: {termSheet.authorizedSignatoryFounder}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Title: Chief Executive Officer</div>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">Date: {termSheet.closingDate}</div>
              </div>

              <div className="border-t border-slate-400 pt-3">
                <div className="font-black text-slate-950 text-sm">{termSheet.leadInvestor}</div>
                <div className="text-slate-700 mt-1">By: {termSheet.authorizedSignatoryInvestor}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Title: General Partner</div>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">Date: {termSheet.closingDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
