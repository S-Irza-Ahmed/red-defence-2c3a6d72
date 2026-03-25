import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { NAV_ITEMS } from '@/constants';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, logout } = useWorkflow();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary transition-all duration-300 group-hover:text-secondary" />
              <div className="absolute inset-0 blur-md bg-primary/30 group-hover:bg-secondary/30 transition-all duration-300" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-gradient-red-blue">
              RED DEFENCE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-body font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg
                  ${isActive(item.path)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full glow-red" />
                )}
                <span className="absolute inset-0 rounded-lg bg-secondary/0 hover:bg-secondary/10 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden lg:flex items-center gap-4">
            {state.isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/30">
                  <User className="w-4 h-4 text-secondary" />
                  {state.isAuthLoading ? (
                    <span className="inline-block w-16 h-4 rounded bg-secondary/20 animate-pulse" />
                  ) : (
                    <span className="text-sm font-medium text-secondary truncate max-w-[120px]">
                      {state.userName || 'User'}
                    </span>
                  )}
                </div>
                <Button variant="glassRed" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="cyber" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/30 animate-slide-in-right">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-300
                    ${isActive(item.path)
                      ? 'bg-primary/10 text-primary neon-border-red'
                      : 'text-muted-foreground hover:bg-secondary/10 hover:text-foreground'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              {state.isAuthenticated ? (
                <Button variant="glassRed" className="w-full mt-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="cyber" className="w-full mt-2">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
