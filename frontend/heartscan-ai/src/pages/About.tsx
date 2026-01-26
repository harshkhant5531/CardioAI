import { Header } from "@/components/Header";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Heart } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <NeuralBackground />
            <div className="fixed inset-0 bg-hero-gradient pointer-events-none z-0" />
            <Header />

            <main className="relative z-10 pt-32 px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-white font-display text-4xl md:text-6xl font-bold mb-6 text-foreground">
                            About <span className="gradient-text">CardioAI</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Empowering individuals with AI-driven insights for better heart health.
                        </p>
                    </div>

                    <div className="space-y-12">
                        <div className="glass-card p-8 md:p-12 rounded-3xl">
                            <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Cardiovascular diseases remain the leading cause of death globally. At CardioAI, our mission is to democratize access to early risk assessment tools. By leveraging the power of Artificial Intelligence, we aim to provide accurate, instant, and understandable health insights to users worldwide, enabling proactive lifestyle changes and timely medical interventions.
                            </p>
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <Heart className="w-5 h-5 fill-current" />
                                <span>Saving lives through prevention</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-card p-8 rounded-3xl">
                                <h3 className="font-display text-xl font-bold mb-4">The Team</h3>
                                <p className="text-muted-foreground">
                                    We are a dedicated team of data scientists, healthcare professionals, and software engineers working together to bridge the gap between advanced medical research and everyday user applications.
                                </p>
                            </div>
                            <div className="glass-card p-8 rounded-3xl">
                                <h3 className="font-display text-xl font-bold mb-4">Disclaimer</h3>
                                <p className="text-muted-foreground">
                                    CardioAI is a predictive tool for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
