import { useEffect, useState } from 'react';

interface Feature {
  name: string;
  importance: number;
  userValue: string;
  avgValue: string;
  impact: 'positive' | 'negative' | 'neutral';
}

interface FeatureImportanceChartProps {
  features: Feature[];
}

export const FeatureImportanceChart = ({ features }: FeatureImportanceChartProps) => {
  const [animatedFeatures, setAnimatedFeatures] = useState<Feature[]>(
    features.map(f => ({ ...f, importance: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedFeatures(features);
    }, 300);
    return () => clearTimeout(timer);
  }, [features]);

  const maxImportance = Math.max(...features.map(f => f.importance));

  return (
    <div className="space-y-4">
      {animatedFeatures.map((feature, index) => (
        <div
          key={feature.name}
          className="glass-card rounded-xl p-4 animate-slide-in-right"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${feature.impact === 'positive'
                    ? 'bg-success'
                    : feature.impact === 'negative'
                      ? 'bg-destructive'
                      : 'bg-muted-foreground'
                  }`}
              />
              <span className="font-medium text-sm">{feature.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.round(feature.importance)}% impact
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-3">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${feature.impact === 'positive'
                  ? 'bg-success'
                  : feature.impact === 'negative'
                    ? 'bg-destructive'
                    : 'bg-muted-foreground'
                }`}
              style={{ width: `${(feature.importance / maxImportance) * 100}%` }}
            />
          </div>

          {/* Comparison */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-muted-foreground">Your value: </span>
              <span className="font-medium text-foreground">{feature.userValue}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Avg: </span>
              <span className="font-medium text-muted-foreground">{feature.avgValue}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
