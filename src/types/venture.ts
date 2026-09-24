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
  liquidationPreferenceMultiple?: number; // e.g. 1.0x
  isParticipating?: boolean;
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

export interface WaterfallPayoutItem {
  shareholderId: string;
  shareholderName: string;
  shareClass: ShareClass;
  preferencePayoutUSD: number;
  commonProceedsUSD: number;
  totalProceedsUSD: number;
  moicMultiple: number; // Multiple on Invested Capital
  effectiveOwnershipPct: number;
}

export interface TermSheetClause {
  category: string;
  title: string;
  content: string;
  isStandardNvca: boolean;
}

export interface TermSheetData {
  companyName: string;
  leadInvestor: string;
  investmentAmountUSD: number;
  preMoneyValuationUSD: number;
  postMoneyValuationUSD: number;
  sharePriceUSD: number;
  shareClass: "Series A Preferred";
  optionPoolPercentage: number;
  liquidationPreference: "1x Non-Participating";
  boardComposition: string;
  votingRights: string;
  protectiveProvisions: string[];
  closingDate: string;
  authorizedSignatoryInvestor: string;
  authorizedSignatoryFounder: string;
}
