
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthModal from "@/components/AuthModal";
import Header from "@/components/Header";
import { 
  crop, 
  user,
  log-in
} from "lucide-react";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const features = [
    {
      icon: crop,
      title: "AI Background Removal",
      description: "Remove backgrounds instantly with advanced AI technology"
    },
    {
      icon: crop,
      title: "Smart Resize & Crop",
      description: "Intelligently resize and crop images while maintaining quality"
    },
    {
      icon: crop,
      title: "Advanced Filters",
      description: "Apply professional-grade filters and adjustments"
    },
    {
      icon: crop,
      title: "Batch Processing",
      description: "Edit multiple images simultaneously with AI automation"
    },
    {
      icon: crop,
      title: "Format Conversion",
      description: "Convert between all major image formats instantly"
    },
    {
      icon: crop,
      title: "Cloud Storage",
      description: "Save and access your projects from anywhere"
    }
  ];

  const handleAuthOpen = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  if (isLoggedIn) {
    return <div>Dashboard placeholder - connect Supabase to enable full auth</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAuthOpen={handleAuthOpen} isLoggedIn={isLoggedIn} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
            🚀 AI-Powered Photo Editor
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="gradient-text block">Photos with AI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional photo editing made simple. Remove backgrounds, enhance images, 
            and create stunning visuals with the power of artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gradient-bg hover:opacity-90 transition-all duration-300 hover:scale-105 pulse-glow"
              onClick={() => handleAuthOpen('signup')}
            >
              <user className="mr-2 h-5 w-5" />
              Start Editing Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 hover:bg-accent transition-all duration-300 hover:scale-105"
              onClick={() => handleAuthOpen('login')}
            >
              <log-in className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful AI Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to create professional-quality images, powered by cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto glass-effect rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Photos?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of creators who trust our AI-powered photo editor for their projects.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 gradient-bg hover:opacity-90 transition-all duration-300 hover:scale-105"
              onClick={() => handleAuthOpen('signup')}
            >
              <user className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSuccess={() => {
          setIsLoggedIn(true);
          setShowAuthModal(false);
        }}
      />
    </div>
  );
};

export default Index;
