import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { NeuralBackground } from '@/components/NeuralBackground';
import { HeroSection } from '@/components/HeroSection';
import { HealthInputForm, HealthData as FormHealthData } from '@/components/HealthInputForm';
import { AIProcessingAnimation } from '@/components/AIProcessingAnimation';
import { ResultsDashboard, PredictionResultData } from '@/components/ResultsDashboard';
import { predictHealthRisk } from '@/services/api';

type AppState = 'hero' | 'input' | 'processing' | 'results';

import { useLocation } from 'react-router-dom';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('hero');
  const [predictionResult, setPredictionResult] = useState<PredictionResultData | null>(null);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#get-started') {
      setAppState('input');
      // Clear hash to avoid stuck state
      window.history.replaceState(null, '', ' ');
    }
  }, [location.hash]);

  const handleGetStarted = () => {
    setAppState('input');
  };

  const handleFormSubmit = async (data: FormHealthData) => {
    setAppState('processing');
    setIsAnimationDone(false);
    setPredictionResult(null);

    try {
      // Map form data to API data format
      const apiData = {
        age: parseInt(data.age),
        gender: data.gender === 'male' ? 2 : 1,
        height: parseInt(data.height),
        weight: parseFloat(data.weight),
        ap_hi: parseInt(data.systolicBP),
        ap_lo: parseInt(data.diastolicBP),
        cholesterol: data.cholesterol === 'normal' ? 1 : data.cholesterol === 'above_normal' ? 2 : 3,
        gluc: data.glucose === 'normal' ? 1 : data.glucose === 'above_normal' ? 2 : 3,
        smoke: data.smoking === 'current' ? 1 : 0,
        alco: data.alcohol === 'heavy' ? 1 : 0,
        active: data.exercise === 'sedentary' ? 0 : 1,
      };

      const result = await predictHealthRisk(apiData);

      // Construct rich result object for dashboard (simulated factors/insights mixed with real score)
      const isHighRisk = result.prediction === 1;

      const fullResult: PredictionResultData = {
        riskScore: Math.round(result.risk_score),
        confidence: 85 + Math.floor(Math.random() * 10), // Mock confidence
        factors: [
          { name: 'Blood Pressure', importance: 85, userValue: `${data.systolicBP}/${data.diastolicBP} mmHg`, avgValue: '120/80 mmHg', impact: parseInt(data.systolicBP) > 130 ? 'negative' : 'positive' },
          { name: 'BMI', importance: 75, userValue: (parseFloat(data.weight) / Math.pow(parseFloat(data.height) / 100, 2)).toFixed(1), avgValue: '25.0', impact: 'negative' },
          { name: 'Age', importance: 65, userValue: `${data.age} years`, avgValue: '45 years', impact: 'negative' },
          { name: 'Cholesterol', importance: 60, userValue: data.cholesterol.replace('_', ' '), avgValue: 'Normal', impact: data.cholesterol === 'normal' ? 'positive' : 'negative' },
        ],
        insights: [
          isHighRisk ?
            { type: 'warning', text: 'Your risk score indicates a higher probability of cardiovascular issues. Please consult a doctor.' } :
            { type: 'success', text: 'Your cardiovascular risk is within a healthy range. Keep up the good work!' },
          { type: 'info', text: 'Maintaining a balanced diet and regular exercise can further improve your heart health.' }
        ]
      };

      setPredictionResult(fullResult);
    } catch (error) {
      console.error("Prediction failed:", error);
      // Fallback to mock result if API fails
      setPredictionResult({
        riskScore: 0,
        confidence: 0,
        factors: [],
        insights: [{ type: 'warning', text: 'Failed to connect to analysis server. Please check your connection.' }]
      });
    }
  };

  const handleProcessingComplete = () => {
    setIsAnimationDone(true);
  };

  // Switch to results when both prediction and animation are ready
  if (appState === 'processing' && isAnimationDone && predictionResult) {
    setAppState('results');
  }

  const handleNewAnalysis = () => {
    setAppState('hero');
    setPredictionResult(null);
    setIsAnimationDone(false);
  };

  const handleBackToHero = () => {
    setAppState('hero');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated neural network background */}
      <NeuralBackground />

      {/* Hero gradient overlay */}
      <div className="fixed inset-0 bg-hero-gradient pointer-events-none z-0" />

      {/* Glow effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-glow-gradient pointer-events-none z-0" />

      {/* Header */}
      <Header onHomeClick={() => setAppState('hero')} />

      {/* Main Content */}
      <main className="relative z-10 pt-24">
        {appState === 'hero' && (
          <HeroSection onGetStarted={handleGetStarted} />
        )}

        {appState === 'input' && (
          <HealthInputForm
            onSubmit={handleFormSubmit}
            onBack={handleBackToHero}
          />
        )}

        {appState === 'processing' && (
          <AIProcessingAnimation onComplete={handleProcessingComplete} />
        )}

        {appState === 'results' && predictionResult && (
          <ResultsDashboard onNewAnalysis={handleNewAnalysis} result={predictionResult} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 text-center border-t border-border mt-20">
        <p className="text-xs text-muted-foreground">
          © 2025 CardioAI. For educational and research purposes only. Not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
};

export default Index;
