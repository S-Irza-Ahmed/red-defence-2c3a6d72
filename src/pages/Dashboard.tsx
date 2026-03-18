import { Link } from 'react-router-dom';
import { Shield, Scan, AlertTriangle, CheckCircle, Clock, ChevronRight, Play, Eye, Activity, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import ProgressBar from '@/components/ui/ProgressBar';
import GuidancePanel from '@/components/ui/GuidancePanel';
import { useWorkflow } from '@/contexts/WorkflowContext';

const Dashboard = () => {
  const { state } = useWorkflow();

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

  // Mock data
  const stats = [
    { label: 'Total Scans', value: '12', icon: Scan, change: '+3 this week', color: 'primary' },
    { label: 'Risks Identified', value: '47', icon: AlertTriangle, change: '18 resolved', color: 'primary' },
    { label: 'Highest Severity', value: 'High', icon: Shield, status: 'high' as const, color: 'secondary' },
    { label: 'Last Activity', value: '2h ago', icon: Clock, change: 'api.example.com', color: 'secondary' },
  ];

  const recentActivity = [
    { id: 1, target: 'api.example.com', status: 'completed', severity: 'high' as const, date: '2024-01-15', progress: 100 },
    { id: 2, target: 'app.mysite.io', status: 'analyzing', severity: 'medium' as const, date: '2024-01-14', progress: 65 },
    { id: 3, target: 'staging.dev.com', status: 'pending', severity: 'low' as const, date: '2024-01-13', progress: 0 },
    { id: 4, target: 'secure.bank.com', status: 'completed', severity: 'critical' as const, date: '2024-01-12', progress: 100 },
  ];

  const workflowProgress = {
    scan: state.hasScanCompleted ? 100 : 0,
    analysis: state.hasRiskAnalysisCompleted ? 100 : state.hasScanCompleted ? 50 : 0,
    aiSolution: state.hasAISolutionCompleted ? 100 : state.hasRiskAnalysisCompleted ? 50 : 0,
    report: state.hasAISolutionCompleted ? 75 : 0,
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background enhancements */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/40 mb-6 backdrop-blur-sm">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Command Center</span>
            </div>
            <h1 className="font-display text-5xl font-bold mb-3">
              <span className="text-gradient-red-blue">Security Center</span>
            </h1>
            <p className="text-lg text-muted-foreground">Monitor and manage your security assessments</p>
          </div>
          <Link to="/scan">
            <Button variant="cyber" size="xl" className="group">
              <Scan className="w-5 h-5" />
              Start New Scan
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <GlassCard
              key={stat.label}
              variant={stat.color === 'primary' ? 'red' : 'blue'}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`p-4 rounded-2xl ${stat.color === 'primary' ? 'bg-primary/10 border-2 border-primary/30' : 'bg-secondary/10 border-2 border-secondary/30'}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                </div>
                {stat.status && <StatusBadge status={stat.status} />}
              </div>
              <div className="font-display text-4xl font-black mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
              {stat.change && (
                <div className="text-xs text-muted-foreground/70 mt-3 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Workflow Progress */}
        <GlassCard variant="red" className="mb-10 scan-line">
          <h2 className="font-display text-2xl font-bold mb-8">Assessment Workflow</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Scan', value: workflowProgress.scan, path: '/scan' },
              { label: 'Risk Analysis', value: workflowProgress.analysis, path: '/risk' },
              { label: 'AI Solution', value: workflowProgress.aiSolution, path: '/ai-solution' },
              { label: 'Report', value: workflowProgress.report, path: '/reports' },
            ].map((step, index) => (
              <Link key={step.label} to={step.path} className="text-center group cursor-pointer">
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-5">
                  <svg className="w-20 h-20 -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="none"
                      className="text-muted/30"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray={`${step.value * 2.2} 220`}
                      className={step.value === 100 ? 'text-green-500' : step.value > 0 ? 'text-secondary' : 'text-muted-foreground/30'}
                      style={{ transition: 'stroke-dasharray 1s ease-out' }}
                    />
                  </svg>
                  <span className="absolute font-display font-bold text-lg">{step.value}%</span>
                </div>
                <div className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">{step.label}</div>
                <StatusBadge
                  status={step.value === 100 ? 'success' : step.value > 0 ? 'medium' : 'pending'}
                  label={step.value === 100 ? 'Complete' : step.value > 0 ? 'In Progress' : 'Pending'}
                />
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to={state.hasScanCompleted ? (state.hasRiskAnalysisCompleted ? (state.hasAISolutionCompleted ? '/reports' : '/ai-solution') : '/risk') : '/scan'}>
              <Button variant="cyberSecondary" size="lg">
                Continue Assessment
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard variant="blue">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold">Recent Activity</h2>
            <Link to="/reports" className="text-sm text-secondary hover:text-secondary/80 transition-colors font-medium">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border-2 border-border/50 hover:border-border transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activity.status === 'completed' ? 'bg-green-500/20 border-2 border-green-500/30' :
                    activity.status === 'analyzing' ? 'bg-secondary/20 border-2 border-secondary/30' : 'bg-muted/50 border-2 border-border/30'
                  }`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : activity.status === 'analyzing' ? (
                      <Scan className="w-6 h-6 text-secondary animate-pulse" />
                    ) : (
                      <Clock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{activity.target}</div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <StatusBadge status={activity.severity} />
                  <div className="hidden sm:block w-36">
                    <ProgressBar value={activity.progress} size="sm" variant="gradient" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Eye className="w-5 h-5" />
                    </Button>
                    {activity.status !== 'completed' && (
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Play className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
