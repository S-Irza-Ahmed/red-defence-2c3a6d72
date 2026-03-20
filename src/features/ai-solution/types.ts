export type AIStatus = 'ready' | 'generating' | 'complete' | 'saved';

export interface AIRemediation {
  riskId: number;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  resolution: string[];
  prevention: string;
  codeSnippet?: string;
}
