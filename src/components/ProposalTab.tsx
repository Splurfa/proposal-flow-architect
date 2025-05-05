
import React from 'react';
import ProposalViewSelector from './preview/ProposalViewSelector';
import ProposalAccordion from './preview/ProposalAccordion';
import ProposalActions from './preview/ProposalActions';
import { useProposal } from '../context/ProposalContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';

const ProposalTab: React.FC = () => {
  const { state } = useProposal();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-semibold">
              Proposal Preview for: {state.activeClient}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              This preview shows how your proposal will appear to the client.
            </p>
          </div>
          <ProposalViewSelector />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Use the selector above to switch between clients. You can save or load different versions of your proposal using the buttons below.
          </p>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <ProposalActions />
        </CardFooter>
      </Card>
      
      <ProposalAccordion />
    </div>
  );
};

export default ProposalTab;
