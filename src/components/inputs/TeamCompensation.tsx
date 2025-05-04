
import React from 'react';
import { useProposal } from '../../context/ProposalContext';
import { CompensationType } from '../../types';

const TeamCompensation: React.FC = () => {
  const { state, updateTeamCompensation } = useProposal();
  const { teamCompensation } = state;

  const handleTypeChange = (role: string, value: string) => {
    updateTeamCompensation(role, 'type', value as CompensationType);
  };

  const handleRateChange = (role: string, value: string) => {
    updateTeamCompensation(role, 'rate', parseFloat(value) || 0);
  };

  return (
    <div className="section-card">
      <h3 className="text-lg font-semibold mb-4">Global Team Compensation</h3>
      
      {teamCompensation.map((item) => (
        <div key={item.role} className="mb-4 flex items-center">
          <div className="w-1/3">
            <p className="text-sm font-medium text-gray-700">{item.role}</p>
          </div>
          
          <div className="w-1/3 pr-2">
            <select
              value={item.type}
              onChange={(e) => handleTypeChange(item.role, e.target.value)}
              className="base-input"
            >
              <option value="Salary">Salary</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>
          
          <div className="w-1/3">
            <input
              type="text"
              value={item.rate}
              onChange={(e) => handleRateChange(item.role, e.target.value)}
              className="base-input"
            />
          </div>
        </div>
      ))}
      
      <p className="hint-text mt-2">Set the standard internal compensation for each role.</p>
    </div>
  );
};

export default TeamCompensation;
