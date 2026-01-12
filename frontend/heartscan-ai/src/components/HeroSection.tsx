import { Button } from '@/components/ui/button';
import { Heart, Activity, Brain, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">AI-Powered Cardiovascular Analysis</span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="text-white">Predict Your</span>
          <br />
          <span className="gradient-text">Heart Health</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          Advanced machine learning algorithms analyze your health data to predict cardiovascular disease risk with unprecedented accuracy and explainability.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button variant="hero" size="xl" onClick={onGetStarted} className="group">
            Start Analysis
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="glass" size="xl">
            Learn More
          </Button>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Heart className="w-6 h-6" />}
            title="Risk Assessment"
            description="Real-time cardiovascular risk scoring based on clinical parameters"
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Explainable AI"
            description="Understand exactly why the AI made its prediction"
          />
          <FeatureCard
            icon={<Activity className="w-6 h-6" />}
            title="Health Insights"
            description="Personalized recommendations based on your health profile"
          />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-10 animate-float">
        <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center">
          <Heart className="w-10 h-10 text-destructive" />
        </div>
      </div>
      <div className="absolute bottom-32 left-10 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center">
          <Activity className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass-card rounded-2xl p-6 text-left hover:scale-105 transition-transform duration-300 group cursor-default">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
