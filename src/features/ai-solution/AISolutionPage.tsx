import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, ChevronRight, FileText, Shield, Lock, Server, Cpu, Lightbulb, Code, Save, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import GuidancePanel from '@/components/ui/GuidancePanel';
import HexagonLoader from '@/components/ui/HexagonLoader';
import { useWorkflow } from '@/contexts/WorkflowContext';

type AIStatus = 'ready' | 'generating' | 'complete' | 'saved';

interface AIRemediation {
  riskId: number;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  resolution: string[];
  prevention: string;
  codeSnippet?: string;
}

const AISolution = () => {
  const { state, completeAISolution } = useWorkflow();
  const [status, setStatus] = useState<AIStatus>('ready');
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentRemediationIndex, setCurrentRemediationIndex] = useState(0);
  const [remediations, setRemediations] = useState<AIRemediation[]>([]);

  const mockRemediations: AIRemediation[] = [
    {
      riskId: 1,
      category: 'Access Control',
      severity: 'critical',
      explanation: 'The current authentication implementation lacks multi-factor verification and secure session management, making it vulnerable to unauthorized access attempts.',
      resolution: [
        'Implement multi-factor authentication (MFA) for all user accounts',
        'Use secure session tokens with appropriate expiration times',
        'Add rate limiting to prevent brute force attacks',
        'Implement account lockout after failed attempts',
      ],
      prevention: 'Regular security audits and penetration testing should be conducted to identify authentication vulnerabilities early.',
      codeSnippet: `// Example: Implementing rate limiting
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests
  message: 'Too many login attempts'
});

app.use('/api/auth', authLimiter);`,
    },
    {
      riskId: 2,
      category: 'Configuration',
      severity: 'high',
      explanation: 'Missing or improperly configured security headers expose the application to various client-side attacks including XSS and clickjacking.',
      resolution: [
        'Add Content-Security-Policy header with strict directives',
        'Implement X-Frame-Options to prevent clickjacking',
        'Enable X-Content-Type-Options nosniff',
        'Configure Strict-Transport-Security (HSTS)',
      ],
      prevention: 'Use helmet.js or similar middleware to automatically set security headers in your application.',
      codeSnippet: `// Example: Security headers with Helmet
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  },
  frameguard: { action: 'deny' },
}));`,
    },
    {
      riskId: 3,
      category: 'Encryption',
      severity: 'high',
      explanation: 'Support for deprecated TLS versions (1.0 and 1.1) creates opportunities for attackers to downgrade connections and intercept sensitive data.',
      resolution: [
        'Disable TLS 1.0 and 1.1 on all servers',
        'Enable TLS 1.2 and 1.3 only',
        'Use strong cipher suites',
        'Implement certificate pinning for mobile apps',
      ],
      prevention: 'Regularly update SSL/TLS configurations and use tools like SSL Labs to verify compliance.',
    },
  ];

  // Check authentication
  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <GuidancePanel type="auth" />
        </div>
      </div>
    );
  }

  // Check if risk analysis completed
  if (!state.hasRiskAnalysisCompleted) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <GuidancePanel type="risk" />
        </div>
      </div>
    );
  }

  const startGeneration = () => {
    setStatus('generating');
    setTypingIndex(0);
    setCurrentRemediationIndex(0);
    setRemediations([]);
  };

  useEffect(() => {
    if (status !== 'generating') return;

    const remediationInterval = setInterval(() => {
      setCurrentRemediationIndex(prev => {
        if (prev >= mockRemediations.length) {
          clearInterval(remediationInterval);
          setStatus('complete');
          completeAISolution();
          return prev;
        }
        setRemediations(r => [...r, mockRemediations[prev]]);
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(remediationInterval);
  }, [status]);

  // Typing effect for current remediation
  useEffect(() => {
    if (status !== 'generating' || remediations.length === 0) return;

    const currentRem = remediations[remediations.length - 1];
    const fullText = currentRem.explanation;

    if (typingIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypingIndex(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timer);
    }
  }, [typingIndex, remediations, status]);

  useEffect(() => {
    setTypingIndex(0);
  }, [remediations.length]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Access Control': return Shield;
      case 'Configuration': return Server;
      case 'Encryption': return Lock;
      default: return Cpu;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background enhancements */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-accent/15 border border-accent/40 mb-8 backdrop-blur-sm">
            <Brain className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-accent">AI Intelligence</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-purple">AI Solution</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Intelligent remediation recommendations powered by advanced AI
          </p>
        </div>

        {/* Ready State */}
        {status === 'ready' && (
          <div className="max-w-xl mx-auto animate-fade-in-up">
            <GlassCard variant="purple" className="text-center py-14">
              <div className="relative inline-flex mb-8">
                <div className="p-5 rounded-2xl bg-accent/10 border-2 border-accent/30">
                  <Sparkles className="w-12 h-12 text-accent" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="w-4 h-4 rounded-full bg-accent animate-ping" />
                </div>
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Ready to Generate Solutions</h2>
              <p className="text-muted-foreground mb-2">6 risks identified for remediation</p>
              <p className="text-sm text-muted-foreground mb-10">AI will analyze each risk and provide tailored solutions</p>
              <Button variant="cyberPurple" size="xl" onClick={startGeneration}>
                <Brain className="w-5 h-5" />
                Generate AI Guidance
              </Button>
            </GlassCard>
          </div>
        )}

        {/* Generating / Complete States */}
        {(status === 'generating' || status === 'complete' || status === 'saved') && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Risk List Sidebar */}
            <div className="lg:col-span-1">
              <GlassCard variant="red" className="sticky top-24">
                <h3 className="font-display text-lg font-semibold mb-6">Risk Findings</h3>
                <div className="space-y-3">
                  {mockRemediations.map((item, index) => (
                    <div
                      key={item.riskId}
                      className={`p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer ${
                        index < remediations.length
                          ? 'bg-accent/10 border-accent/50 shadow-[0_0_20px_hsl(270_80%_60%/0.2)]'
                          : 'bg-muted/20 border-border/50 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <StatusBadge status={item.severity} />
                        {index < remediations.length && (
                          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                        )}
                      </div>
                      <p className="text-sm font-medium">{item.category}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* AI Remediation Panel */}
            <div className="lg:col-span-2 space-y-6">
              {status === 'generating' && remediations.length < mockRemediations.length && (
                <GlassCard variant="purple" className="scan-line">
                  <div className="flex items-center gap-4 mb-6">
                    <HexagonLoader size="sm" variant="purple" />
                    <div>
                      <span className="font-display font-semibold text-lg">AI is analyzing...</span>
                      <p className="text-sm text-muted-foreground">Generating intelligent recommendations</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-secondary animate-pulse"
                      style={{ width: `${((remediations.length + 1) / mockRemediations.length) * 100}%` }}
                    />
                  </div>
                </GlassCard>
              )}

              {remediations.map((rem, index) => {
                const CategoryIcon = getCategoryIcon(rem.category);
                return (
                  <GlassCard key={rem.riskId} variant="purple" className="animate-fade-in-up">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30">
                          <CategoryIcon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-display text-xl font-bold">{rem.category}</h4>
                          <StatusBadge status={rem.severity} className="mt-2" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/30">
                        <Brain className="w-3 h-3" />
                        AI Generated
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-accent" />
                        <h5 className="text-sm font-semibold text-accent">Explanation</h5>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {index === remediations.length - 1 && status === 'generating'
                          ? rem.explanation.slice(0, typingIndex) + (typingIndex < rem.explanation.length ? '|' : '')
                          : rem.explanation
                        }
                      </p>
                    </div>

                    {/* Resolution Steps */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <ChevronRight className="w-4 h-4 text-accent" />
                        <h5 className="text-sm font-semibold text-accent">Resolution Steps</h5>
                      </div>
                      <ul className="space-y-3">
                        {rem.resolution.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="w-6 h-6 rounded-lg bg-accent/20 text-accent text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold border border-accent/30">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prevention */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-accent" />
                        <h5 className="text-sm font-semibold text-accent">Prevention</h5>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{rem.prevention}</p>
                    </div>

                    {/* Code Snippet */}
                    {rem.codeSnippet && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Code className="w-4 h-4 text-accent" />
                          <h5 className="text-sm font-semibold text-accent">Example Implementation</h5>
                        </div>
                        <pre className="p-5 rounded-xl bg-background/70 border-2 border-border/50 text-sm overflow-x-auto">
                          <code className="text-muted-foreground font-mono">{rem.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </GlassCard>
                );
              })}

              {/* CTA */}
              {status === 'complete' && (
                <GlassCard variant="purple" className="text-center py-8 animate-fade-in-up">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-accent" />
                    <h3 className="font-display text-xl font-bold">Assessment Complete</h3>
                  </div>
                  <p className="text-muted-foreground mb-8">
                    AI analysis finished. Save your assessment to access it in Reports.
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    <Button 
                      variant="cyberPurple" 
                      size="xl"
                      onClick={() => setStatus('saved')}
                    >
                      <Save className="w-5 h-5" />
                      Save Assessment
                    </Button>
                    <Link to="/reports">
                      <Button variant="glassBlue" size="xl">
                        <Eye className="w-5 h-5" />
                        View in Reports
                      </Button>
                    </Link>
                    <Button variant="glassBlue" size="xl">
                      <Download className="w-5 h-5" />
                      Export Report
                    </Button>
                  </div>
                </GlassCard>
              )}

              {/* Saved State */}
              {status === 'saved' && (
                <GlassCard variant="blue" className="text-center py-10 animate-fade-in-up">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/20 border-2 border-secondary/40 mb-6">
                    <FileText className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">Assessment Saved!</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Your security assessment has been saved and is now available in your Reports.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/reports">
                      <Button variant="cyber" size="xl">
                        <Eye className="w-5 h-5" />
                        View in Reports
                      </Button>
                    </Link>
                    <Link to="/dashboard">
                      <Button variant="glassBlue" size="lg">
                        Back to Dashboard
                      </Button>
                    </Link>
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISolution;
