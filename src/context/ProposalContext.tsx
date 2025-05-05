import React, { createContext, useContext, useState } from 'react';
import { 
  ProposalState, 
  ClientType, 
  ViewType,
  FinancialSummary,
  FinancialBreakdown
} from '../types';
import { saveProposalToDatabase, loadProposalFromDatabase } from '../utils/supabaseHelpers';

// Initialize with default values
const initialState: ProposalState = {
  globalSettings: {
    laborCostMultiplier: 1.25,
    overheadPercentage: 15,
    weeksInProposalPeriod: 40,
  },
  teamCompensation: [
    { role: 'Clinical Director', type: 'Salary', rate: 75000 },
    { role: 'Senior BCBA/ECD', type: 'Salary', rate: 100000 },
    { role: 'Behavior Technician', type: 'Hourly', rate: 65 },
    { role: 'Social Skills Coach', type: 'Hourly', rate: 50 }
  ],
  proposalTitle: 'YHA 2023-24 Proposal',
  proposalDate: new Date(),
  activeClient: 'YHA',
  activeView: 'YHA',
  activeTab: 'inputs',
  savedState: false,
  lastSaved: null,
  clients: [
    {
      clientName: 'YHA',
      roles: [
        { role: 'Clinical Director', billingRate: 185, minHours: 5, maxHours: 5 },
        { role: 'Senior BCBA/ECD', billingRate: 150, minHours: 15, maxHours: 25 },
        { role: 'Behavior Technician', billingRate: 90, minHours: 15, maxHours: 30 },
        { role: 'Social Skills Coach', billingRate: 75, minHours: 0, maxHours: 5 }
      ]
    },
    {
      clientName: 'Hillel',
      roles: [
        { role: 'Clinical Director', billingRate: 185, minHours: 3, maxHours: 5 },
        { role: 'Senior BCBA/ECD', billingRate: 150, minHours: 10, maxHours: 20 },
        { role: 'Behavior Technician', billingRate: 90, minHours: 10, maxHours: 25 },
        { role: 'Social Skills Coach', billingRate: 75, minHours: 5, maxHours: 10 }
      ]
    }
  ]
};

// Placeholder financial data (to be calculated later)
const placeholderFinancialSummary: FinancialSummary = {
  worstCase: {
    yearlyOperatingProfit: -157050,
    yearlyOperatingMargin: -52.00,
    yearlyGrossRevenue: 302000
  },
  bestCase: {
    yearlyOperatingProfit: 119930,
    yearlyOperatingMargin: 23.71,
    yearlyGrossRevenue: 505800
  },
  summary: {
    yearlyRevenueRange: [302000, 505800],
    yearlyOpProfitRange: [-157050, 119930],
    yearlyOpMarginRange: [-52.00, 23.71]
  }
};

const placeholderFinancialBreakdown: FinancialBreakdown = {
  detailedBreakdown: [
    {
      role: 'Clinical Director',
      grossRevenue: [59200, 59200],
      burdenedCost: [63750, 63750],
      grossProfit: [-4550, -4550],
      grossMargin: [-7.69, -7.69]
    },
    {
      role: 'Senior BCBA/ECD',
      grossRevenue: [138000, 222000],
      burdenedCost: [125000, 125000],
      grossProfit: [13000, 97000],
      grossMargin: [9.42, 43.69]
    },
    {
      role: 'Behavior Technician',
      grossRevenue: [92700, 144000],
      burdenedCost: [65260, 130520],
      grossProfit: [27440, 13480],
      grossMargin: [29.60, 9.36]
    },
    {
      role: 'Social Skills Coach',
      grossRevenue: [12800, 41600],
      burdenedCost: [30000, 60000],
      grossProfit: [-17200, -18400],
      grossMargin: [-134.38, -44.23]
    }
  ],
  totalGrossRevenue: [302000, 505800],
  totalBurdenedCost: [310000, 441750],
  totalGrossProfit: [-8000, 64050],
  totalGrossMargin: [-2.65, 12.66],
  estimatedOverhead: [45300, 75870],
  estimatedOperatingProfit: [-157050, 119930],
  estimatedOperatingMargin: [-52.00, 23.71]
};

