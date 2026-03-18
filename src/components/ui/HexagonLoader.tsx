import { cn } from '@/lib/utils';

interface HexagonLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'red' | 'blue' | 'purple';
}

const HexagonLoader = ({ size = 'md', className, variant = 'red' }: HexagonLoaderProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const colorClasses = {
    red: 'stroke-primary',
    blue: 'stroke-secondary',
    purple: 'stroke-accent',
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer hexagon */}
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          fill="none"
          className={cn(colorClasses[variant], 'opacity-20')}
          strokeWidth="2"
        />
        {/* Animated hexagon */}
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          fill="none"
          className={colorClasses[variant]}
          strokeWidth="2"
          strokeDasharray="320"
          strokeDashoffset="320"
          style={{
            animation: 'hexagon-draw 2s ease-in-out infinite',
          }}
        />
        {/* Inner pulse */}
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="none"
          className={cn(colorClasses[variant], 'opacity-50')}
          strokeWidth="2"
          style={{
            animation: 'pulse-scale 1.5s ease-in-out infinite',
          }}
        />
      </svg>
      <style>{`
        @keyframes hexagon-draw {
          0% { stroke-dashoffset: 320; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -320; }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HexagonLoader;
