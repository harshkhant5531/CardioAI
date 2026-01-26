import { Heart, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  onHomeClick?: () => void;
}

export const Header = ({ onHomeClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card mx-4 mt-4 rounded-2xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={onHomeClick} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-glow">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-lg">CardioAI</span>
              <span className="hidden sm:inline text-xs text-muted-foreground ml-2">Prediction System</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" onClick={onHomeClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/research" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Research</Link>
            <Link to="/analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analysis</Link>
            <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="default" size="sm" onClick={() => navigate('/#get-started')}>Get Started</Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-foreground"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border flex flex-col gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">Home</Link>
            <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">Features</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">About</Link>
            <Link to="/research" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">Research</Link>
            <Link to="/analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">Analysis</Link>
            <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">FAQ</Link>
            <Button variant="default" size="sm" className="mt-2" onClick={() => navigate('/#get-started')}>Get Started</Button>
          </nav>
        )}
      </div>
    </header>
  );
};
