import { cn } from '@/lib/utils';

interface StepConnectorProps {
  fromColor: string;
  toColor: string;
  active?: boolean;
  className?: string;
}

/**
 * Gradient connector line with arrowhead for workflow steppers.
 * Uses SVG linearGradient for smooth color transitions and a shimmer animation.
 */
const StepConnector = ({ fromColor, toColor, active = true, className }: StepConnectorProps) => {
  const id = `gradient-${fromColor.replace(/[^a-z0-9]/gi, '')}-${toColor.replace(/[^a-z0-9]/gi, '')}`;

  return (
    <div
      className={cn(
        'flex items-center transition-opacity duration-500',
        active ? 'opacity-100' : 'opacity-40',
        className,
      )}
    >
      <svg
        viewBox="0 0 80 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 md:w-20 h-3 overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
          <linearGradient id={`${id}-shimmer`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Base gradient line */}
        <line x1="0" y1="6" x2="72" y2="6" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />

        {/* Shimmer overlay */}
        <line
          x1="0" y1="6" x2="72" y2="6"
          stroke={`url(#${id}-shimmer)`}
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-connector-shimmer"
        />

        {/* Arrowhead triangle */}
        <polygon points="70,2 80,6 70,10" fill={toColor} />
      </svg>
    </div>
  );
};

export default StepConnector;
