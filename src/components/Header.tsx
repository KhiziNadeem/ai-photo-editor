
import { Button } from "@/components/ui/button";
import { log-in, user } from "lucide-react";

interface HeaderProps {
  onAuthOpen: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
}

const Header = ({ onAuthOpen, isLoggedIn }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <crop className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">PhotoAI</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => onAuthOpen('login')}
                className="hover:bg-accent"
              >
                <log-in className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button 
                onClick={() => onAuthOpen('signup')}
                className="gradient-bg hover:opacity-90"
              >
                <user className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </>
          ) : (
            <Button variant="outline">
              <user className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
