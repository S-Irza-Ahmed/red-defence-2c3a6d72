import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { WorkflowState, WorkflowContextType } from '@/types/workflow';

const STORAGE_KEY = 'red-defence-auth';

const loadPersistedAuth = (): { isAuthenticated: boolean; userName: string } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { isAuthenticated: !!parsed.isAuthenticated, userName: parsed.userName || '' };
    }
  } catch {}
  return { isAuthenticated: false, userName: '' };
};

const defaultState: WorkflowState = {
  isAuthenticated: false,
  userName: '',
  isAuthLoading: true,
  hasScanCompleted: false,
  hasRiskAnalysisCompleted: false,
  hasAISolutionCompleted: false,
  lastScanTarget: '',
  lastScanDate: '',
};

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<WorkflowState>(defaultState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const persisted = loadPersistedAuth();
    setState(prev => ({
      ...prev,
      isAuthenticated: persisted.isAuthenticated,
      userName: persisted.userName,
      isAuthLoading: false,
    }));
  }, []);

  const login = (name?: string) => {
    const userName = name || '';
    setState(prev => ({ ...prev, isAuthenticated: true, userName }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated: true, userName }));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ ...defaultState, isAuthLoading: false });
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
