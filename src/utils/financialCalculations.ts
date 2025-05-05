
import { ClientScenario, CompensationEntry, GlobalSettings, FinancialSummary, FinancialBreakdown, DetailedFinancialBreakdown, ClientType, ViewType } from '../types';

/**
 * Calculate financial summary for a given client or combined view
 */
export const calculateFinancialSummary = (
  settings: GlobalSettings,
  compensation: CompensationEntry[],
  clients: ClientScenario[],
  view: ViewType
): FinancialSummary => {
  // If view is specific to a client, filter the clients array
  const relevantClients = view === 'Combined' 
    ? clients 
    : clients.filter(client => client.clientName === view);
  
  // Initialize totals for worst case
  let worstCaseYearlyRevenue = 0;
  let worstCaseBurdenedCost = 0;
  
  // Initialize totals for best case
  let bestCaseYearlyRevenue = 0;
  let bestCaseBurdenedCost = 0;
  
  // Calculate for each relevant client
  relevantClients.forEach(client => {
    client.roles.forEach(role => {
      // Find corresponding compensation entry
      const compEntry = compensation.find(comp => comp.role === role.role);
      if (!compEntry) return;
      
      // Calculate weekly revenue - worst case (min hours)
      const weeklyMinRevenue = role.billingRate * role.minHours;
      worstCaseYearlyRevenue += weeklyMinRevenue * settings.weeksInProposalPeriod;
      
      // Calculate weekly revenue - best case (max hours)
      const weeklyMaxRevenue = role.billingRate * role.maxHours;
      bestCaseYearlyRevenue += weeklyMaxRevenue * settings.weeksInProposalPeriod;
      
      // Calculate burdened cost based on compensation type
      let weeklyMinCost = 0;
      let weeklyMaxCost = 0;
      
      if (compEntry.type === 'Hourly') {
        weeklyMinCost = compEntry.rate * role.minHours * settings.laborCostMultiplier;
        weeklyMaxCost = compEntry.rate * role.maxHours * settings.laborCostMultiplier;
      } else { // Salary
        // Estimate weekly cost from annual salary
        const weeklySalaryCost = (compEntry.rate / 52) * settings.laborCostMultiplier;
        // Allocate based on proportion of hours
        weeklyMinCost = weeklySalaryCost * (role.minHours / 40); // Assuming 40-hour work week
        weeklyMaxCost = weeklySalaryCost * (role.maxHours / 40);
      }
      
      worstCaseBurdenedCost += weeklyMinCost * settings.weeksInProposalPeriod;
      bestCaseBurdenedCost += weeklyMaxCost * settings.weeksInProposalPeriod;
    });
  });
  
  // Calculate overhead based on percentage of revenue
  const worstCaseOverhead = worstCaseYearlyRevenue * (settings.overheadPercentage / 100);
  const bestCaseOverhead = bestCaseYearlyRevenue * (settings.overheadPercentage / 100);
  
  // Calculate operating profit
  const worstCaseOperatingProfit = worstCaseYearlyRevenue - worstCaseBurdenedCost - worstCaseOverhead;
  const bestCaseOperatingProfit = bestCaseYearlyRevenue - bestCaseBurdenedCost - bestCaseOverhead;
  
  // Calculate operating margin (as percentage)
  const worstCaseOperatingMargin = worstCaseYearlyRevenue !== 0 
    ? (worstCaseOperatingProfit / worstCaseYearlyRevenue) * 100 
    : 0;
  
  const bestCaseOperatingMargin = bestCaseYearlyRevenue !== 0 
    ? (bestCaseOperatingProfit / bestCaseYearlyRevenue) * 100 
    : 0;
  
  return {
    worstCase: {
      yearlyOperatingProfit: worstCaseOperatingProfit,
      yearlyOperatingMargin: worstCaseOperatingMargin,
      yearlyGrossRevenue: worstCaseYearlyRevenue,
    },
    bestCase: {
      yearlyOperatingProfit: bestCaseOperatingProfit,
      yearlyOperatingMargin: bestCaseOperatingMargin,
      yearlyGrossRevenue: bestCaseYearlyRevenue,
    },
    summary: {
      yearlyRevenueRange: [worstCaseYearlyRevenue, bestCaseYearlyRevenue],
      yearlyOpProfitRange: [worstCaseOperatingProfit, bestCaseOperatingProfit],
      yearlyOpMarginRange: [worstCaseOperatingMargin, bestCaseOperatingMargin],
    }
  };
};

/**
 * Calculate detailed financial breakdown for a given client or combined view
 */
