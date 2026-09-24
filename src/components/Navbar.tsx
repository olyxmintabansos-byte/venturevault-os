"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Vault,
  PieChart,
  Calculator,
  ArrowUpRight,
  TrendingDown,
  FileCheck2,
} from "lucide-react";
import { useVenture } from "@/context/VentureContext";
import { formatUSD } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { currentValuationUSD, safes } = useVenture();

  const outstandingSafes = safes.filter((s) => s.status === "OUTSTANDING").length;

  const navLinks = [
    { name: "Cap Table Matrix", href: "/", icon: PieChart, badge: undefined as number | undefined },
    { name: "SAFE Converter", href: "/safe/", icon: Calculator, badge: outstandingSafes > 0 ? outstandingSafes : undefined },
    { name: "M&A Waterfall Simulator", href: "/waterfall/", icon: TrendingDown, badge: undefined as number | undefined },
    { name: "NVCA Term Sheet A4", href: "/term-sheet/", icon: FileCheck2, badge: undefined as number | undefined },
  ];

  return (
    <header className="border-b border-slate-800 bg-[#070b18]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Vault className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-wider">VENTUREVAULT</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  TITAN 13
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Cap Table Modeling &amp; Dilution Waterfall Engine</p>
            </div>
          </Link>
        </div>

        {/* Navigation & Live Valuation HUD */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0a1024] border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Valuation:</span>
            <span className="font-black text-emerald-400 font-mono">
              {formatUSD(currentValuationUSD)}
            </span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{link.name}</span>
                  {link.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? "bg-slate-950 text-emerald-400" : "bg-emerald-500 text-slate-950"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <a
              href="https://olyxmintabansos-byte.github.io/olyx-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <span>Apex Hub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
