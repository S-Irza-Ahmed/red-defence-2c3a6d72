import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'red' | 'blue' | 'purple' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const ProgressBar = ({
  value,
  max = 100,
  variant = 'gradient',
  size = 'md',
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantStyles = {
    red: 'bg-gradient-to-r from-primary to-primary/80',
    blue: 'bg-gradient-to-r from-secondary to-secondary/80',
    purple: 'bg-gradient-to-r from-accent to-accent/80',
    gradient: 'bg-gradient-to-r from-primary via-accent to-secondary',
  };

  const glowStyles = {
    red: 'shadow-[0_0_10px_hsl(var(--primary)/0.5)]',
    blue: 'shadow-[0_0_10px_hsl(var(--secondary)/0.5)]',
    purple: 'shadow-[0_0_10px_hsl(var(--accent)/0.5)]',
    gradient: 'shadow-[0_0_15px_hsl(var(--primary)/0.3)]',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-muted/50 rounded-full overflow-hidden', sizeStyles[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            variantStyles[variant],
            glowStyles[variant],
            animated && 'progress-animate'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
