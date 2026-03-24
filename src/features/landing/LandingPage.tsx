import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Scan, Brain, FileText, Zap, Lock, Eye, ArrowRight, Sparkles, User, UserRound } from 'lucide-react';
import StepConnector from '@/components/ui/StepConnector';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import TypeWriter from '@/components/ui/TypeWriter';
import { useWorkflow } from '@/contexts/WorkflowContext';

const Index = () => {
  const { state } = useWorkflow();
  
  // Determine active step based on workflow state
  const getActiveStep = () => {
    if (!state.hasScanCompleted) return 0; // Scan
    if (!state.hasRiskAnalysisCompleted) return 1; // Analyze
    if (!state.hasAISolutionCompleted) return 2; // AI Solution
    return 3; // Report
  };
  
  const activeStep = getActiveStep();
  const workflowSteps = [
    { icon: Scan, label: 'Scan', description: 'Assess exposure', color: 'secondary' },
    { icon: Brain, label: 'Analyze', description: 'Evaluate risks', color: 'primary' },
    { icon: Sparkles, label: 'AI Solution', description: 'Get guidance', color: 'accent' },
    { icon: FileText, label: 'Report', description: 'Document findings', color: 'secondary' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Rapid security assessments with real-time threat detection',
      color: 'primary',
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Intelligent analysis and automated remediation recommendations',
      color: 'accent',
    },
    {
      icon: Lock,
      title: 'Enterprise Ready',
      description: 'Bank-grade security protocols protecting your data',
      color: 'secondary',
    },
    {
      icon: Eye,
      title: '24/7 Monitoring',
      description: 'Continuous surveillance of your digital infrastructure',
      color: 'primary',
    },
  ];

  const teamMembers = [
    { name: 'Syeda Irza Ahmed', role: 'Front-end/Back-end Developer', gender: 'female' },
    { name: 'Qudsia Omama', role: 'Front-end/Back-end Developer', gender: 'female' },
    { name: 'Ibad-Ul-Haq', role: 'AI/ML Developer', gender: 'male' },
    { name: 'Ahmed', role: 'Cybersecurity Specialist', gender: 'male' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        {/* Enhanced gradient overlays */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 mb-10 animate-fade-in-up backdrop-blur-sm">
              <div className="relative">
                <Shield className="w-5 h-5 text-primary" />
                <div className="absolute inset-0 animate-ping opacity-30">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </div>
              <span className="text-sm font-semibold tracking-wide text-gradient-red-blue">AI-Driven Cybersecurity Platform</span>
            </div>

            {/* Enhanced Main Title */}
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-8 animate-fade-in-up leading-none" style={{ animationDelay: '0.1s' }}>
              <span className="text-gradient-red-blue drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]">RED DEFENCE</span>
            </h1>

            {/* Enhanced Tagline with Typing Animation */}
            <p className="text-2xl md:text-3xl text-foreground font-light mb-6 max-w-3xl mx-auto h-[1.5em]">
              <TypeWriter 
                text="AI-Driven Cybersecurity and Threat Detection System" 
                speed={40}
                delay={800}
              />
            </p>

            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
              A next-generation security tool that combines intelligent scanning with AI-driven threat analysis.
            </p>

            {/* Animated Workflow Icons */}
            <div className="flex items-center mb-14 animate-fade-in-up max-w-3xl mx-auto w-full" style={{ animationDelay: '0.4s' }}>
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                const colorClass = step.color === 'primary' ? 'text-primary border-primary/40 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]' 
                  : step.color === 'accent' ? 'text-accent border-accent/40 hover:border-accent hover:shadow-[0_0_20px_hsl(var(--accent)/0.4)]' 
                  : 'text-secondary border-secondary/40 hover:border-secondary hover:shadow-[0_0_20px_hsl(var(--secondary)/0.4)]';
                const bgClass = step.color === 'primary' ? 'bg-primary/10' 
                  : step.color === 'accent' ? 'bg-accent/10' 
                  : 'bg-secondary/10';
                
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                
                return (
                  <React.Fragment key={step.label}>
                    <div 
                      className="group flex flex-col items-center transition-all duration-500 shrink-0"
                      style={{ animationDelay: `${0.5 + index * 0.15}s` }}
                    >
                      <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl ${bgClass} border ${colorClass} flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''} ${isCompleted ? 'opacity-60' : ''}`}>
                        {isActive && (
                          <>
                            <div className={`absolute inset-0 rounded-xl ${step.color === 'primary' ? 'bg-primary/20' : step.color === 'accent' ? 'bg-accent/20' : 'bg-secondary/20'} animate-ping`} style={{ animationDuration: '1.5s' }} />
                            <div className={`absolute inset-[-4px] rounded-xl ${step.color === 'primary' ? 'shadow-[0_0_25px_hsl(var(--primary)/0.6)]' : step.color === 'accent' ? 'shadow-[0_0_25px_hsl(var(--accent)/0.6)]' : 'shadow-[0_0_25px_hsl(var(--secondary)/0.6)]'} animate-pulse`} />
                          </>
                        )}
                        <Icon className={`relative z-10 w-5 h-5 md:w-6 md:h-6 ${step.color === 'primary' ? 'text-primary' : step.color === 'accent' ? 'text-accent' : 'text-secondary'}`} />
                      </div>
                      <span className={`text-xs md:text-sm font-medium mt-2 transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <StepConnector
                        gradientId={`top-connector-${index}`}
                        fromColor={
                          workflowSteps[index].color === 'primary' ? '#ef4444'
                          : workflowSteps[index].color === 'accent' ? '#a855f7'
                          : '#06b6d4'
                        }
                        toColor={
                          workflowSteps[index + 1].color === 'primary' ? '#ef4444'
                          : workflowSteps[index + 1].color === 'accent' ? '#a855f7'
                          : '#06b6d4'
                        }
                        active={index < activeStep}
                        className="mx-2"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>


            <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/scan">
                <Button variant="cyber" size="xl" className="w-full sm:w-auto group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Security Scan
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="glassBlue" size="xl" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced Workflow Strip */}
          <div className="mt-24 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="glass-panel p-8 rounded-3xl neon-border-red relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
              
              <h3 className="font-display text-sm uppercase tracking-widest text-muted-foreground text-center mb-8 relative z-10">
                Security Workflow
              </h3>
              
              <div className="flex items-center relative z-10">
                {workflowSteps.map((step, index) => (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`relative p-4 rounded-2xl bg-card border-2 border-${step.color}/30 mb-3 transition-all duration-500 hover:scale-110 hover:border-${step.color} group cursor-pointer shadow-[0_0_15px_hsl(var(--${step.color})/0.3),0_0_30px_hsl(var(--${step.color})/0.15)]`}>
                        <step.icon className={`w-7 h-7 text-${step.color} transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_hsl(var(--${step.color})/0.8)]`} />
                        <div className={`absolute inset-0 rounded-2xl bg-${step.color}/10 blur-xl opacity-100`} />
                      </div>
                      <span className="text-base font-semibold text-foreground">{step.label}</span>
                      <span className="text-xs text-muted-foreground mt-1 hidden sm:block">{step.description}</span>
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <StepConnector
                        gradientId={`bottom-connector-${index}`}
                        fromColor={
                          workflowSteps[index].color === 'primary' ? '#ef4444'
                          : workflowSteps[index].color === 'accent' ? '#a855f7'
                          : '#06b6d4'
                        }
                        toColor={
                          workflowSteps[index + 1].color === 'primary' ? '#ef4444'
                          : workflowSteps[index + 1].color === 'accent' ? '#a855f7'
                          : '#06b6d4'
                        }
                        active={true}
                        className="mx-2"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-red-blue">Why Choose Red Defence</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade security powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <GlassCard
                key={feature.title}
                variant={feature.color === 'primary' ? 'red' : feature.color === 'secondary' ? 'blue' : 'purple'}
                className="text-center animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className={`inline-flex p-5 rounded-2xl bg-${feature.color}/10 border-2 border-${feature.color}/30 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-${feature.color}/60`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-10">
            {[
              { value: '99.9%', label: 'Detection Rate' },
              { value: '< 5s', label: 'Avg Scan Time' },
              { value: '10K+', label: 'Threats Blocked' },
              { value: '24/7', label: 'Active Protection' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center group cursor-pointer">
                <div className="font-display text-5xl md:text-6xl font-black text-gradient-red-blue mb-3 transition-all duration-300 group-hover:scale-110">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-red-blue">Our Security Team</span>
            </h2>
            <p className="text-lg text-muted-foreground">Elite experts protecting your digital assets</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group cursor-pointer animate-fade-in-up text-center"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-border flex items-center justify-center transition-all duration-500 group-hover:border-primary group-hover:scale-110 group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] group-hover:rotate-3">
                  {member.gender === 'female' ? (
                    <UserRound className="w-10 h-10 text-primary/80 group-hover:text-primary transition-colors duration-300" />
                  ) : (
                    <User className="w-10 h-10 text-secondary/80 group-hover:text-secondary transition-colors duration-300" />
                  )}
                </div>
                <h3 className="font-semibold text-foreground mt-4 text-sm group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <GlassCard variant="red" className="max-w-5xl mx-auto text-center py-16 px-8 scan-line relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
            
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Ready to Secure Your Systems?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
              Start your first security assessment today and discover vulnerabilities before attackers do.
            </p>
            <Link to="/scan" className="relative z-10 inline-block">
              <Button variant="cyber" size="xl" className="group">
                Begin Free Scan
                <Shield className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </Button>
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-display text-xl font-bold text-gradient-red-blue">RED DEFENCE</span>
            </div>
            <p className="text-muted-foreground">
              © 2026 Red Defence. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
