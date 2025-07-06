
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSuccess }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate auth process - replace with Supabase integration
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `${mode === 'login' ? 'Logged in' : 'Account created'} successfully. Connect Supabase for real authentication.`,
      });
      setLoading(false);
      onSuccess();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full gradient-bg hover:opacity-90" 
                disabled={loading}
              >
                {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => {
                    // Switch between login and signup modes
                  }}
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <p className="text-xs text-center text-muted-foreground">
                💡 This is a demo. Connect your Lovable project to Supabase for real authentication.
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
