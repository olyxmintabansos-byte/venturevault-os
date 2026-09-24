"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Shareholder,
  FundingRound,
  SafeNote,
  WaterfallPayoutItem,
  TermSheetData,
} from "@/types/venture";

const INITIAL_SHAREHOLDERS: Shareholder[] = [
  {
    id: "sh-1",
    name: "Alex Vane (CEO & Founder)",
    role: "Founder",
    shareClass: "Common",
    sharesCount: 4500000,
    initialInvestmentUSD: 25000,
    vestingMonths: 48,
    vestingCliffMonths: 12,
  },
  {
    id: "sh-2",
    name: "Elena Rostova (CTO & Co-Founder)",
    role: "Founder",
    shareClass: "Common",
    sharesCount: 3500000,
    initialInvestmentUSD: 25000,
    vestingMonths: 48,
    vestingCliffMonths: 12,
  },
  {
    id: "sh-3",
    name: "Unallocated ESOP Pool (Option Pool)",
    role: "ESOP Pool",
    shareClass: "Option Pool (ESOP)",
    sharesCount: 1000000,
    initialInvestmentUSD: 0,
    vestingMonths: 48,
    vestingCliffMonths: 12,
  },
  {
    id: "sh-4",
    name: "Nexus Global Ventures (Lead Seed)",
    role: "Venture Capital",
    shareClass: "Seed Preferred",
    sharesCount: 1000000,
    initialInvestmentUSD: 2000000,
    vestingMonths: 0,
    vestingCliffMonths: 0,
    liquidationPreferenceMultiple: 1.0,
    isParticipating: false,
  },
];

const INITIAL_ROUNDS: FundingRound[] = [
  {
    id: "rnd-1",
    roundName: "Founding",
    preMoneyValuationUSD: 0,
    capitalRaisedUSD: 50000,
    postMoneyValuationUSD: 50000,
    sharePriceUSD: 0.0055,
    sharesIssued: 9000000,
    closedDate: "2024-01-15",
  },
  {
    id: "rnd-2",
    roundName: "Seed Round",
    preMoneyValuationUSD: 18000000,
    capitalRaisedUSD: 2000000,
    postMoneyValuationUSD: 20000000,
    sharePriceUSD: 2.0,
    sharesIssued: 1000000,
    closedDate: "2025-06-20",
  },
];

const INITIAL_SAFES: SafeNote[] = [
  {
    id: "safe-1",
    investorName: "SV Angel Syndicate",
    investmentAmountUSD: 500000,
    valuationCapUSD: 15000000,
    discountRatePercent: 20,
    safeType: "Post-Money",
    status: "OUTSTANDING",
  },
  {
    id: "safe-2",
    investorName: "Techstars Accelerator Fund",
    investmentAmountUSD: 250000,
    valuationCapUSD: 12000000,
    discountRatePercent: 20,
    safeType: "Post-Money",
    status: "OUTSTANDING",
  },
];

const INITIAL_TERMSHEET: TermSheetData = {
  companyName: "VentureVault Systems Inc.",
  leadInvestor: "Horizon Horizon Capital Partners VII",
  investmentAmountUSD: 8000000,
  preMoneyValuationUSD: 32000000,
  postMoneyValuationUSD: 40000000,
  sharePriceUSD: 3.2,
  shareClass: "Series A Preferred",
  optionPoolPercentage: 10,
  liquidationPreference: "1x Non-Participating",
  boardComposition: "2 Founders (CEO & CTO), 1 Horizon Partner, 1 Mutual Independent Industry Expert",
  votingRights: "Pari-passu on as-converted basis, with standard protective provisions for key corporate acts.",
  protectiveProvisions: [
    "Amendments to Certificate of Incorporation adversely affecting Series A",
    "Creation or authorization of senior or pari-passu equity securities",
    "Any M&A merger, asset sale, or liquidation event under $50M",
    "Declaration or payment of any dividend on Common or Preferred stock",
  ],
  closingDate: "2026-11-15",
  authorizedSignatoryInvestor: "Marcus Vance, General Partner (Horizon Capital)",
  authorizedSignatoryFounder: "Alex Vane, Chief Executive Officer",
};

