
import React from 'react';
import { useProposal } from '../../context/ProposalContext';

const SummaryCards: React.FC = () => {
  const { financialSummary } = useProposal();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="output-card worst-case">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">WORST CASE SCENARIO</h3>
        
        <div className="mb-2">
          <p className="text-sm text-gray-600">EST. YEARLY OPERATING PROFIT</p>
          <p className="text-xl font-bold text-red-600">
            {formatCurrency(financialSummary.worstCase.yearlyOperatingProfit)}
          </p>
        </div>
        
        <div className="mb-2">
          <p className="text-sm text-gray-600">EST. YEARLY OPERATING MARGIN</p>
          <p className="text-lg font-semibold text-red-600">
            {formatPercentage(financialSummary.worstCase.yearlyOperatingMargin)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">EST. YEARLY GROSS REVENUE</p>
          <p className="text-lg font-semibold">
            {formatCurrency(financialSummary.worstCase.yearlyGrossRevenue)}
          </p>
        </div>
      </div>
      
      <div className="output-card best-case">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">BEST CASE SCENARIO</h3>
        
        <div className="mb-2">
          <p className="text-sm text-gray-600">EST. YEARLY OPERATING PROFIT</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(financialSummary.bestCase.yearlyOperatingProfit)}
          </p>
        </div>
        
        <div className="mb-2">
          <p className="text-sm text-gray-600">EST. YEARLY OPERATING MARGIN</p>
          <p className="text-lg font-semibold text-green-600">
            {formatPercentage(financialSummary.bestCase.yearlyOperatingMargin)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">EST. YEARLY GROSS REVENUE</p>
          <p className="text-lg font-semibold">
            {formatCurrency(financialSummary.bestCase.yearlyGrossRevenue)}
          </p>
        </div>
      </div>
      
      <div className="output-card scenario">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">SCENARIO SUMMARY</h3>
        
        <div className="mb-2">
          <p className="text-sm text-gray-600">YEARLY REVENUE RANGE</p>
          <p className="text-lg font-semibold">
            {formatCurrency(financialSummary.summary.yearlyRevenueRange[0])} - {formatCurrency(financialSummary.summary.yearlyRevenueRange[1])}
          </p>
        </div>
        
        <div className="mb-2">
          <p className="text-sm text-gray-600">YEARLY OP PROFIT RANGE</p>
          <p className="text-lg font-semibold">
            {formatCurrency(financialSummary.summary.yearlyOpProfitRange[0])} - {formatCurrency(financialSummary.summary.yearlyOpProfitRange[1])}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">YEARLY OP MARGIN RANGE</p>
          <p className="text-lg font-semibold">
            {formatPercentage(financialSummary.summary.yearlyOpMarginRange[0])} - {formatPercentage(financialSummary.summary.yearlyOpMarginRange[1])}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
