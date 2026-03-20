export interface Report {
  id: string;
  target: string;
  date: string;
  overallRisk: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  findings: number;
  resolved: number;
  status: 'complete' | 'in-progress';
}
