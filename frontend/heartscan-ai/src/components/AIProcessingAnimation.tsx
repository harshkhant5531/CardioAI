import { useEffect, useState } from 'react';
import { Database, GitBranch, Cpu, BarChart3, Check } from 'lucide-react';

const processingSteps = [
  { id: 1, title: 'Data Preparation', description: 'Normalizing and validating input features...', icon: Database, duration: 1500 },
  { id: 2, title: 'Feature Analysis', description: 'Extracting key health indicators...', icon: GitBranch, duration: 2000 },
  { id: 3, title: 'Model Inference', description: 'Running cardiovascular prediction model...', icon: Cpu, duration: 2500 },
  { id: 4, title: 'Result Compilation', description: 'Generating risk assessment and insights...', icon: BarChart3, duration: 1500 },
];

interface AIProcessingAnimationProps {
  onComplete: () => void;
}

export const AIProcessingAnimation = ({ onComplete }: AIProcessingAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep < processingSteps.length) {
      const step = processingSteps[currentStep];
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setProgress(0);
              setCurrentStep(prev => prev + 1);
            }, 300);
            return 100;
          }
          return prev + (100 / (step.duration / 50));
        });
      }, 50);

      return () => clearInterval(progressInterval);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [currentStep, onComplete]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      {/* Central AI orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-cyan-500/20 blur-xl animate-pulse-glow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full glass-card flex items-center justify-center">
              <Cpu className="w-16 h-16 text-primary animate-thinking" />
            </div>
          </div>
          {/* Orbiting particles */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2"
              style={{
                animation: `orbit 4s linear infinite`,
                animationDelay: `${i * 1}s`,
              }}
            >
              <div className="w-4 h-4 rounded-full bg-primary shadow-glow" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-xl w-full mt-64">
        <h2 className="font-display text-3xl font-bold text-center mb-2 text-white">
          AI Analysis in Progress
        </h2>
        <p className="text-slate-300 text-center mb-12">
          Our advanced ML model is analyzing your health data
        </p>

        <div className="space-y-4">
          {processingSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isPending = index > currentStep;

            return (
              <div
                key={step.id}
                className={`glass-card rounded-xl p-4 transition-all duration-500 ${isActive ? 'ring-2 ring-primary shadow-glow scale-105' : ''
                  } ${isPending ? 'opacity-40' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isCompleted
                      ? 'bg-success text-success-foreground'
                      : isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                      }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className={`w-5 h-5 ${isActive ? 'animate-thinking' : ''}`} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                    {isActive && (
                      <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
