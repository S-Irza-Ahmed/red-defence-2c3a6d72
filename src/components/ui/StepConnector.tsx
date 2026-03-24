interface StepConnectorProps {
  fromColor: string;
  toColor: string;
  gradientId?: string;
  active?: boolean;
  className?: string;
}

/**
 * Gradient connector line with arrowhead for workflow steppers.
 * Uses CSS gradient + a triangle border-hack for the arrowhead.
 */
const StepConnector = ({ fromColor, toColor, active = true, className }: StepConnectorProps) => {
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
      {/* Gradient line */}
      <div
        style={{
          flex: 1,
          height: 2,
          background: `linear-gradient(to right, ${fromColor}, ${toColor})`,
        }}
      />
      {/* Arrow triangle */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: `8px solid ${toColor}`,
          flexShrink: 0,
        }}
      />
    </div>
  );
};

export default StepConnector;
