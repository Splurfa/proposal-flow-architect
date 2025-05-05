
import React from 'react';
import ProposalViewSelector from './preview/ProposalViewSelector';
import ProposalAccordion from './preview/ProposalAccordion';
import ProposalActions from './preview/ProposalActions';
import { useProposal } from '../context/ProposalContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from './ui/card';
import { formatDate } from '../utils/formatters';

const ProposalTab: React.FC = () => {
  const { state } = useProposal();
  const clientData = state.clients.find(client => client.clientName === state.activeView);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-semibold">
              {state.proposalTitle || `${state.activeView} Proposal`}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              Created {formatDate(state.proposalDate)} | Viewing {state.activeView} Client Preview
            </CardDescription>
          </div>
          <ProposalViewSelector />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This preview dynamically displays your proposal with the financial calculations from your inputs. 
            Expand each section below to view the complete proposal.
          </p>
          
          {clientData && (
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm">
              <p className="font-medium text-blue-800 mb-2">Client Summary</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-blue-600 uppercase">Client</p>
                  <p className="font-medium">{state.activeView}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 uppercase">Total Weekly Hours</p>
                  <p className="font-medium">
                    {clientData.roles.reduce((sum, role) => sum + role.minHours, 0)} - {clientData.roles.reduce((sum, role) => sum + role.maxHours, 0)} hrs
                  </p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 uppercase">Service Period</p>
                  <p className="font-medium">{state.globalSettings.weeksInProposalPeriod} weeks</p>
                </div>
              </div>
            </div>
          )}
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
