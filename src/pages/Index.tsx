
import React from 'react';
import { ProposalProvider } from '../context/ProposalContext';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import InputsTab from '../components/InputsTab';
import FinancialTab from '../components/FinancialTab';
import ProposalTab from '../components/ProposalTab';
import { useProposal } from '../context/ProposalContext';

const TabContent: React.FC = () => {
  const { state } = useProposal();
  
  switch (state.activeTab) {
    case 'inputs':
      return <InputsTab />;
    case 'financial':
      return <FinancialTab />;
    case 'preview':
      return <ProposalTab />;
    default:
      return <InputsTab />;
  }
};

const ProposalGenerator: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      <TabNavigation />
      <TabContent />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProposalProvider>
        <ProposalGenerator />
      </ProposalProvider>
    </div>
  );
};

export default Index;
