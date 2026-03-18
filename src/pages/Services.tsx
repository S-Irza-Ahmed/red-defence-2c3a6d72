import { Scan, Shield, Brain, FileText, Users, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const Services = () => {
  const services = [
    {
      icon: Scan,
      title: 'System Exposure Assessment',
      description: 'Comprehensive scanning of your digital infrastructure to identify potential entry points and security gaps.',
      features: ['Port scanning', 'Service detection', 'SSL/TLS analysis', 'DNS enumeration'],
      variant: 'blue' as const,
    },
    {
      icon: AlertTriangle,
      title: 'Risk Evaluation & Prioritization',
      description: 'Advanced risk scoring algorithms that prioritize vulnerabilities based on exploitability and business impact.',
      features: ['CVSS scoring', 'Impact analysis', 'Threat modeling', 'Risk matrices'],
      variant: 'red' as const,
    },
    {
      icon: Brain,
      title: 'AI-Guided Recommendations',
      description: 'Intelligent remediation suggestions powered by machine learning, tailored to your specific environment.',
      features: ['Custom playbooks', 'Code snippets', 'Best practices', 'Prevention tips'],
      variant: 'purple' as const,
    },
    {
      icon: FileText,
      title: 'Security Reporting',
      description: 'Detailed reports with actionable insights, executive summaries, and compliance documentation.',
      features: ['PDF exports', 'Executive summaries', 'Technical details', 'Trend analysis'],
      variant: 'blue' as const,
    },
    {
      icon: Shield,
      title: 'Continuous Monitoring',
      description: '24/7 surveillance of your systems with real-time alerts and automated incident response.',
      features: ['Real-time alerts', 'Anomaly detection', 'Log analysis', 'SIEM integration'],
      variant: 'red' as const,
    },
    {
      icon: Users,
      title: 'Awareness & Best Practices',
      description: 'Educational resources and training materials to strengthen your organization\'s security culture.',
      features: ['Training modules', 'Phishing simulations', 'Policy templates', 'Security guides'],
      variant: 'purple' as const,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Our Capabilities</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-red-blue">Security Services</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive cybersecurity solutions designed to protect your organization from evolving threats.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassCard
              key={service.title}
              variant={service.variant}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl mb-6 transition-all duration-300 ${
                service.variant === 'red' 
                  ? 'bg-primary/10 border border-primary/30 group-hover:bg-primary/20' 
                  : service.variant === 'blue'
                  ? 'bg-secondary/10 border border-secondary/30 group-hover:bg-secondary/20'
                  : 'bg-accent/10 border border-accent/30 group-hover:bg-accent/20'
              }`}>
                <service.icon className={`w-6 h-6 ${
                  service.variant === 'red' 
                    ? 'text-primary' 
                    : service.variant === 'blue'
                    ? 'text-secondary'
                    : 'text-accent'
                }`} />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">{service.description}</p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      service.variant === 'red' 
                        ? 'bg-primary' 
                        : service.variant === 'blue'
                        ? 'bg-secondary'
                        : 'bg-accent'
                    }`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <GlassCard variant="red" className="inline-block px-12 py-8 scan-line">
            <h2 className="font-display text-2xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact our security experts for tailored enterprise solutions.
            </p>
            <a href="/contact">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]">
                Get in Touch
              </button>
            </a>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Services;
