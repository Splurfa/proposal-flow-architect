
import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { ClientType } from '../../types';

const ProposalContextComponent: React.FC = () => {
  const { state, setActiveClient, updateProposalTitle } = useProposal();
  const { activeClient, proposalTitle } = state;

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveClient(e.target.value as ClientType);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProposalTitle(e.target.value);
  };

  return (
    <div className="section-card">
      <h3 className="text-lg font-semibold mb-4">Proposal Context</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Being Edited
        </label>
        <select
          value={activeClient}
          onChange={handleClientChange}
          className="base-input"
        >
          <option value="YHA">YHA</option>
          <option value="Hillel">Hillel</option>
        </select>
        <p className="hint-text">Select the client whose scenario you are editing.</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Proposal Title (Optional)
        </label>
        <input
          type="text"
          value={proposalTitle}
          onChange={handleTitleChange}
          className="base-input"
        />
      </div>
    </div>
  );
};

export default ProposalContextComponent;
