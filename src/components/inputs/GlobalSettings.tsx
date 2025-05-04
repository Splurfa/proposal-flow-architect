
import React from 'react';
import { useProposal } from '../../context/ProposalContext';

const GlobalSettings: React.FC = () => {
  const { state, updateGlobalSettings } = useProposal();
  const { globalSettings } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateGlobalSettings({ [name]: parseFloat(value) || 0 });
  };

  return (
    <div className="section-card">
      <h3 className="text-lg font-semibold mb-4">Global Settings</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Labor Cost Multiplier
        </label>
        <input
          type="text"
          name="laborCostMultiplier"
          value={globalSettings.laborCostMultiplier}
          onChange={handleChange}
          className="base-input"
        />
        <p className="hint-text">Burdened cost multiplier (e.g., 1.25 = Base + 25%)</p>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Overhead as % of Revenue
        </label>
        <input
          type="text"
          name="overheadPercentage"
          value={globalSettings.overheadPercentage}
          onChange={handleChange}
          className="base-input"
        />
        <p className="hint-text">Overhead estimate (e.g., 15 = 15%)</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Weeks in Proposal Period
        </label>
        <input
          type="text"
          name="weeksInProposalPeriod"
          value={globalSettings.weeksInProposalPeriod}
          onChange={handleChange}
          className="base-input"
        />
        <p className="hint-text">Duration for annual estimates (e.g., School Year)</p>
      </div>
    </div>
  );
};

export default GlobalSettings;
