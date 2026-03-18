import { cn } from '@/lib/utils';

interface RadarLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RadarLoader = ({ size = 'md', className }: RadarLoaderProps) => {
  const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={cn('relative', sizeStyles[size], className)}>
      {/* Outer rings */}
      <div className="absolute inset-0 rounded-full border border-primary/20" />
      <div className="absolute inset-2 rounded-full border border-primary/30" />
      <div className="absolute inset-4 rounded-full border border-primary/40" />
      
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary glow-red" />
      </div>

      {/* Sweep line */}
      <div className="absolute inset-0 radar-sweep">
        <div 
          className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
          style={{
            background: 'linear-gradient(90deg, hsl(var(--primary)), transparent)',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-1/2 h-8 origin-left -translate-y-4"
          style={{
            background: 'conic-gradient(from -10deg, transparent, hsl(var(--primary) / 0.3), transparent 20deg)',
            clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
          }}
        />
      </div>

      {/* Blips */}
      <div className="absolute top-3 right-4 w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
      <div className="absolute bottom-5 left-3 w-1 h-1 rounded-full bg-primary animate-pulse delay-300" />
      <div className="absolute top-1/2 right-2 w-1 h-1 rounded-full bg-accent animate-pulse delay-500" />
    </div>
  );
};

export default RadarLoader;
