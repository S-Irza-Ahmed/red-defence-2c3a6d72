export type AnalysisStatus = 'ready' | 'analyzing' | 'complete';

export interface RiskItem {
  id: number;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  priority: number;
  impact: string;
}
