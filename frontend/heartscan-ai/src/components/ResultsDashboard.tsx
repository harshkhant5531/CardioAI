import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RiskGauge } from './RiskGauge';
import { FeatureImportanceChart } from './FeatureImportanceChart';
import { Share2, Heart, Brain, Activity, TrendingUp, AlertTriangle, CheckCircle, RefreshCw, Download } from 'lucide-react';
import { ReportTemplate } from './ReportTemplate';


export interface PredictionResultData {
  riskScore: number;
  confidence: number;
  factors: Array<{ name: string; importance: number; userValue: string; avgValue: string; impact: 'positive' | 'negative' }>;
  insights: Array<{ type: 'warning' | 'info' | 'success'; text: string }>;
}

interface ResultsDashboardProps {
  onNewAnalysis: () => void;
  result: PredictionResultData;
}



import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const ResultsDashboard = ({ onNewAnalysis, result }: ResultsDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'explainability' | 'insights'>('overview');
  const { toast } = useToast();

  const generatePDF = async () => {
    // Target the hidden report template
    const element = document.getElementById('report-template');
    if (!element) throw new Error('Report template not found');

    // Simple timeout to ensure react has rendered the hidden element if it was conditional
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff', // White background for print style
      windowWidth: 800, // Force width for consistent layout
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 2, canvas.height / 2] // Match scaled dimensions
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    return pdf;
  };

  const handleDownload = async () => {
    try {
      toast({
        title: "Generating Report",
        description: "Compiling your comprehensive health analysis...",
      });

      const pdf = await generatePDF();
      pdf.save(`CardioAI-Full-Report-${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: "Success",
        description: "Full report downloaded successfully.",
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error generating your report.",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Try to generate PDF first
        toast({
          title: "Preparing Share",
          description: "Generating PDF for sharing...",
        });

        const pdf = await generatePDF();
        const pdfBlob = pdf.output('blob');
        const file = new File([pdfBlob], `CardioAI-Report.pdf`, { type: 'application/pdf' });

        const shareData = {
          title: 'My CardioAI Risk Assessment',
          text: `I just received my cardiovascular risk assessment from CardioAI. Risk Score: ${result.riskScore}%`,
          url: window.location.href,
        };

        const fileShareData = {
          ...shareData,
          files: [file],
        };

        if (navigator.canShare && navigator.canShare(fileShareData)) {
          await navigator.share(fileShareData);
        } else {
          // Fallback to just sharing text/url if file sharing not supported
          await navigator.share(shareData);
        }
      } else {
        // Fallback copy to clipboard
        navigator.clipboard.writeText(`CardioAI Risk Score: ${result.riskScore}% - ${window.location.href}`);
        toast({
          title: "Copied to Clipboard",
          description: "Result summary and link copied to clipboard.",
        });
      }
    } catch (error) {
      console.log('Error sharing:', error);
      // If user cancels share, it throws an error, so we might not want to show a destructive toast for all errors
      if ((error as Error).name !== 'AbortError') {
        toast({
          variant: "destructive",
          title: "Share Failed",
          description: "Could not share the report.",
        });
      }
    }
  };

  return (
    <section className="relative min-h-screen px-4 py-20" id="results-dashboard">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success mb-4">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Analysis Complete</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
            Your Cardiovascular <span className="gradient-text">Risk Assessment</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Based on the health data you provided, our AI model has generated a comprehensive risk assessment with actionable insights.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8" data-html2canvas-ignore>
          {[
            { id: 'overview', label: 'Overview', icon: Heart },
            { id: 'explainability', label: 'AI Explainability', icon: Brain },
            { id: 'insights', label: 'Health Insights', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'glass'}
                size="lg"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Content */}
        <div className="">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Risk Gauge */}
              <div className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center">
                <h3 className="font-display text-xl font-semibold mb-6">Cardiovascular Risk Score</h3>
                <RiskGauge value={result.riskScore} label="Risk Score" />
              </div>

              {/* Stats Cards */}
              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold">Model Confidence</h3>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-display font-bold">{result.confidence}%</span>
                    <span className="text-muted-foreground text-sm mb-1">accuracy score</span>
                  </div>
                  <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-1000"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    title="Key Risk Factors"
                    value="3"
                    subtitle="identified"
                    icon={<AlertTriangle className="w-5 h-5 text-warning" />}
                  />
                  <StatCard
                    title="Protective Factors"
                    value="2"
                    subtitle="identified"
                    icon={<CheckCircle className="w-5 h-5 text-success" />}
                  />
                </div>

                {/* Quick Insights */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-semibold mb-4">Primary Concern</h3>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Elevated Blood Pressure</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your systolic BP of 135 is above the optimal range. This is the highest contributing factor to your risk score.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'explainability' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="glass-card rounded-3xl p-8">
                  <h3 className="font-display text-xl font-semibold mb-2">Feature Importance</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    These factors contributed most to your risk prediction, ranked by their impact on the model's decision.
                  </p>
                  <FeatureImportanceChart features={result.factors} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-semibold mb-4">Understanding the AI</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our model uses a gradient boosting algorithm trained on over 70,000 cardiovascular health records.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Negative impact on health</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-muted-foreground">Positive / protective factor</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">Neutral effect</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-semibold mb-4">Model Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Algorithm</span>
                      <span className="font-medium">Random Forest</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Training Size</span>
                      <span className="font-medium">70,000+ records</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AUC-ROC</span>
                      <span className="font-medium">0.91</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Features Used</span>
                      <span className="font-medium">11</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="max-w-3xl mx-auto">
              <div className="glass-card rounded-3xl p-8">
                <h3 className="font-display text-xl font-semibold mb-6">AI-Generated Health Insights</h3>
                <div className="space-y-4">
                  {result.insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${insight.type === 'warning'
                        ? 'bg-warning/10 border border-warning/20'
                        : insight.type === 'success'
                          ? 'bg-success/10 border border-success/20'
                          : 'bg-primary/10 border border-primary/20'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        {insight.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />}
                        {insight.type === 'success' && <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />}
                        {insight.type === 'info' && <Activity className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />}
                        <p className="text-sm">{insight.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-xl bg-secondary/50">
                  <h4 className="font-display font-semibold mb-3">Recommended Actions</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Schedule a consultation with a healthcare provider to discuss your blood pressure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Aim for at least 150 minutes of moderate aerobic activity per week.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Consider dietary changes to help manage cholesterol levels.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Re-evaluate your risk in 6 months after implementing lifestyle changes.</span>
                    </li>
                  </ul>
                </div>

                <p className="mt-6 text-xs text-muted-foreground text-center">
                  ⚠️ This is a predictive tool and not a medical diagnosis. Always consult with healthcare professionals for medical advice.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12" data-html2canvas-ignore>
          <Button variant="hero" size="lg" onClick={onNewAnalysis} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            New Analysis
          </Button>
          <Button variant="glass" size="lg" className="gap-2" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button variant="glass" size="lg" className="gap-2" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
        </div>
      </div>
      {/* Hidden Report Template for PDF Generation */}
      <div className="fixed left-[-9999px] top-0 overflow-hidden">
        <ReportTemplate result={result} />
      </div>
    </section>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, subtitle, icon }: StatCardProps) => (
  <div className="glass-card rounded-2xl p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs text-muted-foreground">{title}</span>
      {icon}
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-display font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{subtitle}</span>
    </div>
  </div>
);
