
import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { ViewType } from '../../types';

const ProposalViewSelector: React.FC = () => {
  const { state, setActiveView } = useProposal();
  
  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  return (
    <div className="flex justify-end space-x-2 mb-4">
      <button
        className={`view-button ${state.activeView === 'YHA' ? 'active' : 'inactive'}`}
        onClick={() => handleViewChange('YHA')}
      >
        YHA
      </button>
      
      <button
        className={`view-button ${state.activeView === 'Hillel' ? 'active' : 'inactive'}`}
        onClick={() => handleViewChange('Hillel')}
      >
        Hillel
      </button>
      
      <button
        className="view-button disabled"
        disabled
      >
        Combined
      </button>
    </div>
  );
};

export default ProposalViewSelector;
