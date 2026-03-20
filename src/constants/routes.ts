/** Centralized route path constants — use these instead of hardcoding strings. */

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  SCAN: '/scan',
  RISK_ANALYSIS: '/risk',
  AI_SOLUTION: '/ai-solution',
  REPORTS: '/reports',
  CONTACT: '/contact',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
