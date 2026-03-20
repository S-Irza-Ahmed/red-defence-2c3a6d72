import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowRight, Loader2, CheckCircle, Sparkles, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlassCard from '@/components/ui/GlassCard';
import { useWorkflow } from '@/contexts/WorkflowContext';

type AuthMode = 'login' | 'signup';
type AuthStep = 'credentials' | 'otp' | 'success';

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useWorkflow();
  const [mode, setMode] = useState<AuthMode>('login');
  const [step, setStep] = useState<AuthStep>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  // OTP countdown timer
  useEffect(() => {
    if (step === 'otp' && otpTimer > 0) {
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, otpTimer]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (mode === 'signup') {
      setStep('otp');
      setOtpTimer(60);
      setCanResend(false);
    } else {
      // Login: derive display name from email
      const displayName = deriveDisplayName(formData.email);
      login(displayName);
      setStep('success');
      setTimeout(() => navigate('/dashboard'), 1500);
    }
    setIsLoading(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      setIsLoading(false);
      return;
    }

    login();
    setStep('success');
    setTimeout(() => navigate('/dashboard'), 1500);
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    setCanResend(false);
    setOtpTimer(60);
    // Simulate resend
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      {/* Background enhancements */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="relative">
                <Shield className="w-12 h-12 text-primary" />
                <div className="absolute inset-0 animate-ping opacity-20">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
              </div>
              <span className="font-display text-3xl font-bold text-gradient-red-blue">RED DEFENCE</span>
            </div>
            <p className="text-lg text-muted-foreground">
              {step === 'credentials' && (mode === 'login' ? 'Welcome back!' : 'Your digital shield starts here.')}
              {step === 'otp' && 'Verify your identity'}
              {step === 'success' && 'Access granted'}
            </p>
          </div>

          <GlassCard variant="red" className="relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/20 to-transparent" />
            
            {/* Success State */}
            {step === 'success' && (
              <div className="text-center py-12 animate-fade-in-up">
                <div className="relative inline-flex mb-6">
                  <div className="p-5 rounded-full bg-green-500/20 border-2 border-green-500/50">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-green-400 animate-bounce" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Welcome to Red Defence</h3>
                <p className="text-muted-foreground">Redirecting to Security Center...</p>
                <div className="mt-6 flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-green-500 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Credentials Form */}
            {step === 'credentials' && (
              <>
                {/* Enhanced Mode Tabs */}
                <div className="flex mb-10 rounded-xl bg-muted/30 p-1.5 border border-border/50">
                  <button
                    onClick={() => setMode('login')}
                    className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      mode === 'login'
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      mode === 'signup'
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                  {mode === 'signup' && (
                    <div className="space-y-2 animate-fade-in-up">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-12 h-14 bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-base"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="email"
                        placeholder="yourname@gmail.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (emailError) setEmailError('');
                          }}
                          className="pl-12 h-14 bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-base"
                          required
                        />
                      </div>
                      {emailError && (
                        <p className="text-sm text-destructive font-medium mt-1">{emailError}</p>
                      )}
                    </div>

                  {mode === 'signup' && (
                    <div className="space-y-2 animate-fade-in-up">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type="tel"
                          placeholder="+92 (3XX) XXX-XXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-12 h-14 bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-base"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-12 h-14 bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-base"
                        required
                      />
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div className="space-y-2 animate-fade-in-up">
                      <label className="text-sm font-medium text-foreground">Confirm Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="pl-12 h-14 bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-base"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border-2 border-destructive/30 text-destructive text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="cyber"
                    size="xl"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {mode === 'login' ? 'Login' : 'Continue'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* OTP Verification */}
            {step === 'otp' && (
              <form onSubmit={handleOtpSubmit} className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-secondary/10 border-2 border-secondary/30 mb-6">
                    <Mail className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">Enter Verification Code</h3>
                  <p className="text-muted-foreground">
                    We've sent a 6-digit code to<br />
                    <span className="text-foreground font-medium">{formData.email}</span>
                  </p>
                </div>

                {/* Enhanced OTP Input Boxes */}
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-14 h-16 text-center text-2xl font-bold bg-input border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 hover:border-border/80"
                    />
                  ))}
                </div>

                {/* Enhanced Timer */}
                <div className="text-center">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-secondary hover:text-secondary/80 transition-colors font-semibold inline-flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Resend Code
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/30 border border-border/50">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-muted-foreground">
                        Resend in <span className="text-primary font-bold tabular-nums">{otpTimer}s</span>
                      </span>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-destructive/10 border-2 border-destructive/30 text-destructive text-sm font-medium text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="cyber"
                  size="xl"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="w-full text-center text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  ← Back to login
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Auth;
