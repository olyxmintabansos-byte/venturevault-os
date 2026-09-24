export type ShareClass = "Common" | "Seed Preferred" | "Series A Preferred" | "Option Pool (ESOP)";

export interface Shareholder {
  id: string;
  name: string;
  role: "Founder" | "Employee" | "Angel Investor" | "Venture Capital" | "ESOP Pool";
  shareClass: ShareClass;
  sharesCount: number;
  initialInvestmentUSD: number;
  vestingMonths: number;
  vestingCliffMonths: number;
}

export interface FundingRound {
  id: string;
  roundName: "Founding" | "Seed Round" | "Series A" | "Series B";
  preMoneyValuationUSD: number;
  capitalRaisedUSD: number;
  postMoneyValuationUSD: number;
  sharePriceUSD: number;
  sharesIssued: number;
  closedDate: string;
}

export interface SafeNote {
  id: string;
  investorName: string;
  investmentAmountUSD: number;
  valuationCapUSD: number;
  discountRatePercent: number; // e.g. 20%
  safeType: "Post-Money" | "Pre-Money";
  status: "CONVERTED" | "OUTSTANDING";
  convertedSharesCount?: number;
}

export interface WaterfallExitTier {
  exitValuationUSD: number;
  commonProceedsUSD: number;
  preferredProceedsUSD: number;
  commonMultiple: number;
  preferredMultiple: number;
}
