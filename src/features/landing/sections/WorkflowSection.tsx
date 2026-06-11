import React, { useState } from 'react';

type Accent = 'cyan' | 'red' | 'purple';

interface Step {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  userAction: string;
  accent: Accent;
}

const steps: Step[] = [
  {
    id: '01',
    code: 'AUTH',
    title: 'Login / Register',
    shortTitle: 'Login',
    description:
      'Create an account, verify your identity using OTP, and access your secure workspace.',
    userAction:
      'The user signs up or logs in, then completes OTP verification before entering the platform.',
    accent: 'red',
  },
  {
    id: '02',
    code: 'DOMAIN',
    title: 'Verify Domain',
    shortTitle: 'Domain',
    description:
      'Select an existing verified domain or verify a new domain before starting an assessment.',
    userAction:
      'The user confirms domain ownership so scans are only performed on authorized targets.',
    accent: 'cyan',
  },
  {
    id: '03',
    code: 'SCAN',
    title: 'Start Security Scan',
    shortTitle: 'Scan',
    description:
      'Enter the target domain and scan for exposed services, open ports, and security risks.',
    userAction:
      'The user starts an exposure assessment and reviews discovered technical findings.',
    accent: 'red',
  },
  {
    id: '04',
    code: 'ATTACK',
    title: 'Run Simulated Attacks',
    shortTitle: 'Attack',
    description:
      'Safely analyze possible attack paths and identify which vulnerabilities need attention.',
    userAction:
      'The user runs controlled simulations to understand how weaknesses could be exploited.',
    accent: 'purple',
  },
  {
    id: '05',
    code: 'AI FIX',
    title: 'Generate AI Solution',
    shortTitle: 'AI Solution',
    description:
      'Receive AI-based remediation steps, prevention tips, and security improvement guidance.',
    userAction:
      'The user generates clear AI guidance for fixing vulnerabilities and reducing future risk.',
    accent: 'purple',
  },
  {
    id: '06',
    code: 'REPORT',
    title: 'View Dashboard & Reports',
    shortTitle: 'Reports',
    description:
      'Monitor current assessment progress on the Dashboard and export completed reports from the Reports page.',
    userAction:
      'The Dashboard shows the live workflow, while Reports store saved and completed assessment history.',
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

const accentBg: Record<Accent, string> = {
  cyan: 'bg-secondary',
  red: 'bg-primary',
  purple: 'bg-accent',
};

const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];

  return (
    <section className="relative py-24 overflow-hidden bg-[hsl(220_25%_3%)]">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-semibold tracking-[0.25em] mb-5">
            USER FLOW
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            <span className="text-gradient-red-blue">Security Assessment Journey</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            A guided workflow that takes users from secure login to scan results, AI guidance, and final reports.
          </p>
        </div>

        {/* Horizontal Stepper */}
        <div className="mt-14">
          <div className="relative overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="relative flex items-stretch min-w-[760px] md:min-w-0">
              {/* Base connector */}
              <div
                className="absolute left-0 right-0 top-[22px] h-px bg-border/70"
                aria-hidden="true"
              />
              {/* Progress connector */}
              <div
                className="absolute left-0 top-[22px] h-px bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
                style={{
                  width: `${((activeStep + 0.5) / steps.length) * 100}%`,
                }}
                aria-hidden="true"
              />

              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    aria-pressed={isActive}
                    className="group relative flex-1 flex flex-col items-center px-2 cursor-pointer focus:outline-none"
                  >
                    {/* Node */}
                    <span
                      className={`relative z-10 flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 bg-background ${
                        isActive
                          ? `${accentBorder[step.accent]} shadow-[0_0_0_4px_hsl(220_25%_3%)]`
                          : isCompleted
                            ? 'border-secondary/50'
                            : 'border-border group-hover:border-foreground/40'
                      }`}
                    >
                      <span
                        className={`text-xs font-bold tracking-wider transition-colors ${
                          isActive
                            ? accentText[step.accent]
                            : isCompleted
                              ? 'text-secondary'
                              : 'text-muted-foreground group-hover:text-foreground'
                        }`}
                      >
                        {step.id}
                      </span>
                    </span>

                    {/* Labels */}
                    <span
                      className={`mt-4 text-[10px] font-semibold tracking-[0.2em] transition-colors ${
                        isActive ? accentText[step.accent] : 'text-muted-foreground'
                      }`}
                    >
                      {step.code}
                    </span>
                    <span
                      className={`mt-1 text-sm font-medium transition-colors ${
                        isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground/90'
                      }`}
                    >
                      {step.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="mt-10 mx-auto max-w-4xl">
          <div
            key={active.id}
            className={`glass-panel rounded-2xl border ${accentBorder[active.accent]} p-7 md:p-9 animate-fade-in-up transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-1.5 h-6 rounded-full ${accentBg[active.accent]}`} aria-hidden="true" />
              <span
                className={`text-[11px] font-semibold tracking-[0.25em] ${accentText[active.accent]}`}
              >
                STEP {active.id} / {active.code}
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wide mb-3">
              {active.title}
            </h3>

            <p className="text-base text-foreground/85 leading-relaxed mb-6">
              {active.description}
            </p>

            <div className="border-t border-border/60 pt-5">
              <div className="text-[11px] font-semibold tracking-[0.25em] text-muted-foreground mb-2">
                USER ACTION
              </div>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                {active.userAction}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto leading-relaxed">
          Dashboard shows the current assessment workflow, while Reports store saved and completed
          assessment history.
        </p>
      </div>
    </section>
  );
};

export default WorkflowSection;
