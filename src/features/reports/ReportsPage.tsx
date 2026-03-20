import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, Calendar, Target, Shield, ChevronRight, Filter, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import GuidancePanel from '@/components/ui/GuidancePanel';
import { useWorkflow } from '@/contexts/WorkflowContext';

interface Report {
  id: string;
  target: string;
  date: string;
  overallRisk: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  findings: number;
  resolved: number;
  status: 'complete' | 'in-progress';
}

const Reports = () => {
  const { state } = useWorkflow();
  const [isLoading] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const mockReports: Report[] = [
    { id: 'RPT-001', target: 'api.example.com', date: '2024-01-15', overallRisk: 78, severity: 'high', findings: 12, resolved: 8, status: 'complete' },
    { id: 'RPT-002', target: 'app.mysite.io', date: '2024-01-14', overallRisk: 45, severity: 'medium', findings: 6, resolved: 3, status: 'in-progress' },
    { id: 'RPT-003', target: 'staging.dev.com', date: '2024-01-13', overallRisk: 25, severity: 'low', findings: 4, resolved: 4, status: 'complete' },
    { id: 'RPT-004', target: 'secure.bank.com', date: '2024-01-12', overallRisk: 92, severity: 'critical', findings: 18, resolved: 5, status: 'complete' },
    { id: 'RPT-005', target: 'portal.company.net', date: '2024-01-10', overallRisk: 55, severity: 'medium', findings: 8, resolved: 6, status: 'complete' },
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

  // Reports require full workflow completion (AI Solution must be done)
  if (!state.hasAISolutionCompleted) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <GuidancePanel type="workflow" />
        </div>
      </div>
    );
  }

  const filteredReports = filterSeverity === 'all'
    ? mockReports
    : mockReports.filter(r => r.severity === filterSeverity);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background enhancements */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary/15 border border-secondary/40 mb-6 backdrop-blur-sm">
              <FileText className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Assessment Archive</span>
            </div>
            <h1 className="font-display text-5xl font-bold mb-3">
              <span className="text-gradient-red-blue">Security Reports</span>
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Archive and review completed assessments. View historical reports or export for documentation.
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3 bg-muted/30 rounded-xl px-4 py-2 border border-border/50">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-transparent border-none text-sm focus:outline-none cursor-pointer"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-4 gap-6 mb-10">
          <GlassCard variant="red" className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 border border-primary/30 mb-4">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="font-display text-4xl font-black text-primary">{mockReports.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Total Reports</p>
          </GlassCard>
          <GlassCard variant="blue" className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-secondary/10 border border-secondary/30 mb-4">
              <Shield className="w-5 h-5 text-secondary" />
            </div>
            <div className="font-display text-4xl font-black text-secondary">{mockReports.filter(r => r.status === 'complete').length}</div>
            <p className="text-sm text-muted-foreground mt-1">Completed</p>
          </GlassCard>
          <GlassCard variant="red" className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 border border-primary/30 mb-4">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="font-display text-4xl font-black text-primary">{mockReports.reduce((acc, r) => acc + r.findings, 0)}</div>
            <p className="text-sm text-muted-foreground mt-1">Total Findings</p>
          </GlassCard>
          <GlassCard variant="blue" className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-green-500/10 border border-green-500/30 mb-4">
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <div className="font-display text-4xl font-black text-green-500">{mockReports.reduce((acc, r) => acc + r.resolved, 0)}</div>
            <p className="text-sm text-muted-foreground mt-1">Resolved</p>
          </GlassCard>
        </div>

        {/* Reports List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <GlassCard key={i} variant="blue">
                <div className="flex items-center gap-6">
                  <SkeletonLoader variant="circle" />
                  <div className="flex-1 space-y-3">
                    <SkeletonLoader className="w-48" />
                    <SkeletonLoader className="w-32" />
                  </div>
                  <SkeletonLoader variant="button" />
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report, index) => (
              <GlassCard
                key={report.id}
                variant={report.severity === 'critical' || report.severity === 'high' ? 'red' : 'blue'}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Report Info */}
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      report.severity === 'critical' ? 'bg-primary/20 border-2 border-primary/30' :
                      report.severity === 'high' ? 'bg-orange-500/20 border-2 border-orange-500/30' :
                      report.severity === 'medium' ? 'bg-yellow-500/20 border-2 border-yellow-500/30' :
                      'bg-secondary/20 border-2 border-secondary/30'
                    }`}>
                      <Shield className={`w-7 h-7 ${
                        report.severity === 'critical' ? 'text-primary' :
                        report.severity === 'high' ? 'text-orange-500' :
                        report.severity === 'medium' ? 'text-yellow-500' :
                        'text-secondary'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-lg font-bold">{report.target}</h3>
                        <StatusBadge status={report.severity} />
                      </div>
                      <div className="flex items-center gap-5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {report.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Target className="w-4 h-4" />
                          {report.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Stats */}
                  <div className="flex items-center gap-10">
                    <div className="text-center">
                      <div className="font-display text-2xl font-black">{report.overallRisk}%</div>
                      <div className="text-xs text-muted-foreground mt-1">Risk Score</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-2xl font-black">{report.findings}</div>
                      <div className="text-xs text-muted-foreground mt-1">Findings</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-2xl font-black text-green-500">{report.resolved}</div>
                      <div className="text-xs text-muted-foreground mt-1">Resolved</div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button variant="glassBlue" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredReports.length === 0 && !isLoading && (
          <GlassCard variant="blue" className="text-center py-16">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="font-display text-2xl font-bold mb-3">No Reports Found</h3>
            <p className="text-muted-foreground">No reports match your current filter criteria.</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default Reports;
