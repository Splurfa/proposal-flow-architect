
import React from 'react';
import GlobalSettings from './inputs/GlobalSettings';
import TeamCompensation from './inputs/TeamCompensation';
import ProposalContext from './inputs/ProposalContext';
import ClientRoleScenario from './inputs/ClientRoleScenario';

const InputsTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div>
        <GlobalSettings />
        <TeamCompensation />
        <ProposalContext />
      </div>
      <div className="lg:col-span-2">
        <ClientRoleScenario />
      </div>
    </div>
  );
};

export default InputsTab;
