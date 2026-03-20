import { Link } from 'react-router-dom';
import { Info, AlertTriangle, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

interface GuidancePanelProps {
  type: 'auth' | 'scan' | 'risk' | 'workflow';
  className?: string;
}

const guidanceContent = {
  auth: {
    icon: Lock,
    title: 'Authentication Required',
    description: 'Please login to continue.',
    buttonText: 'Login to Continue',
    buttonLink: '/auth',
    variant: 'red' as const,
  },
  scan: {
    icon: AlertTriangle,
    title: 'Scan Required',
    description: 'Risk analysis requires a completed scan. Run a scan to assess system exposure.',
    buttonText: 'Start Scan — Review System Exposure',
    buttonLink: '/scan',
    variant: 'red' as const,
  },
  risk: {
    icon: Info,
    title: 'Risk Analysis Required',
    description: 'AI guidance is generated after system risks are evaluated.',
    buttonText: 'Analyze Risks — Review Exposure Levels',
    buttonLink: '/risk',
    variant: 'purple' as const,
  },
  workflow: {
    icon: Info,
    title: 'No Saved Assessments',
    description: 'Reports become available after an assessment is completed and saved.',
    buttonText: 'Begin Scan — Start Security Assessment',
    buttonLink: '/scan',
    variant: 'blue' as const,
  },
};

const GuidancePanel = ({ type, className }: GuidancePanelProps) => {
  const content = guidanceContent[type];
  const Icon = content.icon;

  const variantStyles = {
    iconBg:
      content.variant === 'red'
        ? 'bg-primary/10 border-2 border-primary/30'
        : content.variant === 'purple'
        ? 'bg-accent/10 border-2 border-accent/30'
        : 'bg-secondary/10 border-2 border-secondary/30',
    iconColor:
      content.variant === 'red'
        ? 'text-primary'
        : content.variant === 'purple'
        ? 'text-accent'
        : 'text-secondary',
    pulseBg:
      content.variant === 'red'
        ? 'bg-primary'
        : content.variant === 'purple'
        ? 'bg-accent'
        : 'bg-secondary',
    dotColor:
      content.variant === 'red'
        ? 'bg-primary/50'
        : content.variant === 'purple'
        ? 'bg-accent/50'
        : 'bg-secondary/50',
    buttonVariant:
      content.variant === 'red'
        ? ('cyber' as const)
        : content.variant === 'purple'
        ? ('cyberPurple' as const)
        : ('cyberSecondary' as const),
  };

  return (
    <div className={`min-h-[60vh] flex items-center justify-center ${className}`}>
      <GlassCard variant={content.variant} className="max-w-xl w-full p-8">
        <div className="flex flex-col items-center justify-between min-h-[420px] text-center">
          {/* Icon */}
          <div className="relative inline-flex mb-8">
            <div className={`w-20 h-20 flex items-center justify-center rounded-2xl ${variantStyles.iconBg}`}>
              <Icon className={`w-10 h-10 ${variantStyles.iconColor}`} />
            </div>
            <div
              className={`absolute inset-0 rounded-2xl animate-ping opacity-20 ${variantStyles.pulseBg}`}
              style={{ animationDuration: '2s' }}
            />
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {content.title}
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto text-balance">
            {content.description}
          </p>

          {/* CTA Button — full width, fixed height */}
          <Link to={content.buttonLink} className="w-full">
            <Button
              variant={variantStyles.buttonVariant}
              size="xl"
              className="w-full h-14 !justify-center"
            >
              <span className="inline-flex items-center justify-center gap-2 text-center">
                <span>{content.buttonText}</span>
                <ChevronRight className="w-5 h-5 !ml-0" />
              </span>
            </Button>
          </Link>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${variantStyles.dotColor}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default GuidancePanel;
