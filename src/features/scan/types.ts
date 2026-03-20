import type { LucideIcon } from 'lucide-react';

export type ScanStatus = 'idle' | 'scanning' | 'complete';

export interface ScanPhase {
  label: string;
  status: 'pending' | 'active' | 'complete';
  description: string;
  icon: LucideIcon;
}
