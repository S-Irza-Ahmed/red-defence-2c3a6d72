export interface WorkflowState {
  isAuthenticated: boolean;
  userName: string;
  isAuthLoading: boolean;
  hasScanCompleted: boolean;
  hasRiskAnalysisCompleted: boolean;
  hasAISolutionCompleted: boolean;
  lastScanTarget: string;
  lastScanDate: string;
}

export interface WorkflowContextType {
  state: WorkflowState;
  login: (name?: string) => void;
  logout: () => void;
  completeScan: (target: string) => void;
  completeRiskAnalysis: () => void;
  completeAISolution: () => void;
  resetWorkflow: () => void;
}
