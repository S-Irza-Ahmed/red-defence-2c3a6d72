interface StepConnectorProps {
  fromColor: string;
  toColor: string;
  gradientId: string;
  active?: boolean;
  className?: string;
}

/**
 * SVG-based gradient connector line with arrowhead for workflow steppers.
 * The SVG stretches to fill all available horizontal space.
 */
const StepConnector = ({ fromColor, toColor, gradientId, active = true, className }: StepConnectorProps) => {
  return (
    <div
      className={className}
      style={{
        flex: '1 1 0%',
        display: 'flex',
        alignItems: 'center',
        minWidth: 60,
        opacity: active ? 1 : 0.3,
        transition: 'opacity 0.5s',
      }}
    >
      <svg
        width="100%"
        height="12"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        {/* Horizontal gradient line */}
        <line x1="0" y1="6" x2="88" y2="6" stroke={`url(#${gradientId})`} strokeWidth="2" />
        {/* Solid arrowhead triangle */}
        <polygon points="88,2 100,6 88,10" fill={toColor} />
      </svg>
    </div>
  );
};

export default StepConnector;
