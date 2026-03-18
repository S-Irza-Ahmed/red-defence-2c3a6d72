import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle' | 'button';
  lines?: number;
}

const SkeletonLoader = ({ className, variant = 'text', lines = 1 }: SkeletonLoaderProps) => {
  const baseStyles = 'bg-muted/30 animate-pulse rounded';

  const variantStyles = {
    text: 'h-4 w-full',
    card: 'h-32 w-full rounded-xl',
    circle: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24 rounded-lg',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseStyles, variantStyles[variant], i === lines - 1 && 'w-3/4')}
          />
        ))}
      </div>
    );
  }

  return <div className={cn(baseStyles, variantStyles[variant], className)} />;
};

export default SkeletonLoader;
