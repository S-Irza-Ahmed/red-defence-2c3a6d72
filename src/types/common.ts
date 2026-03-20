/** Severity levels used across scan, risk analysis, and reports */
export type Severity = 'low' | 'medium' | 'high' | 'critical';

/** Status badge variants */
export type BadgeStatus = Severity | 'success' | 'pending';
