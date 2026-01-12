import { Header } from '@/components/Header';
import { NeuralBackground } from '@/components/NeuralBackground';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <NeuralBackground />
            {/* Hero gradient overlay */}
            <div className="fixed inset-0 bg-hero-gradient pointer-events-none z-0" />

            <Header />

            <main className="relative z-10 pt-32 px-4 pb-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white text-center">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h1>
                    <p className="text-slate-300 text-center mb-12 text-lg">
                        Answers to common questions about CardioAI and cardiovascular health prediction.
                    </p>

                    <div className="glass-card rounded-3xl p-8">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-medium text-white">How accurate is CardioAI?</AccordionTrigger>
                                <AccordionContent className="text-slate-300 leading-relaxed">
                                    CardioAI uses a Gradient Boosting machine learning model trained on over 70,000 anonymized clinical health records. It currently achieves an accuracy of approximately 85-91% on our test datasets. However, no AI model is perfect, and this tool should never replace professional medical diagnosis.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-medium text-white">Is my health data stored publicly?</AccordionTrigger>
                                <AccordionContent className="text-slate-300 leading-relaxed">
                                    No. We take privacy seriously. Your health usage data on this demo is processed in real-time for the prediction and is not permanently stored or shared with third parties.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-medium text-white">What do the risk scores mean?</AccordionTrigger>
                                <AccordionContent className="text-slate-300 leading-relaxed">
                                    The risk score represents a statistical probability based on historical data patterns.
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li><span className="text-success">Low (0-15%)</span>: Indicates your profile matches individuals with low cardiovascular disease incidence.</li>
                                        <li><span className="text-warning">Moderate (15-45%)</span>: Suggests some risk factors are present that may need attention.</li>
                                        <li><span className="text-destructive">High ({'>'}45%)</span>: Indicates a profile strongly correlated with cardiovascular issues.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-lg font-medium text-white">Can I use this for medical diagnosis?</AccordionTrigger>
                                <AccordionContent className="text-slate-300 leading-relaxed">
                                    <span className="text-destructive font-bold">No.</span> This is a research and educational tool demonstrating AI capabilities. It does not provide medical diagnoses, treatment advice, or prognosis. Always consult with a qualified healthcare provider for any medical concerns.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger className="text-lg font-medium text-white">What factors contribute most to the prediction?</AccordionTrigger>
                                <AccordionContent className="text-slate-300 leading-relaxed">
                                    The model weighs several factors, but typically Systolic Blood Pressure, Age, and Cholesterol levels are among the highest contributors to the risk calculation. Our "AI Explainability" tab in the results dashboard breaks this down specifically for your input.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 py-8 px-4 text-center border-t border-border mt-auto">
                <p className="text-xs text-muted-foreground">
                    © 2025 CardioAI. For educational and research purposes only. Not a substitute for professional medical advice.
                </p>
            </footer>
        </div>
    );
};

export default FAQ;
