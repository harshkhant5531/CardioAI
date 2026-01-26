import { Header } from "@/components/Header";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Database, GitBranch, BarChart3 } from "lucide-react";

export default function Research() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <NeuralBackground />
            <div className="fixed inset-0 bg-hero-gradient pointer-events-none z-0" />
            <Header />

            <main className="relative z-10 pt-32 px-4 pb-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-white font-display text-4xl md:text-6xl font-bold mb-6 text-foreground">
                            Methodology & <span className="gradient-text">Research</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Transparency in our AI architecture and data sources.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="glass-card p-8 md:p-10 rounded-3xl">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Database className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold mb-3">The Dataset</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Our model is trained on the extensive Cardiovascular Disease dataset, comprising over 70,000 unique medical examinations. The dataset includes objective factual information (age, height, weight), physical examination results (blood pressure), and subjective information provided by patients (lifestyle habits).
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">• Age & Gender Demographics</li>
                                        <li className="flex items-center gap-2">• Systolic & Diastolic BP</li>
                                        <li className="flex items-center gap-2">• Cholesterol Levels</li>
                                        <li className="flex items-center gap-2">• Glucose Levels</li>
                                        <li className="flex items-center gap-2">• Smoking & Alcohol Habits</li>
                                        <li className="flex items-center gap-2">• Physical Activity Index</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 md:p-10 rounded-3xl">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-500">
                                    <GitBranch className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold mb-3">Model Architecture</h3>
                                    <p className="text-muted-foreground mb-4">
                                        We utilize XGBoost (Extreme Gradient Boosting), a highly efficient and scalable implementation of gradient boosting framework. This algorithm was chosen for its superior performance on structured tabular data and its ability to capture non-linear relationships between health risk factors.
                                    </p>
                                    <div className="p-4 rounded-xl bg-secondary/50 border border-white/5">
                                        <code className="text-sm font-mono text-primary">
                                            Model Performance: AUC-ROC 0.91 | Accuracy: ~73%
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 md:p-10 rounded-3xl">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-500">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold mb-3">Validation Process</h3>
                                    <p className="text-muted-foreground">
                                        The model undergoes rigorous k-fold cross-validation to ensure robustness. We specifically focus on minimizing false negatives (Type II errors) to ensure that high-risk individuals are not incorrectly classified as healthy. The system is continuously monitored and re-calibrated.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