export const calculateFinancialBreakdown = (
  settings: GlobalSettings,
  compensation: CompensationEntry[],
  clients: ClientScenario[],
  view: ViewType
): FinancialBreakdown => {
  // If view is specific to a client, filter the clients array
  const relevantClients = view === 'Combined' 
    ? clients 
    : clients.filter(client => client.clientName === view);
  
  // Map to track role-specific totals across all clients
  const roleBreakdowns = new Map<string, DetailedFinancialBreakdown>();
  
  // Process each client and role
  relevantClients.forEach(client => {
    client.roles.forEach(role => {
      // Find corresponding compensation entry
      const compEntry = compensation.find(comp => comp.role === role.role);
      if (!compEntry) return;
      
      // Calculate for this role
      const yearlyMinRevenue = role.billingRate * role.minHours * settings.weeksInProposalPeriod;
      const yearlyMaxRevenue = role.billingRate * role.maxHours * settings.weeksInProposalPeriod;
      
      // Calculate burdened cost based on compensation type
      let yearlyMinCost = 0;
      let yearlyMaxCost = 0;
      
      if (compEntry.type === 'Hourly') {
        yearlyMinCost = compEntry.rate * role.minHours * settings.laborCostMultiplier * settings.weeksInProposalPeriod;
        yearlyMaxCost = compEntry.rate * role.maxHours * settings.laborCostMultiplier * settings.weeksInProposalPeriod;
      } else { // Salary
        // Estimate weekly cost from annual salary
        const weeklySalaryCost = (compEntry.rate / 52) * settings.laborCostMultiplier;
        // Allocate based on proportion of hours
        yearlyMinCost = weeklySalaryCost * (role.minHours / 40) * settings.weeksInProposalPeriod;
        yearlyMaxCost = weeklySalaryCost * (role.maxHours / 40) * settings.weeksInProposalPeriod;
      }
      
      // Calculate gross profit
      const yearlyMinProfit = yearlyMinRevenue - yearlyMinCost;
      const yearlyMaxProfit = yearlyMaxRevenue - yearlyMaxCost;
      
      // Calculate gross margin as percentage
      const yearlyMinMargin = yearlyMinRevenue !== 0 
        ? (yearlyMinProfit / yearlyMinRevenue) * 100 
        : 0;
      
      const yearlyMaxMargin = yearlyMaxRevenue !== 0 
        ? (yearlyMaxProfit / yearlyMaxRevenue) * 100 
        : 0;
      
      // Get or create role entry in the map
      const existingBreakdown = roleBreakdowns.get(role.role);
      
      if (existingBreakdown) {
        // Update existing entry
        existingBreakdown.grossRevenue[0] += yearlyMinRevenue;
        existingBreakdown.grossRevenue[1] += yearlyMaxRevenue;
        existingBreakdown.burdenedCost[0] += yearlyMinCost;
        existingBreakdown.burdenedCost[1] += yearlyMaxCost;
        existingBreakdown.grossProfit[0] += yearlyMinProfit;
        existingBreakdown.grossProfit[1] += yearlyMaxProfit;
        
        // Recalculate margins based on updated totals
        existingBreakdown.grossMargin[0] = existingBreakdown.grossRevenue[0] !== 0 
          ? (existingBreakdown.grossProfit[0] / existingBreakdown.grossRevenue[0]) * 100 
          : 0;
        
        existingBreakdown.grossMargin[1] = existingBreakdown.grossRevenue[1] !== 0 
          ? (existingBreakdown.grossProfit[1] / existingBreakdown.grossRevenue[1]) * 100 
          : 0;
      } else {
        // Create new entry
        roleBreakdowns.set(role.role, {
          role: role.role,
          grossRevenue: [yearlyMinRevenue, yearlyMaxRevenue],
          burdenedCost: [yearlyMinCost, yearlyMaxCost],
          grossProfit: [yearlyMinProfit, yearlyMaxProfit],
          grossMargin: [yearlyMinMargin, yearlyMaxMargin]
        });
      }
    });
  });
  
  // Convert map to array for the breakdown
  const detailedBreakdown: DetailedFinancialBreakdown[] = Array.from(roleBreakdowns.values());
  
  // Calculate totals
  const totalGrossRevenue: [number, number] = [0, 0];
  const totalBurdenedCost: [number, number] = [0, 0];
  const totalGrossProfit: [number, number] = [0, 0];
  
  detailedBreakdown.forEach(item => {
    totalGrossRevenue[0] += item.grossRevenue[0];
    totalGrossRevenue[1] += item.grossRevenue[1];
    totalBurdenedCost[0] += item.burdenedCost[0];
    totalBurdenedCost[1] += item.burdenedCost[1];
    totalGrossProfit[0] += item.grossProfit[0];
    totalGrossProfit[1] += item.grossProfit[1];
  });
  
  // Calculate total gross margin
  const totalGrossMargin: [number, number] = [
    totalGrossRevenue[0] !== 0 ? (totalGrossProfit[0] / totalGrossRevenue[0]) * 100 : 0,
    totalGrossRevenue[1] !== 0 ? (totalGrossProfit[1] / totalGrossRevenue[1]) * 100 : 0
  ];
  
  // Calculate overhead
  const estimatedOverhead: [number, number] = [
    totalGrossRevenue[0] * (settings.overheadPercentage / 100),
    totalGrossRevenue[1] * (settings.overheadPercentage / 100)
  ];
  
  // Calculate operating profit
  const estimatedOperatingProfit: [number, number] = [
    totalGrossProfit[0] - estimatedOverhead[0],
    totalGrossProfit[1] - estimatedOverhead[1]
  ];
  
  // Calculate operating margin
  const estimatedOperatingMargin: [number, number] = [
    totalGrossRevenue[0] !== 0 ? (estimatedOperatingProfit[0] / totalGrossRevenue[0]) * 100 : 0,
    totalGrossRevenue[1] !== 0 ? (estimatedOperatingProfit[1] / totalGrossRevenue[1]) * 100 : 0
  ];
  
  return {
    detailedBreakdown,
    totalGrossRevenue,
    totalBurdenedCost,
    totalGrossProfit,
    totalGrossMargin,
    estimatedOverhead,
    estimatedOperatingProfit,
    estimatedOperatingMargin
  };
};
