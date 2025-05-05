
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ProposalState, 
  ClientType, 
  ViewType,
  FinancialSummary,
  FinancialBreakdown
} from '../types';
import { saveProposalToDatabase, loadProposalFromDatabase } from '../utils/supabaseHelpers';
import { calculateFinancialSummary, calculateFinancialBreakdown } from '../utils/financialCalculations';

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
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({
    worstCase: {
      yearlyOperatingProfit: 0,
      yearlyOperatingMargin: 0,
      yearlyGrossRevenue: 0
    },
    bestCase: {
      yearlyOperatingProfit: 0,
      yearlyOperatingMargin: 0,
      yearlyGrossRevenue: 0
    },
    summary: {
      yearlyRevenueRange: [0, 0],
      yearlyOpProfitRange: [0, 0],
      yearlyOpMarginRange: [0, 0]
    }
  });
  const [financialBreakdown, setFinancialBreakdown] = useState<FinancialBreakdown>({
    detailedBreakdown: [],
    totalGrossRevenue: [0, 0],
    totalBurdenedCost: [0, 0],
    totalGrossProfit: [0, 0],
    totalGrossMargin: [0, 0],
    estimatedOverhead: [0, 0],
    estimatedOperatingProfit: [0, 0],
    estimatedOperatingMargin: [0, 0]
  });

  // Calculate financials whenever relevant state changes
  useEffect(() => {
    calculateFinancials();
  }, [state.globalSettings, state.teamCompensation, state.clients, state.activeView]);

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
      globalSettings: { ...prev.globalSettings, ...settings },
      savedState: false
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
      return { ...prev, teamCompensation: updatedComp, savedState: false };
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
      return { ...prev, clients: updatedClients, savedState: false };
    });
  };

  const updateProposalTitle = (title: string) => {
    setState(prev => ({ ...prev, proposalTitle: title, savedState: false }));
  };

  const updateProposalDate = (date: Date) => {
    setState(prev => ({ ...prev, proposalDate: date, savedState: false }));
  };

  const calculateFinancials = () => {
    // Use our utility functions to calculate financials
    const summary = calculateFinancialSummary(
      state.globalSettings,
      state.teamCompensation,
      state.clients,
      state.activeView
    );
    
    const breakdown = calculateFinancialBreakdown(
      state.globalSettings,
      state.teamCompensation,
      state.clients,
      state.activeView
    );
    
    setFinancialSummary(summary);
    setFinancialBreakdown(breakdown);
    
    console.log('Financial calculations updated:', { summary, breakdown });
  };

  // Function to save the current proposal to Supabase
  const saveProposal = async () => {
    try {
      console.log('Saving proposal:', state);
      
      // Create a serializable copy of the state
      const dataToSave = {
        ...state,
        // We'll let the helper function handle Date serialization
      };
      
      const result = await saveProposalToDatabase(dataToSave);
      
      if (!result.success) {
        console.error('Failed to save proposal:', result.error);
        throw result.error;
      }
      
      // Update state with the saved ID and timestamp
      setState(prev => ({ 
        ...prev, 
        id: result.id,
        savedState: true, 
        lastSaved: new Date() 
      }));
      
      console.log('Proposal saved successfully with ID:', result.id);
      return Promise.resolve();
    } catch (error) {
      console.error('Error in saveProposal:', error);
      return Promise.reject(error);
    }
  };

  // Function to load a proposal from Supabase
  const loadProposal = async (id: string) => {
    try {
      console.log('Loading proposal with ID:', id);
      const result = await loadProposalFromDatabase(id);
      
      if (!result.success || !result.data) {
        console.error('Failed to load proposal:', result.error);
        throw new Error('Failed to load proposal');
      }
      
      // Convert date strings back to Date objects
      const loadedData = result.data;
      
      // If data is inside a 'data' property, use that
      const proposalData = loadedData.data || loadedData;
      
      // Ensure dates are properly converted
      const processedData = {
        ...proposalData,
        proposalDate: proposalData.proposalDate ? new Date(proposalData.proposalDate) : new Date(),
        lastSaved: proposalData.lastSaved ? new Date(proposalData.lastSaved) : null
      };
      
      console.log('Loaded proposal data:', processedData);
      setState(processedData as ProposalState);
      
      // Recalculate financials based on loaded data
      setTimeout(() => calculateFinancials(), 0);
      
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
