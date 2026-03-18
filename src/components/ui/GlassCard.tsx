import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'red' | 'blue' | 'purple';
  hover?: boolean;
  style?: CSSProperties;
}

const GlassCard = ({ children, className, variant = 'default', hover = true, style }: GlassCardProps) => {
  const variantStyles = {
    default: 'neon-border-red',
    red: 'neon-border-red hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]',
    blue: 'neon-border-blue hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)]',
    purple: 'neon-border-purple hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)]',
  };

  return (
    <div
      className={cn(
        'glass-panel p-6 rounded-xl transition-all duration-300',
        variantStyles[variant],
        hover && 'hover-lift',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
