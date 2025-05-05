
import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { ViewType } from '../../types';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';

const ProposalViewSelector: React.FC = () => {
  const { state, setActiveView } = useProposal();
  
  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-muted-foreground mr-2 flex items-center">
        <Eye className="h-4 w-4 mr-1" />
        <span>View:</span>
      </div>
      
      <div className="flex bg-muted rounded-md overflow-hidden">
        <Button
          variant={state.activeView === 'YHA' ? "secondary" : "ghost"}
          size="sm"
          className="rounded-none"
          onClick={() => handleViewChange('YHA')}
        >
          YHA
        </Button>
        
        <Button
          variant={state.activeView === 'Hillel' ? "secondary" : "ghost"}
          size="sm"
          className="rounded-none"
          onClick={() => handleViewChange('Hillel')}
        >
          Hillel
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="rounded-none opacity-50"
          disabled
          title="Coming soon"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default ProposalViewSelector;
