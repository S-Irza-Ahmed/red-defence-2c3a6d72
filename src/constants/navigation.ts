export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Scan', path: '/scan' },
  { label: 'Risk Analysis', path: '/risk' },
  { label: 'AI Solution', path: '/ai-solution' },
  { label: 'Reports', path: '/reports' },
  { label: 'Contact', path: '/contact' },
];
