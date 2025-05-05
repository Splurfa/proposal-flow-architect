
import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { formatCurrency } from '../../utils/formatters';

const SummaryCards: React.FC = () => {
  const { financialSummary } = useProposal();
  
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getColorClass = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="section-card p-5 border border-red-100 bg-red-50">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">WORST CASE SCENARIO</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">EST. YEARLY OPERATING PROFIT</p>
          <p className={`text-xl font-bold ${getColorClass(financialSummary.worstCase.yearlyOperatingProfit)}`}>
            {formatCurrency(financialSummary.worstCase.yearlyOperatingProfit)}
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">EST. YEARLY OPERATING MARGIN</p>
          <p className={`text-lg font-semibold ${getColorClass(financialSummary.worstCase.yearlyOperatingMargin)}`}>
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
      
      <div className="section-card p-5 border border-green-100 bg-green-50">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">BEST CASE SCENARIO</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">EST. YEARLY OPERATING PROFIT</p>
          <p className={`text-xl font-bold ${getColorClass(financialSummary.bestCase.yearlyOperatingProfit)}`}>
            {formatCurrency(financialSummary.bestCase.yearlyOperatingProfit)}
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">EST. YEARLY OPERATING MARGIN</p>
          <p className={`text-lg font-semibold ${getColorClass(financialSummary.bestCase.yearlyOperatingMargin)}`}>
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
      
      <div className="section-card p-5 border border-blue-100 bg-blue-50">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">SCENARIO SUMMARY</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">YEARLY REVENUE RANGE</p>
          <p className="text-lg font-semibold">
            {formatCurrency(financialSummary.summary.yearlyRevenueRange[0])} - {formatCurrency(financialSummary.summary.yearlyRevenueRange[1])}
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">YEARLY OP PROFIT RANGE</p>
          <p className="text-lg font-semibold">
            <span className={getColorClass(financialSummary.summary.yearlyOpProfitRange[0])}>
              {formatCurrency(financialSummary.summary.yearlyOpProfitRange[0])}
            </span>
            {' - '}
            <span className={getColorClass(financialSummary.summary.yearlyOpProfitRange[1])}>
              {formatCurrency(financialSummary.summary.yearlyOpProfitRange[1])}
            </span>
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">YEARLY OP MARGIN RANGE</p>
          <p className="text-lg font-semibold">
            <span className={getColorClass(financialSummary.summary.yearlyOpMarginRange[0])}>
              {formatPercentage(financialSummary.summary.yearlyOpMarginRange[0])}
            </span>
            {' - '}
            <span className={getColorClass(financialSummary.summary.yearlyOpMarginRange[1])}>
              {formatPercentage(financialSummary.summary.yearlyOpMarginRange[1])}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
