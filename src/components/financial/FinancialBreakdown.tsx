
import React from 'react';
import { useProposal } from '../../context/ProposalContext';

const FinancialBreakdown: React.FC = () => {
  const { financialBreakdown } = useProposal();
  
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

  const getPercentageClass = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return '';
  };

  return (
    <div className="section-card mt-8">
      <h3 className="text-lg font-semibold mb-4">Detailed Financial Breakdown (Yearly Estimate)</h3>
      
      <div className="overflow-x-auto">
        <table className="styled-table">
          <thead>
            <tr>
              <th className="sticky left-0 bg-gray-50 z-10">ROLE</th>
              <th colSpan={2} className="text-center">GROSS REVENUE</th>
              <th colSpan={2} className="text-center">BURDENED COST</th>
              <th colSpan={2} className="text-center">GROSS PROFIT</th>
              <th colSpan={2} className="text-center">GROSS MARGIN</th>
            </tr>
            <tr>
              <th className="sticky left-0 bg-gray-50 z-10"></th>
              <th>MIN</th>
              <th>MAX</th>
              <th>MIN</th>
              <th>MAX</th>
              <th>MIN</th>
              <th>MAX</th>
              <th>MIN</th>
              <th>MAX</th>
            </tr>
          </thead>
          <tbody>
            {financialBreakdown.detailedBreakdown.map((item, index) => (
              <tr key={index}>
                <td className="sticky left-0 bg-white z-10 font-medium">{item.role}</td>
                <td>{formatCurrency(item.grossRevenue[0])}</td>
                <td>{formatCurrency(item.grossRevenue[1])}</td>
                <td>{formatCurrency(item.burdenedCost[0])}</td>
                <td>{formatCurrency(item.burdenedCost[1])}</td>
                <td className={getPercentageClass(item.grossProfit[0])}>
                  {formatCurrency(item.grossProfit[0])}
                </td>
                <td className={getPercentageClass(item.grossProfit[1])}>
                  {formatCurrency(item.grossProfit[1])}
                </td>
                <td className={getPercentageClass(item.grossMargin[0])}>
                  {formatPercentage(item.grossMargin[0])}
                </td>
                <td className={getPercentageClass(item.grossMargin[1])}>
                  {formatPercentage(item.grossMargin[1])}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-medium">
              <td className="sticky left-0 bg-gray-50 z-10">Total</td>
              <td>{formatCurrency(financialBreakdown.totalGrossRevenue[0])}</td>
              <td>{formatCurrency(financialBreakdown.totalGrossRevenue[1])}</td>
              <td>{formatCurrency(financialBreakdown.totalBurdenedCost[0])}</td>
              <td>{formatCurrency(financialBreakdown.totalBurdenedCost[1])}</td>
              <td className={getPercentageClass(financialBreakdown.totalGrossProfit[0])}>
                {formatCurrency(financialBreakdown.totalGrossProfit[0])}
              </td>
              <td className={getPercentageClass(financialBreakdown.totalGrossProfit[1])}>
                {formatCurrency(financialBreakdown.totalGrossProfit[1])}
              </td>
              <td className={getPercentageClass(financialBreakdown.totalGrossMargin[0])}>
                {formatPercentage(financialBreakdown.totalGrossMargin[0])}
              </td>
              <td className={getPercentageClass(financialBreakdown.totalGrossMargin[1])}>
                {formatPercentage(financialBreakdown.totalGrossMargin[1])}
              </td>
            </tr>
            <tr>
              <td className="sticky left-0 bg-white z-10">Est. Overhead</td>
              <td>{formatCurrency(financialBreakdown.estimatedOverhead[0])}</td>
              <td>{formatCurrency(financialBreakdown.estimatedOverhead[1])}</td>
              <td colSpan={6} className="text-sm text-gray-500">Based on 15% of Revenue</td>
            </tr>
            <tr className="font-semibold">
              <td className="sticky left-0 bg-white z-10">Est. Operating Profit</td>
              <td className={getPercentageClass(financialBreakdown.estimatedOperatingProfit[0])}>
                {formatCurrency(financialBreakdown.estimatedOperatingProfit[0])}
              </td>
              <td className={getPercentageClass(financialBreakdown.estimatedOperatingProfit[1])}>
                {formatCurrency(financialBreakdown.estimatedOperatingProfit[1])}
              </td>
              <td colSpan={4}></td>
              <td className={getPercentageClass(financialBreakdown.estimatedOperatingMargin[0])}>
                {formatPercentage(financialBreakdown.estimatedOperatingMargin[0])}
              </td>
              <td className={getPercentageClass(financialBreakdown.estimatedOperatingMargin[1])}>
                {formatPercentage(financialBreakdown.estimatedOperatingMargin[1])}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FinancialBreakdown;
