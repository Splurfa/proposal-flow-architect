
import React from 'react';
import ProposalViewSelector from './preview/ProposalViewSelector';
import ProposalAccordion from './preview/ProposalAccordion';
import { useProposal } from '../context/ProposalContext';

const ProposalTab: React.FC = () => {
  const { state } = useProposal();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Proposal Preview for: {state.activeClient}</h2>
        <ProposalViewSelector />
      </div>
      
      <ProposalAccordion />
    </div>
  );
};

export default ProposalTab;
