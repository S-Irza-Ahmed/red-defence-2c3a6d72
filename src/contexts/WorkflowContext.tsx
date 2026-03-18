import { createContext, useContext, useState, ReactNode } from 'react';

interface WorkflowState {
  isAuthenticated: boolean;
  hasScanCompleted: boolean;
  hasRiskAnalysisCompleted: boolean;
  hasAISolutionCompleted: boolean;
  lastScanTarget: string;
  lastScanDate: string;
}

interface WorkflowContextType {
  state: WorkflowState;
  login: () => void;
  logout: () => void;
  completeScan: (target: string) => void;
  completeRiskAnalysis: () => void;
  completeAISolution: () => void;
  resetWorkflow: () => void;
}

const defaultState: WorkflowState = {
  isAuthenticated: false,
  hasScanCompleted: false,
  hasRiskAnalysisCompleted: false,
  hasAISolutionCompleted: false,
  lastScanTarget: '',
  lastScanDate: '',
};

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<WorkflowState>(defaultState);

  const login = () => {
    setState(prev => ({ ...prev, isAuthenticated: true }));
  };

  const logout = () => {
    setState(defaultState);
  };

  const completeScan = (target: string) => {
    setState(prev => ({
      ...prev,
      hasScanCompleted: true,
      lastScanTarget: target,
      lastScanDate: new Date().toISOString().split('T')[0],
    }));
  };

  const completeRiskAnalysis = () => {
    setState(prev => ({ ...prev, hasRiskAnalysisCompleted: true }));
  };

  const completeAISolution = () => {
    setState(prev => ({ ...prev, hasAISolutionCompleted: true }));
  };

  const resetWorkflow = () => {
    setState(prev => ({
      ...prev,
      hasScanCompleted: false,
      hasRiskAnalysisCompleted: false,
      hasAISolutionCompleted: false,
      lastScanTarget: '',
      lastScanDate: '',
    }));
  };

  return (
    <WorkflowContext.Provider value={{
      state,
      login,
      logout,
      completeScan,
      completeRiskAnalysis,
      completeAISolution,
      resetWorkflow,
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
