
export type RoleType = 'Clinical Director' | 'Senior BCBA/ECD' | 'Behavior Technician' | 'Social Skills Coach';
export type CompensationType = 'Hourly' | 'Salary';
export type ClientType = 'YHA' | 'Hillel';
export type ViewType = 'Combined' | 'YHA' | 'Hillel';

export interface CompensationEntry {
  role: RoleType;
  type: CompensationType;
  rate: number;
}

export interface RoleScenario {
  role: RoleType;
  billingRate: number;
  minHours: number;
  maxHours: number;
}

export interface ClientScenario {
  clientName: ClientType;
  roles: RoleScenario[];
}

export interface GlobalSettings {
  laborCostMultiplier: number;
  overheadPercentage: number;
  weeksInProposalPeriod: number;
}

export interface ProposalState {
  globalSettings: GlobalSettings;
  teamCompensation: CompensationEntry[];
  proposalTitle: string;
  proposalDate: Date;
  activeClient: ClientType;
  clients: ClientScenario[];
  activeView: ViewType;
  activeTab: 'inputs' | 'financial' | 'preview';
  savedState: boolean;
  lastSaved: Date | null;
}

// Financial calculations interfaces (placeholders for now)
export interface FinancialSummary {
  worstCase: {
    yearlyOperatingProfit: number;
    yearlyOperatingMargin: number;
    yearlyGrossRevenue: number;
  };
  bestCase: {
    yearlyOperatingProfit: number;
    yearlyOperatingMargin: number;
    yearlyGrossRevenue: number;
  };
  summary: {
    yearlyRevenueRange: [number, number];
    yearlyOpProfitRange: [number, number];
    yearlyOpMarginRange: [number, number];
  };
}

export interface DetailedFinancialBreakdown {
  role: RoleType;
  grossRevenue: [number, number]; // [min, max]
  burdenedCost: [number, number];
  grossProfit: [number, number];
  grossMargin: [number, number]; // percentage
}

export interface FinancialBreakdown {
  detailedBreakdown: DetailedFinancialBreakdown[];
  totalGrossRevenue: [number, number];
  totalBurdenedCost: [number, number];
  totalGrossProfit: [number, number];
  totalGrossMargin: [number, number];
  estimatedOverhead: [number, number];
  estimatedOperatingProfit: [number, number];
  estimatedOperatingMargin: [number, number];
}
