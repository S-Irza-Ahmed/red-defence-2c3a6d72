import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'low' | 'medium' | 'high' | 'critical' | 'success' | 'pending';
  label?: string;
  className?: string;
}

const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const statusConfig = {
    low: {
      bg: 'bg-secondary/20',
      border: 'border-secondary/50',
      text: 'text-secondary',
      glow: 'shadow-[0_0_10px_hsl(var(--secondary)/0.3)]',
      defaultLabel: 'Low',
    },
    medium: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/50',
      text: 'text-yellow-500',
      glow: 'shadow-[0_0_10px_rgba(234,179,8,0.3)]',
      defaultLabel: 'Medium',
    },
    high: {
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/50',
      text: 'text-orange-500',
      glow: 'shadow-[0_0_10px_rgba(249,115,22,0.3)]',
      defaultLabel: 'High',
    },
    critical: {
      bg: 'bg-primary/20',
      border: 'border-primary/50',
      text: 'text-primary',
      glow: 'shadow-[0_0_10px_hsl(var(--primary)/0.3)]',
      defaultLabel: 'Critical',
    },
    success: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      text: 'text-green-500',
      glow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]',
      defaultLabel: 'Success',
    },
    pending: {
      bg: 'bg-muted/50',
      border: 'border-muted-foreground/30',
      text: 'text-muted-foreground',
      glow: '',
      defaultLabel: 'Pending',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider border',
        config.bg,
        config.border,
        config.text,
        config.glow,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full mr-2', config.text.replace('text-', 'bg-'))} />
      {label || config.defaultLabel}
    </span>
  );
};

export default StatusBadge;
