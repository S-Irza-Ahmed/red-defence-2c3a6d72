import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Play, CheckCircle, ChevronRight, Shield, TrendingUp, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import ProgressBar from '@/components/ui/ProgressBar';
import GuidancePanel from '@/components/ui/GuidancePanel';
import HexagonLoader from '@/components/ui/HexagonLoader';
import { useWorkflow } from '@/contexts/WorkflowContext';

type AnalysisStatus = 'ready' | 'analyzing' | 'complete';

interface RiskItem {
  id: number;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  priority: number;
  impact: string;
}

const RiskAnalysis = () => {
  const { state, completeRiskAnalysis } = useWorkflow();
  const [status, setStatus] = useState<AnalysisStatus>('ready');
  const [progress, setProgress] = useState(0);
  const [risks, setRisks] = useState<RiskItem[]>([]);

  const mockRisks: RiskItem[] = [
    { id: 1, category: 'Access Control', description: 'Insufficient authentication mechanisms detected', severity: 'critical', priority: 95, impact: 'Unauthorized access to sensitive resources' },
    { id: 2, category: 'Configuration', description: 'Security headers not properly configured', severity: 'high', priority: 82, impact: 'Vulnerable to clickjacking and XSS attacks' },
    { id: 3, category: 'Encryption', description: 'Outdated TLS protocols still supported', severity: 'high', priority: 78, impact: 'Data interception risk during transmission' },
    { id: 4, category: 'Exposure', description: 'Sensitive endpoints publicly accessible', severity: 'medium', priority: 65, impact: 'Information disclosure vulnerability' },
    { id: 5, category: 'Session', description: 'Session timeout configuration too long', severity: 'medium', priority: 55, impact: 'Extended attack window for session hijacking' },
    { id: 6, category: 'Logging', description: 'Insufficient security logging', severity: 'low', priority: 35, impact: 'Reduced incident detection capability' },
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

  // Check if scan completed
  if (!state.hasScanCompleted) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <GuidancePanel type="scan" />
        </div>
      </div>
    );
  }

  const startAnalysis = () => {
    setStatus('analyzing');
    setProgress(0);
    setRisks([]);
  };

  useEffect(() => {
    if (status !== 'analyzing') return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('complete');
          setRisks(mockRisks);
          completeRiskAnalysis();
          return 100;
        }
        return prev + 3;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  const overallRisk = risks.length > 0
    ? Math.round(risks.reduce((acc, r) => acc + r.priority, 0) / risks.length)
    : 0;

  const severityCounts = risks.reduce((acc, r) => {
    acc[r.severity] = (acc[r.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background enhancements */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/40 mb-8 backdrop-blur-sm">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Risk Evaluation</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-red-blue">Risk Analysis</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Evaluate and prioritize security risks identified during the scan
          </p>
        </div>

        {/* Ready State */}
        {status === 'ready' && (
          <div className="max-w-xl mx-auto animate-fade-in-up">
            <GlassCard variant="red" className="text-center py-14">
              <div className="inline-flex p-5 rounded-2xl bg-primary/10 border-2 border-primary/30 mb-8">
                <TrendingUp className="w-12 h-12 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Ready to Analyze</h2>
              <p className="text-muted-foreground mb-2">Target: <span className="text-foreground font-medium">{state.lastScanTarget}</span></p>
              <p className="text-sm text-muted-foreground mb-10">12 findings from scan ready for risk evaluation</p>
              <Button variant="cyber" size="xl" onClick={startAnalysis}>
                <Play className="w-5 h-5" />
                Start Risk Analysis
              </Button>
            </GlassCard>
          </div>
        )}

        {/* Analyzing State */}
        {status === 'analyzing' && (
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <GlassCard variant="red" className="text-center py-14 scan-line">
              <HexagonLoader size="lg" variant="red" className="mx-auto mb-8" />
              <h2 className="font-display text-2xl font-bold mb-4">Analyzing Risks</h2>
              <p className="text-muted-foreground mb-10">
                Evaluating severity, impact, and priority scores...
              </p>
              <div className="max-w-md mx-auto mb-6">
                <ProgressBar value={progress} variant="red" size="lg" showLabel />
              </div>
              <p className="text-sm text-muted-foreground">
                Processing finding {Math.min(Math.ceil((progress / 100) * 12), 12)} of 12
              </p>
            </GlassCard>
          </div>
        )}

        {/* Complete State */}
        {status === 'complete' && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Summary Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassCard variant="red" className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 border border-primary/30 mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-4xl font-black text-primary mb-2">{overallRisk}%</div>
                <p className="text-sm text-muted-foreground">Overall Risk Score</p>
              </GlassCard>
              <GlassCard variant="red" className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 border border-primary/30 mb-4">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-4xl font-black text-primary mb-2">{severityCounts.critical || 0}</div>
                <p className="text-sm text-muted-foreground">Critical Issues</p>
              </GlassCard>
              <GlassCard variant="blue" className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-secondary/10 border border-secondary/30 mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <div className="font-display text-4xl font-black text-secondary mb-2">{severityCounts.high || 0}</div>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </GlassCard>
              <GlassCard variant="blue" className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-secondary/10 border border-secondary/30 mb-4">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div className="font-display text-4xl font-black text-secondary mb-2">{(severityCounts.medium || 0) + (severityCounts.low || 0)}</div>
                <p className="text-sm text-muted-foreground">Medium/Low</p>
              </GlassCard>
            </div>

            {/* Risk Meter */}
            <GlassCard variant="red" className="scan-line">
              <h3 className="font-display text-xl font-semibold mb-8">Overall Risk Assessment</h3>
              <div className="relative h-10 rounded-full bg-muted/30 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 transition-all duration-1000"
                  style={{ width: `${overallRisk}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-xl border-2 border-primary transition-all duration-1000"
                  style={{ left: `calc(${overallRisk}% - 10px)` }}
                />
              </div>
              <div className="flex justify-between mt-3 text-sm text-muted-foreground font-medium">
                <span className="text-green-500">Low Risk</span>
                <span className="text-primary">Critical Risk</span>
              </div>
            </GlassCard>

            {/* Risk List */}
            <GlassCard variant="blue">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-xl font-semibold">Identified Risks</h3>
                <span className="text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">{risks.length} findings</span>
              </div>
              <div className="space-y-4">
                {risks.map((risk, index) => (
                  <div
                    key={risk.id}
                    className="p-5 rounded-2xl bg-muted/20 border-2 border-border/50 hover:border-border transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <StatusBadge status={risk.severity} />
                          <span className="text-sm text-muted-foreground font-medium">{risk.category}</span>
                        </div>
                        <h4 className="font-semibold mb-2 text-lg">{risk.description}</h4>
                        <p className="text-sm text-muted-foreground">{risk.impact}</p>
                      </div>
                      <div className="text-right bg-muted/30 px-4 py-3 rounded-xl">
                        <div className="font-display text-3xl font-black text-primary">{risk.priority}</div>
                        <div className="text-xs text-muted-foreground mt-1">Priority</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* CTA */}
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/ai-solution">
                <Button variant="cyberPurple" size="xl">
                  Generate AI Guidance
                  <Zap className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="glassBlue">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskAnalysis;
