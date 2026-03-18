import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scan as ScanIcon, Globe, Play, CheckCircle, ChevronRight, Server, Shield, Lock, Wifi, Database, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlassCard from '@/components/ui/GlassCard';
import RadarLoader from '@/components/ui/RadarLoader';
import ProgressBar from '@/components/ui/ProgressBar';
import GuidancePanel from '@/components/ui/GuidancePanel';
import { useWorkflow } from '@/contexts/WorkflowContext';

type ScanStatus = 'idle' | 'scanning' | 'complete';

interface ScanPhase {
  label: string;
  status: 'pending' | 'active' | 'complete';
  description: string;
  icon: typeof Server;
}

const Scan = () => {
  const { state, completeScan } = useWorkflow();
  const [targetUrl, setTargetUrl] = useState('');
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [phases, setPhases] = useState<ScanPhase[]>([
    { label: 'Reachability Check', status: 'pending', description: 'Verifying target accessibility', icon: Wifi },
    { label: 'Service Discovery', status: 'pending', description: 'Detecting available services', icon: Server },
    { label: 'Configuration Review', status: 'pending', description: 'Analyzing security settings', icon: Database },
    { label: 'Surface Mapping', status: 'pending', description: 'Mapping exposure surface', icon: Activity },
  ]);

  const terminalMessages = [
    '> Initializing security scan...',
    '> Connecting to target system...',
    '> Target reachable. Response time: 45ms',
    '> Initiating service enumeration...',
    '> Port 443: HTTPS detected',
    '> Port 80: HTTP detected (redirect)',
    '> SSL/TLS configuration check...',
    '> Certificate valid. TLS 1.3 supported',
    '> Analyzing response headers...',
    '> Security headers: 6/8 implemented',
    '> Checking for common misconfigurations...',
    '> Content Security Policy: Present',
    '> X-Frame-Options: SAMEORIGIN',
    '> Mapping application endpoints...',
    '> 24 endpoints discovered',
    '> Authentication mechanisms detected',
    '> Finalizing surface analysis...',
    '> Scan complete. Generating report...',
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

  const startScan = () => {
    if (!targetUrl.trim()) return;
    setScanStatus('scanning');
    setProgress(0);
    setTerminalLines([]);
    setPhases(phases.map(p => ({ ...p, status: 'pending' })));
  };

  useEffect(() => {
    if (scanStatus !== 'scanning') return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setScanStatus('complete');
          completeScan(targetUrl);
          return 100;
        }
        return prev + 2;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, [scanStatus, targetUrl, completeScan]);

  useEffect(() => {
    if (scanStatus !== 'scanning') return;

    // Update phases based on progress
    const phaseThresholds = [25, 50, 75, 100];
    const newPhases = phases.map((phase, index) => {
      if (progress >= phaseThresholds[index]) {
        return { ...phase, status: 'complete' as const };
      } else if (progress >= (phaseThresholds[index] - 25)) {
        return { ...phase, status: 'active' as const };
      }
      return phase;
    });
    setPhases(newPhases);

    // Add terminal lines
    const lineIndex = Math.floor((progress / 100) * terminalMessages.length);
    if (lineIndex > terminalLines.length && lineIndex <= terminalMessages.length) {
      setTerminalLines(prev => [...prev, terminalMessages[lineIndex - 1]]);
    }
  }, [progress, scanStatus, terminalLines.length]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background enhancements */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary/15 border border-secondary/40 mb-8 backdrop-blur-sm">
            <ScanIcon className="w-5 h-5 text-secondary" />
            <span className="text-sm font-semibold text-secondary">System Assessment</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-red-blue">Security Scan</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your target URL to begin comprehensive security assessment
          </p>
        </div>

        {/* Scan Input */}
        {scanStatus === 'idle' && (
          <GlassCard variant="blue" className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="pl-12 h-16 bg-input border-2 border-border text-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              <Button
                variant="cyberSecondary"
                size="xl"
                onClick={startScan}
                disabled={!targetUrl.trim()}
                className="h-16"
              >
                <Play className="w-5 h-5" />
                Start Scan
              </Button>
            </div>
          </GlassCard>
        )}

        {/* Scanning State */}
        {scanStatus === 'scanning' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            {/* Target Info */}
            <GlassCard variant="blue" className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-1">Scanning Target</p>
              <p className="font-display text-xl font-bold text-secondary">{targetUrl}</p>
            </GlassCard>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Radar Animation */}
              <GlassCard variant="red" className="flex flex-col items-center justify-center py-16">
                <RadarLoader size="lg" />
                <div className="mt-10 text-center">
                  <p className="font-display text-4xl font-black mb-2 text-gradient-red-blue">{progress}%</p>
                  <p className="text-muted-foreground">Scan in progress</p>
                </div>
                <div className="w-full max-w-xs mt-8">
                  <ProgressBar value={progress} variant="gradient" size="lg" />
                </div>
              </GlassCard>

              {/* Terminal Output */}
              <GlassCard variant="blue" className="font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/50">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-muted-foreground font-sans text-xs">scan_terminal</span>
                </div>
                <div className="h-72 overflow-y-auto space-y-1.5 pr-2">
                  {terminalLines.map((line, index) => (
                    <div
                      key={index}
                      className={`${line.includes('complete') || line.includes('valid') || line.includes('Present') || line.includes('HTTPS') ? 'text-green-400' : 'text-secondary'} animate-fade-in-left`}
                    >
                      {line}
                    </div>
                  ))}
                  {scanStatus === 'scanning' && (
                    <span className="text-secondary typing-cursor">_</span>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* Phases */}
            <GlassCard variant="red" className="scan-line">
              <h3 className="font-display text-lg font-semibold mb-8">Scan Phases</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {phases.map((phase, index) => {
                  const PhaseIcon = phase.icon;
                  return (
                    <div
                      key={phase.label}
                      className={`p-5 rounded-2xl border-2 transition-all duration-500 ${
                        phase.status === 'complete'
                          ? 'bg-green-500/10 border-green-500/50 shadow-[0_0_20px_hsl(142_76%_36%/0.2)]'
                          : phase.status === 'active'
                          ? 'bg-secondary/10 border-secondary/50 shadow-[0_0_20px_hsl(200_100%_50%/0.2)]'
                          : 'bg-muted/20 border-border/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {phase.status === 'complete' ? (
                          <div className="p-2 rounded-lg bg-green-500/20">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        ) : phase.status === 'active' ? (
                          <div className="p-2 rounded-lg bg-secondary/20">
                            <ScanIcon className="w-5 h-5 text-secondary animate-spin" />
                          </div>
                        ) : (
                          <div className="p-2 rounded-lg bg-muted/30">
                            <PhaseIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <span className="font-semibold text-sm">{phase.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{phase.description}</p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Complete State */}
        {scanStatus === 'complete' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
            <GlassCard variant="red" className="text-center py-14 scan-line relative overflow-hidden">
              {/* Success glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
              
              <div className="relative inline-flex mb-8">
                <div className="p-5 rounded-full bg-green-500/20 border-2 border-green-500/50">
                  <CheckCircle className="w-14 h-14 text-green-500" />
                </div>
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDuration: '2s' }} />
              </div>
              
              <h2 className="font-display text-3xl font-bold mb-4 relative z-10">Scan Complete</h2>
              <p className="text-muted-foreground mb-2 relative z-10">Target: <span className="text-foreground font-medium">{targetUrl}</span></p>
              
              <div className="grid grid-cols-3 gap-6 my-10 max-w-md mx-auto relative z-10">
                <div className="p-5 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="font-display text-3xl font-black text-primary">24</div>
                  <div className="text-xs text-muted-foreground mt-1">Endpoints</div>
                </div>
                <div className="p-5 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="font-display text-3xl font-black text-secondary">8</div>
                  <div className="text-xs text-muted-foreground mt-1">Services</div>
                </div>
                <div className="p-5 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="font-display text-3xl font-black text-accent">12</div>
                  <div className="text-xs text-muted-foreground mt-1">Findings</div>
                </div>
              </div>

              <Link to="/risk" className="relative z-10">
                <Button variant="cyber" size="xl">
                  Proceed to Risk Analysis
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </GlassCard>

            <div className="flex justify-center gap-4">
              <Button variant="glassBlue" onClick={() => setScanStatus('idle')}>
                New Scan
              </Button>
              <Link to="/dashboard">
                <Button variant="ghost">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
