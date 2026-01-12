import { useEffect, useState } from 'react';

interface RiskGaugeProps {
  value: number; // 0-100
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskGauge = ({ value, label, size = 'lg' }: RiskGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
      } else {
        setAnimatedValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const dimensions = {
    sm: { size: 120, stroke: 8, fontSize: 'text-xl' },
    md: { size: 180, stroke: 12, fontSize: 'text-3xl' },
    lg: { size: 240, stroke: 16, fontSize: 'text-5xl' },
  };

  const { size: svgSize, stroke, fontSize } = dimensions[size];
  const radius = (svgSize - stroke) / 2;
  const circumference = radius * Math.PI * 2;
  const offset = circumference - (animatedValue / 100) * circumference;

  const getRiskColor = (val: number) => {
    if (val < 15) return { gradient: 'url(#lowRisk)', glow: 'rgba(16, 185, 129, 0.4)' };
    if (val < 45) return { gradient: 'url(#mediumRisk)', glow: 'rgba(245, 158, 11, 0.4)' };
    return { gradient: 'url(#highRisk)', glow: 'rgba(244, 63, 94, 0.4)' };
  };

  const { gradient, glow } = getRiskColor(animatedValue);

  const getRiskLabel = (val: number) => {
    if (val < 15) return 'Low Risk';
    if (val < 45) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90"
          style={{ filter: `drop-shadow(0 0 20px ${glow})` }}
        >
          <defs>
            <linearGradient id="lowRisk" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(160 84% 39%)" />
              <stop offset="100%" stopColor="hsl(170 80% 45%)" />
            </linearGradient>
            <linearGradient id="mediumRisk" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(38 92% 50%)" />
              <stop offset="100%" stopColor="hsl(45 95% 55%)" />
            </linearGradient>
            <linearGradient id="highRisk" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(350 89% 60%)" />
              <stop offset="100%" stopColor="hsl(0 85% 55%)" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="hsl(222 47% 14%)"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke={gradient}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-100"
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display font-bold ${fontSize}`}>
            {Math.round(animatedValue)}%
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            {label}
          </span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${animatedValue < 15
            ? 'bg-success/20 text-success'
            : animatedValue < 45
              ? 'bg-warning/20 text-warning'
              : 'bg-destructive/20 text-destructive'
            }`}
        >
          {getRiskLabel(animatedValue)}
        </span>
      </div>
    </div>
  );
};
