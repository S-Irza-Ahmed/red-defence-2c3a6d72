export interface WorkflowState {
  isAuthenticated: boolean;
  hasScanCompleted: boolean;
  hasRiskAnalysisCompleted: boolean;
  hasAISolutionCompleted: boolean;
  lastScanTarget: string;
  lastScanDate: string;
}

export interface WorkflowContextType {
  state: WorkflowState;
  login: () => void;
  logout: () => void;
  completeScan: (target: string) => void;
  completeRiskAnalysis: () => void;
  completeAISolution: () => void;
  resetWorkflow: () => void;
}