interface VentureContextType {
  shareholders: Shareholder[];
  rounds: FundingRound[];
  safes: SafeNote[];
  termSheet: TermSheetData;
  totalShares: number;
  currentValuationUSD: number;
  addShareholder: (s: Omit<Shareholder, "id">) => void;
  simulateNewFundingRound: (
    roundName: FundingRound["roundName"],
    preMoneyValuation: number,
    capitalRaised: number
  ) => void;
  convertSafeNotes: (nextRoundPriceUSD: number) => void;
  calculateWaterfall: (exitValuationUSD: number) => WaterfallPayoutItem[];
  updateTermSheet: (data: Partial<TermSheetData>) => void;
}

const VentureContext = createContext<VentureContextType | undefined>(undefined);

export function VentureProvider({ children }: { children: React.ReactNode }) {
  const [shareholders, setShareholders] = useState<Shareholder[]>(INITIAL_SHAREHOLDERS);
  const [rounds, setRounds] = useState<FundingRound[]>(INITIAL_ROUNDS);
  const [safes, setSafes] = useState<SafeNote[]>(INITIAL_SAFES);
  const [termSheet, setTermSheet] = useState<TermSheetData>(INITIAL_TERMSHEET);

  // LocalStorage Persistence
  useEffect(() => {
    const savedSh = localStorage.getItem("VENTUREVAULT_SHAREHOLDERS");
    if (savedSh) {
      try {
        setShareholders(JSON.parse(savedSh));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("VENTUREVAULT_SHAREHOLDERS", JSON.stringify(shareholders));
  }, [shareholders]);

  const totalShares = shareholders.reduce((acc, s) => acc + s.sharesCount, 0);
  const latestRound = rounds[rounds.length - 1];
  const currentValuationUSD = latestRound ? latestRound.postMoneyValuationUSD : 20000000;

  const addShareholder = (s: Omit<Shareholder, "id">) => {
    const newSh: Shareholder = {
      ...s,
      id: `sh-${Date.now()}`,
    };
    setShareholders((prev) => [...prev, newSh]);
  };

  const simulateNewFundingRound = (
    roundName: FundingRound["roundName"],
    preMoneyValuation: number,
    capitalRaised: number
  ) => {
    const postMoney = preMoneyValuation + capitalRaised;
    const currentPrice = preMoneyValuation / totalShares;
    const newSharesToIssue = Math.round(capitalRaised / currentPrice);

    const newRound: FundingRound = {
      id: `rnd-${Date.now()}`,
      roundName,
      preMoneyValuationUSD: preMoneyValuation,
      capitalRaisedUSD: capitalRaised,
      postMoneyValuationUSD: postMoney,
      sharePriceUSD: currentPrice,
      sharesIssued: newSharesToIssue,
      closedDate: new Date().toISOString().split("T")[0],
    };

    const newInvestor: Shareholder = {
      id: `sh-${Date.now()}`,
      name: `Series ${roundName.slice(-1)} Lead Institutional Syndicate`,
      role: "Venture Capital",
      shareClass: "Series A Preferred",
      sharesCount: newSharesToIssue,
      initialInvestmentUSD: capitalRaised,
      vestingMonths: 0,
      vestingCliffMonths: 0,
      liquidationPreferenceMultiple: 1.0,
      isParticipating: false,
    };

    setRounds((prev) => [...prev, newRound]);
    setShareholders((prev) => [...prev, newInvestor]);
  };

  const convertSafeNotes = (nextRoundPriceUSD: number) => {
    setSafes((prev) =>
      prev.map((safe) => {
        if (safe.status === "CONVERTED") return safe;

        const effectiveCapPrice = safe.valuationCapUSD / totalShares;
        const discountPrice = nextRoundPriceUSD * (1 - safe.discountRatePercent / 100);
        const conversionPrice = Math.min(effectiveCapPrice, discountPrice);
        const sharesEarned = Math.round(safe.investmentAmountUSD / conversionPrice);

        addShareholder({
          name: `${safe.investorName} (Converted SAFE)`,
          role: "Angel Investor",
          shareClass: "Seed Preferred",
          sharesCount: sharesEarned,
          initialInvestmentUSD: safe.investmentAmountUSD,
          vestingMonths: 0,
          vestingCliffMonths: 0,
          liquidationPreferenceMultiple: 1.0,
          isParticipating: false,
        });

        return {
          ...safe,
          status: "CONVERTED",
          convertedSharesCount: sharesEarned,
        };
      })
    );
  };

  const calculateWaterfall = (exitValuationUSD: number): WaterfallPayoutItem[] => {
    let remainingExitPool = exitValuationUSD;

    // Step 1: Payout 1x Liquidation Preferences to Preferred Shareholders
    const preferencePayouts: Record<string, number> = {};
    let totalPreferencesPaid = 0;

    shareholders.forEach((s) => {
      if (s.liquidationPreferenceMultiple && s.initialInvestmentUSD > 0) {
        const prefAmount = s.initialInvestmentUSD * s.liquidationPreferenceMultiple;
        const actualPayout = Math.min(remainingExitPool, prefAmount);
        preferencePayouts[s.id] = actualPayout;
        totalPreferencesPaid += actualPayout;
        remainingExitPool -= actualPayout;
      } else {
        preferencePayouts[s.id] = 0;
      }
    });

    // Step 2: Check conversion threshold (1x Non-Participating: if as-converted share is greater, convert)
    return shareholders.map((s) => {
      const ownershipRatio = s.sharesCount / totalShares;
      const asConvertedPayout = exitValuationUSD * ownershipRatio;
      const prefPayout = preferencePayouts[s.id] || 0;

      let totalProceeds = 0;
      let preferenceUsed = 0;
      let commonUsed = 0;

      if (s.shareClass === "Common" || s.role === "Founder" || s.role === "ESOP Pool") {
        totalProceeds = remainingExitPool * (s.sharesCount / (totalShares - 1000000));
        commonUsed = totalProceeds;
      } else {
        if (asConvertedPayout > prefPayout) {
          totalProceeds = asConvertedPayout;
          commonUsed = asConvertedPayout;
        } else {
          totalProceeds = prefPayout;
          preferenceUsed = prefPayout;
        }
      }

      const moic =
        s.initialInvestmentUSD > 0
          ? totalProceeds / s.initialInvestmentUSD
          : totalProceeds > 0
          ? 999.0
          : 0;

      return {
        shareholderId: s.id,
        shareholderName: s.name,
        shareClass: s.shareClass,
        preferencePayoutUSD: Math.round(preferenceUsed),
        commonProceedsUSD: Math.round(commonUsed),
        totalProceedsUSD: Math.round(totalProceeds),
        moicMultiple: Number(moic.toFixed(2)),
        effectiveOwnershipPct: Number(((totalProceeds / exitValuationUSD) * 100).toFixed(2)),
      };
    });
  };

  const updateTermSheet = (data: Partial<TermSheetData>) => {
    setTermSheet((prev) => ({ ...prev, ...data }));
  };

  return (
    <VentureContext.Provider
      value={{
        shareholders,
        rounds,
        safes,
        termSheet,
        totalShares,
        currentValuationUSD,
        addShareholder,
        simulateNewFundingRound,
        convertSafeNotes,
        calculateWaterfall,
        updateTermSheet,
      }}
    >
      {children}
    </VentureContext.Provider>
  );
}

export function useVenture() {
  const ctx = useContext(VentureContext);
  if (!ctx) throw new Error("useVenture must be used within a VentureProvider");
  return ctx;
}
