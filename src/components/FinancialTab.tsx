
import React from 'react';
import ViewSelector from './financial/ViewSelector';
import SummaryCards from './financial/SummaryCards';
import FinancialBreakdown from './financial/FinancialBreakdown';
import { useProposal } from '../context/ProposalContext';

const FinancialTab: React.FC = () => {
  const { state } = useProposal();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Financial Summary: {state.activeView}</h2>
        <ViewSelector />
      </div>
      
      <SummaryCards />
      <FinancialBreakdown />
    </div>
  );
};

export default FinancialTab;
