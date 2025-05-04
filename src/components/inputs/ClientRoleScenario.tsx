
import React from 'react';
import { useProposal } from '../../context/ProposalContext';

const ClientRoleScenario: React.FC = () => {
  const { state, updateClientScenario } = useProposal();
  const { activeClient, clients } = state;
  
  const activeClientData = clients.find(c => c.clientName === activeClient);
  
  if (!activeClientData) {
    return <div>No client data available</div>;
  }

  const handleChange = (role: string, field: string, value: string) => {
    updateClientScenario(activeClient, role, field, parseFloat(value) || 0);
  };

  return (
    <div className="section-card">
      <h3 className="text-lg font-semibold mb-4">Client Role Scenario: {activeClient}</h3>
      
      <table className="styled-table">
        <thead>
          <tr>
            <th>ROLE</th>
            <th>BILLING RATE ($/HR)</th>
            <th>MIN HRS/WK</th>
            <th>MAX HRS/WK</th>
          </tr>
        </thead>
        <tbody>
          {activeClientData.roles.map(role => (
            <tr key={role.role}>
              <td>{role.role}</td>
              <td>
                <input
                  type="text"
                  value={role.billingRate}
                  onChange={(e) => handleChange(role.role, 'billingRate', e.target.value)}
                  className="base-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={role.minHours}
                  onChange={(e) => handleChange(role.role, 'minHours', e.target.value)}
                  className="base-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={role.maxHours}
                  onChange={(e) => handleChange(role.role, 'maxHours', e.target.value)}
                  className="base-input"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <p className="hint-text mt-4">Enter the proposed billing rates and weekly hours for this specific client scenario.</p>
    </div>
  );
};

export default ClientRoleScenario;
