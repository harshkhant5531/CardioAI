import { Header } from "@/components/Header";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Brain, Activity, Shield, Clock, Database, Share2 } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: Brain,
            title: "Advanced Machine Learning",
            description: "Our core engine utilizes Gradient Boosting algorithms (XGBoost) trained on over 70,000 anonymized health records to identify patterns invisible to traditional statistical methods."
        },
        {
            icon: Activity,
            title: "Real-time Processing",
            description: "Get instant risk assessments. Our optimized backend processes your health parameters in milliseconds to provide immediate feedback."
        },
        {
            icon: Shield,
            title: "Privacy First",
            description: "Your health data is processed locally where possible and never stored permanently. We adhere to strict data privacy standards."
        },
        {
            icon: Clock,
            title: "Early Detection",
            description: "Identify potential cardiovascular risks before they manifest into serious conditions. Early preventative action is key to long-term health."
        },
        {
            icon: Database,
            title: "Comprehensive Factors",
            description: "We analyze multiple dimensions of health including blood pressure, cholesterol, BMI, lifestyle habits, and age demographics."
        },
        {
            icon: Share2,
            title: "Easy Sharing",
            description: "Download detailed reports or share your results directly with your healthcare provider for professional consultation."
        }
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <NeuralBackground />
            <div className="fixed inset-0 bg-hero-gradient pointer-events-none z-0" />
            <Header />

            <main className="relative z-10 pt-32 px-4 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
                            Platform <span className="gradient-text">Features</span>
                        </h1>
                        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                            Discover the technology and capabilities that make CardioAI a powerful tool for personal health monitoring.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
