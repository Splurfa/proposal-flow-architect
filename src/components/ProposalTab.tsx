
import React from 'react';
import ProposalViewSelector from './preview/ProposalViewSelector';
import ProposalAccordion from './preview/ProposalAccordion';
import { useProposal } from '../context/ProposalContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ProposalTab: React.FC = () => {
  const { state } = useProposal();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">
            Proposal Preview for: {state.activeClient}
          </CardTitle>
          <ProposalViewSelector />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This preview shows how your proposal will appear to the client. Use the selector above to switch between clients.
          </p>
        </CardContent>
      </Card>
      
      <ProposalAccordion />
    </div>
  );
};

export default ProposalTab;