interface ProposalContextType {
  state: ProposalState;
  financialSummary: FinancialSummary;
  financialBreakdown: FinancialBreakdown;
  setActiveTab: (tab: 'inputs' | 'financial' | 'preview') => void;
  setActiveClient: (client: ClientType) => void;
  setActiveView: (view: ViewType) => void;
  updateGlobalSettings: (settings: Partial<ProposalState['globalSettings']>) => void;
  updateTeamCompensation: (role: string, field: string, value: any) => void;
  updateClientScenario: (client: ClientType, role: string, field: string, value: any) => void;
  updateProposalTitle: (title: string) => void;
  updateProposalDate: (date: Date) => void;
  calculateFinancials: () => void;
  saveProposal: () => Promise<void>;
  loadProposal: (id: string) => Promise<void>;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProposalState>(initialState);
  
  // For this initial implementation, we'll use placeholder data
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>(placeholderFinancialSummary);
  const [financialBreakdown, setFinancialBreakdown] = useState<FinancialBreakdown>(placeholderFinancialBreakdown);

  const setActiveTab = (tab: 'inputs' | 'financial' | 'preview') => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const setActiveClient = (client: ClientType) => {
    setState(prev => ({ ...prev, activeClient: client }));
  };

  const setActiveView = (view: ViewType) => {
    setState(prev => ({ ...prev, activeView: view }));
  };

  const updateGlobalSettings = (settings: Partial<ProposalState['globalSettings']>) => {
    setState(prev => ({
      ...prev,
      globalSettings: { ...prev.globalSettings, ...settings }
    }));
  };

  const updateTeamCompensation = (role: string, field: string, value: any) => {
    setState(prev => {
      const updatedComp = prev.teamCompensation.map(item => {
        if (item.role === role) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return { ...prev, teamCompensation: updatedComp };
    });
  };

  const updateClientScenario = (client: ClientType, role: string, field: string, value: any) => {
    setState(prev => {
      const updatedClients = prev.clients.map(clientItem => {
        if (clientItem.clientName === client) {
          const updatedRoles = clientItem.roles.map(roleItem => {
            if (roleItem.role === role) {
              return { ...roleItem, [field]: value };
            }
            return roleItem;
          });
          return { ...clientItem, roles: updatedRoles };
        }
        return clientItem;
      });
      return { ...prev, clients: updatedClients };
    });
  };

  const updateProposalTitle = (title: string) => {
    setState(prev => ({ ...prev, proposalTitle: title }));
  };

  const updateProposalDate = (date: Date) => {
    setState(prev => ({ ...prev, proposalDate: date }));
  };

  const calculateFinancials = () => {
    // This is a placeholder - we'll implement the actual calculation logic in a future step
    console.log('Calculating financials based on current state...');
    // For now, we're just using the placeholder data
  };

  // Function to save the current proposal to Supabase
  const saveProposal = async () => {
    try {
      // Prepare data to save by creating a serializable copy of the state
      const dataToSave = {
        ...state,
        // Convert Date objects to strings for storage
        proposalDate: state.proposalDate.toISOString(),
        lastSaved: new Date().toISOString()
      };
      
      const result = await saveProposalToDatabase(dataToSave);
      
      if (!result.success) {
        throw new Error('Failed to save proposal');
      }
      
      // Update state with the saved ID and timestamp
      setState(prev => ({ 
        ...prev, 
        id: result.id,
        savedState: true, 
        lastSaved: new Date() 
      }));
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error in saveProposal:', error);
      return Promise.reject(error);
    }
  };

  // Function to load a proposal from Supabase
  const loadProposal = async (id: string) => {
    try {
      const result = await loadProposalFromDatabase(id);
      
      if (!result.success || !result.data) {
        throw new Error('Failed to load proposal');
      }
      
      // Convert date strings back to Date objects
      const loadedData = {
        ...result.data,
        proposalDate: new Date(result.data.proposalDate),
        lastSaved: result.data.lastSaved ? new Date(result.data.lastSaved) : null
      };
      
      setState(loadedData as ProposalState);
      
      // Recalculate financials based on loaded data
      calculateFinancials();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error in loadProposal:', error);
      return Promise.reject(error);
    }
  };

  return (
    <ProposalContext.Provider value={{
      state,
      financialSummary,
      financialBreakdown,
      setActiveTab,
      setActiveClient,
      setActiveView,
      updateGlobalSettings,
      updateTeamCompensation,
      updateClientScenario,
      updateProposalTitle,
      updateProposalDate,
      calculateFinancials,
      saveProposal,
      loadProposal
    }}>
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposal = () => {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error('useProposal must be used within a ProposalProvider');
  }
  return context;
};
