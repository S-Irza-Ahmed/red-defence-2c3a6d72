import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

type Accent = 'cyan' | 'red' | 'purple';

interface Step {
  id: string;
  phase: string;
  title: string;
  short: string;
  detail: string;
  accent: Accent;
}

const steps: Step[] = [
  {
    id: '01',
    phase: 'AUTH ACCESS',
    title: 'Login / Register',
    short: 'Create an account, verify your identity using OTP, and access your secure workspace.',
    detail:
      'The user starts by signing up or logging in. OTP verification protects the account before access is granted to the assessment workspace.',
    accent: 'red',
  },
  {
    id: '02',
    phase: 'DOMAIN VERIFICATION',
    title: 'Verify Domain',
    short: 'Select an existing verified domain or verify a new domain before starting an assessment.',
    detail:
      'Red Defence only allows scans on verified domains so users assess authorized systems, not random third-party targets.',
    accent: 'cyan',
  },
  {
    id: '03',
    phase: 'SCAN EXECUTION',
    title: 'Start Security Scan',
    short: 'Enter the target domain and scan for exposed services, open ports, and security risks.',
    detail:
      'The scan checks the selected domain for visible exposure points and prepares the findings for deeper analysis.',
    accent: 'red',
  },
  {
    id: '04',
    phase: 'ATTACK SIMULATION',
    title: 'Run Simulated Attacks',
    short: 'Safely analyze possible attack paths and identify which vulnerabilities need attention.',
    detail:
      'Simulated attacks help users understand how discovered weaknesses could be exploited in a controlled and safe way.',
    accent: 'purple',
  },
  {
    id: '05',
    phase: 'AI REMEDIATION',
    title: 'Generate AI Solution',
    short: 'Receive AI-based remediation steps, prevention tips, and security improvement guidance.',
    detail:
      'The AI Solution page converts technical findings into clear actions, including fixes, prevention guidance, and recommended next steps.',
    accent: 'purple',
  },
  {
    id: '06',
    phase: 'REPORTING',
    title: 'View Dashboard & Reports',
    short:
      'Monitor current assessment progress on the Dashboard and export completed reports from the Reports page.',
    detail:
      'The Dashboard shows the current assessment workflow, while Reports store saved and completed assessment history for viewing and export.',
    accent: 'cyan',
  },
];

const accentText: Record<Accent, string> = {
  cyan: 'text-secondary',
  red: 'text-primary',
  purple: 'text-accent',
};

const accentBorder: Record<Accent, string> = {
  cyan: 'border-secondary/60',
  red: 'border-primary/60',
  purple: 'border-accent/60',
};

const accentDot: Record<Accent, string> = {
  cyan: 'bg-secondary',
  red: 'bg-primary',
  purple: 'bg-accent',
};

const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-24 overflow-hidden bg-[hsl(220_25%_3%)]">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Left explanation */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-semibold tracking-[0.2em] mb-6">
              USER FLOW
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              <span className="text-gradient-red-blue">Security Assessment Journey</span>
            </h2>

            <p className="text-lg text-foreground/90 mb-5 leading-relaxed">
              A guided workflow that takes users from secure login to scan results, AI guidance, and final reports.
            </p>

            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Red Defence follows a structured assessment flow. Users first verify their identity and domain,
              then run a scan, review simulated attack findings, generate AI-based solutions, and export
              completed reports.
            </p>

            <div className="glass-panel p-5 rounded-xl border border-border/60">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground mb-3">
                COMPLETE ASSESSMENT FLOW
              </h3>
              <p className="text-sm text-foreground/85 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Login</span><span className="text-primary">→</span>
                <span>Domain Verification</span><span className="text-secondary">→</span>
                <span>Scan</span><span className="text-primary">→</span>
                <span>Simulated Attack</span><span className="text-accent">→</span>
                <span>AI Solution</span><span className="text-accent">→</span>
                <span>Reports</span>
              </p>
            </div>
          </div>

          {/* Right interactive stepper */}
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-secondary/40"
              aria-hidden="true"
            />
            {/* Active progress line */}
            <div
              className="absolute left-[11px] top-2 w-px bg-gradient-to-b from-primary to-secondary transition-all duration-500"
              style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
              aria-hidden="true"
            />

            <ul className="space-y-4">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <li key={step.id} className="relative pl-10">
                    {/* Step dot */}
                    <span
                      className={`absolute left-0 top-5 w-[23px] h-[23px] rounded-full border-2 ${
                        isActive ? accentBorder[step.accent] : 'border-border'
                      } bg-background flex items-center justify-center transition-colors duration-300`}
                      aria-hidden="true"
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          isActive ? accentDot[step.accent] : 'bg-muted-foreground/40'
                        }`}
                      />
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      aria-expanded={isActive}
                      aria-controls={`step-detail-${step.id}`}
                      className={`w-full text-left rounded-xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? `${accentBorder[step.accent]} bg-card/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]`
                          : 'border-border/60 bg-card/30 hover:bg-card/50 hover:border-border hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div
                              className={`text-[11px] font-semibold tracking-[0.2em] mb-2 ${
                                isActive ? accentText[step.accent] : 'text-muted-foreground'
                              }`}
                            >
                              STEP {step.id} <span className="opacity-60">/ {step.phase}</span>
                            </div>
                            <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wide">
                              {step.title}
                            </h3>
                          </div>
                          {isActive ? (
                            <span
                              className={`shrink-0 text-[10px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-full border ${accentBorder[step.accent]} ${accentText[step.accent]} bg-background/60`}
                            >
                              ACTIVE
                            </span>
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                          )}
                        </div>

                        <p className="text-sm text-foreground/80 leading-relaxed mt-3">
                          {step.short}
                        </p>

                        {/* Expand/collapse detail */}
                        <div
                          id={`step-detail-${step.id}`}
                          className={`grid transition-all duration-500 ease-out ${
                            isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className={`border-t ${accentBorder[step.accent]} pt-4`}>
                              <div
                                className={`text-[10px] font-semibold tracking-[0.2em] mb-2 ${accentText[step.accent]}`}
                              >
                                ACTIVE STAGE / DETAILS
                              </div>
                              <p className="text-sm text-foreground/85 leading-relaxed">
                                {step.detail}
                              </p>
                            </div>
                          </div>
                        </div>

                        {!isActive && (
                          <div className="text-[11px] text-muted-foreground mt-3 tracking-wide">
                            Click to expand
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-16 max-w-3xl mx-auto leading-relaxed">
          Dashboard shows the current assessment workflow, while Reports store saved and completed
          assessment history.
        </p>
      </div>
    </section>
  );
};

export default WorkflowSection;
